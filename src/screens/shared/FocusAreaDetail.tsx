import { YStack, XStack, Text } from 'tamagui'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText } from '../../components/shared'
import { FOCUS_AREAS } from '../../data/fakeData'

const BREAKDOWN = [
  { input: 'Habit Completion', weight: '40%', value: '85%' },
  { input: 'Check-In Average', weight: '35%', value: '7.5/10' },
  { input: 'Alignment', weight: '15%', value: '90%' },
  { input: 'Consistency', weight: '10%', value: 'High' },
]

const HISTORY = [
  { week: 'Week 8 (Current)', score: 78 },
  { week: 'Week 7', score: 75 },
  { week: 'Week 6', score: 72 },
  { week: 'Week 5', score: 68 },
  { week: 'Week 4', score: 71 },
  { week: 'Week 3', score: 65 },
  { week: 'Week 2', score: 60 },
  { week: 'Week 1', score: 55 },
]

export function FocusAreaDetail() {
  const { id } = useParams()
  const area = FOCUS_AREAS.find(fa => fa.id === Number(id)) ?? FOCUS_AREAS[0]

  return (
    <YStack flex={1}>
      <NavBar title="Focus Area Detail" />
      <ScreenContent>
        <YStack alignItems="center" gap={4}>
          <Text fontSize={22} fontWeight="700" color="#1C1C1C">{area.name}</Text>
          <Text fontSize={32} fontWeight="700" color="#1C1C1C">78/100</Text>
          <MutedText>Trending up · Alignment: 90%</MutedText>
        </YStack>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Score Breakdown</Text>
        <BorderCard>
          <YStack gap={8}>
            {BREAKDOWN.map(row => (
              <XStack key={row.input} justifyContent="space-between">
                <MutedText>{row.input} ({row.weight})</MutedText>
                <Text fontSize={14} color="#1C1C1C">{row.value}</Text>
              </XStack>
            ))}
          </YStack>
        </BorderCard>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">8-Week History</Text>
        <BorderCard>
          <YStack gap={4}>
            <XStack justifyContent="space-between">
              <MutedText size={12}>Week</MutedText>
              <MutedText size={12}>Score</MutedText>
            </XStack>
            {HISTORY.map(w => (
              <XStack key={w.week} justifyContent="space-between" paddingVertical={2}>
                <Text fontSize={13} color="#1C1C1C">{w.week}</Text>
                <Text fontSize={13} color="#1C1C1C">{w.score}</Text>
              </XStack>
            ))}
          </YStack>
        </BorderCard>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Linked</Text>
        <BorderCard>
          <YStack gap={8}>
            <Text fontSize={14} fontWeight="600" color="#1C1C1C">Goal: Improve daily dialogue</Text>
            <Text fontSize={13} color="#1C1C1C">10-min check-in (Daily, Shared)</Text>
            <Text fontSize={13} color="#1C1C1C">Express gratitude (Daily, Personal)</Text>
          </YStack>
        </BorderCard>
      </ScreenContent>
    </YStack>
  )
}
