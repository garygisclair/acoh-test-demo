import { useEffect, useRef, useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  MessagesSquare,
  PiggyBank,
  HeartPulse,
  Home,
  Blend,
  Baby,
  Flower2,
  Clock,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'
import { AuthShell, BackButton, PrimaryPillButton } from '../../components/auth-ui'
import { useBottomSheet } from '../../components/BottomSheet'

type RatingArea = {
  key: string
  label: string
  icon: LucideIcon
  initial: number
}

/* ── "Next steps" bottom-sheet carousel slides ────────────────────── */
type IntroSlide = { title: string; body: string }
const INTRO_SLIDES: IntroSlide[] = [
  {
    title: "Let's find your focus areas.",
    body: 'Rate how you feel about each area, pick the ones that matter most, and confirm them with your partner.',
  },
  {
    title: 'Rate each area from 1 to 10.',
    body: "1 means it needs real work. 10 means it's thriving. Be honest — this is your baseline.",
  },
  {
    title: "We'll suggest 3 focus areas.",
    body: 'Based on your ratings. Tap any card to select or deselect — you can always change them later.',
  },
  {
    title: 'Review before you lock it in.',
    body: 'Double-check your focus areas and ratings on the review screen before continuing.',
  },
  {
    title: "You're in this together.",
    body: "Setup completes once both of you confirm. We'll let you know when your partner finishes.",
  },
]

const SWIPE_THRESHOLD = 50

export function IntroCarousel() {
  const [index, setIndex] = useState(0)
  const dragX = useRef<number | null>(null)
  const slide = INTRO_SLIDES[index]

  const onPointerDown = (e: React.PointerEvent) => { dragX.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0 && index < INTRO_SLIDES.length - 1) setIndex(index + 1)
    if (dx > 0 && index > 0) setIndex(index - 1)
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'pan-y', userSelect: 'none' }}
    >
      {/* Illustration placeholder */}
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
          [ illustration {index + 1} / 5 ]
        </span>
      </div>

      {/* Title + body */}
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

      {/* Dots */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          padding: '16px 0 4px',
        }}
      >
        {INTRO_SLIDES.map((_, i) => (
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

/* ── Rating areas ─────────────────────────────────────────────────── */
const AREAS: RatingArea[] = [
  { key: 'communication', label: 'Communication', icon: MessagesSquare, initial: 7 },
  { key: 'finances', label: 'Finances', icon: PiggyBank, initial: 4 },
  { key: 'health', label: 'Health & Energy', icon: HeartPulse, initial: 8 },
  { key: 'household', label: 'Household', icon: Home, initial: 6 },
  { key: 'intimacy', label: 'Intimacy', icon: Blend, initial: 5 },
  { key: 'parenting', label: 'Parenting', icon: Baby, initial: 5 },
  { key: 'growth', label: 'Personal Growth', icon: Flower2, initial: 7 },
  { key: 'quality_time', label: 'Quality Time', icon: Clock, initial: 7 },
]

/**
 * Custom slider matching the Figma spec:
 * - 6px track, rounded-3
 * - Filled portion uses accent purple; unfilled is rgba(44,46,42,0.15)
 * - 20px white handle with accent border + subtle shadow
 * An invisible native range input is overlaid for drag/touch interaction.
 */
function Slider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const pct = ((value - 1) / 9) * 100
  return (
    <div style={{ position: 'relative', height: 24, width: '100%' }}>
      {/* Track bg */}
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: 0,
          right: 0,
          height: 6,
          borderRadius: 3,
          background: 'rgba(44,46,42,0.15)',
        }}
      />
      {/* Track fill */}
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: 0,
          width: `${pct}%`,
          height: 6,
          borderRadius: 3,
          background: 'var(--acoh-accent)',
        }}
      />
      {/* Handle */}
      <div
        style={{
          position: 'absolute',
          top: 2,
          left: `calc(${pct}% - 10px)`,
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#FFFFFF',
          border: '2px solid var(--acoh-accent)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}
      />
      {/* Invisible native range — handles drag/touch */}
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  )
}

function RatingRow({
  area,
  value,
  onChange,
  showScale,
}: {
  area: RatingArea
  value: number
  onChange: (v: number) => void
  showScale?: boolean
}) {
  const Icon = area.icon
  return (
    <YStack gap={4} width="100%">
      <XStack gap={12} alignItems="center">
        <Icon size={18} color="var(--acoh-accent)" strokeWidth={2} />
        <Text
          flex={1}
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          {area.label}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-foreground)"
        >
          {value}
        </Text>
      </XStack>
      <Slider value={value} onChange={onChange} />
      {showScale && (
        <XStack justifyContent="space-between" width="100%">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={11}
            color="var(--acoh-muted)"
          >
            1
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={11}
            color="var(--acoh-muted)"
          >
            10
          </Text>
        </XStack>
      )}
    </YStack>
  )
}

export function BaselineRatings() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const sheetOpened = useRef(false)
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(AREAS.map((a) => [a.key, a.initial]))
  )

  const openIntro = () =>
    sheet.open({ title: 'Next steps', body: <IntroCarousel /> })

  // Auto-open the "Next steps" intro carousel on first mount
  useEffect(() => {
    if (sheetOpened.current) return
    sheetOpened.current = true
    const t = setTimeout(openIntro, 400)
    return () => clearTimeout(t)
  }, [sheet])

  const setOne = (key: string, v: number) =>
    setRatings((prev) => ({ ...prev, [key]: v }))

  const goNext = () => navigate('/onboarding/select-focus-areas')

  return (
    <AuthShell>
      {/* NavBar — clears overlaid status bar via marginTop=44 */}
      <XStack
        marginTop={44}
        height={48}
        paddingHorizontal={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <BackButton onPress={() => navigate(-1)} />
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          Setup (1/3)
        </Text>
        <XStack gap={12} alignItems="center">
          <HelpCircle
            size={22}
            color="var(--acoh-accent)"
            cursor="pointer"
            onClick={openIntro}
          />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="500"
            color="var(--acoh-accent)"
            cursor="pointer"
            onPress={goNext}
          >
            Skip
          </Text>
        </XStack>
      </XStack>

      {/* Content */}
      <YStack padding={24} gap={8}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={22}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
          width="100%"
        >
          Rate Each Focus Area
        </Text>
        <YStack gap={0} alignItems="center" width="100%">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            color="var(--acoh-body)"
            textAlign="center"
          >
            How do you feel about each area right now?
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-body)"
            textAlign="center"
          >
            (1 = needs work, 10 = thriving)
          </Text>
        </YStack>

        <YStack height={4} />

        {/* 8 rating rows — last one shows the 1 / 10 scale below its track */}
        <YStack gap={21} width="100%">
          {AREAS.map((area, i) => (
            <RatingRow
              key={area.key}
              area={area}
              value={ratings[area.key]}
              onChange={(v) => setOne(area.key, v)}
              showScale={i === AREAS.length - 1}
            />
          ))}
        </YStack>

        <YStack height={16} />

        <PrimaryPillButton label="Continue" onPress={goNext} />
      </YStack>
    </AuthShell>
  )
}
