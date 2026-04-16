import { YStack, XStack, Text } from 'tamagui'
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
import { CROWN, SIGNIN_AVATAR } from '../../assets/auth'

export function SignIn() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <AuthNavRow onBack={() => navigate(-1)} />

      {/* Crown + circular avatar */}
      <YStack alignItems="center" justifyContent="center" gap={12} paddingBottom={8}>
        <img
          src={CROWN}
          alt=""
          style={{ width: 44, height: 40, display: 'block', transform: 'scaleY(-1)' }}
        />
        <img
          src={SIGNIN_AVATAR}
          alt=""
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </YStack>

      <YStack paddingTop={24}>
        <AuthHeader title="Welcome Back" subtitle="Sign in to continue" />
      </YStack>

      {/* Form */}
      <YStack paddingHorizontal={24} gap={14} paddingVertical={4}>
        <PillInput label="Email" placeholder="email@example.com" type="email" />
        <PillInput label="Password" placeholder="••••••••" type="password" />
        <XStack width="100%" justifyContent="flex-end">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            fontWeight="500"
            color="var(--acoh-accent)"
            cursor="pointer"
            onPress={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Text>
        </XStack>
      </YStack>

      {/* CTA */}
      <YStack paddingHorizontal={24} paddingTop={16}>
        <PrimaryPillButton label="Sign In" onPress={() => navigate('/home')} />
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
          prefix="Don't have an account?"
          linkLabel="Sign Up"
          onPress={() => navigate('/sign-up')}
        />
      </YStack>
    </AuthShell>
  )
}
