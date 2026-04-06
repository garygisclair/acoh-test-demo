import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText, PrimaryButton } from '../../components/shared'

export function WeeklyCheckIn() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Weekly Check-In" />
      <ScreenContent>
        <BorderCard>
          <YStack gap={8}>
            <Text fontSize={14} fontWeight="600" color="#1C1C1C">Weekly Check-In Due</Text>
            <MutedText>Rate each focus area and reflect on your week together. Your partner hasn't completed theirs yet.</MutedText>
            <PrimaryButton label="Start Check-In" onPress={() => navigate('/shared/weekly-check-in-flow')} />
          </YStack>
        </BorderCard>

        <YStack gap={12}>
          <Text fontSize={16} fontWeight="700" color="#1C1C1C">Check-In Status</Text>
          <XStack justifyContent="space-between">
            <Text fontSize={14} color="#1C1C1C">You</Text>
            <MutedText>Not started</MutedText>
          </XStack>
          <XStack justifyContent="space-between">
            <Text fontSize={14} color="#1C1C1C">Partner</Text>
            <MutedText>Not started</MutedText>
          </XStack>
        </YStack>

        <BorderCard>
          <YStack gap={8}>
            <Text fontSize={16} fontWeight="700" color="#1C1C1C">Last Week's Check-In</Text>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Communication</Text>
              <MutedText>You: 8  Partner: 7</MutedText>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Quality Time</Text>
              <MutedText>You: 6  Partner: 5</MutedText>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Health & Energy</Text>
              <MutedText>You: 8  Partner: 9</MutedText>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Intimacy</Text>
              <MutedText>You: 5  Partner: 7</MutedText>
            </XStack>
          </YStack>
        </BorderCard>
      </ScreenContent>
    </YStack>
  )
}
