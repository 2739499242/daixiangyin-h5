<script setup lang="ts">
</script>

<template>
  <div class="profile">
    <header class="profile-header">
      <div class="profile-info">
        <div class="avatar"></div>
        <div class="user-info">
          <div class="user-name">游客用户</div>
          <div class="user-id">ID: 888888</div>
        </div>
      </div>
    </header>

    <section class="menu-section">
      <div class="menu-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
        </svg>
        <span>我的订单</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" stroke-width="1.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="menu-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        <span>我的设计</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" stroke-width="1.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="menu-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
        </svg>
        <span>我的收藏</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" stroke-width="1.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </section>

    <section class="menu-section">
      <div class="menu-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
        <span>设置</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" stroke-width="1.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="menu-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>帮助与反馈</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" stroke-width="1.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </section>

    <nav class="bottom-nav">
      <div class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="nav-label">首页</span>
      </div>
      <div class="nav-item">
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
      <div class="nav-item active">
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
.profile {
  min-height: 100vh;
  padding-bottom: 80px;
  background: #FAFAFA;
}

.profile-header {
  background: linear-gradient(135deg, #1A2B23 0%, #2D4A3C 100%);
  padding: 48px 20px 32px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C9A76C, #D4BC8F);
  border: 3px solid rgba(255,255,255,0.2);
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.user-id {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
}

.menu-section {
  background: white;
  margin: 16px;
  border-radius: 12px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  color: #424242;
  border-bottom: 1px solid #EEEEEE;
  &:last-child { border-bottom: none; }
  svg:first-child { color: #757575; }
  span { flex: 1; font-size: 15px; }
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
  border-top: 1px solid #EEEEEE;
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
  color: #BDBDBD;
  &.active { color: #1A2B23; }
  svg { width: 24px; height: 24px; }
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
