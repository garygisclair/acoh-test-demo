import { YStack, Text } from 'tamagui'
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

export function DoThisLater() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <YStack
        flex={1}
        paddingTop={174}
        paddingBottom={24}
        paddingHorizontal={24}
        gap={20}
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

        <YStack gap={0} alignItems="center">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            color="var(--acoh-body)"
            textAlign="center"
            lineHeight={20}
          >
            You've paired with your partner but{'\n'}haven't completed the setup yet.
          </Text>
          <YStack height={12} />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            color="var(--acoh-body)"
            textAlign="center"
            lineHeight={20}
          >
            Complete setup to unlock all features.
          </Text>
        </YStack>

        <YStack height={16} />

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
