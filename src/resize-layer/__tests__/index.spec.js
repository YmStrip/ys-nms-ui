import ResizeLayer from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test resize-layer plugin', () => {
  const app = createApp({}).use(ResizeLayer)
  expect(app.component(ResizeLayer.name)).toBeTruthy()
})
