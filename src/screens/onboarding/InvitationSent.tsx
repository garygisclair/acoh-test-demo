import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { useToast } from '../../components/Toast'
import { HANDS_HEART } from '../../assets/onboarding'

export function InvitationSent() {
  const navigate = useNavigate()
  const toast = useToast()

  const goNext = () => navigate('/onboarding/partnership-confirmed')
  const resend = () => toast.show('Invitation sent again')
  const cancelInvitation = () => navigate('/onboarding/baseline-ratings')

  return (
    <AuthShell>
      <YStack
        flex={1}
        paddingTop={130}
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
          width="100%"
        >
          Invitation Sent!
        </Text>

        <img
          src={HANDS_HEART}
          alt=""
          aria-hidden="true"
          style={{
            width: 136,
            height: 118.94,
            display: 'block',
            transform: 'scaleY(-1)',
          }}
        />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={20}
          width="100%"
        >
          We've sent an invitation to{'\n'}partner@example.com
        </Text>

        <YStack height={16} />

        <PrimaryPillButton label="Continue" onPress={goNext} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="500"
          color="var(--acoh-accent)"
          textAlign="center"
          cursor="pointer"
          onPress={resend}
        >
          Resend Invitation
        </Text>

        {/* Pushes Cancel Invitation to the bottom of the screen */}
        <YStack flex={1} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="500"
          color="var(--acoh-muted)"
          textAlign="center"
          cursor="pointer"
          onPress={cancelInvitation}
        >
          Cancel Invitation
        </Text>
      </YStack>
    </AuthShell>
  )
}
