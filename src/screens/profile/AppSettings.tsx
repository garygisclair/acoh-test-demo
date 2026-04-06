import { YStack, XStack, Text } from 'tamagui'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, MutedText } from '../../components/shared'
import { ChevronRight } from 'lucide-react'

function SettingsRow({ label, right, showArrow = true, onPress }: {
  label: string
  right?: string
  showArrow?: boolean
  onPress?: () => void
}) {
  return (
    <WireCard onPress={onPress}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={14} color="#1C1C1C">{label}</Text>
        <XStack gap={6} alignItems="center">
          {right && <MutedText>{right}</MutedText>}
          {showArrow && <ChevronRight size={18} color="#8C8C8C" />}
        </XStack>
      </XStack>
    </WireCard>
  )
}

export function AppSettings() {
  return (
    <YStack flex={1}>
      <NavBar title="App Settings" />
      <ScreenContent>
        {/* Appearance */}
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Appearance</Text>
        <SettingsRow label="Theme" right="System Default" />

        {/* About */}
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">About</Text>
        <YStack gap={8}>
          <SettingsRow label="Version" right="1.0.0 (Build 42)" showArrow={false} />
          <SettingsRow label="Terms of Service" />
          <SettingsRow label="Privacy Policy" />
        </YStack>

        {/* Data & Privacy */}
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Data & Privacy</Text>
        <YStack gap={8}>
          <SettingsRow label="Export My Data" />
          <SettingsRow label="Delete Account" />
        </YStack>

        {/* Encryption note */}
        <Text fontSize={13} color="#8C8C8C" fontStyle="italic">
          E2E encryption: Your personal data is encrypted and cannot be read by the server.
        </Text>
      </ScreenContent>
    </YStack>
  )
}
