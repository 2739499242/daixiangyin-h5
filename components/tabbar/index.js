Component({
  properties: {
    active: {
      type: Number,
      value: 0
    }
  },
  data: {
    safeArea: 0,
    list: [
      {
        text: '首页',
        iconPath: '/components/tabbar/icon-home.png',
        selectedIconPath: '/components/tabbar/icon-home-active.png',
        path: '/pages/home/index'
      },
      {
        text: '设计',
        iconPath: '/components/tabbar/icon-design.png',
        selectedIconPath: '/components/tabbar/icon-design-active.png',
        path: '/pages/designer/index'
      },
      {
        text: '订单',
        iconPath: '/components/tabbar/icon-order.png',
        selectedIconPath: '/components/tabbar/icon-order-active.png',
        path: '/pages/order/index'
      },
      {
        text: '我的',
        iconPath: '/components/tabbar/icon-profile.png',
        selectedIconPath: '/components/tabbar/icon-profile-active.png',
        path: '/pages/profile/index'
      }
    ]
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync()
      this.setData({ safeArea: systemInfo.safeArea.bottom - systemInfo.screenHeight })
    }
  },

  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      const path = this.data.list[index].path
      wx.switchTab({ url: path })
    }
  }
})
