const axios = require('axios');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const wechatPayUtils = require('../utils/wechatPay');

const wechatController = {
  // POST /api/wechat/login 微信登录
  async login(req, res, next) {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ success: false, message: 'code 不能为空' });
      }

      // 用 code 换 openid
      const appid = process.env.WX_APPID;
      const secret = process.env.WX_SECRET;
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;

      const wxResp = await axios.get(url, { timeout: 10000 });
      const { openid, session_key, errcode, errmsg } = wxResp.data;

      if (errcode) {
        return res.status(400).json({ success: false, message: `微信登录失败: ${errmsg}` });
      }

      // 查找或创建用户
      let user;
      const existing = await db.query(`SELECT * FROM users WHERE openid = $1`, [openid]);
      if (existing.rows.length > 0) {
        user = existing.rows[0];
      } else {
        const id = uuidv4();
        const newUser = await db.query(
          `INSERT INTO users (id, openid, created_at) VALUES ($1, $2, NOW()) RETURNING *`,
          [id, openid]
        );
        user = newUser.rows[0];
      }

      // 签发 JWT
      const token = jwt.sign(
        { user_id: user.id, openid },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: { id: user.id, nickname: user.nickname, avatar_url: user.avatar_url },
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/wechat/pay/unified-order 微信支付统一下单
  async unifiedOrder(req, res, next) {
    try {
      const { order_id, total_fee, description, notify_url } = req.body;
      const user_id = req.user.user_id;

      // 获取用户 openid
      const user = await db.query(`SELECT openid FROM users WHERE id = $1`, [user_id]);
      if (!user.rows[0]?.openid) {
        return res.status(400).json({ success: false, message: '用户未绑定微信' });
      }

      const result = await wechatPayUtils.unifiedOrder({
        out_trade_no: order_id,
        total: total_fee, // 单位：分
        description: description || '袋享印帆布袋定制',
        openid: user.rows[0].openid,
        notify_url: notify_url || `${process.env.API_BASE}/api/wechat/pay/notify`,
      });

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/wechat/pay/sign 获取调起支付的签名参数
  async getPaySign(req, res, next) {
    try {
      const { prepay_id } = req.query;
      if (!prepay_id) {
        return res.status(400).json({ success: false, message: 'prepay_id 不能为空' });
      }

      const signParams = await wechatPayUtils.getJsapiSign(prepay_id);
      res.json({ success: true, data: signParams });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/wechat/pay/notify 微信支付回调
  async payNotify(req, res, next) {
    try {
      const xml = req.body;
      console.log('[WechatPayNotify]', xml);

      // TODO: 验签 + 更新订单状态
      // const verified = wechatPayUtils.verifyNotify(xml);
      // if (!verified) return res.send('<xml><return_code><![CDATA[FAIL]]></return_code></xml>');

      res.send('<xml><return_code><![CDATA[SUCCESS]]></return_code></xml>');
    } catch (err) {
      next(err);
    }
  },
};

module.exports = wechatController;
