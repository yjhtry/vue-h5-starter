<script setup lang="ts">
import { availableLocales } from '~/modules/i18n'
import { endLang } from '~/store'

function changeLang(lang: string) {
  endLang.value = lang
}
</script>

<template>
  <ul flex space-x-4>
    <li v-for="locale in availableLocales" :key="locale">
      <button class="btn" @click="changeLang(locale)">
        {{ locale }}
      </button>
    </li>
  </ul>
  <div>{{ endLang }}</div>
  <div class="btn-confirm" :class="[endLang]" />
</template>

<style lang="scss" scoped>
  .btn-confirm {
  @include main-lang-bg(302px, 82px, '~/assets/button', 'confirm.png');
}
</style>
