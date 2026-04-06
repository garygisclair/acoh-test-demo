import { YStack, XStack, Text, Input } from 'tamagui'
import { useState } from 'react'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, LabeledInput, Chip, PrimaryButton } from '../../components/shared'
import { Mic } from 'lucide-react'

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Custom']
const FOCUS_AREAS = ['Communication', 'Quality Time', 'Health & Energy', 'Intimacy', 'Personal Growth']
const TYPES = ['Personal', 'Shared']

export function SuggestAHabit() {
  const [selectedFrequency, setSelectedFrequency] = useState('Daily')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedType, setSelectedType] = useState('')

  return (
    <YStack flex={1}>
      <NavBar title="Suggest a Habit" />
      <ScreenContent>
        {/* Habit Name */}
        <LabeledInput label="Habit Name" placeholder="e.g., Morning meditation" />

        {/* Message to Partner */}
        <YStack gap={6}>
          <Text fontSize={14} color="#1C1C1C">Message to Partner (optional)</Text>
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
              placeholder="Why do you think this would be good for us?"
              placeholderTextColor={"#8C8C8C" as any}
              borderWidth={0}
              padding={0}
              height={60}
              multiline
            />
            <Mic size={18} color="#8C8C8C" style={{ marginTop: 2 }} />
          </XStack>
        </YStack>

        {/* Suggested Frequency */}
        <YStack gap={8}>
          <Text fontSize={14} fontWeight="700" color="#1C1C1C">Suggested Frequency</Text>
          <XStack flexWrap="wrap" gap={8}>
            {FREQUENCIES.map(f => (
              <Chip
                key={f}
                label={f}
                selected={selectedFrequency === f}
                onPress={() => setSelectedFrequency(f)}
              />
            ))}
          </XStack>
        </YStack>

        {/* Focus Area */}
        <YStack gap={8}>
          <Text fontSize={14} fontWeight="700" color="#1C1C1C">Focus Area</Text>
          <XStack flexWrap="wrap" gap={8}>
            {FOCUS_AREAS.map(a => (
              <Chip
                key={a}
                label={a}
                selected={selectedArea === a}
                onPress={() => setSelectedArea(a)}
              />
            ))}
          </XStack>
        </YStack>

        {/* Type */}
        <YStack gap={8}>
          <Text fontSize={14} fontWeight="700" color="#1C1C1C">Type</Text>
          <XStack flexWrap="wrap" gap={8}>
            {TYPES.map(t => (
              <Chip
                key={t}
                label={t}
                selected={selectedType === t}
                onPress={() => setSelectedType(t)}
              />
            ))}
          </XStack>
        </YStack>

        <YStack flex={1} />
        <PrimaryButton label="Send Suggestion" />
      </ScreenContent>
    </YStack>
  )
}
