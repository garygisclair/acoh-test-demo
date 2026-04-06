import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, WireCard, OutlineButton, PrimaryButton, MutedText } from '../../components/shared'

const FROM_PARTNER = [
  {
    name: 'Morning meditation',
    focusArea: 'Health & Energy',
    frequency: 'Daily',
    time: '2h ago',
    message: 'I think this would help us both start the day calmer.',
  },
  {
    name: 'Weekly budget review',
    focusArea: 'Communication',
    frequency: 'Weekly',
    time: '1d ago',
    message: 'Let\'s stay on top of our finances together.',
  },
]

const YOUR_SUGGESTIONS = [
  {
    name: 'Evening walk together',
    status: 'Accepted',
    time: '3d ago',
  },
  {
    name: 'Read before bed',
    status: 'Declined',
    time: '5d ago',
  },
]

export function HabitSuggestions() {
  const navigate = useNavigate()

  return (
    <YStack flex={1}>
      <NavBar title="Habit Suggestions" />
      <ScreenContent>
        {/* From Partner */}
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">From Partner</Text>
        <YStack gap={10}>
          {FROM_PARTNER.map(s => (
            <BorderCard key={s.name}>
              <YStack gap={8}>
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{s.name}</Text>
                  <MutedText>{s.focusArea}</MutedText>
                </XStack>
                <XStack justifyContent="space-between" alignItems="center">
                  <MutedText>{s.frequency}</MutedText>
                  <MutedText>{s.time}</MutedText>
                </XStack>
                <Text fontSize={13} color="#8C8C8C" fontStyle="italic">{s.message}</Text>
                <XStack gap={8}>
                  <XStack flex={1}>
                    <OutlineButton label="Accept" />
                  </XStack>
                  <XStack flex={1}>
                    <OutlineButton label="Decline" />
                  </XStack>
                  <XStack flex={1}>
                    <OutlineButton label="Modify" />
                  </XStack>
                </XStack>
              </YStack>
            </BorderCard>
          ))}
        </YStack>

        <Separator borderColor="#D4D4D4" />

        {/* Your Suggestions */}
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Your Suggestions</Text>
        <YStack gap={8}>
          {YOUR_SUGGESTIONS.map(s => (
            <WireCard key={s.name}>
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap={2}>
                  <Text fontSize={14} color="#1C1C1C">{s.name}</Text>
                  <MutedText>{s.time}</MutedText>
                </YStack>
                <Text
                  fontSize={13}
                  fontWeight="600"
                  color={s.status === 'Accepted' ? '#4CAF50' : '#8C8C8C'}
                >
                  {s.status}
                </Text>
              </XStack>
            </WireCard>
          ))}
        </YStack>

        <PrimaryButton label="+ Suggest a Habit" onPress={() => navigate('/shared/suggest-a-habit')} />
      </ScreenContent>
    </YStack>
  )
}
