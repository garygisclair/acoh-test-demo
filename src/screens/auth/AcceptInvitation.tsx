import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, OutlineButton, ScreenContent, Avatar, MutedText, BorderCard } from '../../components/shared'
import { PARTNER } from '../../data/fakeData'

export function AcceptInvitation() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={8} marginTop={40}>
        <Text fontSize={24} fontWeight="700" color="#1C1C1C">You're Invited!</Text>
        <MutedText size={14}>Your partner wants to build better habits together.</MutedText>
      </YStack>
      <BorderCard>
        <YStack alignItems="center" gap={12} padding={8}>
          <Avatar letter={PARTNER.avatar} size={60} />
          <Text fontSize={18} fontWeight="600" color="#1C1C1C">{PARTNER.name}</Text>
          <MutedText>{PARTNER.email}</MutedText>
</YStack>
      </BorderCard>
      <YStack gap={12} marginTop={16}>
        <PrimaryButton label="Accept & Join" onPress={() => navigate('/onboarding/select-focus-areas')} />
        <OutlineButton label="Decline" onPress={() => navigate('/welcome')} />
      </YStack>
      <YStack alignItems="center">
        <MutedText size={13}>You'll need to create an account or sign in to accept this invitation.</MutedText>
      </YStack>
    </ScreenContent>
  )
}
