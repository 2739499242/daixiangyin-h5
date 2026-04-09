<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeView = ref('front')

const options = {
  size: [
    { label: '小号 25×30cm', value: 'S' },
    { label: '中号 30×35cm', value: 'M' },
    { label: '大号 35×40cm', value: 'L' },
  ],
  material: [
    { label: '纯棉帆布', value: 'cotton' },
    { label: '棉麻混纺', value: 'linen' },
    { label: '厚实帆布', value: 'thick' },
  ],
  print: [
    { label: '高清数码印', value: 'digital' },
    { label: '丝网印刷', value: 'screen' },
    { label: '烫金烫银', value: 'foil' },
  ],
  quantity: [
    { label: '1件', value: 1 },
    { label: '5件', value: 5 },
    { label: '10件', value: 10 },
    { label: '50件+', value: 50 },
  ],
}

const selected = ref({
  size: 'S',
  material: 'cotton',
  print: 'digital',
  quantity: 5,
})

const price = ref({
  base: 245,
  print: 50,
  shipping: 15,
})

const total = computed(() => price.value.base + price.value.print + price.value.shipping)

import { computed } from 'vue'

function goBack() {
  router.push('/designer')
}

function placeOrder() {
  router.push('/order')
}
</script>

<template>
  <div class="preview">
    <header class="preview-header">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <span class="preview-title">确认订单</span>
    </header>

    <section class="product-showcase">
      <div class="product-image">
        <svg class="product-bag" viewBox="0 0 120 160">
          <path fill="#E8DCC8" stroke="#C9B89E" stroke-width="1" d="M15 35 L15 145 Q15 155 25 155 L95 155 Q105 155 105 145 L105 35 Q105 25 95 25 L25 25 Q15 25 15 35 Z"/>
          <path fill="none" stroke="#C9B89E" stroke-width="3" stroke-linecap="round" d="M35 35 Q35 10 55 10 M65 35 Q65 10 85 10"/>
          <rect x="25" y="50" width="70" height="70" fill="#E8EFEA" stroke="none" rx="2"/>
        </svg>
      </div>
      <div class="view-toggle">
        <button
          class="view-tab"
          :class="{ active: activeView === 'front' }"
          @click="activeView = 'front'"
        >正面</button>
        <button
          class="view-tab"
          :class="{ active: activeView === 'back' }"
          @click="activeView = 'back'"
        >背面</button>
      </div>
    </section>

    <section class="options-section">
      <div class="option-group">
        <div class="option-label">尺寸规格</div>
        <div class="option-chips">
          <button
            v-for="opt in options.size"
            :key="opt.value"
            class="option-chip"
            :class="{ active: selected.size === opt.value }"
            @click="selected.size = opt.value"
          >{{ opt.label }}</button>
        </div>
      </div>

      <div class="option-group">
        <div class="option-label">材质面料</div>
        <div class="option-chips">
          <button
            v-for="opt in options.material"
            :key="opt.value"
            class="option-chip"
            :class="{ active: selected.material === opt.value }"
            @click="selected.material = opt.value"
          >{{ opt.label }}</button>
        </div>
      </div>

      <div class="option-group">
        <div class="option-label">印刷工艺</div>
        <div class="option-chips">
          <button
            v-for="opt in options.print"
            :key="opt.value"
            class="option-chip"
            :class="{ active: selected.print === opt.value }"
            @click="selected.print = opt.value"
          >{{ opt.label }}</button>
        </div>
      </div>

      <div class="option-group">
        <div class="option-label">定制数量</div>
        <div class="option-chips">
          <button
            v-for="opt in options.quantity"
            :key="opt.value"
            class="option-chip"
            :class="{ active: selected.quantity === opt.value }"
            @click="selected.quantity = opt.value"
          >{{ opt.label }}</button>
        </div>
      </div>
    </section>

    <div class="price-summary">
      <div class="price-row">
        <span>纯棉帆布 · 小号 × {{ selected.quantity }}件</span>
        <span>¥{{ price.base.toFixed(2) }}</span>
      </div>
      <div class="price-row">
        <span>印刷费</span>
        <span>¥{{ price.print.toFixed(2) }}</span>
      </div>
      <div class="price-row">
        <span>运费</span>
        <span>¥{{ price.shipping.toFixed(2) }}</span>
      </div>
      <div class="price-row total">
        <span>应付总额</span>
        <span class="price-total">¥{{ total.toFixed(2) }}</span>
      </div>
    </div>

    <div style="height: 20px"></div>

    <div class="order-bar">
      <button class="order-btn" @click="placeOrder">
        确认下单 · ¥{{ total.toFixed(2) }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  min-height: 100vh;
  background: #FAFAFA;
  padding-bottom: 100px;
}

.preview-header {
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

.preview-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #212121;
  text-align: center;
  margin-right: 48px;
}

.product-showcase {
  background: white;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  width: 240px;
  height: 300px;
  background: linear-gradient(135deg, #F5F5F5, #EEEEEE);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.product-bag {
  width: 180px;
  height: 230px;
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-tab {
  padding: 8px 20px;
  background: #F5F5F5;
  border: none;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  color: #757575;
  cursor: pointer;
  transition: all 150ms ease-out;
  &.active {
    background: #1A2B23;
    color: white;
  }
}

.options-section {
  padding: 24px 20px;
}

.option-group {
  margin-bottom: 24px;
}

.option-label {
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 12px;
}

.option-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-chip {
  padding: 10px 16px;
  background: white;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  font-size: 14px;
  color: #616161;
  cursor: pointer;
  transition: all 150ms ease-out;
  &:hover { border-color: #E0E0E0; }
  &.active {
    background: #E8EFEA;
    border-color: #1A2B23;
    color: #1A2B23;
    font-weight: 500;
  }
}

.price-summary {
  background: white;
  padding: 20px;
  margin: 0 20px;
  border-radius: 12px;
  border: 1px solid #EEEEEE;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #757575;
  &.total {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid #EEEEEE;
  }
}

.price-total {
  font-size: 20px;
  font-weight: 700;
  color: #C9A76C;
}

.order-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  background: white;
  border-top: 1px solid #EEEEEE;
  z-index: 100;
}

.order-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #C9A76C 0%, #D4BC8F 100%);
  border: none;
  border-radius: 12px;
  color: #1A2B23;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(201,167,108,0.35);
  transition: all 200ms ease-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(201,167,108,0.45);
  }
}
</style>
