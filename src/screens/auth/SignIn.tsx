import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { LabeledInput, PrimaryButton, OutlineButton, ScreenContent, MutedText } from '../../components/shared'

export function SignIn() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <Text fontSize={24} fontWeight="700" color="#1C1C1C">Welcome Back</Text>
      <MutedText size={14}>Sign in to continue</MutedText>
      <YStack gap={16} marginTop={8}>
        <LabeledInput label="Email" placeholder="email@example.com" />
        <LabeledInput label="Password" placeholder="Your password" />
      </YStack>
      <XStack justifyContent="center" marginTop={8}>
        <Text fontSize={13} color="#8C8C8C" cursor="pointer" onPress={() => navigate('/forgot-password')}>
          Forgot Password?
        </Text>
      </XStack>
      <YStack marginTop={16}>
        <PrimaryButton label="Sign In" onPress={() => navigate('/home')} />
      </YStack>
      <YStack gap={16} marginTop={24}>
        <XStack alignItems="center" gap={0}>
          <Separator flex={1} />
          <Text fontSize={13} color="#8C8C8C" paddingHorizontal={12}>or</Text>
          <Separator flex={1} />
        </XStack>
        <OutlineButton label="Continue with Google" />
        <OutlineButton label="Continue with Apple" />
        <XStack justifyContent="center" gap={4}>
          <MutedText size={14}>Don't have an account?</MutedText>
          <Text fontSize={14} fontWeight="600" color="#1C1C1C" cursor="pointer" onPress={() => navigate('/sign-up')}>
            Sign Up
          </Text>
        </XStack>
      </YStack>
    </ScreenContent>
  )
}
