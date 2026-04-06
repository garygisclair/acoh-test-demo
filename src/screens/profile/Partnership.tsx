import { YStack, XStack, Text } from 'tamagui'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, Avatar, MutedText } from '../../components/shared'
import { PARTNER } from '../../data/fakeData'

export function Partnership() {
  return (
    <YStack flex={1}>
      <NavBar title="Partnership" />
      <ScreenContent>
        <YStack gap={12} alignItems="center" padding={8}>
          <Avatar letter={PARTNER.avatar} size={64} />
          <Text fontSize={18} fontWeight="600" color="#1C1C1C">{PARTNER.name}</Text>
          <MutedText>{PARTNER.email}</MutedText>
        </YStack>

        <WireCard>
          <YStack gap={8}>
            <XStack justifyContent="space-between">
              <MutedText>Status</MutedText>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Active</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Paired Since</MutedText>
              <Text fontSize={14} color="#1C1C1C">March 15, 2026</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Focus Areas</MutedText>
              <Text fontSize={14} color="#1C1C1C">5 active</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Shared Habits</MutedText>
              <Text fontSize={14} color="#1C1C1C">4</Text>
            </XStack>
          </YStack>
        </WireCard>

        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Partnership Stats</Text>

        <WireCard>
          <YStack gap={8}>
            <XStack justifyContent="space-between">
              <MutedText>Sparks Exchanged</MutedText>
              <Text fontSize={14} color="#1C1C1C">47</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Check-Ins Completed</MutedText>
              <Text fontSize={14} color="#1C1C1C">12</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Avg Alignment</MutedText>
              <Text fontSize={14} color="#1C1C1C">76%</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Current Streak</MutedText>
              <Text fontSize={14} color="#1C1C1C">5 days</Text>
            </XStack>
          </YStack>
        </WireCard>

        <YStack flex={1} />
        <XStack
          height={44}
          borderRadius={9}
          backgroundColor="#FFFFFF"
          borderWidth={1}
          borderColor="#D4D4D4"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          pressStyle={{ scale: 0.97, opacity: 0.85 }}
        >
          <Text fontSize={14} fontWeight="600" color="#8C8C8C">Dissolve Partnership</Text>
        </XStack>
      </ScreenContent>
    </YStack>
  )
}
