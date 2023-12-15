import type { Meta, StoryObj } from '@storybook/vue3'

import Overlay from '../components/Overlay.vue'

const meta = {
  title: 'UI/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  render: args => ({
    data() {
      return { args }
    },
    components: { Overlay },
    template: `
    <Overlay v-bind="args" />
    <ul v-if="args._testLockScroll_notInOverlay"><li v-for="_ in 200">this is a paragraph</li><ul>
    `,
  }),
  argTypes: {
    'show': {
      description: '显示Popup',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    'zIndex': {
      description: 'Overlay的层级',
      table: {
        defaultValue: { summary: 2000 },
        type: { summary: 'number' },
      },
    },
    'lockScroll': {
      description: '显示Overlay后是禁止许滚动',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'string' },
      },
    },
    'overlay-content': {
      description: '要显示的内容',
      table: {
        type: { summary: 'component|text' },
      },
    },
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    '_testLockScroll_notInPopup': { table: { disable: true } },
  },
  args: {
    show: true,
    zIndex: 2000,
    lockScroll: true,
  },
} satisfies Meta<typeof Overlay>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    show: true,
  },
}

export const LockScroll: Story = {
  args: {
    ...Default.args,
    lockScroll: false,
    _testLockScroll_notInOverlay: true, // showScroll 用来测试 不是Popup组件的属性
  } as any,
}
