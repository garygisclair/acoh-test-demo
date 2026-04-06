import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { LabeledInput, PrimaryButton, ScreenContent, MutedText } from '../../components/shared'

function SocialButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <XStack
      height={44}
      borderRadius={9}
      backgroundColor="#FFFFFF"
      borderWidth={1}
      borderColor="#D4D4D4"
      alignItems="center"
      justifyContent="center"
      gap={10}
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.97, opacity: 0.85 }}
    >
      <XStack width={20} height={20} borderRadius={4} backgroundColor="#D4D4D4" />
      <Text fontSize={14} fontWeight="600" color="#1C1C1C">{label}</Text>
    </XStack>
  )
}

export function SignUp() {
  const navigate = useNavigate()
  return (
    <ScreenContent>
      <Text fontSize={24} fontWeight="700" color="#1C1C1C">Create Account</Text>
      <MutedText size={14}>Start your relationship growth journey</MutedText>
      <YStack gap={16} marginTop={8}>
        <LabeledInput label="Display Name" placeholder="Your name" />
        <LabeledInput label="Email" placeholder="email@example.com" />
        <LabeledInput label="Password" placeholder="••••••••" />
        <LabeledInput label="Confirm Password" placeholder="••••••••" />
      </YStack>
      <YStack marginTop={16}>
        <PrimaryButton label="Create Account" onPress={() => navigate('/onboarding/send-invitation')} />
      </YStack>
      <YStack gap={16} marginTop={24}>
        <XStack alignItems="center" gap={0}>
          <Separator flex={1} />
          <Text fontSize={13} color="#8C8C8C" paddingHorizontal={12}>or</Text>
          <Separator flex={1} />
        </XStack>
        <SocialButton label="Continue with Google" />
        <SocialButton label="Continue with Apple" />
        <XStack justifyContent="center" gap={4}>
          <MutedText size={14}>Already have an account?</MutedText>
          <Text fontSize={14} fontWeight="600" color="#1C1C1C" cursor="pointer" onPress={() => navigate('/sign-in')}>
            Sign In
          </Text>
        </XStack>
      </YStack>
    </ScreenContent>
  )
}
