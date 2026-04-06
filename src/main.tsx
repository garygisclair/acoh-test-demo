import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from './theme/tamagui.config'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <App />
    </TamaguiProvider>
  </StrictMode>,
)
