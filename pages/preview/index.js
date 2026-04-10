// pages/preview/index.js
const app = getApp()

Page({
  data: {
    statusBarHeight: 20,

    // 预览
    activeSide: 'front',
    designElements: [],

    // 规格选项
    sizeOptions: [
      { value: 'S', label: 'S', desc: '30×35cm' },
      { value: 'M', label: 'M', desc: '35×40cm' },
      { value: 'L', label: 'L', desc: '40×45cm' },
    ],
    materialOptions: [
      { value: 'cotton', label: '纯棉帆布', addon: '+¥0' },
      { value: 'linen', label: '棉麻混纺', addon: '+¥10' },
      { value: 'organic', label: '有机棉', addon: '+¥20' },
    ],

    // 已选规格
    selectedSpecs: {
      size: 'M',
      material: 'cotton',
      printSide: 'single',
      handle: 'short'
    },

    quantity: 1,
    priceInfo: { unitPrice: '45.00', totalPrice: '45.00' }
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({ statusBarHeight: systemInfo.statusBarHeight || 20 })

    // 加载保存的设计
    const designData = wx.getStorageSync('currentDesign')
    if (designData && designData.elements) {
      this.setData({ designElements: designData.elements })
    }

    // 合并已保存规格
    const savedSpecs = designData && designData.specs
    if (savedSpecs) {
      this.setData({ selectedSpecs: savedSpecs })
    }

    this.recalculatePrice()
  },

  onSwitchSide(e) {
    this.setData({ activeSide: e.currentTarget.dataset.side })
  },

  onSpecChange(e) {
    const { key, value } = e.currentTarget.dataset
    const selectedSpecs = { ...this.data.selectedSpecs, [key]: value }
    this.setData({ selectedSpecs })
    this.recalculatePrice()
  },

  onDecreaseQty() {
    if (this.data.quantity <= 1) return
    this.setData({ quantity: this.data.quantity - 1 })
    this.recalculatePrice()
  },

  onIncreaseQty() {
    this.setData({ quantity: this.data.quantity + 1 })
    this.recalculatePrice()
  },

  onQuantityChange(e) {
    const qty = parseInt(e.detail.value) || 1
    this.setData({ quantity: Math.max(1, Math.min(999, qty)) })
    this.recalculatePrice()
  },

  recalculatePrice() {
    const { selectedSpecs, quantity } = this.data
    const priceInfo = app.calculatePrice(selectedSpecs, quantity)
    this.setData({ priceInfo })
  },

  onBack() {
    wx.navigateBack()
  },

  onSubmitOrder() {
    // 检查是否已登录
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showModal({
        title: '提示',
        content: '下单需要先登录，是否去授权？',
        confirmText: '去授权',
        success: (res) => {
          if (res.confirm) {
            app.login((userInfo) => {
              this.proceedOrder()
            })
          }
        }
      })
      return
    }

    this.proceedOrder()
  },

  proceedOrder() {
    const { selectedSpecs, quantity, priceInfo, designElements } = this.data

    // 保存订单数据到 storage
    const orderData = {
      specs: selectedSpecs,
      quantity,
      price: priceInfo,
      elements: designElements,
      createdAt: Date.now()
    }
    wx.setStorageSync('pendingOrder', orderData)

    wx.navigateTo({ url: '/pages/order/index' })
  },

  onShareAppMessage() {
    return {
      title: '我的专属帆布袋设计 — 袋享印',
      path: '/pages/preview/index'
    }
  }
})
