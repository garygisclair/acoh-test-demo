import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { LabeledInput, PrimaryButton, ScreenContent, MutedText } from '../../components/shared'

export function ResetPassword() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <YStack alignItems="center" gap={8} marginTop={40}>
        <Text fontSize={24} fontWeight="700" color="#1C1C1C">Reset Password</Text>
        <MutedText size={14}>Enter your new password below.</MutedText>
      </YStack>
      <YStack gap={16} marginTop={24}>
        <LabeledInput label="New Password" placeholder="Enter new password" />
        <LabeledInput label="Confirm Password" placeholder="Confirm new password" />
        <PrimaryButton label="Reset Password" onPress={() => navigate('/sign-in')} />
      </YStack>
      <YStack flex={1} />
      <YStack alignItems="center" paddingBottom={40}>
        <Text fontSize={14} color="#8C8C8C" cursor="pointer" onPress={() => navigate('/sign-in')}>
          &larr; Back to Sign In
        </Text>
      </YStack>
    </ScreenContent>
  )
}
