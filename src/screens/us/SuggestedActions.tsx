import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type Suggestion = {
  id: string
  caption: string
  title: string
  body: string
  ctaLabel: string
  ctaVariant: 'primary' | 'outline'
  onPress: (nav: ReturnType<typeof useNavigate>) => void
}

const SUGGESTIONS: Suggestion[] = [
  {
    id: 'intimacy',
    caption: 'BASED ON INTIMACY ALIGNMENT (40%)',
    title: 'Have a conversation about Intimacy',
    body: 'Your ratings differ by 2 points. Discussing what Intimacy means to each of you could help align expectations.',
    ctaLabel: 'View Intimacy Detail',
    ctaVariant: 'primary',
    onPress: (nav) => nav('/shared/focus-area-detail/4'),
  },
  {
    id: 'quality-time',
    caption: 'BASED ON QUALITY TIME HABITS (60% COMPLETE)',
    title: 'Add a new Quality Time habit',
    body: 'You only have 2 habits in Quality Time. Consider adding "Weekly date night" or "Device-free dinner" to boost this area.',
    ctaLabel: 'Browse Preset Habits',
    ctaVariant: 'outline',
    onPress: (nav) => nav('/shared/habit-suggestions'),
  },
  {
    id: 'spark',
    caption: 'BASED ON COMMUNICATION STREAK (7 DAYS)',
    title: 'Send your partner a spark',
    body: "You've both completed Communication habits for 7 days straight. Celebrate this milestone with encouragement!",
    ctaLabel: 'Send a Spark',
    ctaVariant: 'outline',
    onPress: (nav) => nav('/shared/send-spark'),
  },
]

export function SuggestedActions() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Suggested Actions" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={16}>
        {SUGGESTIONS.map(s => (
          <YStack
            key={s.id}
            backgroundColor="#ebebf9"
            borderRadius={9}
            padding={16}
            gap={10}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={11}
              fontWeight="600"
              color="var(--acoh-muted)"
              letterSpacing={0.5}
            >
              {s.caption}
            </Text>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={16}
              fontWeight="700"
              color="var(--acoh-foreground)"
            >
              {s.title}
            </Text>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              color="var(--acoh-body)"
              lineHeight={18}
            >
              {s.body}
            </Text>
            <SuggestionCTA
              label={s.ctaLabel}
              variant={s.ctaVariant}
              onPress={() => s.onPress(navigate)}
            />
          </YStack>
        ))}
      </YStack>
    </AuthShell>
  )
}

function SuggestionCTA({
  label,
  variant,
  onPress,
}: {
  label: string
  variant: 'primary' | 'outline'
  onPress: () => void
}) {
  const isPrimary = variant === 'primary'
  return (
    <XStack
      height={48}
      borderRadius={24}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.92 }}
      backgroundColor={isPrimary ? 'var(--acoh-primary)' : '#FFFFFF'}
      style={{
        border: isPrimary ? 'none' : '1px solid rgba(44,46,42,0.15)',
        boxShadow: isPrimary ? '0 2px 8px rgba(0,0,0,0.06)' : undefined,
      }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={15}
        fontWeight="600"
        color={isPrimary ? '#FFFFFF' : 'var(--acoh-foreground)'}
      >
        {label}
      </Text>
    </XStack>
  )
}
