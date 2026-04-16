import { YStack, XStack, Text } from 'tamagui'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type BreakdownRow = { input: string; value: string }
type HistoryRow = { label: string; score: number; current?: boolean }

type AreaDetail = {
  name: string
  score: number
  trend: string
  breakdown: BreakdownRow[]
  history: HistoryRow[]
}

const AREA_DETAILS: Record<string, AreaDetail> = {
  finances: {
    name: 'Finances',
    score: 3,
    trend: 'Trending up',
    breakdown: [
      { input: 'Habit Completion (40%)', value: '62%' },
      { input: 'Check-In Average (35%)', value: '3/10' },
      { input: 'Alignment (15%)', value: '70%' },
      { input: 'Consistency (10%)', value: 'Medium' },
    ],
    history: [
      { label: 'Week 8 (Current)', score: 3, current: true },
      { label: 'Week 7', score: 3 },
      { label: 'Week 6', score: 2 },
      { label: 'Week 5', score: 2 },
      { label: 'Week 4', score: 3 },
      { label: 'Week 3', score: 2 },
      { label: 'Week 2', score: 2 },
      { label: 'Week 1', score: 1 },
    ],
  },
  intimacy: {
    name: 'Intimacy',
    score: 5,
    trend: 'Stable',
    breakdown: [
      { input: 'Habit Completion (40%)', value: '85%' },
      { input: 'Check-In Average (35%)', value: '5/10' },
      { input: 'Alignment (15%)', value: '40%' },
      { input: 'Consistency (10%)', value: 'High' },
    ],
    history: [
      { label: 'Week 8 (Current)', score: 5, current: true },
      { label: 'Week 7', score: 5 },
      { label: 'Week 6', score: 6 },
      { label: 'Week 5', score: 5 },
      { label: 'Week 4', score: 6 },
      { label: 'Week 3', score: 5 },
      { label: 'Week 2', score: 4 },
      { label: 'Week 1', score: 5 },
    ],
  },
  parenting: {
    name: 'Parenting',
    score: 5,
    trend: 'Trending up',
    breakdown: [
      { input: 'Habit Completion (40%)', value: '78%' },
      { input: 'Check-In Average (35%)', value: '5/10' },
      { input: 'Alignment (15%)', value: '85%' },
      { input: 'Consistency (10%)', value: 'High' },
    ],
    history: [
      { label: 'Week 8 (Current)', score: 5, current: true },
      { label: 'Week 7', score: 4 },
      { label: 'Week 6', score: 4 },
      { label: 'Week 5', score: 4 },
      { label: 'Week 4', score: 3 },
      { label: 'Week 3', score: 3 },
      { label: 'Week 2', score: 3 },
      { label: 'Week 1', score: 2 },
    ],
  },
}

export function FocusAreaDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const area: AreaDetail = (id ? AREA_DETAILS[id] : undefined) ?? AREA_DETAILS.intimacy

  return (
    <AuthShell>
      <HomeNavBar title="Focus Area Detail" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={12}>
        {/* Hero */}
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={22}
          fontWeight="600"
          color="var(--acoh-foreground)"
          textAlign="center"
          width="100%"
        >
          {area.name}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={32}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
          width="100%"
        >
          {area.score}/10
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          {area.trend}
        </Text>

        {/* Score Breakdown */}
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Score Breakdown
        </Text>
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={14}
          gap={8}
        >
          {area.breakdown.map(row => (
            <XStack key={row.input} justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={13}
                color="var(--acoh-body)"
              >
                {row.input}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={13}
                fontWeight="600"
                color="var(--acoh-body)"
              >
                {row.value}
              </Text>
            </XStack>
          ))}
        </YStack>

        {/* History */}
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          8-Week History
        </Text>
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={12}
          gap={6}
        >
          {area.history.map(row => (
            <XStack key={row.label} justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={13}
                fontWeight={row.current ? '600' : '400'}
                color="var(--acoh-body)"
              >
                {row.label}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={13}
                fontWeight={row.current ? '700' : '400'}
                color="var(--acoh-body)"
              >
                {row.score}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </AuthShell>
  )
}
