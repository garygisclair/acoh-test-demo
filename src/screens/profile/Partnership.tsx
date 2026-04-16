import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { AVATAR_YOU } from '../../assets/onboarding'

const STATUS_ROWS = [
  { label: 'Status', value: 'Active' },
  { label: 'Paired Since', value: 'March 15, 2026' },
  { label: 'Focus Areas', value: '3 active' },
  { label: 'Shared Habits', value: '4' },
]

const STATS_ROWS = [
  { label: 'Sparks Exchanged', value: '47' },
  { label: 'Check-Ins Completed', value: '12' },
  { label: 'Avg Alignment', value: '76%' },
  { label: 'Current Streak', value: '5 days' },
]

export function Partnership() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Partnership" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={24} paddingBottom={32} gap={16} alignItems="center">
        {/* Partner avatar */}
        <XStack width={64} height={64} borderRadius={32} overflow="hidden" backgroundColor="#dadaf1">
          <img
            src={AVATAR_YOU}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </XStack>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={18}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          Jordan Smith
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          marginTop={-12}
        >
          jordan@example.com
        </Text>

        {/* Status card */}
        <InfoCard rows={STATUS_ROWS} />

        <YStack height={4} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
          width="100%"
        >
          Partnership Stats
        </Text>

        <InfoCard rows={STATS_ROWS} />

        <YStack height={8} />

        <XStack
          height={48}
          borderRadius={24}
          backgroundColor="#FFFFFF"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          pressStyle={{ scale: 0.98, opacity: 0.92 }}
          width="100%"
          style={{ border: '1px solid var(--acoh-primary)' }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="var(--acoh-primary)"
          >
            Dissolve Partnership
          </Text>
        </XStack>
      </YStack>
    </AuthShell>
  )
}

function InfoCard({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      gap={8}
      width="100%"
    >
      {rows.map(row => (
        <XStack key={row.label} justifyContent="space-between" alignItems="center">
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            color="var(--acoh-body)"
          >
            {row.label}
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="600"
            color="var(--acoh-foreground)"
          >
            {row.value}
          </Text>
        </XStack>
      ))}
    </YStack>
  )
}
