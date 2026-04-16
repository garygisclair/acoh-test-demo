import { YStack, XStack, Text } from 'tamagui'
import { useNavigate, useLocation } from 'react-router-dom'
import { PiggyBank, Blend, Baby } from 'lucide-react'
import {
  AuthShell,
  BackButton,
  PrimaryPillButton,
  OutlinePillButton,
} from '../../components/auth-ui'

const FOCUS_AREAS = [
  { label: 'Finances', baseline: 4, Icon: PiggyBank },
  { label: 'Intimacy', baseline: 5, Icon: Blend },
  { label: 'Parenting', baseline: 5, Icon: Baby },
]

export function ReviewConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const skipped = (location.state as { skipped?: boolean } | null)?.skipped === true

  return (
    <AuthShell>
      {/* NavBar — BackButton + centered title + spacer to balance */}
      <XStack
        marginTop={44}
        height={48}
        paddingHorizontal={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <BackButton onPress={() => navigate(-1)} />
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          Review (3/3)
        </Text>
        <YStack width={36} />
      </XStack>

      {/* Content */}
      <YStack padding={24} gap={16} alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          Review your selections before continuing.
        </Text>

        <YStack height={4} />

        {/* Focus Areas summary card */}
        <YStack
          width="100%"
          padding={16}
          borderRadius={12}
          backgroundColor="#ebebf9"
          gap={8}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="700"
            color="var(--acoh-foreground)"
          >
            Focus Areas
          </Text>
          {skipped ? (
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={14}
              color="var(--acoh-body)"
            >
              Skipped
            </Text>
          ) : (
            <YStack gap={0} width="100%">
              {FOCUS_AREAS.map((fa) => (
                <XStack
                  key={fa.label}
                  width="100%"
                  height={24}
                  gap={8}
                  alignItems="center"
                >
                  <fa.Icon size={18} color="var(--acoh-accent)" strokeWidth={2} />
                  <Text
                    flex={1}
                    fontFamily="Outfit, sans-serif"
                    fontSize={14}
                    color="var(--acoh-body)"
                  >
                    {fa.label}
                  </Text>
                  <Text
                    fontFamily="Outfit, sans-serif"
                    fontSize={14}
                    color="var(--acoh-body)"
                  >
                    {fa.baseline}
                  </Text>
                </XStack>
              ))}
            </YStack>
          )}
        </YStack>

        {/* Confirmation status card */}
        <YStack
          width="100%"
          padding={16}
          borderRadius={12}
          backgroundColor="#ebebf9"
          gap={10}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="700"
            color="var(--acoh-foreground)"
          >
            Confirmation
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="600"
            color="var(--acoh-body)"
          >
            ✓{'  '}You — Confirmed
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="600"
            color="var(--acoh-body)"
          >
            ○{'  '}Partner — Waiting
          </Text>
        </YStack>

        <YStack height={8} />

        <PrimaryPillButton label="Complete Setup" onPress={() => navigate('/home')} />
        <OutlinePillButton
          label="Edit Setup"
          onPress={() => navigate('/onboarding/baseline-ratings')}
        />
      </YStack>
    </AuthShell>
  )
}
