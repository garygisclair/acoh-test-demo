import { XStack, Text } from 'tamagui'
import { HelpCircle } from 'lucide-react'
import { BackButton } from './auth-ui'
import { AVATAR_ME } from '../assets/home'

/**
 * Tab-tour persistence — sessionStorage-backed so the auto-open tutorial
 * only fires once per browser session per tab key. A full page reload
 * (or new tab) re-arms; refresh demonstrates the first-visit experience.
 */
const SEEN_TOURS_KEY = 'acoh_seen_tours'

function readSeenTours(): Set<string> {
  try {
    const raw = sessionStorage.getItem(SEEN_TOURS_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function hasSeenTour(key: string): boolean {
  return readSeenTours().has(key)
}

export function recordTourSeen(key: string) {
  try {
    const seen = readSeenTours()
    seen.add(key)
    sessionStorage.setItem(SEEN_TOURS_KEY, JSON.stringify([...seen]))
  } catch {
    // sessionStorage unavailable — graceful no-op
  }
}

/**
 * Shared hi-fi NavBar used by sub-screens in the Home tab (and applicable
 * across other main-app sections). Matches Figma spec: pill BackButton
 * (left), centered Outfit SemiBold 16 title, 36×36 spacer (right).
 *
 * marginTop={44} clears the overlaid transparent status bar.
 */
/**
 * TopBar used by main-tab screens (Home / Us / Habits / Profile). Title left,
 * 32×32 avatar with notification dot right. marginTop={44} clears overlaid
 * transparent status bar.
 */
export function TabTopBar({
  title,
  onAvatarPress,
  onHelpPress,
}: {
  title: string
  onAvatarPress?: () => void
  onHelpPress?: () => void
}) {
  return (
    <XStack
      height={48}
      marginTop={44}
      paddingHorizontal={16}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={20}
        fontWeight="600"
        color="var(--acoh-foreground)"
      >
        {title}
      </Text>
      <XStack gap={12} alignItems="center">
      {onHelpPress && (
        <HelpCircle
          size={22}
          color="var(--acoh-accent)"
          cursor="pointer"
          onClick={onHelpPress}
        />
      )}
      <XStack
        position="relative"
        width={32}
        height={32}
        cursor="pointer"
        onPress={onAvatarPress}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: '#dadaf1',
            overflow: 'hidden',
          }}
        >
          <img
            src={AVATAR_ME}
            alt=""
            style={{
              position: 'absolute',
              top: '-13.42%',
              left: 0,
              width: '100%',
              height: '150%',
              maxWidth: 'none',
              display: 'block',
            }}
          />
        </div>
        <XStack
          position="absolute"
          top={-2}
          right={-2}
          width={10}
          height={10}
          borderRadius={5}
          backgroundColor="var(--acoh-primary)"
          style={{ border: '1.5px solid var(--acoh-bg-pale)' }}
        />
      </XStack>
      </XStack>
    </XStack>
  )
}

/**
 * Toggle switch — 44×24 track with sliding 20px knob. On = accent purple,
 * off = subtle gray. Keyboard-accessible via Space/Enter.
 */
export function Toggle({
  value,
  onChange,
}: {
  value: boolean
  onChange: () => void
}) {
  return (
    <div
      role="switch"
      aria-checked={value}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onChange()
        }
      }}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: value ? 'var(--acoh-accent)' : 'rgba(44,46,42,0.2)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 180ms ease',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 2,
          left: value ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          transition: 'left 180ms cubic-bezier(0.2,0.9,0.3,1)',
        }}
      />
    </div>
  )
}

export function HomeNavBar({
  title,
  onBack,
}: {
  title: string
  onBack?: () => void
}) {
  return (
    <XStack
      height={48}
      marginTop={44}
      paddingHorizontal={16}
      alignItems="center"
      justifyContent="space-between"
    >
      <BackButton onPress={onBack} />
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={16}
        fontWeight="600"
        color="var(--acoh-foreground)"
      >
        {title}
      </Text>
      <XStack width={36} height={36} />
    </XStack>
  )
}
