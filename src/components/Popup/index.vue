<script setup lang="ts">
import type { PopupEmits, PopupProps } from './type'
import { callInterceptor } from './utils'

const props = withDefaults(defineProps<PopupProps>(), {
  overlay: true,
  lockScroll: true,
  transitionAppear: true,
  closeOnClickOverlay: true,

  teleport: 'body',
  position: 'center',
  closeable: true,
  closeOnPopstate: false,
})

const emit = defineEmits<PopupEmits>()
let opened: boolean
let shouldReopen: boolean
let timer: ReturnType<typeof setTimeout> | null

const zIndex = ref<number>()
const popupRef = ref<HTMLElement>()

defineExpose({
  popupRef,
})

const attrs = useAttrs()

const popupPositionClass = computed(() => {
  if (props.position === 'center')
    return 'top-1/2 translate--1/2 left-1/2 rounded-2 min-w-40 min-h-30'
  if (props.position === 'top')
    return 'top-0 left-0 w-full'
  if (props.position === 'bottom')
    return 'bottom-0 left-0 w-full'
  if (props.position === 'left')
    return 'left-0 top-0 h-full'
  if (props.position === 'right')
    return 'right-0 top-0 h-full'
})

watch(
  () => props.show,
  (show) => {
    if (show && !opened) {
      open()

      if (attrs.tabindex === 0) {
        nextTick(() => {
          popupRef.value?.focus()
        })
      }
    }
    if (!show && opened) {
      opened = false
      emit('close')
    }
  },
)

useEventListener('popstate', () => {
  if (props.closeOnPopstate) {
    close()
    shouldReopen = false
  }
})

onMounted(() => {
  if (props.show)
    open()
})

onActivated(() => {
  if (shouldReopen) {
    emit('update:show', true)
    shouldReopen = false
  }
})

onDeactivated(() => {
  // teleported popup should be closed when deactivated
  if (props.show && props.teleport) {
    close()
    shouldReopen = true
  }
})

function open() {
  if (!opened) {
    opened = true
    emit('open')
  }
}

function close() {
  if (opened) {
    callInterceptor(props.beforeClose, {
      done() {
        opened = false
        emit('close')
        emit('update:show', false)
      },
    })
  }
}

function onClickCloseIcon(event: MouseEvent) {
  emit('clickCloseIcon', event)
  close()
}

function onClickOverlay(event: MouseEvent) {
  emit('clickOverlay', event)

  if (props.closeOnClickOverlay)
    close()
}

function onOpened() {
  if (timer)
    clearTimeout(timer)
  timer = setTimeout(() => {
    emit('opened')
  })
}

const onClosed = () => emit('closed')
const onKeydown = (event: KeyboardEvent) => emit('keydown', event)
</script>

<template>
  <Teleport :to="teleport" :disabled="!!teleport">
    <!-- overlay -->
    <Overlay
      :class="overlayClass"
      :z-index="zIndex"
      :show="show && overlay"
      :lock-scroll="lockScroll"
      :tabindex="closeOnClickOverlay ? 0 : undefined"
      :close-on-click-overlay="closeOnClickOverlay"
      @click="onClickOverlay"
    />
    <!-- popup -->
    <Transition
      :appear="transitionAppear"
      :name="`popup-slide-${props.position}`"
      @after-enter="onOpened" @after-leave="onClosed"
    >
      <div
        v-if="show"
        ref="popupRef"
        bg="#323145"
        class="fixed box-border max-h-full center overflow-y-auto px-3 py-4"
        :class="[popupPositionClass, popupClass]"
        :style="{ zIndex }" role="dialog" tabindex="0"
        v-bind="$attrs"
        @keydown="onKeydown"
      >
        <!-- close icon -->
        <slot v-if="closeable" name="close-icon" :on-click="onClickCloseIcon">
          <div
            i-carbon-close
            text="white"
            active="op60"
            class="absolute right-4 top-4 cursor-pointer icon-btn"
            @click="onClickCloseIcon"
          />
        </slot>
        <!-- popup content -->
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popup-slide-center-enter-active,
.popup-slide-center-leave-active {
  transition: opacity 0.3s ease-in;
}

.popup-slide-center-enter-from,
.popup-slide-center-leave-to {
  opacity: 0;
}

.popup-slide-top-enter-active,
.popup-slide-left-enter-active,
.popup-slide-right-enter-active,
.popup-slide-bottom-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
}
.popup-slide-top-leave-active,
.popup-slide-left-leave-active,
.popup-slide-right-leave-active,
.popup-slide-bottom-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.popup-slide-top-enter-from,
.popup-slide-top-leave-active {
  transform: translate3d(0, -100%, 0);
}

.popup-slide-right-enter-from,
.popup-slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}

.popup-slide-bottom-enter-from,
.popup-slide-bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}

.popup-slide-left-enter-from,
.popup-slide-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}
</style>
