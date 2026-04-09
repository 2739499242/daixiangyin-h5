<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  { id: 'free', name: '自由创作', icon: 'pencil' },
  { id: 'photo', name: '照片定制', icon: 'image' },
  { id: 'team', name: '企业团建', icon: 'users' },
  { id: 'bulk', name: '批量定制', icon: 'package' },
]

const cases = ref([
  { id: 1, title: '山间清晨', price: 69, tag: '文艺风' },
  { id: 2, title: '几何韵律', price: 59, tag: '简约风' },
  { id: 3, title: '城市线条', price: 79, tag: '潮流风' },
  { id: 4, title: '个性标语', price: 49, tag: '文字风' },
])

function goToDesigner() {
  router.push('/designer')
}
</script>

<template>
  <div class="home">
    <!-- AppBar -->
    <header class="app-bar">
      <div class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6h12l1 14H5L6 6z"/>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </div>
        <span>袋享印</span>
      </div>
      <div class="app-bar-right">
        <button class="icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <div class="avatar"></div>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        精工定制 · 品质随行
      </div>
      <h1 class="hero-title">精工定制<br/>品味随行</h1>
      <p class="hero-subtitle">1件起订 · 72小时交付 · 原创设计</p>
      <button class="btn-primary" @click="goToDesigner">开始定制</button>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">定制分类</h2>
        <a href="#" class="section-link">查看全部 →</a>
      </div>
      <div class="categories-grid">
        <div v-for="cat in categories" :key="cat.id" class="category-card" @click="goToDesigner">
          <div class="category-icon">
            <svg v-if="cat.icon === 'pencil'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
            </svg>
            <svg v-else-if="cat.icon === 'image'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <svg v-else-if="cat.icon === 'users'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/>
              <path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/>
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
              <path d="M18 12a2 2 0 000 4h4v-4h-4z"/>
            </svg>
          </div>
          <span class="category-name">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- Cases -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">精选案例</h2>
        <a href="#" class="section-link">更多灵感 →</a>
      </div>
    </section>
    <div class="cases-scroll">
      <div v-for="item in cases" :key="item.id" class="case-card" @click="goToDesigner">
        <div class="case-image">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="20" y="15" width="60" height="75" rx="3" stroke-dasharray="4 2"/>
            <path d="M30 10 Q50 0 70 10" stroke-linecap="round"/>
            <rect x="30" y="35" width="40" height="35" fill="#E8EFEA" stroke="none"/>
          </svg>
          <span class="case-tag">{{ item.tag }}</span>
        </div>
        <div class="case-info">
          <div class="case-title">{{ item.title }}</div>
          <div class="case-price">¥{{ item.price }} 起</div>
        </div>
      </div>
    </div>

    <!-- Bottom Nav -->
    <nav class="bottom-nav">
      <div class="nav-item active">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="nav-label">首页</span>
      </div>
      <div class="nav-item" @click="goToDesigner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        </svg>
        <span class="nav-label">设计</span>
      </div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
        <span class="nav-label">订单</span>
      </div>
      <div class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span class="nav-label">我的</span>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/main.scss';

.home {
  min-height: 100vh;
  padding-bottom: 80px;
}

.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid $color-gray-200;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: $color-gray-900;
  letter-spacing: -0.02em;
}

.logo-icon {
  width: 28px;
  height: 28px;
  background: $color-primary;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  svg { width: 16px; height: 16px; color: white; }
}

.app-bar-right { display: flex; align-items: center; gap: 16px; }

.icon-btn {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border-radius: $radius-full;
  background: transparent;
  color: $color-gray-600;
  transition: all 150ms ease-out;
  &:hover { background: $color-gray-100; color: $color-gray-900; }
}

.avatar {
  width: 32px; height: 32px;
  border-radius: $radius-full;
  background: linear-gradient(135deg, $color-accent, $color-accent-light);
}

.hero {
  margin-top: 56px;
  min-height: 55vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: $color-white;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: $color-accent-pale;
  color: $color-accent;
  font-size: 12px;
  font-weight: 500;
  border-radius: $radius-full;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: $color-gray-900;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 15px;
  color: $color-gray-600;
  margin-bottom: 32px;
}

.btn-primary {
  height: 48px;
  padding: 0 32px;
  background: linear-gradient(135deg, $color-accent 0%, $color-accent-light 100%);
  color: $color-primary;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all 200ms ease-out;
  box-shadow: 0 4px 16px rgba($color-accent, 0.3);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba($color-accent, 0.4);
  }
}

.section {
  padding: 32px 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: $color-gray-900;
}

.section-link {
  font-size: 13px;
  color: $color-gray-500;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.category-card {
  background: $color-white;
  border-radius: $radius-lg;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border: 1px solid $color-gray-200;
  cursor: pointer;
  transition: all 200ms ease-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
    border-color: $color-gray-300;
  }
}

.category-icon {
  width: 48px; height: 48px;
  background: $color-primary-pale;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-primary;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: $color-gray-800;
}

.cases-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 20px 16px;
  margin: 0 -20px;
}

.case-card {
  flex-shrink: 0;
  width: 180px;
  background: $color-white;
  border-radius: $radius-lg;
  overflow: hidden;
  border: 1px solid $color-gray-200;
  cursor: pointer;
  transition: all 200ms ease-out;
  &:hover { transform: translateY(-4px); box-shadow: $shadow-lg; }
}

.case-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, $color-gray-100, $color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.case-tag {
  position: absolute;
  top: 8px; left: 8px;
  padding: 4px 8px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border-radius: $radius-sm;
  font-size: 10px;
  font-weight: 500;
  color: $color-gray-700;
}

.case-info { padding: 12px; }

.case-title {
  font-size: 13px;
  font-weight: 500;
  color: $color-gray-800;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.case-price {
  font-size: 14px;
  font-weight: 600;
  color: $color-accent;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(64px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid $color-gray-200;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  color: $color-gray-400;
  cursor: pointer;
  transition: color 150ms ease-out;
  &.active { color: $color-primary; }
  svg { width: 24px; height: 24px; }
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
