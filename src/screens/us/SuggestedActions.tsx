import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText, PrimaryButton, OutlineButton } from '../../components/shared'

export function SuggestedActions() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Suggested Actions" />
      <ScreenContent>
        <YStack gap={12}>
          <BorderCard>
            <YStack gap={8}>
              <Text fontSize={11} fontWeight="600" color="#8C8C8C" letterSpacing={1}>BASED ON INTIMACY ALIGNMENT (40%)</Text>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Have a conversation about Intimacy</Text>
              <MutedText size={14}>Your ratings differ by 2 points. Discussing expectations can help.</MutedText>
              <PrimaryButton label="View Intimacy Detail" onPress={() => navigate('/shared/focus-area-detail/4')} />
            </YStack>
          </BorderCard>

          <BorderCard>
            <YStack gap={8}>
              <Text fontSize={11} fontWeight="600" color="#8C8C8C" letterSpacing={1}>BASED ON QUALITY TIME HABITS (60% COMPLETE)</Text>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Add a new Quality Time habit</Text>
              <MutedText size={14}>You only have 2 Quality Time habits. Consider adding one more.</MutedText>
              <OutlineButton label="Browse Preset Habits" onPress={() => navigate('/shared/habit-suggestions')} />
            </YStack>
          </BorderCard>

          <BorderCard>
            <YStack gap={8}>
              <Text fontSize={11} fontWeight="600" color="#8C8C8C" letterSpacing={1}>BASED ON COMMUNICATION STREAK (7 DAYS)</Text>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Send your partner a spark</Text>
              <MutedText size={14}>You're on a 7-day Communication streak! Celebrate with a spark.</MutedText>
              <OutlineButton label="Send a Spark" onPress={() => navigate('/shared/send-spark')} />
            </YStack>
          </BorderCard>
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
