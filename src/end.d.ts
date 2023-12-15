/**
 * JSBridge 类型声明
 * !!以下协议不一定所有的App端都支持
 */
type EndProtocolName = keyof EndProtocolRes

type EndApiName = keyof EndApiRes

type ProtocolErrorWrap<T extends object> = T & { error?: number, errorMessage?: string }

type NotImplEventName = 'userInfo' | 'getCountry' | 'fetchFont' | 'userEvent' | 'useTodoCode'

// TODO 处理每种协议的返回类型
interface EndProtocolRes {
  getTopBarHeight: { statusBar: number, navBar: number }
  getLanguage: {
    language: string // community 国家语言 'hi_IN'
  }
}

interface EndProtocolParams {
  getTopBarHeight: unknown
  getLanguage?: unknown
}

// TODO 处理每种端内api的返回类型
interface EndApiRes {
  closeWebview: void
}

// TODO 处理每种端内api的参数
interface EndApiParams {
  closeWebview: unknown
}

interface RpcParams<T> {
  url: string
  method: 'POST' | 'GET'
  data?: T
  __useMock?: boolean
}

/**
 * @see {@link file://./hooks/useJSBridge.ts}
 * 协议调用回调在useJSBridge重写为了Promise
 */
interface EndCall {
  /**
   * !! master 未实现的方法调用
   *  这些方法可能爱他app实现 或者更高的mater app版本实现 具体需要开发者测试
   */
  <E extends NotImplEventName>(eventName: E): Promise<{ error: 1, errorMessage: 'not implemented!' }>
  /**
   * protocol 调用
   */
  <E extends EndProtocolName>(eventName: E, data?: EndProtocolParams[E]): Promise<ProtocolErrorWrap<EndProtocolRes[E]>>
  /**
   * end api 调用
   */
  <E extends EndApiName>(eventName: E, data?: EndApiParams[E]): Promise<EndApiRes[E]>
  /**
   * rpc 调用
   */
  <T, U extends object = any>(eventName: 'medi_rpc', data: RpcParams<U>): Promise<{ success?: boolean, data: T, message?: string }>
}

interface JSBridge {
  call: EndCall
}

interface Window {
  JSBridge: JSBridge
}
