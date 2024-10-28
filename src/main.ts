import type { UserModule } from './types'
import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const head = createHead()

app.config.errorHandler = (err, instance, info) => {
  let message = ''
  if (err instanceof Error)
    message = err.message

  console.error(`Component error[${instance?.$options.name}]:  error is ${message} info: ${info}`)
}

const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

app.use(router)
app.use(head)

Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach((i) => {
    i.install?.({ app })
  })

app.mount('#app')
