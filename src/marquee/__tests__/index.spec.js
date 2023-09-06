import Marquee from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test marquee plugin', () => {
  const app = createApp({}).use(Marquee)
  expect(app.component(Marquee.name)).toBeTruthy()
})
