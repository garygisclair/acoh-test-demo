import { YStack, XStack, Text } from 'tamagui'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, MutedText } from '../../components/shared'
import { GripVertical } from 'lucide-react'

const ACTIVE_AREAS = [
  { name: 'Communication', habits: 2, priority: 1 },
  { name: 'Quality Time', habits: 2, priority: 2 },
  { name: 'Health & Energy', habits: 2, priority: 3 },
  { name: 'Intimacy', habits: 1, priority: 4 },
  { name: 'Personal Growth', habits: 1, priority: 5 },
]

const AVAILABLE_PRESETS = [
  { name: 'Finances', description: 'Budgeting, saving, financial goals' },
  { name: 'Parenting', description: 'Co-parenting, family activities' },
]

export function FocusAreaManagement() {
  return (
    <YStack flex={1}>
      <NavBar title="Focus Area Management" />
      <ScreenContent>
        <MutedText>Changes require partner approval.</MutedText>
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Active Focus Areas</Text>
        <YStack gap={8}>
          {ACTIVE_AREAS.map(area => (
            <WireCard key={area.name}>
              <XStack alignItems="center" gap={12}>
                <GripVertical size={16} color="#8C8C8C" />
                <YStack flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{area.name}</Text>
                  <MutedText>{area.habits} habits · Priority #{area.priority}</MutedText>
                </YStack>
                <Text fontSize={14} color="#8C8C8C" cursor="pointer">Remove</Text>
              </XStack>
            </WireCard>
          ))}
        </YStack>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C" marginTop={8}>Available Presets</Text>
        <YStack gap={8}>
          {AVAILABLE_PRESETS.map(preset => (
            <WireCard key={preset.name}>
              <XStack alignItems="center">
                <YStack flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{preset.name}</Text>
                  <MutedText>{preset.description}</MutedText>
                </YStack>
                <Text fontSize={14} color="#1C1C1C" cursor="pointer">+ Add</Text>
              </XStack>
            </WireCard>
          ))}
        </YStack>

        <Text
          fontSize={14}
          color="#8C8C8C"
          textAlign="center"
          textDecorationLine="underline"
          cursor="pointer"
        >
          + Create Custom Focus Area
        </Text>
      </ScreenContent>
    </YStack>
  )
}
