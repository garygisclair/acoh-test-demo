import { useState } from 'react'
import { YStack, XStack, Text, Separator, Input, Switch } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, LabeledInput, PrimaryButton, Chip, MutedText } from '../../components/shared'

const PRESETS = [
  '+ 10-min check-in',
  '+ Express gratitude',
  '+ Date night',
  '+ Exercise together',
  '+ Read together',
  '+ Budget review',
]

export function AddHabit() {
  const navigate = useNavigate()
  const [frequency, setFrequency] = useState('Daily')
  const [type, setType] = useState('Shared')

  return (
    <YStack flex={1}>
      <NavBar title="Add Habit" />
      <ScreenContent>
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Suggested Habits</Text>
        <XStack flexWrap="wrap" gap={8}>
          {PRESETS.map(p => (
            <Chip key={p} label={p} />
          ))}
        </XStack>

        {/* Separator with centered "or create custom" */}
        <XStack alignItems="center" gap={12}>
          <Separator flex={1} />
          <Text fontSize={13} color="#8C8C8C">or create custom</Text>
          <Separator flex={1} />
        </XStack>

        <LabeledInput label="Habit Name" placeholder="e.g., Morning walk together" />
        <LabeledInput label="Description (optional)" placeholder="What does this habit involve?" />

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Frequency</Text>
        <XStack gap={8} flexWrap="wrap">
          {['Daily', 'Weekly', 'Monthly', 'Custom'].map(f => (
            <Chip key={f} label={f} selected={frequency === f} onPress={() => setFrequency(f)} />
          ))}
        </XStack>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Type</Text>
        <XStack gap={8}>
          {['Personal', 'Shared'].map(t => (
            <Chip key={t} label={t} selected={type === t} onPress={() => setType(t)} />
          ))}
        </XStack>
        <MutedText>Shared habits require partner approval</MutedText>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Focus Area</Text>
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
            placeholder="Select a focus area"
            placeholderTextColor={"#8C8C8C" as any}
            disabled
          />
          <XStack position="absolute" right={12} top={0} bottom={0} alignItems="center" pointerEvents="none">
            <ChevronDown size={18} color="#8C8C8C" />
          </XStack>
        </XStack>

        <LabeledInput label="Goal (optional)" placeholder="Link to a goal" />

        {/* Reminder section */}
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Reminder</Text>
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={14} color="#1C1C1C">Enable reminder</Text>
          <Switch size="$3" />
        </XStack>
        <XStack gap={8} flexWrap="wrap">
          {['Morning', 'Afternoon', 'Evening', 'Custom'].map(t => (
            <Chip key={t} label={t} />
          ))}
        </XStack>

        <YStack flex={1} />
        <PrimaryButton label="Create Habit" onPress={() => navigate(-1 as any)} />
      </ScreenContent>
    </YStack>
  )
}
