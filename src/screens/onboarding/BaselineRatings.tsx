import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText } from '../../components/shared'

const AREAS = ['Communication', 'Quality Time']

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const pct = ((value - 1) / 9) * 100
  return (
    <YStack gap={8}>
      <XStack justifyContent="space-between">
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">{label}</Text>
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">{value}</Text>
      </XStack>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          height: 6,
          accentColor: '#1C1C1C',
          background: `linear-gradient(to right, #1C1C1C ${pct}%, #D4D4D4 ${pct}%)`,
          borderRadius: 3,
        }}
      />
    </YStack>
  )
}

export function BaselineRatings() {
  const navigate = useNavigate()
  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(AREAS.map(a => [a, 7]))
  )

  return (
    <YStack flex={1}>
      <NavBar title="Setup" rightText="2/3" onBack={() => navigate('/onboarding/select-focus-areas')} />
      <ScreenContent>
        <Text fontSize={22} fontWeight="700" color="#1C1C1C" textAlign="center">Rate Each Area</Text>
        <Text fontSize={14} color="#8C8C8C" textAlign="center">
          {"How do you feel about each area right now?\n(1 = needs work, 10 = thriving)"}
        </Text>
        <YStack gap={20}>
          {AREAS.map(area => (
            <Slider
              key={area}
              label={area}
              value={ratings[area]}
              onChange={v => setRatings(prev => ({ ...prev, [area]: v }))}
            />
          ))}
        </YStack>
        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Continue" onPress={() => navigate('/onboarding/initial-goals')} />
          <OutlineButton label="Skip for Now" onPress={() => navigate('/onboarding/do-this-later')} />
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
