import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Back from '~/components/Back.vue'

describe('component of Back.vue', () => {
  it('should render', () => {
    const wrapper = mount(Back)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
