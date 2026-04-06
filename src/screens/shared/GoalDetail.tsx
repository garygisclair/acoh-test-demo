import { YStack, XStack, Text, Input } from 'tamagui'
import { useNavigate, useParams } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, LabeledInput, PrimaryButton, OutlineButton } from '../../components/shared'
import { GOALS, HABITS } from '../../data/fakeData'
import { Mic, ChevronDown, ArrowRight } from 'lucide-react'

export function GoalDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const goal = GOALS.find(g => g.id === Number(id)) ?? GOALS[0]
  const linkedHabits = HABITS.filter(h => goal.habits.includes(h.name))

  return (
    <YStack flex={1}>
      <NavBar title="Goal Detail" />
      <ScreenContent>
        {/* Goal Name */}
        <LabeledInput label="Goal Name" placeholder="Enter goal name" />

        {/* Description */}
        <YStack gap={6}>
          <Text fontSize={14} color="#1C1C1C">Description (optional)</Text>
          <XStack
            borderRadius={9}
            borderWidth={1}
            borderColor="#D4D4D4"
            paddingHorizontal={16}
            paddingVertical={12}
            alignItems="flex-start"
          >
            <Input
              flex={1}
              fontSize={14}
              placeholder="What does this goal mean to you?"
              placeholderTextColor={"#8C8C8C" as any}
              borderWidth={0}
              padding={0}
              height={60}
              multiline
            />
            <Mic size={18} color="#8C8C8C" style={{ marginTop: 2 }} />
          </XStack>
        </YStack>

        {/* Focus Area */}
        <YStack gap={6}>
          <Text fontSize={14} color="#1C1C1C">Focus Area</Text>
          <XStack
            height={44}
            borderRadius={9}
            borderWidth={1}
            borderColor="#D4D4D4"
            paddingHorizontal={16}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize={14} color="#1C1C1C">{goal.focusArea}</Text>
            <ChevronDown size={18} color="#8C8C8C" />
          </XStack>
        </YStack>

        {/* Linked Habits */}
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Linked Habits</Text>
        <YStack gap={8}>
          {linkedHabits.map(h => (
            <WireCard key={h.id} onPress={() => navigate(`/shared/habit-detail/${h.id}`)}>
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={14} color="#1C1C1C">{h.name}</Text>
                <ArrowRight size={18} color="#8C8C8C" />
              </XStack>
            </WireCard>
          ))}
        </YStack>

        {/* Actions */}
        <YStack flex={1} />
        <PrimaryButton label="Save Changes" />
        <OutlineButton label="Delete Goal" />
      </ScreenContent>
    </YStack>
  )
}
