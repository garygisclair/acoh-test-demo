import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText, WireCard } from '../../components/shared'
import { Plus, Check } from 'lucide-react'

const SUGGESTED = [
  {
    area: 'Communication',
    habits: [
      { id: 'comm-1', name: '10-min check-in conversation', freq: 'Suggested · Daily' },
      { id: 'comm-2', name: 'Express appreciation', freq: 'Suggested · Daily' },
    ],
  },
  {
    area: 'Quality Time',
    habits: [
      { id: 'qt-1', name: 'Date night', freq: 'Suggested · Weekly' },
      { id: 'qt-2', name: 'No-phone time together', freq: 'Suggested · Daily' },
    ],
  },
]

export function InitialGoals() {
  const navigate = useNavigate()
  const [added, setAdded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setAdded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <YStack flex={1}>
      <NavBar title="Setup" rightText="3/3" onBack={() => navigate('/onboarding/baseline-ratings')} />
      <ScreenContent>
        <YStack alignItems="center" gap={4}>
          <Text fontSize={22} fontWeight="700" color="#1C1C1C">Add Goals & Habits</Text>
          <MutedText size={14}>Optionally add goals and habits for your focus areas. You can always add more later.</MutedText>
        </YStack>
        <YStack gap={12}>
          {SUGGESTED.map(group => (
            <YStack key={group.area} gap={6}>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">{group.area}</Text>
              {group.habits.map(h => {
                const isAdded = added.has(h.id)
                return (
                  <WireCard key={h.id}>
                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack gap={2} flex={1}>
                        <Text fontSize={14} color="#1C1C1C">{h.name}</Text>
                        <MutedText size={12}>{h.freq}</MutedText>
                      </YStack>
                      <XStack
                        gap={4}
                        alignItems="center"
                        cursor="pointer"
                        onPress={() => toggle(h.id)}
                      >
                        {isAdded ? <Check size={14} color="#1C1C1C" /> : <Plus size={14} color="#8C8C8C" />}
                        <Text
                          fontSize={14}
                          color={isAdded ? '#1C1C1C' : '#8C8C8C'}
                          fontWeight={isAdded ? '600' : '400'}
                        >
                          {isAdded ? 'Added' : 'Add'}
                        </Text>
                      </XStack>
                    </XStack>
                  </WireCard>
                )
              })}
              <XStack gap={4} alignItems="center" marginTop={4} cursor="pointer" onPress={() => navigate('/shared/add-habit')}>
                <Plus size={14} color="#8C8C8C" />
                <Text fontSize={14} color="#8C8C8C">Add custom habit</Text>
              </XStack>
            </YStack>
          ))}
        </YStack>
        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Continue" onPress={() => navigate('/onboarding/review')} />
          <OutlineButton label="Skip for Now" onPress={() => navigate('/onboarding/do-this-later')} />
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
