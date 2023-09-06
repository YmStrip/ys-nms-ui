import Keyboard from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test keyboard plugin', () => {
  const app = createApp({}).use(Keyboard)
  expect(app.component(Keyboard.name)).toBeTruthy()
})
