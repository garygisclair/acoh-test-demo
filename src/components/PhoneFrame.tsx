import { YStack, XStack, Text } from 'tamagui'
import { Outlet, useLocation } from 'react-router-dom'
import { StatusBar } from './StatusBar'
import { TabBar } from './TabBar'
import { AnimatedOutlet } from './AnimatedRoutes'
import { BottomSheetProvider } from './BottomSheet'
import { ToastProvider } from './Toast'

const AUTH_ROUTES = ['/welcome', '/intro', '/sign-up', '/sign-in', '/forgot-password', '/reset-password', '/accept-invitation']
const LIGHT_STATUS_ROUTES = ['/welcome']
const TRANSPARENT_STATUS_ROUTES = ['/intro', '/sign-up', '/sign-in', '/forgot-password', '/reset-password', '/accept-invitation', '/onboarding/add-photo', '/onboarding/send-invitation', '/onboarding/invitation-sent', '/onboarding/partnership-confirmed', '/onboarding/select-focus-areas', '/onboarding/baseline-ratings', '/onboarding/review', '/onboarding/do-this-later', '/onboarding/setup-pending', '/home', '/home/sparks', '/home/quick-actions', '/home/approvals', '/home/review-ratings', '/notifications', '/us', '/us/weekly-check-in', '/us/key-insight', '/us/suggested-actions', '/habits', '/habits/focus-area-management', '/shared/habit-suggestions', '/shared/suggest-a-habit', '/shared/weekly-check-in-flow', '/profile', '/profile/partnership', '/profile/notification-prefs', '/profile/app-settings', '/profile/sign-out', '/shared/add-habit', '/shared/send-spark', '/shared/approval-review']
const ONBOARDING_ROUTES = ['/onboarding']

// Screen count for label
const SCREEN_NAMES: Record<string, { label: string; index: number }> = {
  '/welcome': { label: 'Splash', index: 1 },
  '/intro': { label: 'Welcome Carousel', index: 2 },
  '/sign-up': { label: 'Sign Up', index: 2 },
  '/sign-in': { label: 'Sign In', index: 3 },
  '/forgot-password': { label: 'Forgot Password', index: 4 },
  '/reset-password': { label: 'Reset Password', index: 5 },
  '/accept-invitation': { label: 'Accept Invitation', index: 6 },
  '/onboarding/add-photo': { label: 'Add Profile Photo', index: 7 },
  '/onboarding/send-invitation': { label: 'Send Invitation', index: 7 },
  '/onboarding/invitation-sent': { label: 'Invitation Sent', index: 8 },
  '/onboarding/partnership-confirmed': { label: 'Partnership Confirmed', index: 9 },
  '/onboarding/waiting': { label: 'Waiting for Partner', index: 8 },
  '/onboarding/select-focus-areas': { label: 'Suggested Focus Areas', index: 10 },
  '/onboarding/baseline-ratings': { label: 'Rate Each Focus Area', index: 9 },
  '/onboarding/initial-goals': { label: 'Initial Goals', index: 11 },
  '/onboarding/review': { label: 'Review & Confirm', index: 12 },
  '/onboarding/do-this-later': { label: 'Do This Later', index: 13 },
  '/onboarding/setup-pending': { label: 'Setup Pending Gate', index: 14 },
  '/home': { label: 'Home Dashboard', index: 15 },
  '/home/partner-progress': { label: 'Partner Progress', index: 16 },
  '/home/sparks': { label: 'Sparks Feed', index: 17 },
  '/home/quick-actions': { label: 'Quick Actions', index: 18 },
  '/home/approvals': { label: 'Approval Banners', index: 19 },
  '/home/review-ratings': { label: 'Review Ratings', index: 20 },
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
  const isHiFiDynamic =
    location.pathname.startsWith('/shared/habit-detail/') ||
    location.pathname.startsWith('/shared/focus-area-detail/') ||
    location.pathname.startsWith('/shared/spark-detail/')
  const statusVariant: 'light' | 'dark' | 'transparent' = LIGHT_STATUS_ROUTES.includes(location.pathname)
    ? 'light'
    : TRANSPARENT_STATUS_ROUTES.includes(location.pathname) || isHiFiDynamic
      ? 'transparent'
      : 'dark'
  const statusIsOverlay = statusVariant !== 'dark'
  // Use pale lavender phone bg for hi-fi screens so rounded corners don't show white
  const phoneBg = statusIsOverlay ? '#f3f3fb' : '#FFFFFF'

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
        position="relative"
        backgroundColor={phoneBg}
        borderRadius={44}
        overflow="hidden"
        borderWidth={3}
        borderColor="#1C1C1C"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.08)',
        }}
      >
        <BottomSheetProvider>
         <ToastProvider bottomInset={showTabBar ? 90 : 0}>
          {/* For overlay variants, status bar floats over content so backgrounds extend edge-to-edge */}
          {statusIsOverlay ? (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
              <StatusBar variant={statusVariant} />
            </div>
          ) : (
            <StatusBar variant="dark" />
          )}
          {/* Scrollable content area */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', WebkitOverflowScrolling: 'touch', paddingBottom: statusIsOverlay ? 0 : 24 }}>
              <AnimatedOutlet>
                <Outlet />
              </AnimatedOutlet>
            </div>
          </div>
          {/* Tab bar */}
          {showTabBar && (
            <TabBar activeTab={isNotifications ? null : undefined} />
          )}
         </ToastProvider>
        </BottomSheetProvider>
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
