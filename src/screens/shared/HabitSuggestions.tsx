import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useToast } from '../../components/Toast'

type PartnerSuggestion = {
  id: number
  title: string
  message: string
  meta: string
  time: string
}

type YourSuggestion = {
  id: number
  title: string
  message: string
  meta: string
  time: string
  status: 'Accepted' | 'Declined' | 'Pending'
}

const FROM_PARTNER: PartnerSuggestion[] = [
  { id: 1, title: 'Morning meditation', message: '"Try 5 min of mindfulness each morning"', meta: 'Health & Energy · Daily', time: '2h ago' },
  { id: 2, title: 'Weekly budget check', message: '"Let\'s review our spending together"', meta: 'Finances · Weekly', time: '1d ago' },
]

const YOUR_SUGGESTIONS: YourSuggestion[] = [
  { id: 101, title: 'Read together', message: '"We should read the same book"', meta: 'Personal Growth · Daily', time: '3d ago', status: 'Accepted' },
  { id: 102, title: 'No screens after 9pm', message: '"Could help us wind down together"', meta: 'Quality Time · Daily', time: '5d ago', status: 'Declined' },
]

export function HabitSuggestions() {
  const navigate = useNavigate()
  const toast = useToast()

  const handleAccept = () => {
    toast.show('You accepted a suggested habit')
    navigate('/habits')
  }

  return (
    <AuthShell>
      <HomeNavBar title="Habit Suggestions" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={12}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          From Partner
        </Text>

        {FROM_PARTNER.map(s => (
          <PartnerSuggestionCard key={s.id} suggestion={s} onAccept={handleAccept} />
        ))}

        <Separator borderColor="#d4d4d4" marginVertical={4} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          Your Suggestions
        </Text>

        {YOUR_SUGGESTIONS.map(s => (
          <YourSuggestionCard key={s.id} suggestion={s} />
        ))}

        <PrimaryPillButton
          label="+ Suggest a Habit"
          onPress={() => navigate('/shared/suggest-a-habit')}
        />
      </YStack>
    </AuthShell>
  )
}

function PartnerSuggestionCard({
  suggestion,
  onAccept,
}: {
  suggestion: PartnerSuggestion
  onAccept: () => void
}) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      gap={10}
      style={{ border: '1px solid #d4d4d4' }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          {suggestion.title}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          {suggestion.time}
        </Text>
      </XStack>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        color="var(--acoh-muted)"
      >
        {suggestion.message}
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={12}
        color="var(--acoh-muted)"
      >
        {suggestion.meta}
      </Text>
      <XStack gap={8}>
        <ActionButton label="Accept" variant="primary" onPress={onAccept} />
        <ActionButton label="Decline" variant="outline" />
        <ActionButton label="Modify" variant="outline" />
      </XStack>
    </YStack>
  )
}

function YourSuggestionCard({ suggestion }: { suggestion: YourSuggestion }) {
  const statusColor =
    suggestion.status === 'Accepted'
      ? 'var(--acoh-foreground)'
      : 'var(--acoh-muted)'
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      gap={10}
      style={{ border: '1px solid #d4d4d4' }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          {suggestion.title}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          {suggestion.time}
        </Text>
      </XStack>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        color="var(--acoh-muted)"
      >
        {suggestion.message}
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={12}
        color="var(--acoh-muted)"
      >
        {suggestion.meta}
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={12}
        fontWeight="600"
        color={statusColor}
      >
        {suggestion.status}
      </Text>
    </YStack>
  )
}

function ActionButton({
  label,
  variant,
  onPress,
}: {
  label: string
  variant: 'primary' | 'outline'
  onPress?: () => void
}) {
  const isPrimary = variant === 'primary'
  return (
    <XStack
      flex={1}
      height={38}
      borderRadius={24}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.92 }}
      backgroundColor={isPrimary ? 'var(--acoh-primary)' : '#FFFFFF'}
      style={{
        border: isPrimary ? 'none' : '1px solid var(--acoh-border)',
      }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        fontWeight="600"
        color={isPrimary ? '#FFFFFF' : 'var(--acoh-foreground)'}
      >
        {label}
      </Text>
    </XStack>
  )
}
