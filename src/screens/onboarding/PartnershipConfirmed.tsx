import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { LOVEBIRDS } from '../../assets/auth'
import { AVATAR_YOU, AVATAR_PARTNER, HEART_BADGE } from '../../assets/onboarding'

export function PartnershipConfirmed() {
  const navigate = useNavigate()

  const goNext = () => navigate('/onboarding/baseline-ratings')

  return (
    <AuthShell>
      {/*
        Lovebirds — positioned per Figma inset (top=72, w=182, h=89, centered).
        Reuses the existing SVG from the Accept Invitation screen.
      */}
      <img
        src={LOVEBIRDS}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 72,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 182,
          height: 89,
          pointerEvents: 'none',
        }}
      />

      {/*
        Content offset = 44 (status bar) + 130 (Figma pt). The overlaid status
        bar doesn't take layout space, so we have to add it back explicitly or
        the title would collide with the lovebirds above.
      */}
      <YStack
        flex={1}
        paddingTop={174}
        paddingBottom={24}
        gap={8}
        alignItems="center"
        width="100%"
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={24}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
          width="100%"
        >
          You're Partnered!
        </Text>

        {/* Avatar pair — two 100x100 circles overlapping, with heart badge */}
        <YStack width="100%" height={140} position="relative">
          {/* AvatarYou — left=115, top=20 */}
          <YStack
            position="absolute"
            left={115}
            top={20}
            width={100}
            height={100}
            borderRadius={50}
            overflow="hidden"
            style={{ border: '3px solid var(--acoh-bg-pale)' }}
          >
            <img
              src={AVATAR_YOU}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </YStack>
          {/* AvatarPartner — left=185, top=20 (overlaps right half of AvatarYou) */}
          <YStack
            position="absolute"
            left={185}
            top={20}
            width={100}
            height={100}
            borderRadius={50}
            overflow="hidden"
            style={{ border: '3px solid var(--acoh-bg-pale)' }}
          >
            <img
              src={AVATAR_PARTNER}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </YStack>
          {/* Heart badge — centered between the two avatars (left=177, top=92) */}
          <YStack
            position="absolute"
            left={177}
            top={92}
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="var(--acoh-primary)"
            alignItems="center"
            justifyContent="center"
            style={{ border: '3px solid var(--acoh-bg-pale)' }}
          >
            <img
              src={HEART_BADGE}
              alt=""
              aria-hidden="true"
              style={{
                width: 18,
                height: 16,
                display: 'block',
                transform: 'scaleY(-1)',
              }}
            />
          </YStack>
        </YStack>

        <YStack paddingHorizontal={24} paddingVertical={16} width="100%">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            color="var(--acoh-body)"
            textAlign="center"
            lineHeight={20}
          >
            You and your partner are connected.{'\n'}Let's set up your relationship goals together.
          </Text>
        </YStack>

        <YStack paddingHorizontal={24} paddingBottom={48} width="100%">
          <PrimaryPillButton label="Continue" onPress={goNext} />
        </YStack>
      </YStack>
    </AuthShell>
  )
}
