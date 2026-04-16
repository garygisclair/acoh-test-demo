import { XStack, YStack, Text, Separator } from 'tamagui'
import { Home, Heart, CheckCircle, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Heart, label: 'Us', path: '/us' },
  { icon: CheckCircle, label: 'Habits', path: '/habits' },
  { icon: User, label: 'Profile', path: '/profile' },
]

interface TabBarProps {
  activeTab?: string | null
}

export function TabBar({ activeTab }: TabBarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const currentTab = activeTab !== undefined
    ? activeTab
    : tabs.find(t => location.pathname.startsWith(t.path))?.path ?? null

  return (
    <YStack>
      <Separator borderColor="#D4D4D4" />
      <XStack height={56} backgroundColor="transparent" alignItems="center" justifyContent="space-around" paddingTop={8}>
        {tabs.map(tab => {
          const isActive = currentTab === tab.path
          const color = isActive ? '#1C1C1C' : '#8C8C8C'
          return (
            <YStack
              key={tab.path}
              alignItems="center"
              justifyContent="center"
              gap={4}
              flex={1}
              cursor="pointer"
              onPress={() => navigate(tab.path)}
              paddingVertical={4}
            >
              <tab.icon size={22} color={color} />
              <Text
                fontSize={11}
                fontWeight={isActive ? '600' : '400'}
                color={color}
              >
                {tab.label}
              </Text>
            </YStack>
          )
        })}
      </XStack>
      {/* Home indicator */}
      <XStack height={34} backgroundColor="transparent" alignItems="flex-start" justifyContent="center" paddingTop={8}>
        <XStack width={134} height={5} backgroundColor="#1C1C1C" borderRadius={3} />
      </XStack>
    </YStack>
  )
}
