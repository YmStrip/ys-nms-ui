import MenuLayer from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test menu-layer plugin', () => {
  const app = createApp({}).use(MenuLayer)
  expect(app.component(MenuLayer.name)).toBeTruthy()
})
