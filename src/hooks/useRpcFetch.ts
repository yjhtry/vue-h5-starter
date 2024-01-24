import type { MaybeComputedRef } from '@vueuse/head'

export function useRpcFetch<T, U extends RpcParams<any> = RpcParams<any>>(path: MaybeComputedRef<string>, { params }: { params: U }) {
  const loading = ref(false)
  const data = ref<T>()
  const error = ref('')

  const toFetch = () => {
    const url = toValue(path)

    loading.value = true

    window.JSBridge.call<T>('medi_rpc', { ...params, url })
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
