import { useEffect, useRef, useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Square, SquareCheckBig, Pencil } from 'lucide-react'
import { AuthShell } from '../../components/auth-ui'
import { TabTopBar, hasSeenTour, recordTourSeen } from '../../components/home-ui'
import { useBottomSheet } from '../../components/BottomSheet'

type Habit = {
  id: number
  name: string
  frequency: string
  type: 'Shared' | 'Personal'
  completed: boolean
}

type HabitGroup = {
  focusArea: string
  habits: Habit[]
}

const INITIAL_GROUPS: HabitGroup[] = [
  {
    focusArea: 'Finances',
    habits: [
      { id: 1, name: 'Weekly budget check', frequency: 'Weekly', type: 'Shared', completed: true },
      { id: 2, name: 'Track daily spending', frequency: 'Daily', type: 'Personal', completed: false },
    ],
  },
  {
    focusArea: 'Intimacy',
    habits: [
      { id: 3, name: 'Daily hug or kiss', frequency: 'Daily', type: 'Shared', completed: false },
      { id: 4, name: 'Date night planning', frequency: 'Weekly', type: 'Shared', completed: true },
    ],
  },
  {
    focusArea: 'Parenting',
    habits: [
      { id: 5, name: 'Family dinner together', frequency: 'Daily', type: 'Shared', completed: true },
      { id: 6, name: 'Read bedtime story', frequency: 'Daily', type: 'Personal', completed: false },
    ],
  },
]

/* ── Habits tour slides (placeholder copy) ────────────────────────── */
type IntroSlide = { title: string; body: string }
const HABITS_INTRO_SLIDES: IntroSlide[] = [
  {
    title: 'Build habits together.',
    body: "Grouped by focus area. Track daily or weekly and see what you've both been doing.",
  },
  {
    title: 'Tap to mark it done.',
    body: 'Checkboxes are fast — tap a habit the moment you finish it, or at the end of your day.',
  },
  {
    title: 'Suggest habits to your partner.',
    body: 'See one you want to try together? Send it over — they can Accept, Decline, or Modify.',
  },
  {
    title: 'Manage your focus areas.',
    body: "Add, remove, or reprioritize the areas you're both investing in. Changes need partner approval.",
  },
  {
    title: 'Keep it realistic.',
    body: 'Start with 1–2 habits per focus area. You can always add more once a rhythm settles in.',
  },
]

const SWIPE_THRESHOLD = 50

function HabitsIntroCarousel() {
  const [index, setIndex] = useState(0)
  const dragX = useRef<number | null>(null)
  const slide = HABITS_INTRO_SLIDES[index]

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0 && index < HABITS_INTRO_SLIDES.length - 1) setIndex(index + 1)
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
          [ illustration {index + 1} / {HABITS_INTRO_SLIDES.length} ]
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
        {HABITS_INTRO_SLIDES.map((_, i) => (
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

export function HabitList() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const [groups, setGroups] = useState<HabitGroup[]>(INITIAL_GROUPS)

  const openIntro = () =>
    sheet.open({ title: 'Quick tour', body: <HabitsIntroCarousel /> })

  useEffect(() => {
    if (hasSeenTour('habits')) return
    const t = setTimeout(() => {
      recordTourSeen('habits')
      openIntro()
    }, 400)
    return () => clearTimeout(t)
  }, [sheet])

  const toggle = (groupIdx: number, habitId: number) =>
    setGroups(prev =>
      prev.map((g, i) =>
        i !== groupIdx
          ? g
          : {
              ...g,
              habits: g.habits.map(h =>
                h.id === habitId ? { ...h, completed: !h.completed } : h
              ),
            }
      )
    )

  return (
    <AuthShell>
      <TabTopBar
        title="Habits"
        onAvatarPress={() => navigate('/notifications')}
        onHelpPress={openIntro}
      />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={8}>
        <XStack
          backgroundColor="var(--acoh-accent)"
          borderRadius={9}
          paddingHorizontal={14}
          paddingVertical={16}
          alignItems="center"
          justifyContent="space-between"
          cursor="pointer"
          onPress={() => navigate('/shared/habit-suggestions')}
          pressStyle={{ scale: 0.98, opacity: 0.92 }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            fontWeight="600"
            color="#FFFFFF"
          >
            Your partner suggested a habit
          </Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </XStack>

        <YStack height={4} />

        {groups.map((g, gi) => (
          <YStack key={g.focusArea} gap={8}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                fontWeight="700"
                color="var(--acoh-body)"
              >
                {g.focusArea}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                {g.habits.length} habits
              </Text>
            </XStack>

            {g.habits.map(h => (
              <HabitRow
                key={h.id}
                habit={h}
                onToggle={() => toggle(gi, h.id)}
                onOpen={() => navigate(`/shared/habit-detail/${h.id}`)}
              />
            ))}
            <YStack height={4} />
          </YStack>
        ))}

        {/* Add Habit — primary */}
        <XStack
          height={48}
          borderRadius={24}
          backgroundColor="var(--acoh-primary)"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onPress={() => navigate('/shared/add-habit')}
          pressStyle={{ scale: 0.98, opacity: 0.92 }}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="#FFFFFF"
          >
            + Add Habit
          </Text>
        </XStack>

        {/* Suggest a Habit — outline */}
        <XStack
          height={48}
          borderRadius={24}
          backgroundColor="#FFFFFF"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onPress={() => navigate('/shared/suggest-a-habit')}
          pressStyle={{ scale: 0.98, opacity: 0.92 }}
          style={{ border: '1px solid rgba(44,46,42,0.15)' }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            + Suggest a Habit
          </Text>
        </XStack>

      </YStack>
    </AuthShell>
  )
}

function HabitRow({
  habit,
  onToggle,
  onOpen,
}: {
  habit: Habit
  onToggle: () => void
  onOpen: () => void
}) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={12}
      gap={12}
      alignItems="center"
      cursor="pointer"
      onPress={onOpen}
      pressStyle={{ scale: 0.99, opacity: 0.95 }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {habit.completed ? (
          <SquareCheckBig size={22} color="var(--acoh-foreground)" />
        ) : (
          <Square size={22} color="var(--acoh-muted)" />
        )}
      </div>
      <YStack flex={1} gap={2}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color={habit.completed ? 'var(--acoh-muted)' : 'var(--acoh-foreground)'}
          textDecorationLine={habit.completed ? 'line-through' : 'none'}
        >
          {habit.name}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          {habit.frequency} · {habit.type}
        </Text>
      </YStack>
      <Pencil size={16} color="var(--acoh-muted)" />
    </XStack>
  )
}
