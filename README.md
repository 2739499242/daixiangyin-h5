# 袋享印 H5 前端项目

精工定制帆布袋在线设计平台前端项目，基于 Vue 3 + TypeScript + Vite 构建。

## 技术栈

- **框架**: Vue 3.4 + Composition API
- **语言**: TypeScript 5.4
- **构建**: Vite 5.2
- **路由**: Vue Router 4
- **状态**: Pinia 2
- **样式**: SCSS
- **画布**: Fabric.js 5

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 测试
pnpm test

# 构建
pnpm build
```

## 项目结构

```
frontend/
├── src/
│   ├── assets/       # 静态资源
│   ├── components/   # 公共组件
│   ├── views/        # 页面组件
│   ├── stores/       # Pinia 状态管理
│   ├── api/          # API 接口
│   ├── utils/        # 工具函数
│   ├── styles/       # 全局样式
│   ├── router/       # 路由配置
│   ├── App.vue       # 根组件
│   └── main.ts       # 入口文件
├── public/           # 静态资源
├── .github/          # GitHub 配置
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并配置相关环境变量。

## CI/CD

项目使用 GitHub Actions 进行持续集成和部署：

- **main 分支**: 自动部署到生产环境
- **develop 分支**: 自动部署到预发布环境
- **PR**: 自动部署预览版本

需要配置以下 Secrets：
- `VERCEL_TOKEN`: Vercel 访问令牌
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: Vercel 项目 ID

## License

MIT
