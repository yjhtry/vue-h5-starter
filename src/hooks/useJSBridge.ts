import { ref } from 'vue'
import { JSBridge_CALL_TIMEOUT } from '~/const'
import { SKIP_END_CONTEXT } from '~/env'

let isInitd = false
const isMockEnabled = import.meta.env.VITE_USE_DEV_MOCK === 'true'

/**
 * 加载和重写端内的JSBridge
 */
export function useJSBridge() {
  const ready = ref(!!window.JSBridge || SKIP_END_CONTEXT)

  function handleJSBridgeReady() {
    ready.value = true
  }

  if (!ready.value)
    window.document.addEventListener('JSBridgeReady', handleJSBridgeReady)

  // 当在非端内环境使用mock数据进行开发
  if (SKIP_END_CONTEXT && !window.JSBridge?.call)
    window.JSBridge = { call: () => { } } as any

  // 重写 JSBridge.call 将回调形式统一修改成 Promise
  if (ready.value && !isInitd) {
    isInitd = true
    const originCall = window.JSBridge.call.bind(window.JSBridge) as any

    window.JSBridge.call = ((...args: any) => {
      const [eventName, params] = args
      const isRpc = eventName === 'medi_rpc'

      // 处理需要mock 的medi_rpc调用
      if (isMockEnabled && isRpc && params?.__useMock)
        return mockFetch(params)

      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          throw new Error('Time out')
        }, JSBridge_CALL_TIMEOUT)

        try {
          originCall(...args, (res: any) => {
            clearTimeout(timer)
            if (isRpc)
              res = safeJsonParse(res?.data) || { success: false }

            resolve(res)
          })
        }
        catch (error) {
          clearTimeout(timer)
          reject(error)
        }
      })
    }) as any
  }

  onScopeDispose(() => {
    window.document.removeEventListener('JSBridgeReady', handleJSBridgeReady)
  })

  return { ready }
}

/**
 * mock JSBridge.call('medi_rpc') 保证输入和输出兼容
 */
async function mockFetch(params: RpcParams<any>) {
  try {
    const { method, url, data } = params
    const requestConfig = { method } as RequestInit
    let finalUrl = `/medi_rpc/${url.startsWith('/') ? url.slice(1) : url}`

    if (method === 'POST') {
      requestConfig.body = JSON.stringify(data)
    }
    else if (method === 'GET') {
      const queryString = new URLSearchParams(data).toString()
      finalUrl += `${url.includes('?') ? '&' : '?'}${queryString}`
    }

    const res = await fetch(finalUrl, requestConfig)

    invariant(res.ok, res.statusText)

    const json = await res.json()

    return { data: json }
  }
  catch (error) {
    return { success: false, message: (error as any).message }
  }
}
