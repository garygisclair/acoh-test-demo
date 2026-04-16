import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useBottomSheet } from '../../components/BottomSheet'
import { TERMS_TITLE, PRIVACY_TITLE, TermsBody, PrivacyBody } from '../../data/legal'
import { WELCOME_ILLUSTRATIONS, GOOGLE_LOGO, APPLE_LOGO } from '../../assets/auth'

type Slide = { title: string; body: string }

const SLIDES: Slide[] = [
  {
    title: 'Every couple has things they want to improve.',
    body: 'Dedicate time each day to connect with each other through small, daily actions.',
  },
  {
    title: 'Most improvements come from small, daily actions.',
    body: 'Add your habits, track together, and both take charge of caring for your relationship.',
  },
  {
    title: 'The hard part is staying consistent.',
    body: 'We help you build the rhythm — with reminders, streaks, and weekly check-ins.',
  },
  {
    title: 'We help you follow through and see if it’s working.',
    body: 'Track progress together with shared dashboards, health scores, and weekly insights.',
  },
  {
    title: 'Choose what matters most to you.',
    body: 'We’ll help you build habits around the areas that matter most to your relationship.',
  },
]

const SWIPE_THRESHOLD = 50

export function Intro() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const dragStartX = useRef<number | null>(null)

  const goToSignUp = () => navigate('/sign-up')
  const openTerms = () => sheet.open({ title: TERMS_TITLE, body: <TermsBody /> })
  const openPrivacy = () => sheet.open({ title: PRIVACY_TITLE, body: <PrivacyBody /> })

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0 && index < SLIDES.length - 1) setIndex(index + 1)
    if (dx > 0 && index > 0) setIndex(index - 1)
  }

  return (
    <YStack
      flex={1}
      backgroundColor="var(--acoh-bg-pale)"
      position="relative"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'pan-y' }}
    >
      {/*
        Decorative lilac ring — matches Figma "Exclude" boolean op.
        Outer circle: 443×443 at (-26.5, 113). Inner circle: 321×321 at (57.5, 219).
        Inner is offset +23.5px right / +45px down from outer center, so the ring is
        thicker top-left and thinner bottom-right. Rendered via SVG mask.
      */}
      <svg
        width={443}
        height={443}
        viewBox="0 0 443 443"
        style={{
          position: 'absolute',
          left: -26.5,
          top: 113,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <defs>
          <mask id="acoh-ring-mask">
            <circle cx={221.5} cy={221.5} r={221.5} fill="white" />
            <circle cx={244.5} cy={266.5} r={160.5} fill="black" />
          </mask>
        </defs>
        <rect width={443} height={443} fill="var(--acoh-ring)" mask="url(#acoh-ring-mask)" />
      </svg>

      {/* NavRow with Log in pill — marginTop clears the overlaid status bar */}
      <XStack
        height={48}
        marginTop={44}
        paddingHorizontal={24}
        paddingVertical={8}
        alignItems="center"
        justifyContent="flex-end"
        zIndex={2}
      >
        <XStack
          cursor="pointer"
          onPress={() => navigate('/sign-in')}
          backgroundColor="#FFFFFF"
          borderWidth={1}
          borderColor="var(--acoh-border)"
          borderRadius={16}
          paddingHorizontal={14}
          paddingVertical={6}
          alignItems="center"
          justifyContent="center"
          style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.08)' }}
          pressStyle={{ scale: 0.97, opacity: 0.85 }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            fontWeight="600"
            color="var(--acoh-accent)"
          >
            Log in
          </Text>
        </XStack>
      </XStack>

      {/* Illustration */}
      <YStack
        height={230}
        paddingVertical={20}
        alignItems="center"
        justifyContent="center"
        zIndex={1}
      >
        <img
          src={WELCOME_ILLUSTRATIONS[index]}
          alt=""
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      </YStack>

      {/* Headline + body */}
      <YStack
        paddingHorizontal={24}
        paddingVertical={8}
        gap={12}
        alignItems="center"
        zIndex={1}
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={22}
          fontWeight="800"
          color="var(--acoh-foreground)"
          textAlign="center"
          lineHeight={28}
        >
          {slide.title}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="400"
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={20}
        >
          {slide.body}
        </Text>
      </YStack>

      {/* Dots */}
      <XStack
        height={40}
        paddingVertical={16}
        gap={8}
        alignItems="center"
        justifyContent="center"
        zIndex={1}
      >
        {SLIDES.map((_, i) => (
          <YStack
            key={i}
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={
              i === index ? 'var(--acoh-primary)' : 'rgba(44,46,42,0.2)'
            }
            cursor="pointer"
            onPress={() => setIndex(i)}
          />
        ))}
      </XStack>

      {/* CTA block */}
      <YStack
        paddingHorizontal={24}
        paddingTop={12}
        gap={12}
        alignItems="center"
        zIndex={1}
      >
        {/* Sign up with email (primary) */}
        <XStack
          width="100%"
          height={48}
          borderRadius={24}
          backgroundColor="var(--acoh-primary)"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onPress={goToSignUp}
          pressStyle={{ scale: 0.98, opacity: 0.9 }}
          style={{ boxShadow: '0px 2px 6px rgba(0,0,0,0.08)' }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="#FFFFFF"
          >
            Sign up with email
          </Text>
        </XStack>

        {/* Separator */}
        <XStack width="100%" height={20} gap={12} alignItems="center">
          <YStack flex={1} height={1} backgroundColor="var(--acoh-border)" />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            or
          </Text>
          <YStack flex={1} height={1} backgroundColor="var(--acoh-border)" />
        </XStack>

        {/* Google */}
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
          onPress={goToSignUp}
          pressStyle={{ scale: 0.98, opacity: 0.9 }}
        >
          <img
            src={GOOGLE_LOGO}
            alt=""
            aria-hidden="true"
            style={{ width: 20, height: 20, display: 'block' }}
          />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            Sign up with Google
          </Text>
        </XStack>

        {/* Apple */}
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
          onPress={goToSignUp}
          pressStyle={{ scale: 0.98, opacity: 0.9 }}
        >
          <img
            src={APPLE_LOGO}
            alt=""
            aria-hidden="true"
            style={{ width: 16, height: 20, display: 'block' }}
          />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            Sign up with Apple
          </Text>
        </XStack>
      </YStack>

      {/* Terms footnote — sits directly below the Apple button */}
      <YStack paddingTop={16} paddingHorizontal={24}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-muted)"
          textAlign="center"
          lineHeight={18}
        >
          By continuing, you agree to our{' '}
          <span
            onClick={openTerms}
            style={{ color: 'var(--acoh-accent)', fontWeight: 600, cursor: 'pointer' }}
          >
            Terms of Service
          </span>
          {' '}and{' '}
          <span
            onClick={openPrivacy}
            style={{ color: 'var(--acoh-accent)', fontWeight: 600, cursor: 'pointer' }}
          >
            Privacy Policy
          </span>
          .
        </Text>
      </YStack>
    </YStack>
  )
}
