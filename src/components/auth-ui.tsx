import { YStack, XStack, Text } from 'tamagui'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { GOOGLE_LOGO, APPLE_LOGO } from '../assets/auth'

/**
 * Shared hi-fi primitives for the Auth flow (Splash, Intro, SignUp, SignIn,
 * Forgot/Reset/Accept). Keeps screen files focused on layout + content.
 */

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <YStack
      flex={1}
      backgroundColor="var(--acoh-bg-pale)"
      position="relative"
      style={{ minHeight: '100%', flexGrow: 1, flexShrink: 0 }}
    >
      {children}
    </YStack>
  )
}

export function BackButton({ onPress }: { onPress?: () => void }) {
  return (
    <XStack
      width={36}
      height={36}
      borderRadius={18}
      backgroundColor="#FFFFFF"
      borderWidth={1}
      borderColor="var(--acoh-border)"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.95, opacity: 0.85 }}
      style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.08)' }}
    >
      <ChevronLeft size={18} color="var(--acoh-foreground)" />
    </XStack>
  )
}

/** NavRow with a back button left-aligned. marginTop={44} clears overlaid status bar. */
export function AuthNavRow({ onBack }: { onBack?: () => void }) {
  return (
    <XStack
      height={44}
      marginTop={44}
      paddingHorizontal={16}
      paddingVertical={4}
      alignItems="center"
    >
      <BackButton onPress={onBack} />
    </XStack>
  )
}

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <YStack
      paddingHorizontal={24}
      paddingBottom={16}
      gap={8}
      alignItems="center"
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={24}
        fontWeight="700"
        color="var(--acoh-foreground)"
        textAlign="center"
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="400"
          color="var(--acoh-body)"
          textAlign="center"
        >
          {subtitle}
        </Text>
      )}
    </YStack>
  )
}

export function PillInput({
  label,
  placeholder,
  defaultValue,
  type = 'text',
  valid,
}: {
  label: string
  placeholder: string
  defaultValue?: string
  type?: 'text' | 'email' | 'password'
  valid?: boolean
}) {
  return (
    <YStack gap={6} width="100%">
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        fontWeight="500"
        color="var(--acoh-foreground)"
      >
        {label}
      </Text>
      <XStack
        width="100%"
        height={44}
        borderRadius={22}
        backgroundColor="#FFFFFF"
        borderWidth={1}
        borderColor="var(--acoh-border)"
        alignItems="center"
        paddingHorizontal={16}
        gap={8}
      >
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'Outfit, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--acoh-foreground)',
          }}
        />
        {valid && (
          <YStack
            width={20}
            height={20}
            borderRadius={10}
            backgroundColor="#10b981"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={12} fontWeight="700" color="#FFFFFF" style={{ lineHeight: 1 }}>
              ✓
            </Text>
          </YStack>
        )}
      </XStack>
    </YStack>
  )
}

export function PrimaryPillButton({
  label,
  onPress,
}: {
  label: string
  onPress?: () => void
}) {
  return (
    <XStack
      width="100%"
      height={48}
      borderRadius={24}
      backgroundColor="var(--acoh-primary)"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      style={{ boxShadow: '0px 2px 6px rgba(0,0,0,0.08)' }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={15}
        fontWeight="600"
        color="#FFFFFF"
      >
        {label}
      </Text>
    </XStack>
  )
}

export function OutlinePillButton({
  label,
  onPress,
}: {
  label: string
  onPress?: () => void
}) {
  return (
    <XStack
      width="100%"
      height={48}
      borderRadius={24}
      backgroundColor="#FFFFFF"
      borderWidth={1}
      borderColor="var(--acoh-border)"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={15}
        fontWeight="600"
        color="var(--acoh-foreground)"
      >
        {label}
      </Text>
    </XStack>
  )
}

export function OrSeparator() {
  return (
    <XStack width="100%" height={20} gap={12} alignItems="center" paddingVertical={4}>
      <YStack flex={1} height={1} backgroundColor="var(--acoh-border)" />
      <Text fontFamily="Outfit, sans-serif" fontSize={12} color="var(--acoh-muted)">
        or
      </Text>
      <YStack flex={1} height={1} backgroundColor="var(--acoh-border)" />
    </XStack>
  )
}

function GoogleMark() {
  return (
    <img
      src={GOOGLE_LOGO}
      alt=""
      aria-hidden="true"
      style={{ width: 20, height: 20, display: 'block' }}
    />
  )
}

function AppleMark() {
  return (
    <img
      src={APPLE_LOGO}
      alt=""
      aria-hidden="true"
      style={{ width: 16, height: 20, display: 'block' }}
    />
  )
}

export function SocialButton({
  provider,
  label,
  onPress,
}: {
  provider: 'google' | 'apple'
  label: string
  onPress?: () => void
}) {
  return (
    <XStack
      width="100%"
      height={48}
      borderRadius={24}
      backgroundColor="#FFFFFF"
      borderWidth={1}
      borderColor="var(--acoh-border)"
      gap={8}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
    >
      {provider === 'google' ? <GoogleMark /> : <AppleMark />}
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={15}
        fontWeight="600"
        color="var(--acoh-foreground)"
      >
        {label}
      </Text>
    </XStack>
  )
}

/** Bottom footer link: "Already have an account? Sign In" etc. */
export function AuthFooterLink({
  prefix,
  linkLabel,
  onPress,
}: {
  prefix: string
  linkLabel: string
  onPress?: () => void
}) {
  return (
    <XStack width="100%" justifyContent="center" alignItems="center" gap={4}>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        color="var(--acoh-muted)"
      >
        {prefix}
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        fontWeight="600"
        color="var(--acoh-accent)"
        cursor="pointer"
        onPress={onPress}
      >
        {linkLabel}
      </Text>
    </XStack>
  )
}
