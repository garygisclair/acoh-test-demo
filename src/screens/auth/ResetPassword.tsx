import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { LabeledInput, PrimaryButton, ScreenContent, MutedText } from '../../components/shared'
import { ArrowLeft } from 'lucide-react'

export function ResetPassword() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={8} marginTop={40}>
        <Text fontSize={24} fontWeight="700" color="#1C1C1C">Reset Password</Text>
        <MutedText size={14}>Enter your new password below.</MutedText>
      </YStack>
      <YStack gap={16} marginTop={24}>
        <LabeledInput label="New Password" placeholder="••••••••" />
        <LabeledInput label="Confirm Password" placeholder="••••••••" />
        <PrimaryButton label="Reset Password" onPress={() => navigate('/sign-in')} />
      </YStack>
      <XStack justifyContent="center" alignItems="center" gap={4} marginTop={32} cursor="pointer" onPress={() => navigate('/sign-in')}>
        <ArrowLeft size={14} color="#8C8C8C" />
        <Text fontSize={14} color="#8C8C8C">Back to Sign In</Text>
      </XStack>
    </ScreenContent>
  )
}
