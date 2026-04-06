import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText } from '../../components/shared'
import { Loader } from 'lucide-react'

export function WaitingForPartner() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={16} marginTop={80}>
        <Loader size={48} color="#8C8C8C" />
        <Text fontSize={22} fontWeight="700" color="#1C1C1C">Waiting for Partner</Text>
        <MutedText size={14}>{"We sent an invitation to\npartner@example.com"}</MutedText>
      </YStack>
      <YStack gap={12} marginTop={40}>
        <OutlineButton label="Resend Invitation" />
      </YStack>
      <YStack alignItems="center" marginTop={24}>
        <Text
          fontSize={14}
          color="#8C8C8C"
          cursor="pointer"
          textDecorationLine="underline"
          onPress={() => navigate('/welcome')}
        >
          Cancel Invitation
        </Text>
      </YStack>
      <YStack marginTop={40}>
        <PrimaryButton label="Partner Accepted — Continue" onPress={() => navigate('/onboarding/select-focus-areas')} />
      </YStack>
    </ScreenContent>
  )
}
