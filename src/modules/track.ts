/* eslint-disable no-console */
import type { DirectiveBinding, ObjectDirective } from 'vue'
import type { UserModule } from '~/types'

interface TrackEventValue {
  eventType: keyof HTMLElementEventMap
  data: any
  cycle: Exclude<keyof ObjectDirective, 'getSSRProps' | 'deep'>
  dispose?: () => void
}

// todo 后面根据埋点的类型就行处理
export const install: UserModule = ({ app }) => {
  app.directive('track', {
    mounted: (el: HTMLElement, binding: DirectiveBinding<TrackEventValue>) => {
      const { value } = binding
      const isMounted = !value.cycle || value.cycle === 'mounted'

      console.log(el.tagName, 'mounted', `value is: ${value}`)

      if (isMounted) {
        const { eventType } = value
        if (eventType) {
          const handleEvent = () => {
            console.log(`event: ${eventType}, value: ${value}`)
          }

          el.addEventListener(eventType, handleEvent)

          binding.value.dispose = () => {
            el.removeEventListener(eventType, handleEvent)
          }
        }
      }
    },

    unmounted: (el, binding: DirectiveBinding<TrackEventValue>) => {
      if (binding.value.dispose)
        binding.value.dispose()
    },
  })
}
