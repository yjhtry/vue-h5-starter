import type { Meta, StoryObj } from '@storybook/vue3'

import Popup from '../components/Popup/index.vue'

const meta = {
  title: 'UI/Popup',
  component: Popup,
  tags: ['autodocs'],
  render: args => ({
    data() {
      return { args }
    },
    methods: {
      open() {
        this.args.show = true
      },
      close() {
        this.args.show = false
      },
    },
    components: { Popup },
    template: `
    <button btn @click="open">open</button>
    <Popup v-bind="args" @close="close">content</Popup>
    <ul v-if="args._testLockScroll_notInPopup"><li v-for="_ in 200">this is a paragraph</li><ul>
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
    'position': {
      control: 'select',
      options: ['center', 'top', 'left', 'right', 'bottom'],
      description: '弹出的位置',
      table: {
        type: { summary: 'enum' },
      },
    },
    'zIndex': {
      description: 'Overlay和Popup的层级',
      table: {
        defaultValue: { summary: 2000 },
        type: { summary: 'number' },
      },
    },
    'overlay': {
      description: '是否显示Overlay',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    'teleport': {
      description: 'Popup挂载的位置 传入空字符串表示原位置',
      table: {
        defaultValue: { summary: 'body' },
        type: { summary: 'string', detail: 'CSS选择器字符串' },
      },
    },
    'lockScroll': {
      description: '显示Overlay后是禁止许滚动',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'string' },
      },
    },
    'transitionAppear': {
      description: 'Transition appear',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    'closeOnClickOverlay': {
      description: '点击Overlay是否关闭',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    'closeable': {
      description: '是否显示关闭按钮',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    'closeOnPopstate': {
      description: 'popstate change 是否关闭Popup',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    'close-icon': {
      description: '自定义图标',
      table: {
        type: { summary: 'component', detail: '<slot v-if="closeable" name="close-icon" :on-click="onClickCloseIcon" />' },
      },
    },
    'default': {
      table: {
        disable: true,
      },
    },
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    '_testLockScroll_notInPopup': { table: { disable: true } },
  },
  args: {
    show: true,
    overlay: true,
    teleport: 'body',
    zIndex: 2000,
    position: 'center',
    lockScroll: true,
    transitionAppear: true,
    closeOnClickOverlay: true,
    closeable: true,
    closeOnPopstate: true,
  },
} satisfies Meta<typeof Popup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    show: true,
  },
}

export const Left: Story = {
  args: {
    ...Default.args,
    position: 'left',
  },
}

export const Right: Story = {
  args: {
    ...Default.args,
    position: 'right',
  },
}

export const Top: Story = {
  args: {
    ...Default.args,
    position: 'top',
  },
}

export const Bottom: Story = {
  args: {
    ...Default.args,
    position: 'bottom',
  },
}

export const WithoutOverlay: Story = {
  args: {
    ...Default.args,
    overlay: false,
  },
}

export const WithoutCloseIcon: Story = {
  args: {
    ...Default.args,
    closeable: false,
  },
}

export const NotCloseOnClickOverlay: Story = {
  args: {
    ...Default.args,
    closeOnClickOverlay: false,
  },
}

export const LockScroll: Story = {
  args: {
    ...Default.args,
    lockScroll: false,
    _testLockScroll_notInPopup: true, // _testLockScroll 用来测试 不是Popup组件的属性
  } as any,
}
