import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  AuthShell,
  AuthHeader,
  PrimaryPillButton,
  OutlinePillButton,
} from '../../components/auth-ui'
import { PARTNER } from '../../data/fakeData'
import { LOVEBIRDS, PARTNER_AVATAR } from '../../assets/auth'

export function AcceptInvitation() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      {/* Lovebirds illustration */}
      <YStack
        marginTop={44}
        paddingTop={24}
        height={140}
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={LOVEBIRDS}
          alt=""
          style={{ width: 218, height: 106, display: 'block' }}
        />
      </YStack>

      <YStack paddingTop={8}>
        <AuthHeader
          title="You're Invited!"
          subtitle="Your partner wants to build better habits together."
        />
      </YStack>

      {/* Partner card */}
      <YStack paddingHorizontal={24} paddingVertical={16} alignItems="center">
        <YStack
          width="100%"
          padding={24}
          gap={8}
          alignItems="center"
          backgroundColor="#FFFFFF"
          borderRadius={16}
          borderWidth={1}
          borderColor="var(--acoh-border)"
        >
          <img
            src={PARTNER_AVATAR}
            alt=""
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={18}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            {PARTNER.name}
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            color="var(--acoh-muted)"
          >
            {PARTNER.email}
          </Text>
        </YStack>
      </YStack>

      {/* CTAs */}
      <YStack paddingHorizontal={24} paddingTop={12} gap={12}>
        <PrimaryPillButton
          label="Accept & Join"
          onPress={() => navigate('/onboarding/select-focus-areas')}
        />
        <OutlinePillButton label="Decline" onPress={() => navigate('/welcome')} />
      </YStack>

      {/* Footnote */}
      <YStack paddingHorizontal={24} paddingTop={12}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
          textAlign="center"
          lineHeight={18}
        >
          You'll need to{' '}
          <span style={{ fontWeight: 700, color: 'var(--acoh-foreground)' }}>
            create an account
          </span>{' '}
          or{' '}
          <span style={{ fontWeight: 700, color: 'var(--acoh-foreground)' }}>
            sign in
          </span>
          {' '}to accept this invitation.
        </Text>
      </YStack>
    </AuthShell>
  )
}
