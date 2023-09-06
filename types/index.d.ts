import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

export * from './basicComponent'
export * from './button'

declare module 'vue' {
  export interface GlobalComponents {
    YnBasicComponent: typeof import('@varlet/ui')['_BasicComponentComponent']
    YnButton: typeof import('@varlet/ui')['_ButtonComponent']
  }

  export interface ComponentCustomProperties {
    
  }
}
