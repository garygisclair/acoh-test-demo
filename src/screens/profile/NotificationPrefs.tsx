import { useState } from 'react'
import { YStack, XStack, Text, Switch } from 'tamagui'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, MutedText } from '../../components/shared'

const PREFS = [
  { label: 'Habit Completed', description: 'When partner completes a habit', defaultOn: true },
  { label: 'Spark Received', description: 'When you receive a spark', defaultOn: true },
  { label: 'Approval Requested', description: 'When partner requests an approval', defaultOn: true },
  { label: 'Approval Resolved', description: 'When an approval is resolved', defaultOn: true },
  { label: 'Weekly Check-In Reminder', description: 'Reminder to complete your check-in', defaultOn: true },
  { label: 'Partner Accepted Invitation', description: 'When partner accepts your invite', defaultOn: false },
  { label: 'Onboarding Completed', description: 'When onboarding is finished', defaultOn: false },
]

export function NotificationPrefs() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFS.map(p => [p.label, p.defaultOn]))
  )

  return (
    <YStack flex={1}>
      <NavBar title="Notifications" />
      <ScreenContent>
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Push Notification Preferences</Text>
        <MutedText>Choose which events send push notifications</MutedText>

        <YStack gap={12}>
          {PREFS.map(pref => (
            <WireCard key={pref.label}>
              <XStack justifyContent="space-between" alignItems="center">
                <YStack flex={1} marginRight={16} gap={2}>
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{pref.label}</Text>
                  <MutedText>{pref.description}</MutedText>
                </YStack>
                <Switch
                  size="$3"
                  checked={enabled[pref.label]}
                  onCheckedChange={val => setEnabled(prev => ({ ...prev, [pref.label]: val }))}
                  backgroundColor={enabled[pref.label] ? '#1C1C1C' : '#D4D4D4'}
                >
                  <Switch.Thumb backgroundColor="#FFFFFF" />
                </Switch>
              </XStack>
            </WireCard>
          ))}
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
