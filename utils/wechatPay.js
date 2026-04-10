const crypto = require('crypto');
const axios = require('axios');
const { WechatPay } = require('wechatpay-node-v3');

let wpInstance = null;

function getWechatPay() {
  if (!wpInstance) {
    wpInstance = new WechatPay({
      mchid: process.env.WX_MCHID,
      serial: process.env.WX_SERIAL,
      privateKey: process.env.WX_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      certs: {}, // 动态加载
    });
  }
  return wpInstance;
}

// JSAPI 调起支付签名
async function getJsapiSign(prepay_id) {
  const appid = process.env.WX_APPID;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonceStr = crypto.randomBytes(16).toString('hex');
  const packageStr = `prepay_id=${prepay_id}`;

  const signStr = `${appid}\n${timestamp}\n${nonceStr}\n${packageStr}\n`;
  const sign = crypto
    .createSign('RSA-SHA256')
    .update(signStr)
    .sign(process.env.WX_PRIVATE_KEY?.replace(/\\n/g, '\n'), 'base64');

  return { appId: appid, timeStamp: timestamp, nonceStr, package: packageStr, paySign: sign };
}

// 统一下单
async function unifiedOrder({ out_trade_no, total, description, openid, notify_url }) {
  const wp = getWechatPay();
  const result = await wp.transactions_jsapi({
    out_trade_no,
    body: description,
    total,
    currency: 'CNY',
    openid,
    notify_url,
  });
  return result;
}

module.exports = { getWechatPay, getJsapiSign, unifiedOrder };
