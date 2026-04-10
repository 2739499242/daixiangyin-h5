// pages/home/index.js
const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    safeAreaBottom: 0,

    // 分类
    categories: [
      { id: 'festival', name: '节日庆典', icon: '🎊', count: 128 },
      { id: 'love', name: '情侣闺蜜', icon: '💕', count: 86 },
      { id: 'art', name: '文艺清新', icon: '🌿', count: 215 },
      { id: 'pet', name: '萌宠可爱', icon: '🐱', count: 93 },
      { id: 'travel', name: '旅行打卡', icon: '✈️', count: 67 },
      { id: 'business', name: '企业定制', icon: '🏢', count: 34 },
    ],

    // 精选案例
    cases: [
      {
        id: 1,
        name: '闺蜜同款帆布袋',
        author: '小雅',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=400&fit=crop',
        likes: 2341
      },
      {
        id: 2,
        name: '猫咪头像定制',
        author: '阿喵',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
        likes: 1892
      },
      {
        id: 3,
        name: '毕业季纪念袋',
        author: '小明',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=400&fit=crop',
        likes: 3201
      },
      {
        id: 4,
        name: '公司年会伴手礼',
        author: 'Leo',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
        likes: 567
      },
      {
        id: 5,
        name: '旅行打卡纪念',
        author: '旅行家',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=400&fit=crop',
        likes: 4123
      }
    ],

    // 热门设计
    hotDesigns: [
      {
        id: 1,
        name: '莫兰迪色系文字',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        price: 45,
        uses: 8923
      },
      {
        id: 2,
        name: '极简几何图案',
        image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
        price: 55,
        uses: 5671
      },
      {
        id: 3,
        name: '手绘涂鸦风格',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
        price: 45,
        uses: 3421
      },
      {
        id: 4,
        name: '复古印刷纹理',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
        price: 65,
        uses: 2198
      }
    ]
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 20,
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.screenHeight
    })
  },

  onShow() {
    // 刷新用户信息
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  // 事件处理
  onStartDesign() {
    wx.navigateTo({ url: '/pages/designer/index' })
  },

  onSearch() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' })
  },

  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/designer/index?category=${id}` })
  },

  onCaseTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/preview/index?caseId=${id}` })
  },

  onDesignTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/designer/index?designId=${id}` })
  },

  onMoreCategories() {
    wx.navigateTo({ url: '/pages/designer/index' })
  },

  onMoreCases() {
    wx.navigateTo({ url: '/pages/home/index' })
  },

  onShareAppMessage() {
    return {
      title: '精工定制帆布袋 · 袋享印',
      path: '/pages/home/index',
      imageUrl: '/assets/images/share-cover.png'
    }
  }
})
