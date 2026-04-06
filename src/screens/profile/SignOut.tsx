import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, PrimaryButton, OutlineButton, BorderCard } from '../../components/shared'

export function SignOut() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Sign Out" />
      <ScreenContent>
        <YStack flex={1} alignItems="center" justifyContent="center" gap={24}>
          <BorderCard>
            <YStack gap={16} alignItems="center" padding={16}>
              <Text fontSize={18} fontWeight="600" color="#1C1C1C">Sign out of your account?</Text>
              <Text fontSize={14} color="#8C8C8C" textAlign="center">
                You'll need to sign in again to access your habits and partnership data.
              </Text>
              <YStack width="100%" gap={12}>
                <PrimaryButton label="Sign Out" onPress={() => navigate('/welcome')} />
                <OutlineButton label="Cancel" onPress={() => navigate(-1 as any)} />
              </YStack>
            </YStack>
          </BorderCard>
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
