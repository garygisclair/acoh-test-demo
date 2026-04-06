import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, MutedText, PrimaryButton, OutlineButton } from '../../components/shared'
import { Sparkles, Heart, CheckCircle } from 'lucide-react'

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <YStack flex={1}>
      <NavBar title="Quick Actions" />
      <ScreenContent>
        <MutedText>Things you can do right now</MutedText>
        <YStack gap={12}>
          {/* Card 1: Send Spark */}
          <WireCard>
            <YStack gap={12}>
              <XStack gap={12} alignItems="flex-start">
                <Sparkles size={24} color="#1C1C1C" />
                <YStack flex={1} gap={2}>
                  <Text fontSize={14} fontWeight="700" color="#1C1C1C">Send Spark</Text>
                  <MutedText>Send encouragement or kudos to your partner</MutedText>
                </YStack>
              </XStack>
              <PrimaryButton label="Send a Spark" onPress={() => navigate('/shared/send-spark')} />
            </YStack>
          </WireCard>

          {/* Card 2: Start Weekly Check-In */}
          <WireCard>
            <YStack gap={12}>
              <XStack gap={12} alignItems="flex-start">
                <Heart size={24} color="#1C1C1C" />
                <YStack flex={1} gap={2}>
                  <Text fontSize={14} fontWeight="700" color="#1C1C1C">Start Weekly Check-In</Text>
                  <MutedText>Rate your focus areas and reflect on the week</MutedText>
                </YStack>
              </XStack>
              <PrimaryButton label="Begin Check-In" onPress={() => navigate('/us/weekly-check-in')} />
            </YStack>
          </WireCard>

          {/* Card 3: Log a Habit */}
          <WireCard>
            <YStack gap={12}>
              <XStack gap={12} alignItems="flex-start">
                <CheckCircle size={24} color="#1C1C1C" />
                <YStack flex={1} gap={2}>
                  <Text fontSize={14} fontWeight="700" color="#1C1C1C">Log a Habit</Text>
                  <MutedText>Mark a habit as completed for today</MutedText>
                </YStack>
              </XStack>
              <OutlineButton label="Go to Today's Habits" onPress={() => navigate('/habits')} />
            </YStack>
          </WireCard>
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
