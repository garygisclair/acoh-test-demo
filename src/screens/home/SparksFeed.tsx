import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  Flame,
  Star,
  ThumbsUp,
  Heart,
  Target,
  HandHeart,
  Handshake,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type Tab = 'received' | 'sent'

type SparkItem = {
  id: number
  icon: LucideIcon
  sender: string
  message: string
  tiedTo: string
  time: string
}

const RECEIVED: SparkItem[] = [
  { id: 1, icon: ThumbsUp, sender: 'Partner', message: 'Great job on the check-in!', tiedTo: 'Tied to: 10-min check-in', time: '2m ago' },
  { id: 2, icon: HandHeart, sender: 'Partner', message: 'Love that you planned date night', tiedTo: 'Tied to: Date night planning', time: '1h ago' },
  { id: 3, icon: Star, sender: 'Partner', message: 'Thank you for being consistent!', tiedTo: 'Tied to: Express gratitude', time: '3h ago' },
  { id: 4, icon: Flame, sender: 'Partner', message: "You're on a 5-day streak!", tiedTo: 'Tied to: No-phone time', time: '1d ago' },
  { id: 5, icon: Heart, sender: 'Partner', message: "We're doing great this week", tiedTo: 'General encouragement', time: '2d ago' },
]

const SENT: SparkItem[] = [
  { id: 101, icon: Heart, sender: 'To Partner', message: 'You made my day!', tiedTo: 'Tied to: Express appreciation', time: '3h ago' },
  { id: 102, icon: Sparkles, sender: 'To Partner', message: 'Proud of us this week', tiedTo: 'General encouragement', time: '1d ago' },
  { id: 103, icon: Flame, sender: 'To Partner', message: 'Keep it up!', tiedTo: 'Tied to: 10-min check-in', time: '2d ago' },
  { id: 104, icon: Handshake, sender: 'To Partner', message: 'Great teamwork today', tiedTo: 'Tied to: No-phone time together', time: '3d ago' },
  { id: 105, icon: Target, sender: 'To Partner', message: 'Hitting our goals!', tiedTo: 'Tied to: Weekly check-in', time: '4d ago' },
]

export function SparksFeed() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('received')
  const items = tab === 'received' ? RECEIVED : SENT

  return (
    <AuthShell>
      <HomeNavBar title="Sparks" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={12}>
        {/* Filter pills */}
        <XStack gap={8}>
          <FilterPill label="Received" active={tab === 'received'} onPress={() => setTab('received')} />
          <FilterPill label="Sent" active={tab === 'sent'} onPress={() => setTab('sent')} />
        </XStack>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          {tab === 'received'
            ? 'Recent encouragement from your partner'
            : 'Sparks you sent to your partner'}
        </Text>

        {items.map(item => {
          const Icon = item.icon
          return (
            <XStack
              key={item.id}
              backgroundColor="#ebebf9"
              borderRadius={12}
              paddingHorizontal={16}
              paddingVertical={14}
              gap={12}
              alignItems="flex-start"
              cursor="pointer"
              onPress={() => navigate(`/shared/spark-detail/${item.id}`)}
              pressStyle={{ scale: 0.99, opacity: 0.95 }}
            >
              <Icon size={22} color="var(--acoh-foreground)" />
              <YStack flex={1} gap={4}>
                <XStack justifyContent="space-between" alignItems="center">
                  <Text
                    fontFamily="Outfit, sans-serif"
                    fontSize={14}
                    fontWeight="600"
                    color="var(--acoh-foreground)"
                  >
                    {item.sender}
                  </Text>
                  <Text
                    fontFamily="Outfit, sans-serif"
                    fontSize={12}
                    color="var(--acoh-muted)"
                  >
                    {item.time}
                  </Text>
                </XStack>
                <Text
                  fontFamily="Outfit, sans-serif"
                  fontSize={13}
                  color="var(--acoh-body)"
                >
                  {item.message}
                </Text>
                <Text
                  fontFamily="Outfit, sans-serif"
                  fontSize={13}
                  color="var(--acoh-body)"
                >
                  {item.tiedTo}
                </Text>
              </YStack>
            </XStack>
          )
        })}
      </YStack>
    </AuthShell>
  )
}

function FilterPill({
  label,
  active,
  onPress,
}: {
  label: string
  active: boolean
  onPress: () => void
}) {
  return (
    <XStack
      flex={1}
      height={36}
      borderRadius={20}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.98, opacity: 0.92 }}
      backgroundColor={active ? 'var(--acoh-primary)' : '#FFFFFF'}
      style={{
        border: active ? 'none' : '1px solid #d4d4d4',
      }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        fontWeight={active ? '600' : '400'}
        color={active ? '#FFFFFF' : 'var(--acoh-body)'}
      >
        {label}
      </Text>
    </XStack>
  )
}
