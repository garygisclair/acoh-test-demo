import { YStack } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  AuthShell,
  AuthNavRow,
  AuthHeader,
  PillInput,
  PrimaryPillButton,
} from '../../components/auth-ui'

export function ResetPassword() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <AuthNavRow onBack={() => navigate(-1)} />

      <AuthHeader
        title="Reset Password"
        subtitle="Enter your new password below."
      />

      <YStack paddingHorizontal={24} paddingTop={16} paddingBottom={12} gap={14}>
        <PillInput label="New Password" placeholder="••••••••" type="password" />
        <PillInput label="Confirm Password" placeholder="••••••••" type="password" />
      </YStack>

      <YStack paddingHorizontal={24} paddingTop={12}>
        <PrimaryPillButton
          label="Reset Password"
          onPress={() => navigate('/sign-in')}
        />
      </YStack>
    </AuthShell>
  )
}
