import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Square,
  SquareCheckBig,
  Sparkles,
  Flame,
  Target,
  HeartHandshake,
  HelpCircle,
} from 'lucide-react'
import { TODAYS_HABITS, SPARKS } from '../../data/fakeData'
import { AVATAR_ME } from '../../assets/home'
import { useBottomSheet } from '../../components/BottomSheet'
import { useToast } from '../../components/Toast'
import { hasSeenTour, recordTourSeen } from '../../components/home-ui'

type DashboardState = 'full' | 'solo' | 'pending'

/* ── Home tour slides (placeholder copy) ──────────────────────────── */
type IntroSlide = { title: string; body: string }
const HOME_INTRO_SLIDES: IntroSlide[] = [
  {
    title: 'Welcome to your Today view.',
    body: "This is where you'll check in every day — spot what needs your attention and take a couple quick actions.",
  },
  {
    title: 'Stay on top of announcements.',
    body: 'The banner at the top surfaces anything waiting on you — approvals, partner actions, or setup tasks.',
  },
  {
    title: 'Check off your habits.',
    body: "Today's habits live here. Tap any one to mark it complete — streaks build quietly in the background.",
  },
  {
    title: 'Celebrate each other.',
    body: 'Recent sparks from your partner show up here. Send one back to keep the energy going.',
  },
  {
    title: 'Take action fast.',
    body: 'Quick Actions give you one-tap shortcuts to the things you do most — send a spark, kick off a check-in.',
  },
]

const SWIPE_THRESHOLD = 50

function HomeIntroCarousel() {
  const [index, setIndex] = useState(0)
  const dragX = useRef<number | null>(null)
  const slide = HOME_INTRO_SLIDES[index]

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0 && index < HOME_INTRO_SLIDES.length - 1) setIndex(index + 1)
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
          [ illustration {index + 1} / {HOME_INTRO_SLIDES.length} ]
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
        {HOME_INTRO_SLIDES.map((_, i) => (
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

export function Dashboard() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const toast = useToast()
  const [state, setState] = useState<DashboardState>('full')
  const [habits, setHabits] = useState(TODAYS_HABITS.map(h => ({ ...h })))

  const toggleHabit = (id: number) =>
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h)))

  const openIntro = () =>
    sheet.open({ title: 'Quick tour', body: <HomeIntroCarousel /> })

  useEffect(() => {
    if (hasSeenTour('home')) return
    const t = setTimeout(() => {
      recordTourSeen('home')
      openIntro()
    }, 400)
    return () => clearTimeout(t)
  }, [sheet])

  return (
    <YStack flex={1} backgroundColor="var(--acoh-bg-pale)" paddingTop={44}>
      {/* TopBar */}
      <XStack
        height={48}
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
          Today
        </Text>
        <XStack gap={12} alignItems="center">
        <HelpCircle
          size={22}
          color="var(--acoh-accent)"
          cursor="pointer"
          onClick={openIntro}
        />
        <XStack
          position="relative"
          width={32}
          height={32}
          cursor="pointer"
          onPress={() => navigate('/notifications')}
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

      {/* ScrollContent */}
      <YStack paddingHorizontal={16} paddingTop={24} paddingBottom={40} gap={12}>
        <SectionLabel>Today's Announcements</SectionLabel>

        {state === 'full' && (
          <ApprovalBanner onPress={() => navigate('/home/approvals')} />
        )}
        {state === 'solo' && (
          <InvitePartnerCard onPress={() => navigate('/onboarding/send-invitation')} />
        )}
        {state === 'pending' && (
          <AlignmentNeededCard onPress={() => navigate('/home/review-ratings')} />
        )}

        <Spacer />
        <SectionHeaderRow
          title="Your Habits Today"
          linkText="View all →"
          onLinkPress={() => navigate('/habits')}
        />

        {state === 'solo' ? (
          <HabitsEmptyState onPress={() => navigate('/shared/add-habit')} />
        ) : (
          habits.slice(0, 3).map(h => (
            <HabitItem
              key={h.id}
              name={h.name}
              meta={`${h.focusArea} · ${h.frequency}`}
              completed={h.completed}
              onToggle={() => toggleHabit(h.id)}
            />
          ))
        )}

        {state !== 'solo' && (
          <>
            <Spacer />
            <SectionHeaderRow
              title="Recent Sparks"
              linkText="View all →"
              onLinkPress={() => navigate('/home/sparks')}
            />
            <SparkCard
              sender="Partner"
              message={SPARKS[0]?.message ?? 'Great job on the check-in!'}
              onPress={() => navigate('/home/sparks')}
            />
          </>
        )}

        <Spacer />
        <SectionLabel>Quick Actions</SectionLabel>
        <QuickActionsRow
          left={{
            label: 'Send Spark',
            onPress:
              state === 'solo'
                ? () => toast.show('You must be partnered to send sparks')
                : () => navigate('/shared/send-spark'),
          }}
          right={{ label: 'Check-In', onPress: () => navigate('/us/weekly-check-in') }}
        />
      </YStack>

      {/* Dev state toggle — floating below phone */}
      <DashboardStateToggle state={state} onChange={setState} />
    </YStack>
  )
}

