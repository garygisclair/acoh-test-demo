import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { LabeledInput, PrimaryButton, OutlineButton, ScreenContent, MutedText } from '../../components/shared'

export function SendInvitation() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={8} marginTop={40}>
        <Text fontSize={24} fontWeight="700" color="#1C1C1C">Invite Your Partner</Text>
        <MutedText size={14}>Send an invitation to start building habits together.</MutedText>
      </YStack>
      <YStack gap={16} marginTop={8}>
        <LabeledInput label="Partner's Email" placeholder="partner@example.com" />
        <PrimaryButton label="Send Invitation" onPress={() => navigate('/onboarding/waiting')} />
      </YStack>
      <XStack alignItems="center" gap={12} marginVertical={8}>
        <Separator flex={1} />
        <Text fontSize={14} color="#8C8C8C">or</Text>
        <Separator flex={1} />
      </XStack>
      <OutlineButton label="Share Invite Link" />
    </ScreenContent>
  )
}
