import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../../components/TopBar'
import { ScreenContent, WireCard, MutedText, OutlineButton } from '../../components/shared'
import { ArrowRight } from 'lucide-react'

export function Account() {
  const navigate = useNavigate()
  const links = [
    { label: 'Partnership', to: '/profile/partnership' },
    { label: 'Notification Preferences', to: '/profile/notification-prefs' },
    { label: 'App Settings', to: '/profile/app-settings' },
  ]

  return (
    <YStack flex={1}>
      <TopBar title="Profile" />
      <ScreenContent>
        {/* Avatar + name + email */}
        <YStack alignItems="center" gap={8}>
          <YStack
            width={80}
            height={80}
            borderRadius={40}
            backgroundColor="#F2F2F2"
            borderWidth={1}
            borderColor="#D4D4D4"
          />
          <Text fontSize={20} fontWeight="600" color="#1C1C1C">Alex Johnson</Text>
          <MutedText>alex@example.com</MutedText>
          <OutlineButton label="Edit Profile" />
        </YStack>

        {/* Account details rows */}
        <YStack gap={4} marginTop={8}>
          <WireCard padding={14}>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Display Name</Text>
              <MutedText>Alex Johnson</MutedText>
            </XStack>
          </WireCard>
          <WireCard padding={14}>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Email</Text>
              <MutedText>alex@example.com</MutedText>
            </XStack>
          </WireCard>
          <WireCard padding={14}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} color="#1C1C1C">Password</Text>
              <MutedText>••••••••</MutedText>
            </XStack>
          </WireCard>
          <WireCard padding={14}>
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#1C1C1C">Connected Accounts</Text>
              <MutedText>Google</MutedText>
            </XStack>
          </WireCard>
        </YStack>

        <Separator borderColor="#F2F2F2" marginVertical={4} />

        {/* Navigation links */}
        <YStack gap={4}>
          {links.map(link => (
            <WireCard key={link.label} onPress={() => navigate(link.to)} padding={14}>
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">{link.label}</Text>
                <ArrowRight size={16} color="#8C8C8C" />
              </XStack>
            </WireCard>
          ))}
        </YStack>

        {/* Sign Out */}
        <WireCard onPress={() => navigate('/profile/sign-out')} padding={14}>
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={14} color="#8C8C8C">Sign Out</Text>
            <ArrowRight size={16} color="#8C8C8C" />
          </XStack>
        </WireCard>
      </ScreenContent>
    </YStack>
  )
}
