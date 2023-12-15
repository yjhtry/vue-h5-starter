<script setup lang="ts">
const { t } = useI18n()
useHead({
  title: t('page-title.index'),
})
</script>

<template>
  <main h-full font-sans>
    <EndContext>
      <template #fallback>
        fallback
      </template>
      <RouterView />
    </EndContext>
  </main>
</template>
