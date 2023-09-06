import MouseLayer from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test mouse-layer plugin', () => {
  const app = createApp({}).use(MouseLayer)
  expect(app.component(MouseLayer.name)).toBeTruthy()
})
