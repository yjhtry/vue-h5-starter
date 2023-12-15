import type { Interceptor } from './type'

export function noop() {}

interface CallInterceptorParams {
  args?: unknown[]
  done: () => void
  canceled?: () => void
  error?: (e: unknown) => void
}

export async function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled,
    error,
  }: CallInterceptorParams,
) {
  if (!interceptor) {
    done()
  }
  else {
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args)

    if (returnVal instanceof Promise) {
      const value = await returnVal.catch(error || noop)

      if (value)
        done()
      else if (canceled)
        canceled()
    }
    else {
      if (returnVal)
        done()

      else if (canceled)
        canceled()
    }
  }
}
