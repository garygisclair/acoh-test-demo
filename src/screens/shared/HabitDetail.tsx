import { YStack, XStack, Text, Input } from 'tamagui'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText, OutlineButton, WireCard } from '../../components/shared'
import { HABITS } from '../../data/fakeData'
import { CheckCircle, Circle, Flame, Trophy, Mic } from 'lucide-react'

const HISTORY_DAYS = [
  { label: 'Today', completed: true },
  { label: 'Yesterday', completed: true },
  { label: 'Monday', completed: false },
  { label: 'Sunday', completed: true },
  { label: 'Saturday', completed: true },
  { label: 'Friday', completed: false },
  { label: 'Thursday', completed: true },
]

export function HabitDetail() {
  const { id } = useParams()
  const habit = HABITS.find(h => h.id === Number(id)) ?? HABITS[0]

  return (
    <YStack flex={1}>
      <NavBar title="Habit Detail" />
      <ScreenContent>
        <YStack gap={4}>
          <Text fontSize={22} fontWeight="600" color="#1C1C1C">{habit.name}</Text>
          <MutedText>{habit.focusArea} · {habit.frequency}</MutedText>
        </YStack>

        {/* Detail card */}
        <BorderCard>
          <YStack gap={8}>
            <XStack justifyContent="space-between">
              <MutedText>Type</MutedText>
              <Text fontSize={14} color="#1C1C1C">{habit.type}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Frequency</MutedText>
              <Text fontSize={14} color="#1C1C1C">{habit.frequency}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Focus Area</MutedText>
              <Text fontSize={14} color="#1C1C1C">{habit.focusArea}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Goal</MutedText>
              <Text fontSize={14} color="#1C1C1C">Improve daily dialogue</Text>
            </XStack>
          </YStack>
        </BorderCard>

        {/* Streak card */}
        <BorderCard>
          <XStack alignItems="center" gap={8}>
            <Flame size={20} color="#1C1C1C" />
            <Text fontSize={16} fontWeight="600" color="#1C1C1C">{habit.streak} days</Text>
            <XStack flex={1} />
            <Trophy size={20} color="#8C8C8C" />
            <MutedText>Next: 30 days</MutedText>
          </XStack>
        </BorderCard>

        {/* Completion History */}
        <Text fontSize={16} fontWeight="600" color="#1C1C1C">Completion History</Text>
        <YStack gap={8}>
          {HISTORY_DAYS.map(day => (
            <WireCard key={day.label} padding={12}>
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={14} color="#1C1C1C">{day.label}</Text>
                {day.completed
                  ? <CheckCircle size={20} color="#1C1C1C" />
                  : <Circle size={20} color="#D4D4D4" />
                }
              </XStack>
            </WireCard>
          ))}
        </YStack>

        {/* Completion Note */}
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Completion Note (optional)</Text>
        <XStack position="relative">
          <Input
            flex={1}
            height={44}
            borderRadius={9}
            borderWidth={1}
            borderColor="#D4D4D4"
            paddingHorizontal={16}
            paddingRight={40}
            fontSize={14}
            placeholder="How did it go today?"
            placeholderTextColor={"#8C8C8C" as any}
          />
          <XStack position="absolute" right={12} top={0} bottom={0} alignItems="center" pointerEvents="none">
            <Mic size={18} color="#8C8C8C" />
          </XStack>
        </XStack>

        <YStack flex={1} />
        <OutlineButton label="Edit Habit" />
      </ScreenContent>
    </YStack>
  )
}
