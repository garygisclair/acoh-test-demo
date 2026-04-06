import { useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

const TAB_ORDER = ['/home', '/us', '/habits', '/profile']

function getTabIndex(path: string): number {
  return TAB_ORDER.findIndex(t => path === t)
}

function getAnimationClass(from: string, to: string): string {
  const fromTab = getTabIndex(from)
  const toTab = getTabIndex(to)

  // Tab-to-tab: slide based on direction
  if (fromTab >= 0 && toTab >= 0) {
    return toTab > fromTab ? 'slide-left' : 'slide-right'
  }

  // Going deeper (into a stack screen): slide from right
  if (to.split('/').length > from.split('/').length || to.startsWith('/shared/') || to.startsWith('/notifications')) {
    return 'slide-left'
  }

  // Going back (shallower): slide from left
  if (from.split('/').length > to.split('/').length || from.startsWith('/shared/') || from.startsWith('/notifications')) {
    return 'slide-right'
  }

  // Onboarding forward flow
  if (from.startsWith('/onboarding') && to.startsWith('/onboarding')) {
    return 'slide-left'
  }

  // Auth flow
  if (from.startsWith('/sign') || from.startsWith('/welcome') || from.startsWith('/forgot') || from.startsWith('/reset') || from.startsWith('/accept')) {
    return 'slide-left'
  }

  return 'fade-in'
}

export function AnimatedOutlet({ children }: { children: ReactNode }) {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const keyRef = useRef(0)

  if (prevPath.current !== location.pathname) {
    prevPath.current = location.pathname
    keyRef.current++
  }

  const animClass = keyRef.current === 0
    ? 'fade-in'
    : getAnimationClass(prevPath.current, location.pathname)

  return (
    <div
      key={location.pathname}
      className={`animated-screen ${animClass}`}
      style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
    >
      {children}
    </div>
  )
}