/* ─────────────────────────── Sub-components ─────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontFamily="Outfit, sans-serif"
      fontSize={16}
      fontWeight="700"
      color="var(--acoh-body)"
    >
      {children}
    </Text>
  )
}

function SectionHeaderRow({
  title,
  linkText,
  onLinkPress,
}: {
  title: string
  linkText?: string
  onLinkPress?: () => void
}) {
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <SectionLabel>{title}</SectionLabel>
      {linkText && (
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
      )}
    </XStack>
  )
}

function Spacer() {
  return <YStack height={4} />
}

function ApprovalBanner({ onPress }: { onPress?: () => void }) {
  return (
    <XStack
      backgroundColor="var(--acoh-accent)"
      borderRadius={9}
      paddingHorizontal={14}
      paddingVertical={16}
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.92 }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        fontWeight="600"
        color="#FFFFFF"
      >
        You have pending approvals
      </Text>
      <ArrowRight size={16} color="#FFFFFF" />
    </XStack>
  )
}

function InvitePartnerCard({ onPress }: { onPress?: () => void }) {
  return (
    <YStack
      backgroundColor="var(--acoh-accent)"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={20}
      gap={12}
      alignItems="center"
    >
      <HeartHandshake size={24} color="#FFFFFF" strokeWidth={2} />
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={16}
        fontWeight="700"
        color="#FFFFFF"
        textAlign="center"
        width="100%"
      >
        Better together
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        color="#FFFFFF"
        textAlign="center"
        width="100%"
        lineHeight={18}
      >
        Invite your partner to unlock shared habits, progress tracking, and sparks.
      </Text>
      <YStack height={4} />
      <XStack
        height={48}
        width="100%"
        borderRadius={24}
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onPress={onPress}
        pressStyle={{ scale: 0.98, opacity: 0.92 }}
        style={{
          border: '1px solid #FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={15}
          fontWeight="600"
          color="#FFFFFF"
        >
          Invite Partner
        </Text>
      </XStack>
    </YStack>
  )
}

function AlignmentNeededCard({ onPress }: { onPress?: () => void }) {
  return (
    <YStack
      backgroundColor="var(--acoh-accent)"
      borderRadius={9}
      padding={16}
      gap={16}
    >
      <XStack gap={8} alignItems="center">
        <Target size={18} color="#FFFFFF" strokeWidth={2} />
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="700"
          color="#FFFFFF"
        >
          Focus Area Alignment Needed
        </Text>
      </XStack>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        color="#FFFFFF"
        lineHeight={18}
      >
        Your baseline ratings differ. Review with your partner and agree on shared ratings to unlock scoring.
      </Text>

      <AlignmentRow area="Communication" youValue={7} />
      <AlignmentRow area="Quality Time" youValue={8} />

      <XStack
        height={48}
        width="100%"
        borderRadius={24}
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onPress={onPress}
        pressStyle={{ scale: 0.98, opacity: 0.92 }}
        style={{
          border: '1px solid #FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={15}
          fontWeight="600"
          color="#FFFFFF"
        >
          Review Ratings
        </Text>
      </XStack>
    </YStack>
  )
}

function AlignmentRow({ area, youValue }: { area: string; youValue: number }) {
  const fillPct = (youValue / 10) * 100
  return (
    <YStack gap={6}>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        fontWeight="600"
        color="#FFFFFF"
      >
        {area}
      </Text>
      <XStack gap={8} alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="#FFFFFF"
          width={50}
        >
          You
        </Text>
        <XStack
          flex={1}
          height={8}
          backgroundColor="var(--acoh-bg-pale)"
          borderRadius={4}
          overflow="hidden"
        >
          <XStack
            height={8}
            width={`${fillPct}%` as any}
            backgroundColor="#2a2c60"
            borderRadius={4}
          />
        </XStack>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          fontWeight="600"
          color="#FFFFFF"
        >
          {youValue}
        </Text>
      </XStack>
    </YStack>
  )
}

function HabitItem({
  name,
  meta,
  completed,
  onToggle,
}: {
  name: string
  meta: string
  completed: boolean
  onToggle: () => void
}) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      padding={14}
      gap={10}
      alignItems="center"
      cursor="pointer"
      onPress={onToggle}
      pressStyle={{ scale: 0.99, opacity: 0.92 }}
    >
      {completed ? (
        <SquareCheckBig size={22} color="var(--acoh-foreground)" />
      ) : (
        <Square size={22} color="var(--acoh-muted)" />
      )}
      <YStack flex={1} gap={2}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color={completed ? 'var(--acoh-muted)' : 'var(--acoh-foreground)'}
          textDecorationLine={completed ? 'line-through' : 'none'}
        >
          {name}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          {meta}
        </Text>
      </YStack>
    </XStack>
  )
}

function HabitsEmptyState({ onPress }: { onPress?: () => void }) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={12}
      paddingVertical={24}
      gap={12}
      alignItems="center"
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        color="var(--acoh-body)"
        textAlign="center"
        width="100%"
        lineHeight={20}
      >
        No habits yet. Start building your daily routine.
      </Text>
      <XStack
        height={48}
        width="100%"
        borderRadius={24}
        backgroundColor="var(--acoh-primary)"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onPress={onPress}
        pressStyle={{ scale: 0.98, opacity: 0.92 }}
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={15}
          fontWeight="600"
          color="#FFFFFF"
        >
          Add a Habit
        </Text>
      </XStack>
    </YStack>
  )
}

function SparkCard({
  sender,
  message,
  onPress,
}: {
  sender: string
  message: string
  onPress?: () => void
}) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={12}
      paddingHorizontal={14}
      paddingVertical={12}
      gap={12}
      alignItems="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.99, opacity: 0.92 }}
    >
      <Sparkles size={20} color="var(--acoh-foreground)" />
      <YStack gap={2} flex={1}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          {sender}
        </Text>
        <XStack gap={10} alignItems="center">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            color="var(--acoh-body)"
          >
            {message}
          </Text>
          <Flame size={18} color="var(--acoh-foreground)" />
        </XStack>
      </YStack>
    </XStack>
  )
}

function QuickActionsRow({
  left,
  right,
}: {
  left: { label: string; onPress?: () => void }
  right: { label: string; onPress?: () => void }
}) {
  return (
    <XStack gap={16}>
      <QuickActionPill label={left.label} onPress={left.onPress} />
      <QuickActionPill label={right.label} onPress={right.onPress} />
    </XStack>
  )
}

function QuickActionPill({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <XStack
      flex={1}
      height={40}
      backgroundColor="#FFFFFF"
      borderRadius={24}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      style={{ border: '1px solid var(--acoh-border)' }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={15}
        fontWeight="600"
        color="var(--acoh-body)"
      >
        {label}
      </Text>
    </XStack>
  )
}

function DashboardStateToggle({
  state,
  onChange,
}: {
  state: DashboardState
  onChange: (s: DashboardState) => void
}) {
  const options: { value: DashboardState; label: string }[] = [
    { value: 'full', label: 'Full' },
    { value: 'solo', label: 'Solo' },
    { value: 'pending', label: 'Pending' },
  ]
  return createPortal(
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        gap: 2,
        background: '#FFFFFF',
        padding: 4,
        borderRadius: 999,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {options.map(opt => {
        const active = state === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              background: active ? 'var(--acoh-foreground)' : 'transparent',
              color: active ? '#FFFFFF' : '#8C8C8C',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>,
    document.body
  )
}
