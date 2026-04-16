import { useEffect, useRef, useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { TabTopBar, hasSeenTour, recordTourSeen } from '../../components/home-ui'
import { useBottomSheet } from '../../components/BottomSheet'

type Rating = 'Poor' | 'Fair' | 'Good' | 'Excellent'

const RATING_COLOR: Record<Rating, string> = {
  Poor: '#e55b5b',
  Fair: '#f29c12',
  Good: '#33b58c',
  Excellent: '#2a9e7a',
}

type FocusArea = {
  id: string
  name: string
  rating: Rating
  score: number // 0–10
  trend: string
}

const FOCUS_AREAS: FocusArea[] = [
  { id: 'finances', name: 'Finances', rating: 'Fair', score: 3, trend: 'Trending up' },
  { id: 'intimacy', name: 'Intimacy', rating: 'Good', score: 5, trend: 'Stable' },
  { id: 'parenting', name: 'Parenting', rating: 'Good', score: 5, trend: 'Trending up' },
]

/* ── Us tour slides (placeholder copy) ────────────────────────────── */
type IntroSlide = { title: string; body: string }
const US_INTRO_SLIDES: IntroSlide[] = [
  {
    title: 'This is your Us view.',
    body: 'See how you and your partner are doing across the focus areas that matter most to you.',
  },
  {
    title: 'Focus Areas at a glance.',
    body: 'Each area gets a rating and a progress bar. Tap one for the full breakdown.',
  },
  {
    title: 'Check in weekly.',
    body: 'A quick weekly check-in keeps your ratings fresh and surfaces where alignment is drifting.',
  },
  {
    title: 'Insights spot the pattern.',
    body: "We'll flag streaks, regressions, and what's changing — good and bad — so you don't have to dig.",
  },
  {
    title: 'Suggested Actions do the thinking.',
    body: 'One-tap suggestions based on your scores and habit completion — conversations, new habits, or a well-timed spark.',
  },
]

const SWIPE_THRESHOLD = 50

function UsIntroCarousel() {
  const [index, setIndex] = useState(0)
  const dragX = useRef<number | null>(null)
  const slide = US_INTRO_SLIDES[index]

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0 && index < US_INTRO_SLIDES.length - 1) setIndex(index + 1)
    if (dx > 0 && index > 0) setIndex(index - 1)
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'pan-y', userSelect: 'none' }}
    >
      <div
        style={{
          width: '100%',
          height: 207,
          borderRadius: 16,
          background: '#ebeef5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 12,
            color: 'var(--acoh-muted)',
          }}
        >
          [ illustration {index + 1} / {US_INTRO_SLIDES.length} ]
        </span>
      </div>

      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: '8px 0',
        }}
      >
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--acoh-foreground)',
          }}
        >
          {slide.title}
        </div>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 14,
            color: 'var(--acoh-body)',
            lineHeight: '20px',
          }}
        >
          {slide.body}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          padding: '16px 0 4px',
        }}
      >
        {US_INTRO_SLIDES.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              cursor: 'pointer',
              background:
                i === index ? 'var(--acoh-primary)' : 'rgba(44,46,42,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function FocusAreaOverview() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()

  const openIntro = () =>
    sheet.open({ title: 'Quick tour', body: <UsIntroCarousel /> })

  useEffect(() => {
    if (hasSeenTour('us')) return
    const t = setTimeout(() => {
      recordTourSeen('us')
      openIntro()
    }, 400)
    return () => clearTimeout(t)
  }, [sheet])

  return (
    <AuthShell>
      <TabTopBar
        title="Us"
        onAvatarPress={() => navigate('/notifications')}
        onHelpPress={openIntro}
      />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={12}>
        <XStack justifyContent="space-between" alignItems="center">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={16}
            fontWeight="700"
            color="var(--acoh-foreground)"
          >
            Focus Areas
          </Text>
          <XStack
            cursor="pointer"
            onPress={() => navigate('/habits/focus-area-management')}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              fontWeight="500"
              color="var(--acoh-accent)"
            >
              Manage →
            </Text>
          </XStack>
        </XStack>

        {FOCUS_AREAS.map(area => (
          <FocusAreaCard
            key={area.id}
            area={area}
            onPress={() => navigate(`/shared/focus-area-detail/${area.id}`)}
          />
        ))}

        <YStack height={8} />
        <SummarySection
          title="Weekly Check-In"
          linkText="Start →"
          onLinkPress={() => navigate('/us/weekly-check-in')}
          primary="Check-in due this week"
          secondary="You: Not started"
          onRowPress={() => navigate('/us/weekly-check-in')}
        />

        <YStack height={8} />
        <SummarySection
          title="This Week's Insight"
          linkText="View →"
          onLinkPress={() => navigate('/us/key-insight')}
          primary="Intimacy alignment is dropping"
          secondary="Your ratings differ by 2 points"
          onRowPress={() => navigate('/us/key-insight')}
        />

        <YStack height={8} />
        <SummarySection
          title="Suggested Action"
          linkText="View →"
          onLinkPress={() => navigate('/us/suggested-actions')}
          primary="Have a conversation about Intimacy"
          secondary="Based on alignment score (40%)"
          onRowPress={() => navigate('/us/suggested-actions')}
        />
      </YStack>
    </AuthShell>
  )
}

function FocusAreaCard({
  area,
  onPress,
}: {
  area: FocusArea
  onPress: () => void
}) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      gap={8}
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.99, opacity: 0.95 }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          {area.name}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="700"
          color="var(--acoh-foreground)"
        >
          {area.score}/10
        </Text>
      </XStack>
      <XStack
        height={6}
        backgroundColor="var(--acoh-border)"
        borderRadius={3}
        overflow="hidden"
      >
        <XStack
          height={6}
          width={`${(area.score / 10) * 100}%` as any}
          backgroundColor="var(--acoh-accent)"
          borderRadius={3}
        />
      </XStack>
      <XStack gap={6} alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          fontWeight="600"
          color={RATING_COLOR[area.rating]}
        >
          {area.rating}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          ·
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          {area.trend}
        </Text>
      </XStack>
    </YStack>
  )
}

function SummarySection({
  title,
  linkText,
  onLinkPress,
  primary,
  secondary,
  onRowPress,
}: {
  title: string
  linkText: string
  onLinkPress: () => void
  primary: string
  secondary: string
  onRowPress: () => void
}) {
  return (
    <>
      <XStack justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-foreground)"
        >
          {title}
        </Text>
        <XStack cursor="pointer" onPress={onLinkPress}>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            fontWeight="500"
            color="var(--acoh-accent)"
          >
            {linkText}
          </Text>
        </XStack>
      </XStack>
      <XStack
        backgroundColor="#ebebf9"
        borderRadius={9}
        paddingHorizontal={16}
        paddingVertical={14}
        alignItems="center"
        cursor="pointer"
        onPress={onRowPress}
        pressStyle={{ scale: 0.99, opacity: 0.95 }}
      >
        <YStack flex={1} gap={2}>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            {primary}
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            {secondary}
          </Text>
        </YStack>
      </XStack>
    </>
  )
}
