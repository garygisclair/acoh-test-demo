import { YStack } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  AuthShell,
  AuthNavRow,
  AuthHeader,
  PillInput,
  PrimaryPillButton,
  OrSeparator,
  SocialButton,
  AuthFooterLink,
} from '../../components/auth-ui'

export function SignUp() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <AuthNavRow onBack={() => navigate(-1)} />

      <AuthHeader
        title="Create Account"
        subtitle="Start your relationship growth journey"
      />

      {/* Form */}
      <YStack paddingHorizontal={24} gap={12} paddingBottom={12} paddingTop={4}>
        <PillInput label="Display Name" placeholder="Your name" />
        <PillInput label="Email" placeholder="email@example.com" type="email" />
        <PillInput label="Password" placeholder="••••••••" type="password" />
        <PillInput label="Confirm Password" placeholder="••••••••" type="password" />
      </YStack>

      {/* CTA */}
      <YStack paddingHorizontal={24} paddingTop={12}>
        <PrimaryPillButton
          label="Create Account"
          onPress={() => navigate('/onboarding/add-photo')}
        />
      </YStack>

      {/* Separator + social */}
      <YStack paddingHorizontal={24} paddingVertical={4}>
        <OrSeparator />
      </YStack>

      <YStack paddingHorizontal={24} gap={12}>
        <SocialButton provider="google" label="Continue with Google" />
        <SocialButton provider="apple" label="Continue with Apple" />
      </YStack>

      {/* Footer link */}
      <YStack paddingHorizontal={24} paddingTop={16} paddingBottom={24}>
        <AuthFooterLink
          prefix="Already have an account?"
          linkLabel="Sign In"
          onPress={() => navigate('/sign-in')}
        />
      </YStack>
    </AuthShell>
  )
}
