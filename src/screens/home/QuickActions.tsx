import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Heart, CircleCheck, type LucideIcon } from 'lucide-react'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Quick Actions" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={16}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          Things you can do right now
        </Text>

        <ActionCard
          icon={Sparkles}
          title="Send Spark"
          description="Send encouragement or kudos to your partner"
          ctaLabel="Send a Spark"
          ctaVariant="primary"
          onPress={() => navigate('/shared/send-spark')}
        />

        <ActionCard
          icon={Heart}
          title="Start Weekly Check-In"
          description="Rate your focus areas and reflect on the week"
          ctaLabel="Begin Check-In"
          ctaVariant="outline"
          onPress={() => navigate('/us/weekly-check-in')}
        />

        <ActionCard
          icon={CircleCheck}
          title="Log a Habit"
          description="Mark a habit as completed for today"
          ctaLabel="Go to Today's Habits"
          ctaVariant="outline"
          onPress={() => navigate('/habits')}
        />
      </YStack>
    </AuthShell>
  )
}

function ActionCard({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaVariant,
  onPress,
}: {
  icon: LucideIcon
  title: string
  description: string
  ctaLabel: string
  ctaVariant: 'primary' | 'outline'
  onPress: () => void
}) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      padding={16}
      gap={12}
    >
      <XStack gap={12} alignItems="center">
        <Icon size={22} color="var(--acoh-foreground)" />
        <YStack flex={1} gap={2}>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            {title}
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            {description}
          </Text>
        </YStack>
      </XStack>
      <CardCTA label={ctaLabel} variant={ctaVariant} onPress={onPress} />
    </YStack>
  )
}

function CardCTA({
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
        border: isPrimary ? 'none' : '1px solid rgba(0,0,0,0.15)',
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
