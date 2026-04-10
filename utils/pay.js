/**
 * 微信支付工具
 */

const app = getApp()

/**
 * 发起支付
 * @param {Object} orderData - 订单数据
 * @param {Function} successCb - 成功回调
 * @param {Function} failCb - 失败回调
 */
function requestPayment(orderData, successCb, failCb) {
  // 真实场景：先调用后端接口获取支付参数
  // 后端调用微信支付统一下单接口，返回预支付交易会话标识 prepay_id
  // 然后调 wx.requestPayment 拉起支付

  // 模拟支付参数
  const paymentParams = {
    timeStamp: String(Date.now()),
    nonceStr: 'random_' + Math.random().toString(36).substr(2, 15),
    package: 'prepay_id=wx' + Date.now(),
    signType: 'MD5',
    paySign: 'mock_pay_sign_' + Date.now()
  }

  wx.showLoading({ title: '正在调起支付...' })

  wx.requestPayment({
    ...paymentParams,
    success: (res) => {
      wx.hideLoading()
      wx.showToast({ title: '支付成功', icon: 'success' })
      successCb && successCb(res)
    },
    fail: (err) => {
      wx.hideLoading()
      if (err.errMsg === 'requestPayment:fail cancel') {
        wx.showToast({ title: '用户取消支付', icon: 'none' })
      } else {
        wx.showToast({ title: '支付失败', icon: 'none' })
      }
      failCb && failCb(err)
    }
  })
}

/**
 * 申请退款
 */
function requestRefund(orderId, successCb, failCb) {
  wx.showModal({
    title: '申请退款',
    content: '确定要申请退款吗？退款将在1-7个工作日内原路返回。',
    success: (res) => {
      if (res.confirm) {
        wx.showToast({ title: '退款申请已提交', icon: 'success' })
        successCb && successCb()
      }
    },
    fail: () => {
      failCb && failCb()
    }
  })
}

module.exports = {
  requestPayment,
  requestRefund
}
