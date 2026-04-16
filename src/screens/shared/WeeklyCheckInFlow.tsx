import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useToast } from '../../components/Toast'

type AreaRating = {
  key: string
  label: string
  initial: number
}

const AREAS: AreaRating[] = [
  { key: 'finances', label: 'Finances', initial: 8 },
  { key: 'intimacy', label: 'Intimacy', initial: 6 },
  { key: 'parenting', label: 'Parenting', initial: 9 },
]

export function WeeklyCheckInFlow() {
  const navigate = useNavigate()
  const toast = useToast()
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(AREAS.map((a) => [a.key, a.initial]))
  )

  const setOne = (key: string, v: number) =>
    setRatings((prev) => ({ ...prev, [key]: v }))

  const handleSubmit = () => {
    toast.show('Thanks for checking in')
    navigate('/us')
  }

  return (
    <AuthShell>
      <HomeNavBar title="Weekly Check-In" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={16}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Rate each focus area (1-10)
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
        >
          How did you feel about each area this week?
        </Text>

        {AREAS.map((area) => (
          <RatingCard
            key={area.key}
            label={area.label}
            value={ratings[area.key]}
            onChange={(v) => setOne(area.key, v)}
          />
        ))}

        <YStack height={8} />
        <PrimaryPillButton label="Submit Check In" onPress={handleSubmit} />
      </YStack>
    </AuthShell>
  )
}

function RatingCard({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      gap={10}
    >
      <XStack justifyContent="space-between" alignItems="center">
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
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          {value}/10
        </Text>
      </XStack>
      <Slider value={value} onChange={onChange} />
    </YStack>
  )
}

function Slider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const pct = ((value - 1) / 9) * 100
  return (
    <div style={{ position: 'relative', height: 24, width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: 0,
          right: 0,
          height: 6,
          borderRadius: 3,
          background: 'rgba(44,46,42,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 9,
          left: 0,
          width: `${pct}%`,
          height: 6,
          borderRadius: 3,
          background: 'var(--acoh-accent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 2,
          left: `calc(${pct}% - 10px)`,
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#FFFFFF',
          border: '2px solid var(--acoh-accent)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  )
}
