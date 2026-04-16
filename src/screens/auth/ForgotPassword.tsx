import { YStack } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  AuthShell,
  AuthNavRow,
  AuthHeader,
  PillInput,
  PrimaryPillButton,
} from '../../components/auth-ui'

export function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <AuthNavRow onBack={() => navigate(-1)} />

      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your email and we'll send you a link to reset your password."
      />

      <YStack paddingHorizontal={24} paddingTop={16} paddingBottom={12}>
        <PillInput label="Email" placeholder="email@example.com" type="email" />
      </YStack>

      <YStack paddingHorizontal={24} paddingTop={12}>
        <PrimaryPillButton
          label="Send Reset Link"
          onPress={() => navigate('/sign-in')}
        />
      </YStack>
    </AuthShell>
  )
}
