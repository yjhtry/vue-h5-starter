import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import type { UserModule } from './types'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  let message = ''
  if (err instanceof Error)
    message = err.message

  console.error(`Component error[${instance?.$options.name}]:  error is ${message} info: ${info}`)
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})
app.use(router)

Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach((i) => {
    i.install?.({ app })
  })

app.mount('#app')
