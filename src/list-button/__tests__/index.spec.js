import ListButton from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test list-button plugin', () => {
  const app = createApp({}).use(ListButton)
  expect(app.component(ListButton.name)).toBeTruthy()
})
