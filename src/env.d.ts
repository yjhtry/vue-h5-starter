/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_DEV_MOCK: 'true' | 'false'
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
