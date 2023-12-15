<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label?: string
  labelClass?: string
  inputClass?: string
  errorClass?: string
  placeholder?: string
  validateTrigger?: 'change' | 'blur' | 'input'
}

const { name, label, labelClass, inputClass, errorClass, placeholder, validateTrigger } = withDefaults(defineProps<Props>(), { validateTrigger: 'input' })

const { errorMessage, value, handleChange, handleBlur } = useField(() => name, undefined, {
  validateOnValueUpdate: false,
})

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, validateTrigger === 'blur'),
  change: (evt: Event) => handleChange(evt, validateTrigger === 'change'),
  input: (evt: Event) => handleChange(evt, validateTrigger === 'input'),
}
</script>

<template>
  <div>
    <slot name="label">
      <label :class="labelClass">{{ label }}</label>
    </slot>
    <slot :value="value" v-bind="validationListeners">
      <input :value="value" type="text" :class="inputClass" :placeholder="placeholder" v-on="validationListeners">
    </slot>
    <slot v-if="errorMessage" name="error" :message="errorMessage">
      <span :class="errorClass">
        {{ `*${errorMessage}` }}</span>
    </slot>
  </div>
</template>
