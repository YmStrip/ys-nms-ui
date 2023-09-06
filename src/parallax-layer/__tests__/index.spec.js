import ParallaxLayer from '..'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'

test('test parallax-layer plugin', () => {
  const app = createApp({}).use(ParallaxLayer)
  expect(app.component(ParallaxLayer.name)).toBeTruthy()
})
