import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  SquareCheckBig,
  Bell,
  CircleCheck,
  Heart,
  User,
  type LucideIcon,
} from 'lucide-react'
import { AuthShell, BackButton } from '../../components/auth-ui'

type NotificationGroup = 'Today' | 'Yesterday' | 'Earlier'

type NotificationItem = {
  id: number
  group: NotificationGroup
  icon: LucideIcon
  title: string
  subtitle: string
  time: string
  target: string
}

const NOTIFICATIONS_DATA: NotificationItem[] = [
  { id: 1, group: 'Today', icon: Sparkles, title: 'Spark received', subtitle: 'Partner sent you a spark', time: '2m ago', target: '/home/sparks' },
  { id: 2, group: 'Today', icon: SquareCheckBig, title: 'Partner completed a habit', subtitle: '10-min check-in · Communication', time: '1h ago', target: '/home' },
  { id: 3, group: 'Today', icon: Bell, title: 'Approval requested', subtitle: 'Partner wants to add "Finances"', time: '3h ago', target: '/home/approvals' },
  { id: 4, group: 'Yesterday', icon: CircleCheck, title: 'Weekly check-in reminder', subtitle: 'Rate your focus areas this week', time: '1d ago', target: '/us/weekly-check-in' },
  { id: 5, group: 'Yesterday', icon: Sparkles, title: 'Spark received', subtitle: 'Partner sent you a spark', time: '1d ago', target: '/home/sparks' },
  { id: 6, group: 'Yesterday', icon: Heart, title: 'Onboarding complete', subtitle: 'Your partnership is now active!', time: '1d ago', target: '/home' },
  { id: 7, group: 'Earlier', icon: User, title: 'Partner accepted invitation', subtitle: "You're now paired!", time: '3d ago', target: '/profile/partnership' },
]

const GROUP_ORDER: NotificationGroup[] = ['Today', 'Yesterday', 'Earlier']

const INITIAL_UNREAD_IDS = new Set<number>([1, 2])

export function NotificationCenter() {
  const navigate = useNavigate()
  const [unreadIds, setUnreadIds] = useState<Set<number>>(INITIAL_UNREAD_IDS)
  const markAllRead = () => setUnreadIds(new Set())

  return (
    <AuthShell>
      {/* NavBar — marginTop=44 clears overlaid status bar */}
      <XStack
        height={48}
        marginTop={44}
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
          Notifications
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-accent)"
          cursor="pointer"
          onPress={markAllRead}
        >
          Mark all read
        </Text>
      </XStack>

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={14}>
        {GROUP_ORDER.map(group => {
          const items = NOTIFICATIONS_DATA.filter(n => n.group === group)
          if (items.length === 0) return null
          return (
            <YStack key={group} gap={14}>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={16}
                fontWeight="700"
                color="var(--acoh-body)"
              >
                {group}
              </Text>
              {items.map(item => {
                const Icon = item.icon
                const isUnread = unreadIds.has(item.id)
                return (
                  <XStack
                    key={item.id}
                    backgroundColor="#ebebf9"
                    borderRadius={9}
                    paddingHorizontal={14}
                    paddingVertical={12}
                    gap={12}
                    alignItems="flex-start"
                    cursor="pointer"
                    onPress={() => navigate(item.target)}
                    pressStyle={{ scale: 0.99, opacity: 0.95 }}
                    style={{
                      border: '2px solid var(--acoh-accent)',
                      borderColor: isUnread
                        ? 'var(--acoh-accent)'
                        : 'transparent',
                      transition: 'border-color 400ms ease',
                    }}
                  >
                    <Icon size={20} color="var(--acoh-accent)" />
                    <YStack flex={1} gap={2}>
                      <Text
                        fontFamily="Outfit, sans-serif"
                        fontSize={14}
                        fontWeight="600"
                        color="var(--acoh-foreground)"
                      >
                        {item.title}
                      </Text>
                      <Text
                        fontFamily="Outfit, sans-serif"
                        fontSize={12}
                        color="var(--acoh-muted)"
                      >
                        {item.subtitle}
                      </Text>
                    </YStack>
                    <Text
                      fontFamily="Outfit, sans-serif"
                      fontSize={11}
                      color="var(--acoh-muted)"
                    >
                      {item.time}
                    </Text>
                  </XStack>
                )
              })}
            </YStack>
          )
        })}
      </YStack>
    </AuthShell>
  )
}
