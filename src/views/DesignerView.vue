<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDesignerStore } from '@/stores/designer'

const router = useRouter()
const store = useDesignerStore()

const activeTool = ref('text')
const activeColor = ref('#1A2B23')

const tools = [
  { id: 'text', name: '文字', icon: 'type' },
  { id: 'image', name: '图片', icon: 'image' },
  { id: 'shape', name: '形状', icon: 'square' },
  { id: 'sticker', name: '贴纸', icon: 'star' },
  { id: 'template', name: '模板', icon: 'layout' },
]

const colors = [
  '#1A2B23', '#C9A76C', '#4285F4', '#EA4335',
  '#34A853', '#9E9E9E', '#212121', '#FFFFFF',
]

function selectTool(id: string) {
  activeTool.value = id
}

function selectColor(color: string) {
  activeColor.value = color
}

function goBack() {
  router.push('/')
}

function goPreview() {
  router.push('/preview')
}
</script>

<template>
  <div class="designer">
    <!-- Header -->
    <header class="designer-header">
      <div class="header-left">
        <button class="header-btn" @click="goBack">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回
        </button>
      </div>
      <span class="header-title">设计 #001</span>
      <div class="header-right">
        <button class="header-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          保存
        </button>
      </div>
    </header>

    <!-- Canvas Area -->
    <div class="canvas-area">
      <!-- Toolbar -->
      <div class="toolbar">
        <button
          v-for="tool in tools"
          :key="tool.id"
          class="tool-btn"
          :class="{ active: activeTool === tool.id }"
          @click="selectTool(tool.id)"
          :title="tool.name"
        >
          <svg v-if="tool.icon === 'type'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
          </svg>
          <svg v-else-if="tool.icon === 'image'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <svg v-else-if="tool.icon === 'square'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
          <svg v-else-if="tool.icon === 'star'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>
      </div>

      <!-- Canvas -->
      <div class="canvas-container">
        <div class="canvas-wrapper">
          <div class="bag-body">
            <svg class="bag-svg" viewBox="0 0 120 160">
              <path fill="#E8DCC8" stroke="#C9B89E" stroke-width="1" d="M15 35 L15 145 Q15 155 25 155 L95 155 Q105 155 105 145 L105 35 Q105 25 95 25 L25 25 Q15 25 15 35 Z"/>
              <path fill="none" stroke="#C9B89E" stroke-width="3" stroke-linecap="round" d="M35 35 Q35 10 55 10 M65 35 Q65 10 85 10"/>
              <rect x="25" y="50" width="70" height="70" fill="none" stroke="rgba(201,167,108,0.5)" stroke-width="1" stroke-dasharray="4 2" rx="2"/>
            </svg>
            <div class="print-area">点击添加设计</div>
          </div>
        </div>
      </div>

      <!-- Panel -->
      <div class="panel">
        <div class="panel-section">
          <div class="panel-label">颜色</div>
          <div class="color-swatches">
            <button
              v-for="color in colors"
              :key="color"
              class="color-swatch"
              :class="{ active: activeColor === color }"
              :style="{ background: color }"
              @click="selectColor(color)"
            ></button>
          </div>
        </div>
        <div class="panel-section">
          <div class="panel-label">字体</div>
          <div class="font-preview">思源黑体</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="designer-footer">
      <button class="footer-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        模板
      </button>
      <button class="footer-btn" @click="goPreview">预览效果</button>
      <button class="footer-cta" @click="goPreview">立即下单</button>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.designer {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  background: #0D1510;
}

.designer-header {
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1A2B23;
  flex-shrink: 0;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.header-btn {
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  border-radius: 8px;
  transition: all 150ms ease-out;
  &:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }
}

.header-title {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.canvas-area {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}

.toolbar {
  width: 56px;
  background: #1A2B23;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  width: 44px; height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  border-radius: 8px;
  transition: all 150ms ease-out;
  &:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }
  &.active {
    background: rgba(255,255,255,0.15);
    color: #C9A76C;
  }
}

.canvas-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-wrapper {
  width: 300px;
  height: 380px;
  background: #1A2B23;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  overflow: hidden;
}

.bag-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #D4C8B8 0%, #C9BBA5 100%);
  position: relative;
}

.bag-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 280px;
}

.print-area {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 160px;
  border: 2px dashed rgba(201,167,108,0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(201,167,108,0.7);
}

.panel {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 140px;
  background: rgba(26,43,35,0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255,255,255,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-section {
  margin-bottom: 8px;
}

.panel-label {
  font-size: 10px;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.color-swatches {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.color-swatch {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 150ms ease-out;
  &:hover { transform: scale(1.1); }
  &.active { border-color: white; }
}

.font-preview {
  padding: 8px 12px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  font-size: 13px;
  color: white;
}

.designer-footer {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-top: 1px solid #EEEEEE;
  flex-shrink: 0;
}

.footer-btn {
  height: 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F5F5F5;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  color: #424242;
  font-size: 14px;
  font-weight: 500;
  transition: all 150ms ease-out;
  &:hover { background: #EEEEEE; }
}

.footer-cta {
  height: 44px;
  padding: 0 28px;
  background: linear-gradient(135deg, #C9A76C 0%, #D4BC8F 100%);
  border: none;
  border-radius: 8px;
  color: #1A2B23;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(201,167,108,0.3);
  transition: all 200ms ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(201,167,108,0.4);
  }
}
</style>
