import antfu from '@antfu/eslint-config'

export default antfu(
  { unocss: true, formatters: true, extends: ['plugin:storybook/recommended'] },
)
