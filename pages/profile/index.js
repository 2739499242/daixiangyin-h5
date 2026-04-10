// pages/profile/index.js
const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    safeAreaBottom: 0,
    hasLogin: false,

    stats: {
      designs: 5,
      orders: 3,
      coupons: 2
    },
    availableCoupons: 2
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusInfo.statusBarHeight || 20,
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.screenHeight
    })
  },

  onShow() {
    // 检查登录状态
    const token = wx.getStorageSync('token')
    this.setData({ hasLogin: !!token })

    // 刷新统计数据
    const designs = (wx.getStorageSync('myDesigns') || []).length
    const orders = (wx.getStorageSync('myOrders') || []).length
    this.setData({
      'stats.designs': Math.max(designs, 5),
      'stats.orders': Math.max(orders, 3)
    })
  },

  onLogin() {
    if (this.data.hasLogin) return
    app.login(() => {
      this.setData({ hasLogin: true })
      wx.showToast({ title: '登录成功', icon: 'success' })
    })
  },

  // 路由跳转
  onMyDesigns() {
    wx.navigateTo({ url: '/pages/designer/index' })
  },

  onMyOrders() {
    wx.switchTab({ url: '/pages/order/index' })
  },

  onMyFavorites() {
    wx.showToast({ title: '我的收藏开发中', icon: 'none' })
  },

  onCoupons() {
    wx.showToast({ title: '优惠券功能开发中', icon: 'none' })
  },

  onAddresses() {
    wx.navigateTo({ url: '/pages/profile/address' })
  },

  onBusiness() {
    wx.showToast({ title: '企业通道开发中', icon: 'none' })
  },

  onInvoices() {
    wx.showToast({ title: '发票功能开发中', icon: 'none' })
  },

  onService() {
    wx.showToast({ title: '客服功能开发中', icon: 'none' })
  },

  onHelp() {
    wx.showToast({ title: '帮助中心开发中', icon: 'none' })
  },

  onAbout() {
    wx.showModal({
      title: '袋享印',
      content: '袋享印 · 精工定制帆布袋平台\n\n版本：v1.0.0\n\n让每个人都能拥有独一无二的帆布袋',
      showCancel: false,
      confirmText: '知道了'
    })
  }
})
