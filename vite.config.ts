/// <reference types="vitest" />

import path from 'node:path'
import process from 'node:process'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import VueDevTools from 'vite-plugin-vue-devtools'

// import eruda from 'vite-plugin-eruda'

export default defineConfig(({ mode }) => {
  const { VITE_USE_DEV_MOCK, VITE_BASE_URL } = loadEnv(mode, process.cwd())
  const plugins = [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
          '@vee-validate/yup': ['toTypedSchema'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
        './src/hooks',
        './src/utils',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
    // eruda(),
  ]
  if (VITE_USE_DEV_MOCK === 'true')
    plugins.push(mockDevServerPlugin())

  return ({
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins,
    server: {
      proxy: {
        '^/medi_rpc': '',
      },
    },
    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '~/styles/mixin.scss' as *;`,
        },
      },
    },
  })
})
