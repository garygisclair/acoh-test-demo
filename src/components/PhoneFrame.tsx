import { YStack, XStack, Text } from 'tamagui'
import { Outlet, useLocation } from 'react-router-dom'
import { StatusBar } from './StatusBar'
import { TabBar } from './TabBar'
import { AnimatedOutlet } from './AnimatedRoutes'

const AUTH_ROUTES = ['/welcome', '/sign-up', '/sign-in', '/forgot-password', '/reset-password', '/accept-invitation']
const ONBOARDING_ROUTES = ['/onboarding']

// Screen count for label
const SCREEN_NAMES: Record<string, { label: string; index: number }> = {
  '/welcome': { label: 'Welcome', index: 1 },
  '/sign-up': { label: 'Sign Up', index: 2 },
  '/sign-in': { label: 'Sign In', index: 3 },
  '/forgot-password': { label: 'Forgot Password', index: 4 },
  '/reset-password': { label: 'Reset Password', index: 5 },
  '/accept-invitation': { label: 'Accept Invitation', index: 6 },
  '/onboarding/send-invitation': { label: 'Send Invitation', index: 7 },
  '/onboarding/waiting': { label: 'Waiting for Partner', index: 8 },
  '/onboarding/select-focus-areas': { label: 'Select Focus Areas', index: 9 },
  '/onboarding/baseline-ratings': { label: 'Baseline Ratings', index: 10 },
  '/onboarding/initial-goals': { label: 'Initial Goals', index: 11 },
  '/onboarding/review': { label: 'Review & Confirm', index: 12 },
  '/onboarding/do-this-later': { label: 'Do This Later', index: 13 },
  '/onboarding/setup-pending': { label: 'Setup Pending Gate', index: 14 },
  '/home': { label: 'Home Dashboard', index: 15 },
  '/home/partner-progress': { label: 'Partner Progress', index: 16 },
  '/home/sparks': { label: 'Sparks Feed', index: 17 },
  '/home/quick-actions': { label: 'Quick Actions', index: 18 },
  '/home/approvals': { label: 'Approval Banners', index: 19 },
  '/us': { label: 'Focus Area Overview', index: 20 },
  '/us/weekly-check-in': { label: 'Weekly Check-In', index: 21 },
  '/us/key-insight': { label: 'Key Insight', index: 22 },
  '/us/suggested-actions': { label: 'Suggested Actions', index: 23 },
  '/habits': { label: 'Habit List', index: 24 },
  '/habits/goals': { label: 'Goals', index: 25 },
  '/habits/focus-area-management': { label: 'Focus Area Management', index: 26 },
  '/profile': { label: 'Account', index: 27 },
  '/profile/partnership': { label: 'Partnership', index: 28 },
  '/profile/notification-prefs': { label: 'Notification Preferences', index: 29 },
  '/profile/app-settings': { label: 'App Settings', index: 30 },
  '/profile/sign-out': { label: 'Sign Out', index: 31 },
  '/notifications': { label: 'Notification Center', index: 32 },
  '/shared/send-spark': { label: 'Send Spark', index: 33 },
  '/shared/approval-review': { label: 'Approval Review', index: 34 },
  '/shared/add-habit': { label: 'Add Habit', index: 35 },
  '/shared/add-goal': { label: 'Add Goal', index: 36 },
  '/shared/weekly-check-in-flow': { label: 'Weekly Check-In Flow', index: 37 },
  '/shared/habit-suggestions': { label: 'Habit Suggestions', index: 38 },
  '/shared/edit-focus-area': { label: 'Edit Focus Area', index: 39 },
}
const TOTAL_SCREENS = 45

function getScreenInfo(pathname: string): { label: string; index: number } {
  // Exact match first
  if (SCREEN_NAMES[pathname]) return SCREEN_NAMES[pathname]
  // Dynamic routes
  if (pathname.startsWith('/shared/habit-detail/')) return { label: 'Habit Detail', index: 40 }
  if (pathname.startsWith('/shared/focus-area-detail/')) return { label: 'Focus Area Detail', index: 41 }
  if (pathname.startsWith('/shared/spark-detail/')) return { label: 'Spark Detail', index: 42 }
  if (pathname.startsWith('/shared/goal-detail/')) return { label: 'Goal Detail', index: 43 }
  // Fallback
  const segments = pathname.split('/').filter(Boolean)
  const label = segments.map(s => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(' / ')
  return { label, index: 0 }
}

export function PhoneFrame() {
  const location = useLocation()
  const isAuth = AUTH_ROUTES.some(r => location.pathname === r) || location.pathname === '/'
  const isOnboarding = ONBOARDING_ROUTES.some(r => location.pathname.startsWith(r))
  const isNotifications = location.pathname.startsWith('/notifications')
  const showTabBar = !isAuth && !isOnboarding

  const screenInfo = getScreenInfo(location.pathname)

  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="#E8E8E8"
      padding={40}
    >
      {/* Phone device */}
      <YStack
        width={390}
        height={844}
        backgroundColor="#FFFFFF"
        borderRadius={44}
        overflow="hidden"
        borderWidth={3}
        borderColor="#1C1C1C"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.08)',
        }}
      >
        <StatusBar />
        {/* Scrollable content area */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', WebkitOverflowScrolling: 'touch' }}>
            <AnimatedOutlet>
              <Outlet />
            </AnimatedOutlet>
          </div>
        </div>
        {/* Tab bar */}
        {showTabBar && (
          <TabBar activeTab={isNotifications ? null : undefined} />
        )}
      </YStack>
      {/* Screen label */}
      <XStack marginTop={12} gap={8} alignItems="center">
        <Text fontSize={13} color="#8C8C8C" fontFamily="Inter, system-ui, sans-serif">
          {screenInfo.label}
        </Text>
        {screenInfo.index > 0 && (
          <Text fontSize={12} color="#B0B0B0" fontFamily="Inter, system-ui, sans-serif">
            ({screenInfo.index}/{TOTAL_SCREENS})
          </Text>
        )}
      </XStack>
    </YStack>
  )
}
