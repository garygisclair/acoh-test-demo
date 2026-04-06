import { createTamagui, createTokens } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config/v3'
import { createAnimations } from '@tamagui/animations-css'

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    ...defaultConfig.tokens.color,
    text: '#1C1C1C',
    textMuted: '#8C8C8C',
    border: '#D4D4D4',
    cardBg: '#F2F2F2',
    background: '#FFFFFF',
    buttonPrimary: '#1C1C1C',
    buttonText: '#FFFFFF',
    tabActive: '#1C1C1C',
    tabInactive: '#8C8C8C',
  },
})

const animations = createAnimations({
  quick: 'ease-out 150ms',
  medium: 'ease-out 250ms',
  slow: 'ease-out 400ms',
})

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens,
  animations,
  themes: {
    light: {
      background: '#FFFFFF',
      color: '#1C1C1C',
      borderColor: '#D4D4D4',
      placeholderColor: '#8C8C8C',
    },
  },
  defaultTheme: 'light',
})

export default tamaguiConfig

export type AppConfig = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
