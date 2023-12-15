import type { Meta, StoryObj } from '@storybook/vue3'

import InputNumber from '../components/InputNumber.vue'

const meta = {
  title: 'UI/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  render: args => ({
    data() {
      return { args }
    },
    components: { InputNumber },
    template: `
    <InputNumber  v-bind="args" />
    `,
  }),
  argTypes: {
    'disabled': {
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    'min': {
      description: '最小值',
      table: {
        type: { summary: 'number' },
      },
    },
    'max': {
      description: '最大值',
      table: {
        type: { summary: 'number' },
      },
    },
    'precision': {
      description: '精度',
      table: {
        type: { summary: 'number' },
      },
    },
    'step': {
      description: 'step',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    'onUpdate:modelValue': {
      description: '事件类型 change',
      table: {
        type: { summary: 'function' },
      },
    },
    'onInput': {
      description: '事件类型 input',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  args: {
    min: 0,
    max: 1000,
    disabled: false,
  },
} satisfies Meta<typeof InputNumber>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 10,
  },
}

export const WithStyle: Story = {
  args: {
    ...Default.args,
  },
  render: args => ({
    setup() {
      return { args }
    },
    data() {
      return args
    },
    components: { InputNumber },
    template: `
    <InputNumber w-45 border="~ gray" v-bind="args" />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: WithStyle.render,
}

export const Limit: Story = {
  args: {
    ...Default.args,
    min: -100,
    max: 100,
  },
  render: WithStyle.render,
}

export const Precision: Story = {
  args: {
    modelValue: 10.11,
    precision: 2,
  },
  render: WithStyle.render,
}

export const Step: Story = {
  args: {
    modelValue: 10.1,
    step: 0.1,
  },
  render: WithStyle.render,
}
