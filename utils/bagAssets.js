/**
 * 帆布袋 SVG 背景图
 * 用于设计器预览区展示
 */

module.exports = {
  // 正面 SVG（带手柄）
  bagFront: `data:image/svg+xml;base64,${Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
      <!-- 袋子主体 -->
      <rect x="20" y="60" width="160" height="200" rx="12" fill="#E8DCC8" stroke="#C9B89E" stroke-width="2"/>
      <!-- 内部阴影 -->
      <rect x="24" y="64" width="152" height="192" rx="10" fill="none" stroke="#C9B89E" stroke-width="1" opacity="0.3"/>
      <!-- 顶部双线 -->
      <rect x="20" y="50" width="160" height="10" rx="5" fill="#D4C4B0"/>
      <!-- 左手柄 -->
      <path d="M50 55 Q50 20 70 20 Q90 20 90 55" fill="none" stroke="#C9B89E" stroke-width="8" stroke-linecap="round"/>
      <!-- 右手柄 -->
      <path d="M110 55 Q110 20 130 20 Q150 20 150 55" fill="none" stroke="#C9B89E" stroke-width="8" stroke-linecap="round"/>
      <!-- 底部阴影 -->
      <ellipse cx="100" cy="258" rx="70" ry="6" fill="rgba(0,0,0,0.06)"/>
    </svg>
  `).toString('base64')}`,

  // 背面 SVG
  bagBack: `data:image/svg+xml;base64,${Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
      <rect x="20" y="60" width="160" height="200" rx="12" fill="#D4C4B0" stroke="#C9B89E" stroke-width="2"/>
      <rect x="20" y="50" width="160" height="10" rx="5" fill="#C9B49A"/>
      <path d="M50 55 Q50 20 70 20 Q90 20 90 55" fill="none" stroke="#C9B89E" stroke-width="8" stroke-linecap="round"/>
      <path d="M110 55 Q110 20 130 20 Q150 20 150 55" fill="none" stroke="#C9B89E" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="100" cy="258" rx="70" ry="6" fill="rgba(0,0,0,0.06)"/>
    </svg>
  `).toString('base64')}`
}
