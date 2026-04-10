// pages/designer/index.js
const app = getApp()
let elementIdCounter = 1

Page({
  data: {
    statusBarHeight: 20,
    safeAreaBottom: 0,

    // 工具
    activeTool: 'text',
    tools: [
      { id: 'text', name: '文字', icon: '✏️' },
      { id: 'image', name: '图片', icon: '🖼' },
      { id: 'shape', name: '形状', icon: '🔲' },
      { id: 'sticker', name: '贴纸', icon: '⭐' },
    ],

    // 颜色
    colors: ['#1A2B23', '#C9A76C', '#EA4335', '#4285F4', '#34A853', '#9E9E9E', '#212121', '#FFFFFF'],
    textColor: '#1A2B23',
    textFontSize: 24,

    // 字号选项
    fontSizes: [14, 18, 24, 32, 40, 48],

    // 画布配置
    printAreaWidth: 160,
    printAreaHeight: 160,

    // 元素
    elements: [],
    selectedId: null,
    selectedElement: null,

    // 历史（撤销/重做）
    history: [],
    historyIndex: -1,
    canUndo: false,
    canRedo: false,

    // 弹窗状态
    showTextModal: false,
    showImageModal: false,
    showTemplateModal: false,

    // 文字输入
    textInput: '',

    // 模板
    templates: [
      { id: 1, name: '简约文字', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
      { id: 2, name: '几何图案', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=200&fit=crop' },
      { id: 3, name: '手绘涂鸦', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop' },
      { id: 4, name: '花卉图案', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc08?w=200&h=200&fit=crop' },
      { id: 5, name: '文艺复古', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop' },
      { id: 6, name: '极简线条', image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=200&h=200&fit=crop' },
    ],

    // 拖拽状态
    isDragging: false,
    dragTarget: null,
    dragOffset: { x: 0, y: 0 },
  },

  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 20,
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.screenHeight
    })

    // 从 URL 参数加载模板/案例
    if (options.designId) {
      this.loadDesign(options.designId)
    }
    if (options.category) {
      this.setData({ activeTool: 'template' })
      this.onSelectTemplate()
    }

    // 初始化历史
    this.saveHistory()
  },

  // ========================
  // 工具选择
  // ========================
  onSelectTool(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ activeTool: id })

    if (id === 'text') {
      this.setData({ showTextModal: true, textInput: '' })
    } else if (id === 'image') {
      this.setData({ showImageModal: true })
    } else if (id === 'sticker') {
      this.onSelectSticker()
    } else if (id === 'shape') {
      // 添加默认形状
      this.addShape('rect')
    }
  },

  // ========================
  // 文字操作
  // ========================
  onTextInput(e) {
    this.setData({ textInput: e.detail.value })
  },

  onConfirmText() {
    const { textInput, textColor, textFontSize } = this.data
    if (!textInput.trim()) {
      wx.showToast({ title: '请输入文字', icon: 'none' })
      return
    }
    this.addText(textInput.trim(), textColor, textFontSize)
    this.setData({ showTextModal: false, textInput: '' })
  },

  onCloseTextModal() {
    this.setData({ showTextModal: false })
  },

  addText(content, color, fontSize) {
    const id = 'el_' + (elementIdCounter++)
    const el = {
      id,
      type: 'text',
      content,
      color: color || '#1A2B23',
      fontSize: fontSize || 24,
      fontFamily: 'Noto Sans SC',
      bold: false,
      italic: false,
      x: this.data.printAreaWidth / 2 - 40,
      y: this.data.printAreaHeight / 2 - 20,
      rotate: 0,
      scale: 1,
      zIndex: this.data.elements.length
    }
    this.addElement(el)
  },

  // ========================
  // 图片操作
  // ========================
  onCloseImageModal() {
    this.setData({ showImageModal: false })
  },

  onChooseImage() {
    this.setData({ showImageModal: false })
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.addImage(tempFilePath)
      }
    })
  },

  onTakePhoto() {
    this.setData({ showImageModal: false })
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.addImage(tempFilePath)
      }
    })
  },

  addImage(src) {
    wx.getImageInfo({
      src,
      success: (info) => {
        const id = 'el_' + (elementIdCounter++)
        const maxSize = 120
        const scale = Math.min(maxSize / info.width, maxSize / info.height, 1)
        const el = {
          id,
          type: 'image',
          src,
          width: info.width * scale,
          height: info.height * scale,
          x: (this.data.printAreaWidth - info.width * scale) / 2,
          y: (this.data.printAreaHeight - info.height * scale) / 2,
          rotate: 0,
          scale: 1,
          zIndex: this.data.elements.length
        }
        this.addElement(el)
      }
    })
  },

  // ========================
  // 形状操作
  // ========================
  addShape(shape = 'rect') {
    const id = 'el_' + (elementIdCounter++)
    const el = {
      id,
      type: 'shape',
      shape,
      color: this.data.textColor || '#1A2B23',
      width: 60,
      height: shape === 'circle' ? 60 : 40,
      x: this.data.printAreaWidth / 2 - 30,
      y: this.data.printAreaHeight / 2 - 20,
      rotate: 0,
      scale: 1,
      zIndex: this.data.elements.length
    }
    this.addElement(el)
  },

  // ========================
  // 贴纸
  // ========================
  stickers: ['❤️', '⭐', '🌟', '✨', '🌸', '🌿', '🦋', '🐱', '🎵', '🎨', '💎', '🌈'],

  onSelectSticker() {
    wx.showActionSheet({
      itemList: this.stickers,
      success: (res) => {
        const emoji = this.stickers[res.tapIndex]
        const id = 'el_' + (elementIdCounter++)
        const el = {
          id,
          type: 'text',
          content: emoji,
          color: '#1A2B23',
          fontSize: 36,
          x: this.data.printAreaWidth / 2 - 20,
          y: this.data.printAreaHeight / 2 - 20,
          rotate: 0,
          scale: 1,
          zIndex: this.data.elements.length
        }
        this.addElement(el)
      }
    })
  },

  // ========================
  // 模板
  // ========================
  onSelectTemplate() {
    this.setData({ showTemplateModal: true })
  },

  onCloseTemplateModal() {
    this.setData({ showTemplateModal: false })
  },

  onApplyTemplate(e) {
    const { id } = e.currentTarget.dataset
    const template = this.data.templates.find(t => t.id === id)
    if (!template) return

    // 清空现有元素，添加模板文字
    this.setData({ elements: [], selectedId: null, showTemplateModal: false })

    const textEl = {
      id: 'el_' + (elementIdCounter++),
      type: 'text',
      content: 'YOUR TEXT',
      color: '#1A2B23',
      fontSize: 20,
      fontFamily: 'Noto Sans SC',
      bold: false,
      italic: false,
      x: 20,
      y: 65,
      rotate: 0,
      scale: 1,
      zIndex: 0
    }
    this.setData({ elements: [textEl], selectedId: textEl.id, selectedElement: textEl })
    this.saveHistory()

    wx.showToast({ title: '模板已应用，点击文字编辑', icon: 'none' })
  },

  // ========================
  // 元素操作
  // ========================
  addElement(el) {
    const elements = [...this.data.elements, el]
    this.setData({ elements, selectedId: el.id, selectedElement: el })
    this.saveHistory()
  },

  onElementTouchStart(e) {
    const { id } = e.currentTarget.dataset
    const { elements } = this.data
    const el = elements.find(item => item.id === id)
    if (!el) return

    this.setData({
      selectedId: id,
      selectedElement: el,
      isDragging: true,
      dragTarget: el,
      dragOffset: {
        x: e.touches[0].clientX - el.x,
        y: e.touches[0].clientY - el.y
      }
    })
  },

  onElementTouchMove(e) {
    if (!this.data.isDragging || !this.data.dragTarget) return

    const { dragOffset, printAreaWidth, printAreaHeight } = this.data
    const touch = e.touches[0]

    let newX = touch.clientX - dragOffset.x
    let newY = touch.clientY - dragOffset.y

    // 边界约束
    newX = Math.max(0, Math.min(printAreaWidth - 20, newX))
    newY = Math.max(0, Math.min(printAreaHeight - 20, newY))

    const elements = this.data.elements.map(el =>
      el.id === this.data.dragTarget.id ? { ...el, x: newX, y: newY } : el
    )
    this.setData({ elements })
  },

  onElementTouchEnd() {
    if (this.data.isDragging) {
      this.saveHistory()
    }
    this.setData({ isDragging: false, dragTarget: null })
  },

  onDeleteElement(e) {
    const { id } = e.currentTarget.dataset
    const elements = this.data.elements.filter(el => el.id !== id)
    this.setData({ elements, selectedId: null, selectedElement: null })
    this.saveHistory()
  },

  onColorChange(e) {
    const { color } = e.currentTarget.dataset
    if (!this.data.selectedElement) return

    const elements = this.data.elements.map(el =>
      el.id === this.data.selectedId ? { ...el, color } : el
    )
    const selectedElement = { ...this.data.selectedElement, color }
    this.setData({ elements, selectedElement, textColor: color })
  },

  onFontSizeChange(e) {
    const { size } = e.currentTarget.dataset
    if (!this.data.selectedElement) return

    const elements = this.data.elements.map(el =>
      el.id === this.data.selectedId ? { ...el, fontSize: size } : el
    )
    const selectedElement = { ...this.data.selectedElement, fontSize: size }
    this.setData({ elements, selectedElement, textFontSize: size })
  },

  onRotateChange(e) {
    const rotate = e.detail.value
    if (!this.data.selectedElement) return

    const elements = this.data.elements.map(el =>
      el.id === this.data.selectedId ? { ...el, rotate } : el
    )
    const selectedElement = { ...this.data.selectedElement, rotate }
    this.setData({ elements, selectedElement })
  },

  onScaleChange(e) {
    const scale = e.detail.value / 100
    if (!this.data.selectedElement) return

    const elements = this.data.elements.map(el =>
      el.id === this.data.selectedId ? { ...el, scale } : el
    )
    const selectedElement = { ...this.data.selectedElement, scale }
    this.setData({ elements, selectedElement })
  },

  onBringForward() {
    this.changeZIndex(1)
  },

  onSendBackward() {
    this.changeZIndex(-1)
  },

  changeZIndex(delta) {
    const { elements, selectedId } = this.data
    const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex)
    const idx = sorted.findIndex(el => el.id === selectedId)
    if (idx === -1) return

    const targetIdx = Math.max(0, Math.min(sorted.length - 1, idx + delta))
    if (idx === targetIdx) return

    // 简单交换 zIndex
    const temp = sorted[idx].zIndex
    sorted[idx].zIndex = sorted[targetIdx].zIndex
    sorted[targetIdx].zIndex = temp

    this.setData({ elements: sorted })
    this.saveHistory()
  },

  // ========================
  // 历史管理（撤销/重做）
  // ========================
  saveHistory() {
    const { elements } = this.data
    const history = this.data.history.slice(0, this.data.historyIndex + 1)
    history.push(JSON.parse(JSON.stringify(elements)))

    // 限制历史栈大小
    if (history.length > 30) history.shift()

    this.setData({
      history,
      historyIndex: history.length - 1,
      canUndo: history.length > 1,
      canRedo: false
    })
  },

  onUndo() {
    if (!this.data.canUndo) return
    const newIndex = this.data.historyIndex - 1
    const elements = JSON.parse(JSON.stringify(this.data.history[newIndex]))
    this.setData({
      elements,
      historyIndex: newIndex,
      canUndo: newIndex > 0,
      canRedo: true,
      selectedId: null,
      selectedElement: null
    })
  },

  onRedo() {
    if (!this.data.canRedo) return
    const newIndex = this.data.historyIndex + 1
    const elements = JSON.parse(JSON.stringify(this.data.history[newIndex]))
    this.setData({
      elements,
      historyIndex: newIndex,
      canUndo: true,
      canRedo: newIndex < this.data.history.length - 1,
      selectedId: null,
      selectedElement: null
    })
  },

  // ========================
  // 保存/预览/下单
  // ========================
  onSave() {
    const designData = {
      elements: this.data.elements,
      specs: app.globalData.defaultSpecs,
      savedAt: Date.now()
    }
    wx.setStorageSync('currentDesign', designData)
    wx.showToast({ title: '设计已保存 ✓', icon: 'success' })
  },

  onPreview() {
    // 保存当前设计
    const designData = {
      elements: this.data.elements,
      specs: app.globalData.defaultSpecs,
      savedAt: Date.now()
    }
    wx.setStorageSync('currentDesign', designData)
    wx.navigateTo({ url: '/pages/preview/index' })
  },

  onOrder() {
    const { elements } = this.data
    if (elements.length === 0) {
      wx.showToast({ title: '请先添加设计元素', icon: 'none' })
      return
    }
    const designData = {
      elements,
      specs: app.globalData.defaultSpecs,
      savedAt: Date.now()
    }
    wx.setStorageSync('currentDesign', designData)
    wx.navigateTo({ url: '/pages/preview/index' })
  },

  onBack() {
    wx.navigateBack()
  },

  loadDesign(id) {
    // 加载示例设计数据
    const demoDesign = {
      elements: [
        {
          id: 'el_1',
          type: 'text',
          content: '袋享印',
          color: '#1A2B23',
          fontSize: 28,
          fontFamily: 'Noto Sans SC',
          x: 20,
          y: 60,
          rotate: 0,
          scale: 1,
          zIndex: 0
        }
      ],
      specs: app.globalData.defaultSpecs,
      savedAt: Date.now()
    }
    this.setData({
      elements: demoDesign.elements,
      selectedId: null,
      selectedElement: null
    })
    this.saveHistory()
  },

  onShareAppMessage() {
    return {
      title: '我设计的帆布袋 — 袋享印',
      path: '/pages/designer/index'
    }
  }
})
