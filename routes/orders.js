const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const orderController = require('../controllers/orderController');
const { auth } = require('../middleware/auth');

// 创建订单
router.post('/',
  auth,
  body('design_id').isUUID().withMessage('设计ID无效'),
  body('specs.size').isIn(['S', 'M', 'L']).withMessage('尺寸无效'),
  body('specs.material').isIn(['cotton', 'cotton_linen', 'organic_cotton']).withMessage('材质无效'),
  body('specs.print_side').isIn(['single', 'double']).withMessage('印刷面无效'),
  body('specs.handle').isIn(['short', 'long']).withMessage('手柄无效'),
  body('quantity').isInt({ min: 1, max: 1000 }).withMessage('数量无效'),
  body('address').isObject().withMessage('收货地址无效'),
  orderController.create
);

// 获取用户订单列表
router.get('/',
  auth,
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  orderController.list
);

// 获取单个订单
router.get('/:id',
  auth,
  param('id').isUUID().withMessage('订单ID无效'),
  orderController.getOne
);

// 更新订单状态（管理员/工厂回调）
router.patch('/:id/status',
  param('id').isUUID().withMessage('订单ID无效'),
  orderController.updateStatus
);

// 微信支付回调
router.post('/notify/payment', orderController.paymentNotify);

// 物流查询
router.get('/:id/logistics', auth, orderController.getLogistics);

module.exports = router;
