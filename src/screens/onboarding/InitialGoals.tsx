import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText, WireCard } from '../../components/shared'

const SUGGESTED = [
  {
    area: 'Communication',
    habits: [
      { name: '10-min check-in conversation', freq: 'Suggested \u00B7 Daily' },
      { name: 'Express appreciation', freq: 'Suggested \u00B7 Daily' },
    ],
  },
  {
    area: 'Quality Time',
    habits: [
      { name: 'Date night', freq: 'Suggested \u00B7 Daily' },
      { name: 'No-phone time together', freq: 'Suggested \u00B7 Daily' },
    ],
  },
]

export function InitialGoals() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Setup" rightText="3/3" onBack={() => navigate('/onboarding/baseline-ratings')} />
      <ScreenContent>
        <YStack alignItems="center" gap={8}>
          <Text fontSize={22} fontWeight="700" color="#1C1C1C">Add Goals & Habits</Text>
          <MutedText size={14}>Optionally add goals and habits for your focus areas. You can always add more later.</MutedText>
        </YStack>
        <YStack gap={16}>
          {SUGGESTED.map(group => (
            <YStack key={group.area} gap={8}>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">{group.area}</Text>
              {group.habits.map(h => (
                <WireCard key={h.name}>
                  <XStack justifyContent="space-between" alignItems="center">
                    <YStack gap={2} flex={1}>
                      <Text fontSize={14} color="#1C1C1C">{h.name}</Text>
                      <MutedText size={12}>{h.freq}</MutedText>
                    </YStack>
                    <Text fontSize={14} color="#8C8C8C" cursor="pointer">+ Add</Text>
                  </XStack>
                </WireCard>
              ))}
              <Text
                fontSize={13}
                color="#8C8C8C"
                textDecorationLine="underline"
                cursor="pointer"
                marginTop={4}
              >
                + Add custom habit
              </Text>
            </YStack>
          ))}
        </YStack>
        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Continue" onPress={() => navigate('/onboarding/review')} />
          <OutlineButton label="Skip for Now" onPress={() => navigate('/onboarding/do-this-later')} />
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
