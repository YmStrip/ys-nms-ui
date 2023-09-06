import Text from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test text plugin', () => {
  const app = createApp({}).use(Text)
  expect(app.component(Text.name)).toBeTruthy()
})
