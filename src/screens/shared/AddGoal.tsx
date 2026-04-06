import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, LabeledInput, PrimaryButton, WireCard, MutedText } from '../../components/shared'
import { ChevronDown } from 'lucide-react'

const SUGGESTED_GOALS = [
  { name: 'Improve daily dialogue', area: 'Communication' },
  { name: 'More intentional time together', area: 'Quality Time' },
  { name: 'Get healthier as a couple', area: 'Health & Energy' },
]

export function AddGoal() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Add Goal" />
      <ScreenContent>
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Suggested Goals</Text>
        <YStack gap={8}>
          {SUGGESTED_GOALS.map(g => (
            <WireCard key={g.name}>
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{g.name}</Text>
                  <MutedText>{g.area}</MutedText>
                </YStack>
                <Text fontSize={14} color="#1C1C1C" cursor="pointer">+ Add</Text>
              </XStack>
            </WireCard>
          ))}
        </YStack>

        <XStack alignItems="center" gap={12}>
          <Separator flex={1} />
          <Text fontSize={13} color="#8C8C8C">or create custom</Text>
          <Separator flex={1} />
        </XStack>

        <LabeledInput label="Goal Name" placeholder="e.g., Be more present" />
        <LabeledInput label="Description (optional)" placeholder="What does this goal mean to you?" />

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
            backgroundColor="#FFFFFF"
          >
            <Text fontSize={14} color="#8C8C8C">Select a focus area</Text>
            <ChevronDown size={16} color="#8C8C8C" />
          </XStack>
        </YStack>

        <YStack flex={1} />
        <PrimaryButton label="Create Goal" onPress={() => navigate(-1 as any)} />
      </ScreenContent>
    </YStack>
  )
}
