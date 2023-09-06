import Border from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test border plugin', () => {
  const app = createApp({}).use(Border)
  expect(app.component(Border.name)).toBeTruthy()
})
