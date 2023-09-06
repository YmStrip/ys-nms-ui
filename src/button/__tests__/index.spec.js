import Button from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test button plugin', () => {
  const app = createApp({}).use(Button)
  expect(app.component(Button.name)).toBeTruthy()
})
