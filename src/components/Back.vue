<script setup lang="ts">
const route = useRoute()
const router = useRouter()

function onBack() {
  if (route.path)
    router.back()
  else
  // 返回到首页后 再次点击返回 关闭页面
    window.JSBridge.call('closeWebview')
}
</script>

<template>
  <div cursor-pointer @click.stop="onBack">
    <slot>
      <a bg-black:30 class="rounded-1 p-0.5" icon-btn>
        <div i-carbon-arrow-left text-white />
      </a>
    </slot>
  </div>
</template>
