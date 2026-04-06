import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ScreenContent, WireCard, MutedText } from '../../components/shared'
import { NOTIFICATIONS } from '../../data/fakeData'
import { Sparkles, SquareCheckBig, Bell, CircleCheckBig, Heart, UserCheck } from 'lucide-react'

const iconMap: Record<string, any> = {
  sparkles: Sparkles,
  'circle-check': SquareCheckBig,
  'alert-circle': Bell,
  calendar: CircleCheckBig,
  'user-check': UserCheck,
  heart: Heart,
}

const subtitleMap: Record<number, string> = {
  1: 'Partner sent you a spark',
  2: '10-min check-in · Communication',
  3: 'Partner wants to add \'Finances\'',
  4: 'Complete your weekly rating',
  5: 'Partner sent you a spark',
  6: 'Setup is finished',
  7: 'Your partner has joined',
}

export function NotificationCenter() {
  const navigate = useNavigate()
  const groups = ['Today', 'Yesterday', 'Earlier']

  return (
    <YStack flex={1}>
      {/* Custom NavBar with Mark all read */}
      <XStack
        height={48}
        backgroundColor="#FFFFFF"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={16}
      >
        <XStack width={50} cursor="pointer" onPress={() => navigate(-1)}>
          <Text fontSize={14} color="#1C1C1C">&larr; Back</Text>
        </XStack>
        <Text fontSize={16} fontWeight="600" color="#1C1C1C">Notifications</Text>
        <XStack width={80} justifyContent="flex-end">
          <Text fontSize={13} color="#8C8C8C">Mark all read</Text>
        </XStack>
      </XStack>
      <ScreenContent>
        {groups.map(group => {
          const items = NOTIFICATIONS.filter(n => n.group === group)
          if (items.length === 0) return null
          return (
            <YStack key={group} gap={8}>
              <Text fontSize={14} fontWeight="700" color="#1C1C1C">{group}</Text>
              {items.map(n => {
                const Icon = iconMap[n.icon] || Sparkles
                return (
                  <WireCard
                    key={n.id}
                    onPress={() => navigate(n.target)}
                    padding={14}
                  >
                    <XStack gap={12} alignItems="center">
                      <Icon size={20} color="#1C1C1C" />
                      <YStack flex={1}>
                        <Text fontSize={14} color="#1C1C1C">{n.text}</Text>
                        <MutedText size={12}>{subtitleMap[n.id]}</MutedText>
                      </YStack>
                      <MutedText>{n.time}</MutedText>
                    </XStack>
                  </WireCard>
                )
              })}
            </YStack>
          )
        })}
      </ScreenContent>
    </YStack>
  )
}
