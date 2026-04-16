import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  AuthShell,
  PrimaryPillButton,
  OutlinePillButton,
} from '../../components/auth-ui'
import { STARBURST_OUTER, STARBURST_EXCLAIM } from '../../assets/onboarding'

function StarburstIcon() {
  return (
    <div
      style={{
        position: 'relative',
        width: 69.88,
        height: 57.97,
        transform: 'scaleY(-1)',
      }}
    >
      <img
        src={STARBURST_OUTER}
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <img
        src={STARBURST_EXCLAIM}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 31.15,
          top: 15.09,
          width: 7.79,
          height: 27.69,
        }}
      />
    </div>
  )
}

export function SetupPendingGate() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <YStack
        flex={1}
        paddingTop={174}
        paddingBottom={24}
        paddingHorizontal={32}
        gap={16}
        alignItems="center"
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={22}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          Setup Incomplete
        </Text>

        <StarburstIcon />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={20}
        >
          You and your partner need to complete the{'\n'}initial setup before you can start using{'\n'}the app together.
        </Text>

        {/* Partner status card */}
        <YStack
          width="100%"
          paddingHorizontal={16}
          paddingVertical={14}
          borderRadius={12}
          backgroundColor="#ebebf9"
          gap={8}
        >
          <XStack width="100%" justifyContent="space-between" alignItems="center">
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={14}
              color="var(--acoh-body)"
            >
              You
            </Text>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              fontWeight="600"
              color="var(--acoh-body)"
            >
              Not started
            </Text>
          </XStack>
          <XStack width="100%" justifyContent="space-between" alignItems="center">
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={14}
              color="var(--acoh-body)"
            >
              Partner
            </Text>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              fontWeight="600"
              color="var(--acoh-body)"
            >
              Not started
            </Text>
          </XStack>
        </YStack>

        <PrimaryPillButton
          label="Start Setup"
          onPress={() => navigate('/onboarding/baseline-ratings')}
        />
        <OutlinePillButton
          label="Remind Me Later"
          onPress={() => navigate('/home')}
        />
      </YStack>
    </AuthShell>
  )
}
