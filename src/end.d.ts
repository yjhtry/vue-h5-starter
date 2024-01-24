/**
 * JSBridge 类型声明
 * !!以下协议不一定所有的App端都支持
 */
type EndProtocolName = keyof EndProtocolParams

type ProtocolErrorWrap<T extends object> = T & { error?: number, errorMessage?: string }

interface EndProtocolRes {
  getTopBarHeight: { statusBar: number, navBar: number }
  closeWebview: void
  getLanguage: {
    language: string // community 国家语言 'hi_IN'
  }
}

interface EndProtocolParams<T = any> {
  closeWebview: unknown
  medi_rpc: RpcParams<T>
  getLanguage?: unknown
}

interface RpcParams<T> {
  url: string
  method: 'POST' | 'GET'
  data?: T
  __useMock?: boolean
}

type ResWarp<E extends EndProtocolName, T = any> = E extends 'medi_rpc'
  ? { success?: boolean, data: T, message?: string }
  : ProtocolErrorWrap<EndProtocolRes[E]>

/**
 * @see {@link file://./hooks/useJSBridge.ts}
 * 协议调用回调在useJSBridge重写为了Promise
 */
interface JSBridge {
  /**
   * protocol 调用
   */
  call<T = any, P extends object = any, E extends EndProtocolName = 'medi_rpc'>(eventName: E, data?: EndProtocolParams<P>[E]): Promise<ResWarp<E, T>>
}

interface Window {
  JSBridge: JSBridge
}
