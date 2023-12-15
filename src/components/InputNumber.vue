<script setup lang="ts">
const { min, max, modelValue, precision } = defineProps<{
  min?: number
  max?: number
  disabled?: boolean
  modelValue: number
  precision?: number
  step?: number
}>()
const emit = defineEmits<{ 'update:modelValue': [number], 'input': [InputEvent] }>()

const raw = ref(`${modelValue}`)
const input = ref(modelValue)
const inputRef = shallowRef<HTMLInputElement>()

defineExpose({ inputRef })

function formatRawToNumber(value: string) {
  let number = Number.parseFloat(value) || 0
  if (precision !== undefined)
    number = Number(number.toFixed(precision))

  return number
}

function onChange(e: Event, toClamp = false) {
  if (inputRef.value) {
    const value = formatRawToNumber((e.target as HTMLInputElement).value)
    const clampValue = toClamp ? clamp(value, min ?? value, max ?? value) : value
    const strValue = `${clampValue}`

    input.value = clampValue

    // vue 对表单元素进行双向绑定, 但不受控...
    // 简而言之 表单的value和传入的value可以不一致
    inputRef.value.value = strValue

    emit('update:modelValue', clampValue)
    onInput(e, strValue)
  }
}

function onInput(e: Event, value?: string) {
  raw.value = value || (e.target as HTMLInputElement).value
  emit('input', e as InputEvent)
}
</script>

<template>
  <input
    ref="inputRef"
    type="number"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :value="raw"
    @change="onChange($event, true)"
    @input="onInput"
  >
</template>
