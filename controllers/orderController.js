const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const wechatPay = require('../utils/wechatPay');

// 价格计算规则
const PRICE_RULES = {
  base: { S: { single: 35, double: 55 }, M: { single: 45, double: 65 }, L: { single: 55, double: 75 } },
  material: { cotton: 0, cotton_linen: 10, organic_cotton: 20 },
  handle: { short: 0, long: 5 },
};

function calcPrice(specs, quantity) {
  const base = PRICE_RULES.base[specs.size][specs.print_side];
  const material = PRICE_RULES.material[specs.material];
  const handle = PRICE_RULES.handle[specs.handle];
  const unitPrice = base + material + handle;

  // 批量折扣
  let discount = 1.0;
  if (quantity >= 10) discount = 0.8;
  else if (quantity >= 5) discount = 0.9;

  return {
    unitPrice,
    subtotal: Math.round(unitPrice * quantity * discount * 100) / 100,
    discount: discount < 1.0 ? `${Math.round((1 - discount) * 100)}%` : null,
  };
}

const orderController = {
  // POST /api/orders 创建订单
  async create(req, res, next) {
    try {
      const { design_id, specs, quantity, address, remark } = req.body;
      const user_id = req.user.user_id;

      // 验证设计方案归属
      const design = await db.query(
        `SELECT id, user_id FROM designs WHERE id = $1 AND user_id = $2`,
        [design_id, user_id]
      );
      if (design.rows.length === 0) {
        return res.status(404).json({ success: false, message: '设计方案不存在' });
      }

      const { unitPrice, subtotal, discount } = calcPrice(specs, quantity);
      const id = uuidv4();

      const result = await db.query(
        `INSERT INTO orders
           (id, user_id, design_id, specs_json, quantity, unit_price, total_price,
            status, address_json, remark, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8, $9, NOW())
         RETURNING *`,
        [
          id, user_id, design_id,
          JSON.stringify(specs), quantity, unitPrice, subtotal,
          JSON.stringify(address), remark || null,
        ]
      );

      const order = result.rows[0];
      order._price_breakdown = { unitPrice, discount };

      res.status(201).json({
        success: true,
        message: '订单创建成功',
        data: {
          order_id: order.id,
          total_price: order.total_price,
          price_breakdown: order._price_breakdown,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/orders 订单列表
  async list(req, res, next) {
    try {
      const user_id = req.user.user_id;
      const page = req.query.page || 1;
      const limit = req.query.limit || 20;
      const offset = (page - 1) * limit;

      const [dataResult, countResult] = await Promise.all([
        db.query(
          `SELECT o.id, o.quantity, o.unit_price, o.total_price, o.status,
                  o.created_at, d.name as design_name, d.thumbnail_url
           FROM orders o
           LEFT JOIN designs d ON o.design_id = d.id
           WHERE o.user_id = $1
           ORDER BY o.created_at DESC
           LIMIT $2 OFFSET $3`,
          [user_id, limit, offset]
        ),
        db.query(`SELECT COUNT(*) FROM orders WHERE user_id = $1`, [user_id]),
      ]);

      res.json({
        success: true,
        data: {
          list: dataResult.rows,
          total: parseInt(countResult.rows[0].count),
          page,
          limit,
          pages: Math.ceil(countResult.rows[0].count / limit),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/orders/:id 订单详情
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.user_id;

      const result = await db.query(
        `SELECT o.*, d.name as design_name, d.thumbnail_url
         FROM orders o
         LEFT JOIN designs d ON o.design_id = d.id
         WHERE o.id = $1 AND o.user_id = $2`,
        [id, user_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: '订单不存在' });
      }

      const order = result.rows[0];
      order.specs = JSON.parse(order.specs_json || '{}');
      order.address = JSON.parse(order.address_json || '{}');

      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/orders/:id/status 更新订单状态（工厂回调）
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, logistics_company, tracking_number, remark } = req.body;

      const validStatuses = ['pending', 'paid', 'confirmed', 'producing', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: '无效的订单状态' });
      }

      const result = await db.query(
        `UPDATE orders
         SET status = $1,
             logistics_company = COALESCE($2, logistics_company),
             tracking_number = COALESCE($3, tracking_number),
             updated_at = NOW()
         WHERE id = $4
         RETURNING *`,
        [status, logistics_company || null, tracking_number || null, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: '订单不存在' });
      }

      // TODO: 触发微信服务通知（推送状态更新）
      // await sendWechatNotice(user_id, status);

      res.json({ success: true, message: '订单状态已更新' });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/orders/notify/payment 微信支付回调
  async paymentNotify(req, res, next) {
    try {
      const { transaction_id, out_trade_no, trade_state, attach } = req.body;
      console.log('[PaymentNotify]', { transaction_id, out_trade_no, trade_state });

      if (trade_state === 'SUCCESS') {
        await db.query(
          `UPDATE orders SET status = 'paid', payment_id = $1, updated_at = NOW()
           WHERE id = $2 AND status = 'pending'`,
          [transaction_id, out_trade_no]
        );
      }

      // 返回成功接收
      res.reply('SUCCESS');
    } catch (err) {
      next(err);
    }
  },

  // GET /api/orders/:id/logistics 物流查询
  async getLogistics(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.user_id;

      const result = await db.query(
        `SELECT logistics_company, tracking_number FROM orders
         WHERE id = $1 AND user_id = $2`,
        [id, user_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: '订单不存在' });
      }

      const { logistics_company, tracking_number } = result.rows[0];
      if (!tracking_number) {
        return res.json({ success: true, data: { message: '暂无物流信息' } });
      }

      // TODO: 调用快递100/腾讯云CDN物流查询
      // const logisticsInfo = await queryLogistics(logistics_company, tracking_number);

      res.json({
        success: true,
        data: {
          company: logistics_company,
          tracking_number,
          message: '请前往快递公司官网查询实时物流',
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderController;
