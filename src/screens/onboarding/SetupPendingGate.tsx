import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText, BorderCard } from '../../components/shared'
import { AlertCircle } from 'lucide-react'

export function SetupPendingGate() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={16} marginTop={80}>
        <AlertCircle size={48} color="#8C8C8C" />
        <Text fontSize={20} fontWeight="700" color="#1C1C1C" textAlign="center">
          Setup Not Complete
        </Text>
        <MutedText size={14}>
          You and your partner need to complete the initial setup before accessing the app.
        </MutedText>
        <MutedText size={14}>
          Complete the setup to unlock all features.
        </MutedText>
      </YStack>
      <BorderCard>
        <YStack gap={12}>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={14} color="#1C1C1C">You</Text>
            <MutedText size={13}>Not started</MutedText>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={14} color="#1C1C1C">Partner</Text>
            <MutedText size={13}>Not started</MutedText>
          </XStack>
        </YStack>
      </BorderCard>
      <YStack flex={1} />
      <YStack gap={12} paddingBottom={40}>
        <PrimaryButton label="Start Setup" onPress={() => navigate('/onboarding/select-focus-areas')} />
        <OutlineButton label="Skip for Now" onPress={() => navigate('/onboarding/do-this-later')} />
      </YStack>
    </ScreenContent>
  )
}
