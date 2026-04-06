import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { PrimaryButton, OutlineButton, Chip, ScreenContent, MutedText } from '../../components/shared'
import { FOCUS_AREA_PRESETS } from '../../data/fakeData'

export function SelectFocusAreas() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>(['Communication', 'Quality Time'])

  const toggle = (area: string) => {
    setSelected(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    )
  }

  return (
    <YStack flex={1}>
      <NavBar title="Setup" rightText="1/3" onBack={() => navigate('/onboarding/waiting')} />
      <ScreenContent>
        <Text fontSize={22} fontWeight="700" color="#1C1C1C" textAlign="center">Choose Focus Areas</Text>
        <MutedText size={14}>
          Select the areas of your relationship you want to work on together.
        </MutedText>
        <XStack flexWrap="wrap" gap={8} marginTop={8}>
          {FOCUS_AREA_PRESETS.map(area => (
            <Chip key={area} label={area} selected={selected.includes(area)} onPress={() => toggle(area)} />
          ))}
        </XStack>
        <Text fontSize={14} color="#8C8C8C" marginTop={8} cursor="pointer">
          + Add Custom Focus Area
        </Text>
        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Continue" onPress={() => navigate('/onboarding/baseline-ratings')} />
          <OutlineButton label="Skip for Now" onPress={() => navigate('/onboarding/do-this-later')} />
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
