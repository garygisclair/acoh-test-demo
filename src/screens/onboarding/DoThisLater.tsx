import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText } from '../../components/shared'
import { Bell } from 'lucide-react'

export function DoThisLater() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={16} marginTop={80}>
        <Bell size={64} color="#8C8C8C" />
        <Text fontSize={18} fontWeight="600" color="#1C1C1C">Setup Incomplete</Text>
        <MutedText size={14}>You've paired with your partner but haven't completed the setup yet.</MutedText>
        <MutedText size={14}>Complete setup to unlock all features.</MutedText>
      </YStack>
      <YStack flex={1} />
      <YStack gap={12} paddingBottom={40}>
        <PrimaryButton label="Start Setup" onPress={() => navigate('/onboarding/select-focus-areas')} />
        <OutlineButton label="Remind Me Later" />
      </YStack>
    </ScreenContent>
  )
}
