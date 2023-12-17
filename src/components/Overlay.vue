<script setup lang="ts">
const { show, lockScroll, zIndex } = defineProps<{
  show: boolean
  lockScroll: boolean
  zIndex?: string | number
}>()

const isLocked = useScrollLock(document.body)

watchEffect(() => {
  isLocked.value = !!(lockScroll && show)
})
</script>

<template>
  <Transition appear name="overlay-fade">
    <div
      v-if="show"
      :class="$attrs.class"
      :style="{ zIndex }"
      bg-black:90
      class="fixed left-0 top-0 h-screen w-screen"
    >
      <slot name="overlay-content" />
    </div>
  </Transition>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
