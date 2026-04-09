<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const orderSuccess = ref(false)

function placeOrder() {
  orderSuccess.value = true
  setTimeout(() => {
    router.push('/')
  }, 3000)
}
</script>

<template>
  <div class="order">
    <header class="order-header">
      <button class="back-btn" @click="router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <span class="order-title">提交订单</span>
    </header>

    <div class="order-content">
      <div class="success-animation" v-if="orderSuccess">
        <div class="checkmark">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="none" stroke="#34A853" stroke-width="3"/>
            <path d="M20 32 L28 40 L44 24" fill="none" stroke="#34A853" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>订单提交成功</h2>
        <p>正在跳转支付...</p>
      </div>

      <template v-else>
        <section class="order-section">
          <h3 class="section-title">收货地址</h3>
          <div class="address-card">
            <div class="address-info">
              <div class="address-name">张三 138****8888</div>
              <div class="address-detail">广东省 深圳市 南山区 科技园南路XX号</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" stroke-width="1.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </section>

        <section class="order-section">
          <h3 class="section-title">订单信息</h3>
          <div class="order-item">
            <div class="item-image">
              <svg viewBox="0 0 60 80">
                <path fill="#E8DCC8" stroke="#C9B89E" stroke-width="0.5" d="M10 20 L10 70 Q10 75 15 75 L45 75 Q50 75 50 70 L50 20 Q50 15 45 15 L15 15 Q10 15 10 20 Z"/>
                <path fill="none" stroke="#C9B89E" stroke-width="1.5" stroke-linecap="round" d="M20 15 Q20 5 30 5 M30 15 Q30 5 40 5"/>
              </svg>
            </div>
            <div class="item-info">
              <div class="item-name">精工定制帆布袋</div>
              <div class="item-spec">纯棉帆布 · 小号 · 高清数码印</div>
              <div class="item-quantity">× 5件</div>
            </div>
            <div class="item-price">¥310.00</div>
          </div>
        </section>

        <section class="order-section">
          <h3 class="section-title">备注</h3>
          <input type="text" class="remark-input" placeholder="如有特殊需求请备注..." />
        </section>
      </template>
    </div>

    <div class="order-bar" v-if="!orderSuccess">
      <div class="total-info">
        <span class="total-label">合计</span>
        <span class="total-price">¥310.00</span>
      </div>
      <button class="submit-btn" @click="placeOrder">提交订单</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  min-height: 100vh;
  background: #FAFAFA;
  padding-bottom: 80px;
}

.order-header {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-bottom: 1px solid #EEEEEE;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  width: 36px; height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #424242;
  cursor: pointer;
  border-radius: 8px;
}

.order-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #212121;
  text-align: center;
  margin-right: 48px;
}

.order-content {
  padding: 20px;
}

.order-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.address-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #EEEEEE;
  display: flex;
  align-items: center;
  gap: 12px;
}

.address-name {
  font-size: 15px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 4px;
}

.address-detail {
  font-size: 13px;
  color: #757575;
}

.order-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #EEEEEE;
  display: flex;
  gap: 12px;
}

.item-image {
  width: 80px;
  height: 100px;
  background: linear-gradient(135deg, #F5F5F5, #EEEEEE);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 15px;
  font-weight: 500;
  color: #212121;
  margin-bottom: 4px;
}

.item-spec {
  font-size: 12px;
  color: #9E9E9E;
  margin-bottom: 8px;
}

.item-quantity {
  font-size: 13px;
  color: #757575;
}

.item-price {
  font-size: 15px;
  font-weight: 600;
  color: #212121;
}

.remark-input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  background: white;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  font-size: 14px;
  color: #212121;
  outline: none;
  transition: border-color 150ms ease-out;
  &:focus {
    border-color: #1A2B23;
  }
  &::placeholder {
    color: #BDBDBD;
  }
}

.success-animation {
  padding: 80px 20px;
  text-align: center;
}

.checkmark {
  margin-bottom: 24px;
  animation: scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-animation h2 {
  font-size: 20px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
}

.success-animation p {
  font-size: 14px;
  color: #757575;
}

.order-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding: 0 20px;
  padding-bottom: env(safe-area-inset-bottom);
  background: white;
  border-top: 1px solid #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.total-info {
  display: flex;
  flex-direction: column;
}

.total-label {
  font-size: 12px;
  color: #757575;
}

.total-price {
  font-size: 18px;
  font-weight: 700;
  color: #C9A76C;
}

.submit-btn {
  height: 44px;
  padding: 0 32px;
  background: linear-gradient(135deg, #C9A76C 0%, #D4BC8F 100%);
  border: none;
  border-radius: 8px;
  color: #1A2B23;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(201,167,108,0.3);
  transition: all 200ms ease-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(201,167,108,0.45);
  }
}
</style>
