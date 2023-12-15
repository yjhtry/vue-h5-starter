import type { MaybeComputedRef } from '@vueuse/head'

type _RpcParams = Omit<RpcParams<any>, 'operationUrl'>

export function useRpcFetch<T, U extends _RpcParams = _RpcParams>(url: MaybeComputedRef<string>, { params }: { params: U }) {
  const loading = ref(false)
  const data = ref<T>()
  const error = ref('')

  const toFetch = () => {
    const operationUrl = toValue(url)

    loading.value = true

    window.JSBridge.call<T>('medi_rpc', { operationUrl, ...params })
      .then((res) => {
        invariant(!res.success, res.message || 'fetch error')

        data.value = res.data
      })
      .catch(err => error.value = err.message)
      .finally(() => loading.value = false)
  }

  watchEffect(() => {
    toFetch()
  })

  return { loading, data, error }
}
