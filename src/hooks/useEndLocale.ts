import { ref } from 'vue'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'
import { endLang } from '~/store'

/**
 * 获取端内用户使用的国家语言
 */
export function useEndLocale(JSBridgeReady: Ref<boolean>) {
  const ready = ref(false)

  watch(JSBridgeReady, async () => {
    if (JSBridgeReady.value) {
      try {
        const { language, error, errorMessage } = await window.JSBridge.call('getLanguage')

        invariant(!error, `getLanguage: ${errorMessage}`)

        if (language) {
          if (availableLocales.includes(language)) {
            await loadLanguageAsync(language)
            endLang.value = language
          }
        }

        // endLang default 'en'
        ready.value = true
      }
      catch (error) {
        console.error('useEndLocale error', error)
      }
    }
  }, { immediate: true })

  return { ready }
}
