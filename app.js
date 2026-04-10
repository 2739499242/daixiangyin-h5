App({
  globalData: {
    userInfo: null,
    token: null,
    apiBase: 'https://api.daixiangyin.com',
    // 帆布袋规格默认值
    defaultSpecs: {
      size: 'M',        // S / M / L
      material: 'cotton', // cotton / linen / organic
      printSide: 'single', // single / double
      handle: 'short'     // short / long
    },
    // 价格表
    priceTable: {
      'S_single': 35,
      'S_double': 55,
      'M_single': 45,
      'M_double': 65,
      'L_single': 55,
      'L_double': 75
    },
    materialAddon: {
      cotton: 0,
      linen: 10,
      organic: 20
    }
  },

  onLaunch() {
    // 微信登录
    this.checkLogin()
  },

  checkLogin() {
    const token = wx.getStorageSync('token')
    if (token) {
      this.globalData.token = token
      this.getUserInfo()
    }
  },

  login(callback) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const { userInfo } = res
        wx.setStorageSync('userInfo', userInfo)
        this.globalData.userInfo = userInfo
        // 模拟登录，真实场景调后端接口
        const token = 'mock_token_' + Date.now()
        wx.setStorageSync('token', token)
        this.globalData.token = token
        callback && callback(userInfo)
      },
      fail: (err) => {
        console.error('登录失败', err)
        wx.showToast({ title: '请允许授权', icon: 'none' })
      }
    })
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
  },

  // 价格计算
  calculatePrice(specs, quantity = 1) {
    const base = this.globalData.priceTable[`${specs.size}_${specs.printSide}`] || 45
    const materialAdd = this.globalData.materialAddon[specs.material] || 0
    let unitPrice = base + materialAdd

    // 批量折扣
    if (quantity >= 10) unitPrice *= 0.8
    else if (quantity >= 5) unitPrice *= 0.9

    return {
      unitPrice: unitPrice.toFixed(2),
      totalPrice: (unitPrice * quantity).toFixed(2)
    }
  }
})
