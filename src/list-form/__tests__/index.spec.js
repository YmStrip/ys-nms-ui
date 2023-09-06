import ListForm from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test list-form plugin', () => {
  const app = createApp({}).use(ListForm)
  expect(app.component(ListForm.name)).toBeTruthy()
})
