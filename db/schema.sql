-- =====================================================
-- 袋享印 · 数据库 Schema（PostgreSQL）
-- =====================================================

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    openid        VARCHAR(128) UNIQUE NOT NULL,         -- 微信 openid
    unionid       VARCHAR(128) UNIQUE,
    nickname      VARCHAR(64),
    avatar_url    VARCHAR(512),
    phone         VARCHAR(20) UNIQUE,
    gender        SMALLINT DEFAULT 0,                   -- 0未知 1男 2女
    country       VARCHAR(64),
    province      VARCHAR(64),
    city          VARCHAR(64),
    is_business   BOOLEAN DEFAULT FALSE,                -- B端用户
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 收货地址表
CREATE TABLE IF NOT EXISTS addresses (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name          VARCHAR(64) NOT NULL,
    phone         VARCHAR(20) NOT NULL,
    province      VARCHAR(64) NOT NULL,
    city          VARCHAR(64) NOT NULL,
    district      VARCHAR(64),
    detail        VARCHAR(256) NOT NULL,
    is_default    BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 设计方案表
CREATE TABLE IF NOT EXISTS designs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name          VARCHAR(128) NOT NULL,
    data_json     JSONB NOT NULL,                       -- Fabric.js 画布数据
    thumbnail_url VARCHAR(512),
    is_public     BOOLEAN DEFAULT FALSE,               -- 是否公开分享
    likes_count   INT DEFAULT 0,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id),
    design_id           UUID REFERENCES designs(id),
    specs_json          JSONB NOT NULL,                -- 规格数据
    quantity            INT NOT NULL,
    unit_price          DECIMAL(10, 2) NOT NULL,
    total_price         DECIMAL(10, 2) NOT NULL,
    status              VARCHAR(32) DEFAULT 'pending', -- pending/paid/confirmed/producing/shipped/delivered/cancelled
    payment_id          VARCHAR(128),                   -- 微信支付单号
    address_json        JSONB,                         -- 收货地址
    remark              VARCHAR(512),
    logistics_company   VARCHAR(64),
    tracking_number      VARCHAR(64),
    shipped_at          TIMESTAMP,
    delivered_at        TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 优惠券表
CREATE TABLE IF NOT EXISTS coupons (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID REFERENCES users(id),
    type          VARCHAR(16) NOT NULL,               -- cash满减 / discount折扣
    value         DECIMAL(10, 2) NOT NULL,            -- 满减金额或折扣率
    min_amount    DECIMAL(10, 2) DEFAULT 0,
    code          VARCHAR(32) UNIQUE,
    used_at       TIMESTAMP,
    expired_at    TIMESTAMP NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 支付记录表
CREATE TABLE IF NOT EXISTS payment_logs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id      UUID REFERENCES orders(id),
    payment_id    VARCHAR(128) UNIQUE NOT NULL,
    trade_type    VARCHAR(32),
    total_fee     INT,
    cash_fee      INT,
    trade_state   VARCHAR(32),
    bank_type     VARCHAR(32),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 索引
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_designs_user_id ON designs(user_id);
CREATE INDEX IF NOT EXISTS idx_designs_created_at ON designs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);

-- =====================================================
-- 自动更新 updated_at 触发器
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_designs_updated_at BEFORE UPDATE ON designs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
