import { defineConfig } from '@varlet/cli'

export default defineConfig({
  name: 'ys-nms',
  namespace: 'yn',
  logo: './logo.svg',
  title: 'ys-nms-ui',
  useMobile: true,
  pc: {
    header: {
      darkMode: null,
      i18n: null,
      playground: null,
    },
    menu: [
      {
        text: {
          'zh-CN': '开发指南',
        },
        type: 3,
      },
      {
        text: {
          'zh-CN': '基本介绍',
        },
        doc: 'home',
        type: 3,
      },
      {
        text: {
          'zh-CN': '各种层组件',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '事件层',
        },
        doc: 'event-layer',
        type: 3,
      },
      {
        text: {
          'zh-CN': '响应层',
        },
        doc: 'resize-layer',
        type: 3,
      },
      {
        text: {
          'zh-CN': '视差滚动层'
        },
        doc: 'parallax-layer',
        type: 3
      },
      {
        text: {
          'zh-CN': '鼠标层'
        },
        doc: 'mouse-layer',
        type: 3
      },
      {
        text: {
          'zh-CN': '菜单层',
        },
        doc: 'menu-layer',
        type: 3,
      },
      {
        text: {
          'zh-CN': '展示组件',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '图标'
        },
        doc: 'icon',
        type: 3
      },
      {
        text: {
          'zh-CN': '字'
        },
        doc: 'text',
        type: 3
      },
      {
        text: {
          'zh-CN': '附加边框'
        },
        doc: 'border',
        type: 3
      },
      {
        text: {
          'zh-CN': '键盘'
        },
        doc: 'keyboard',
        type: 3
      },
      {
        text: {
          'zh-CN': '滚动字体'
        },
        doc: 'marquee',
        type: 3
      },
      {
        text: {
          'zh-CN': '基础组件',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Button 按钮',
        },
        doc: 'button',
        type: 3,
      },
      {
        text: {
          'zh-CN': '表单',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '列表表单组件',
        },
        doc: 'list-button',
        type: 3,
      },
    ],
  },
  mobile: {
    header: {
      i18n: null,
      darkMode: null,
    },
  }
})
