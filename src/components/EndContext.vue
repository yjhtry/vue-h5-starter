<!-- 所有使用JSBridge的组件都应该使用他包裹 -->

<script setup lang="ts">
import { SKIP_END_CONTEXT } from '~/env'

const { ready: JSBridgeReady } = useJSBridge()
const { ready } = useEndLocale(JSBridgeReady) // 如果某些客户端不支持获取语言 去掉这个判断
</script>

<template>
  <slot v-if="ready || SKIP_END_CONTEXT" />
  <slot v-else name="fallback" />
</template>
