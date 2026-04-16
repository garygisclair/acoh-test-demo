import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar, Toggle } from '../../components/home-ui'

type PrefKey =
  | 'habitCompleted'
  | 'sparkReceived'
  | 'approvalRequested'
  | 'approvalResolved'
  | 'weeklyCheckIn'
  | 'partnerAccepted'
  | 'onboardingCompleted'

type Pref = {
  key: PrefKey
  title: string
  subtitle: string
}

const PREFS: Pref[] = [
  { key: 'habitCompleted', title: 'Habit Completed', subtitle: 'When partner completes a habit' },
  { key: 'sparkReceived', title: 'Spark Received', subtitle: 'When you receive encouragement' },
  { key: 'approvalRequested', title: 'Approval Requested', subtitle: 'When partner requests approval' },
  { key: 'approvalResolved', title: 'Approval Resolved', subtitle: 'When your request is approved/declined' },
  { key: 'weeklyCheckIn', title: 'Weekly Check-In Reminder', subtitle: 'Reminder to complete check-in' },
  { key: 'partnerAccepted', title: 'Partner Accepted Invitation', subtitle: 'When partner joins' },
  { key: 'onboardingCompleted', title: 'Onboarding Completed', subtitle: 'When setup is finished' },
]

export function NotificationPrefs() {
  const navigate = useNavigate()
  const [values, setValues] = useState<Record<PrefKey, boolean>>({
    habitCompleted: true,
    sparkReceived: true,
    approvalRequested: true,
    approvalResolved: true,
    weeklyCheckIn: true,
    partnerAccepted: false,
    onboardingCompleted: false,
  })

  const toggle = (key: PrefKey) =>
    setValues(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <AuthShell>
      <HomeNavBar title="Notifications" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={8}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Push Notification Preferences
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
        >
          Choose which events send push notifications
        </Text>

        <YStack height={4} />

        {PREFS.map(pref => (
          <XStack
            key={pref.key}
            backgroundColor="#ebebf9"
            borderRadius={9}
            paddingHorizontal={16}
            paddingVertical={12}
            alignItems="center"
            justifyContent="space-between"
            gap={12}
          >
            <YStack flex={1} gap={2}>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                fontWeight="600"
                color="var(--acoh-foreground)"
              >
                {pref.title}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                {pref.subtitle}
              </Text>
            </YStack>
            <Toggle value={values[pref.key]} onChange={() => toggle(pref.key)} />
          </XStack>
        ))}
      </YStack>
    </AuthShell>
  )
}

