import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { Flame, Trophy, Square, SquareCheckBig, Mic } from 'lucide-react'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type DayEntry = { label: string; done: boolean }

const HISTORY: DayEntry[] = [
  { label: 'Today', done: true },
  { label: 'Yesterday', done: false },
  { label: 'Mon', done: true },
  { label: 'Sun', done: false },
  { label: 'Sat', done: true },
  { label: 'Fri', done: false },
  { label: 'Thu', done: true },
]

const INFO_ROWS: { label: string; value: string }[] = [
  { label: 'Type', value: 'Shared' },
  { label: 'Frequency', value: 'Daily' },
  { label: 'Focus Area', value: 'Intimacy' },
]

export function HabitDetail() {
  const navigate = useNavigate()
  const [note, setNote] = useState('')

  return (
    <AuthShell>
      <HomeNavBar title="Habit Detail" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={8}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={22}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          Daily hug or kiss
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
        >
          Intimacy · Daily
        </Text>

        <YStack height={4} />

        {/* Info card */}
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={14}
          gap={10}
        >
          {INFO_ROWS.map(row => (
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
                color="var(--acoh-body)"
              >
                {row.value}
              </Text>
            </XStack>
          ))}
        </YStack>

        <YStack height={4} />

        {/* Streak card */}
        <XStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={14}
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack gap={8} alignItems="center">
            <Flame size={20} color="var(--acoh-foreground)" />
            <YStack gap={1}>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                Current Streak
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={16}
                fontWeight="700"
                color="var(--acoh-body)"
              >
                12 days
              </Text>
            </YStack>
          </XStack>
          <XStack gap={4} alignItems="center">
            <Trophy size={16} color="var(--acoh-muted)" />
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={12}
              color="var(--acoh-muted)"
            >
              Next: 30 days
            </Text>
          </XStack>
        </XStack>

        <YStack height={8} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Completion History
        </Text>

        {HISTORY.map(day => (
          <XStack
            key={day.label}
            paddingHorizontal={14}
            paddingVertical={8}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={14}
              color="var(--acoh-body)"
            >
              {day.label}
            </Text>
            {day.done ? (
              <SquareCheckBig size={20} color="var(--acoh-foreground)" />
            ) : (
              <Square size={20} color="var(--acoh-muted)" />
            )}
          </XStack>
        ))}

        <YStack height={8} />

        {/* Completion note */}
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          fontWeight="600"
          color="var(--acoh-body)"
        >
          Completion Note (optional)
        </Text>
        <XStack
          backgroundColor="#FFFFFF"
          borderRadius={22}
          paddingLeft={20}
          paddingRight={14}
          paddingVertical={12}
          alignItems="center"
          justifyContent="space-between"
          gap={12}
          style={{ border: '1px solid #d4d4d4' }}
        >
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How did it go today?"
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              color: 'var(--acoh-foreground)',
            }}
          />
          <Mic size={20} color="var(--acoh-muted)" />
        </XStack>

        <YStack height={8} />

        <PrimaryPillButton label="Edit Habit" onPress={() => navigate('/shared/add-habit')} />
      </YStack>
    </AuthShell>
  )
}
