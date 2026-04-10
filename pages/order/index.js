// pages/order/index.js
const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    safeAreaBottom: 0,

    tabs: [
      { label: '全部', value: 'all' },
      { label: '待付款', value: 'pending' },
      { label: '生产中', value: 'producing' },
      { label: '已完成', value: 'completed' },
    ],
    activeTab: 'all',

    // 模拟订单数据
    orderList: [
      {
        id: 'ORD20260410001',
        orderNo: 'DXY20260410001',
        status: 'producing',
        statusText: '生产中',
        thumbnail: '',
        specsDesc: 'M码 · 纯棉帆布 · 单面印刷 · 短柄',
        quantity: 2,
        price: '90.00',
        createdAt: '2026-04-10 09:30',
        showTimeline: true,
        timeline: [
          { label: '已支付', done: true, current: false },
          { label: '设计确认', done: true, current: false },
          { label: '生产中', done: true, current: true },
          { label: '已发货', done: false, current: false },
          { label: '已到达', done: false, current: false },
        ]
      },
      {
        id: 'ORD20260408002',
        orderNo: 'DXY20260408002',
        status: 'delivered',
        statusText: '已完成',
        thumbnail: '',
        specsDesc: 'L码 · 有机棉 · 双面印刷 · 长柄',
        quantity: 1,
        price: '95.00',
        createdAt: '2026-04-08 14:22',
        showTimeline: false,
        timeline: []
      },
      {
        id: 'ORD20260405003',
        orderNo: 'DXY20260405003',
        status: 'shipped',
        statusText: '已发货',
        thumbnail: '',
        specsDesc: 'M码 · 棉麻混纺 · 单面印刷 · 短柄',
        quantity: 5,
        price: '247.50',
        createdAt: '2026-04-05 10:05',
        showTimeline: true,
        timeline: [
          { label: '已支付', done: true, current: false },
          { label: '设计确认', done: true, current: false },
          { label: '生产中', done: true, current: false },
          { label: '已发货', done: true, current: true },
          { label: '已到达', done: false, current: false },
        ]
      },
    ]
  },

  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 20,
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.screenHeight
    })

    // 如果有 pending order，显示确认页
    const pendingOrder = wx.getStorageSync('pendingOrder')
    if (pendingOrder) {
      this.showPaymentModal(pendingOrder)
    }

    // 从URL参数设置tab
    if (options.tab) {
      this.setData({ activeTab: options.tab })
    }
  },

  onShow() {
    // 刷新订单列表
  },

  onTabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.value })
    // 过滤订单列表
    this.filterOrders()
  },

  filterOrders() {
    const { activeTab, orderList } = this.data
    if (activeTab === 'all') {
      // 显示全部
    }
    // 其他过滤逻辑...
  },

  showPaymentModal(orderData) {
    wx.showModal({
      title: '确认支付',
      content: `订单金额：¥${orderData.price.totalPrice}\n确认支付？`,
      confirmText: '确认支付',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.processPayment(orderData)
        } else {
          wx.removeStorageSync('pendingOrder')
        }
      }
    })
  },

  processPayment(orderData) {
    wx.showLoading({ title: '支付中...' })

    // 模拟微信支付
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '支付成功 ✓', icon: 'success' })

      // 创建正式订单
      const newOrder = {
        id: 'ORD' + Date.now(),
        orderNo: 'DXY' + Date.now(),
        status: 'paid',
        statusText: '已支付',
        specsDesc: `${orderData.specs.size}码 · ${orderData.specs.material} · ${orderData.specs.printSide === 'single' ? '单面' : '双面'}印刷 · ${orderData.specs.handle === 'short' ? '短柄' : '长柄'}`,
        quantity: orderData.quantity,
        price: orderData.price.totalPrice,
        createdAt: new Date().toLocaleString('zh-CN'),
        showTimeline: true,
        timeline: [
          { label: '已支付', done: true, current: true },
          { label: '设计确认', done: false, current: false },
          { label: '生产中', done: false, current: false },
          { label: '已发货', done: false, current: false },
          { label: '已到达', done: false, current: false },
        ]
      }

      const orderList = [newOrder, ...this.data.orderList]
      this.setData({ orderList })

      // 清除 pending
      wx.removeStorageSync('pendingOrder')

      // 发送服务通知
      this.sendNotify()
    }, 1500)
  },

  sendNotify() {
    // 真实场景调用 wx.requestSubscribeMessage
    wx.showToast({
      title: '已开启订单通知',
      icon: 'none',
      duration: 2000
    })
  },

  onBack() {
    wx.navigateBack()
  },

  onOrderDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/order/index?orderId=${id}` })
  },

  onCancelOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          const orderList = this.data.orderList.filter(o => o.id !== id)
          this.setData({ orderList })
          wx.showToast({ title: '订单已取消', icon: 'none' })
        }
      }
    })
  },

  onStartDesign() {
    wx.switchTab({ url: '/pages/designer/index' })
  },

  onShareAppMessage() {
    return {
      title: '我的订单 — 袋享印',
      path: '/pages/order/index'
    }
  }
})
