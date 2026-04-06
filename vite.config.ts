import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default defineConfig({
  base: '/acoh-test-demo/',
  plugins: [
    react(),
    tamaguiPlugin({
      config: './src/theme/tamagui.config.ts',
    }),
  ],
})
