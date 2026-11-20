import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from './App.vue'

describe('App', () => {
  it('mounts the page', () => {
    const page = mount(App)
    expect(page.get('main')).toBeTruthy()
  })
})
