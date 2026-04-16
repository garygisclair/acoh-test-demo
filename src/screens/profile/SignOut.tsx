import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

export function SignOut() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Sign Out" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={80} paddingBottom={32} gap={16} alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={18}
          fontWeight="600"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          Sign out of your account?
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={18}
          width="100%"
        >
          You'll need to sign in again to access your habits and partnership data.
        </Text>

        <YStack width="100%" gap={16} paddingTop={8}>
          <PrimaryPillButton
            label="Sign Out"
            onPress={() => navigate('/welcome')}
          />
          <XStack
            height={48}
            borderRadius={24}
            backgroundColor="#FFFFFF"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => navigate(-1)}
            pressStyle={{ scale: 0.98, opacity: 0.92 }}
            style={{ border: '1px solid var(--acoh-border)' }}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={15}
              fontWeight="600"
              color="var(--acoh-foreground)"
            >
              Cancel
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </AuthShell>
  )
}
