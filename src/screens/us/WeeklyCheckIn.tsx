import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

const LAST_WEEK = [
  { area: 'Finances', status: 'Trending Up' },
  { area: 'Intimacy', status: 'Stable' },
  { area: 'Parenting', status: 'Trending Up' },
]

export function WeeklyCheckIn() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Weekly Check-In" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={16}>
        {/* Due prompt card */}
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={20}
          gap={12}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={16}
            fontWeight="700"
            color="var(--acoh-foreground)"
          >
            Weekly Check-In Due
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            color="var(--acoh-body)"
            lineHeight={18}
          >
            Rate each focus area and reflect on your week together. Your partner hasn't completed theirs yet.
          </Text>
          <PrimaryPillButton
            label="Start Check-In"
            onPress={() => navigate('/shared/weekly-check-in-flow')}
          />
        </YStack>

        {/* Status */}
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-foreground)"
        >
          Check-In Status
        </Text>

        <StatusRow label="You" status="Not started" />
        <StatusRow label="Partner" status="Not started" />

        {/* Last week */}
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-foreground)"
        >
          Last Week's Check-In
        </Text>

        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={14}
          gap={6}
        >
          {LAST_WEEK.map(row => (
            <XStack key={row.area} alignItems="center">
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={13}
                color="var(--acoh-body)"
                width={100}
              >
                {row.area}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                {row.status}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </AuthShell>
  )
}

function StatusRow({ label, status }: { label: string; status: string }) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        fontWeight="600"
        color="var(--acoh-body)"
      >
        {label}
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        color="var(--acoh-body)"
      >
        {status}
      </Text>
    </XStack>
  )
}
