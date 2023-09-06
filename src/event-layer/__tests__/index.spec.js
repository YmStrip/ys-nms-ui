import EventLayer from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test event-layer plugin', () => {
  const app = createApp({}).use(EventLayer)
  expect(app.component(EventLayer.name)).toBeTruthy()
})
