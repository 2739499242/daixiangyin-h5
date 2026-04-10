# 袋享印 · 后端 API 服务

帆布袋DIY定制平台的 Node.js + Express 后端 API，支持微信登录、微信支付、COS文件存储。

## 技术栈

- **Runtime**: Node.js 18+
- **Framework**: Express 4
- **Database**: PostgreSQL 15
- **文件存储**: 腾讯云 COS
- **支付**: 微信支付 V3 API
- **部署**: Docker + Docker Compose

## API 接口一览

### 用户 & 认证

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/wechat/login` | 微信小程序登录 |
| POST | `/api/wechat/pay/unified-order` | 微信支付统一下单 |
| GET | `/api/wechat/pay/sign` | 获取JSAPI调起签名 |

### 设计方案

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/designs` | 创建设计方案 |
| GET | `/api/designs` | 设计方案列表 |
| GET | `/api/designs/:id` | 获取设计方案 |
| PUT | `/api/designs/:id` | 更新设计方案 |
| DELETE | `/api/designs/:id` | 删除设计方案 |

### 订单

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/orders` | 创建订单 |
| GET | `/api/orders` | 订单列表 |
| GET | `/api/orders/:id` | 订单详情 |
| PATCH | `/api/orders/:id/status` | 更新订单状态（工厂回调）|
| GET | `/api/orders/:id/logistics` | 物流查询 |

### 文件上传

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/upload/image` | 单张图片上传 |
| POST | `/api/upload/images` | 批量图片上传 |

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填写真实配置
```

### 3. 数据库迁移

```bash
# 方式A：本地数据库（需先安装PostgreSQL）
npm run migrate

# 方式B：Docker 一键启动
docker-compose up -d
```

### 4. 启动服务

```bash
# 开发环境
npm run dev

# 生产环境
npm start
```

## 价格计算规则

| 规格 | 说明 | 价格 |
|------|------|------|
| S码 | 30×35cm | 单面¥35 / 双面¥55 |
| M码 | 35×40cm | 单面¥45 / 双面¥65 |
| L码 | 40×45cm | 单面¥55 / 双面¥75 |
| 棉麻材质 | | +¥10 |
| 有机棉 | | +¥20 |
| 长柄（斜挎）| | +¥5 |
| 批量≥5件 | | 9折 |
| 批量≥10件 | | 8折 |

## 微信支付接入说明

1. 在微信商户平台申请 V3 API 证书
2. 将私钥配置到 `WX_PRIVATE_KEY`
3. 配置支付回调地址 `${API_BASE}/api/wechat/pay/notify`

## 部署到生产

```bash
# Railway 部署
railway login
railway init
railway up

# 或使用 Docker
docker build -t daixiangyin-api .
docker run -d -p 3000:3000 --env-file .env daixiangyin-api
```
