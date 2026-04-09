/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_WECHAT_APP_ID: string
  readonly VITE_TENCENT_CLOUD_SECRET_ID: string
  readonly VITE_TENCENT_CLOUD_SECRET_KEY: string
  readonly VITE_TENCENT_CLOUD_REGION: string
  readonly VITE_AI_SERVICE: string
  readonly VITE_AI_MODEL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_ERROR_REPORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
