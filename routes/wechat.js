const express = require('express');
const router = express.Router();
const wechatController = require('../controllers/wechatController');
const { auth } = require('../middleware/auth');

// 微信小程序登录（code 换 openid）
router.post('/login', wechatController.login);

// 微信支付统一下单
router.post('/pay/unified-order', auth, wechatController.unifiedOrder);

// 微信支付回调通知
router.post('/pay/notify', wechatController.payNotify);

// 获取微信支付签名（前端调起支付用）
router.get('/pay/sign', auth, wechatController.getPaySign);

module.exports = router;
