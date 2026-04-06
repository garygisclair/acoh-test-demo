import { useState } from 'react'
import { YStack, XStack, Text, Input } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, PrimaryButton, BorderCard, MutedText } from '../../components/shared'
import { FOCUS_AREAS } from '../../data/fakeData'
import { Mic } from 'lucide-react'

const INITIAL_RATINGS: Record<number, number> = {
  1: 8, 2: 6, 3: 9, 4: 5, 5: 7,
}

export function WeeklyCheckInFlow() {
  const navigate = useNavigate()
  const [ratings, setRatings] = useState<Record<number, number>>(INITIAL_RATINGS)

  return (
    <YStack flex={1}>
      <NavBar title="Weekly Check-In" />
      <ScreenContent>
        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Rate each focus area (1-10)</Text>
        <MutedText>How did you feel about each area this week?</MutedText>
        <YStack gap={12}>
          {FOCUS_AREAS.map(fa => (
            <BorderCard key={fa.id}>
              <YStack gap={10}>
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{fa.name}</Text>
                  <Text fontSize={16} fontWeight="700" color="#1C1C1C">{ratings[fa.id]}/10</Text>
                </XStack>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={ratings[fa.id]}
                  onChange={e => setRatings(prev => ({ ...prev, [fa.id]: Number(e.target.value) }))}
                  style={{ width: '100%', height: 6, accentColor: '#1C1C1C' }}
                />
                <XStack alignItems="center" gap={0}>
                  <Input
                    height={36}
                    flex={1}
                    borderRadius={9}
                    borderWidth={1}
                    borderColor="#D4D4D4"
                    paddingHorizontal={12}
                    fontSize={13}
                    placeholder="Add a note (optional, encrypted)"
                    placeholderTextColor={"#8C8C8C" as any}
                  />
                  <XStack marginLeft={-32} paddingRight={10}>
                    <Mic size={16} color="#8C8C8C" />
                  </XStack>
                </XStack>
              </YStack>
            </BorderCard>
          ))}
        </YStack>
        <PrimaryButton label="Submit Check-In" onPress={() => navigate('/us')} />
      </ScreenContent>
    </YStack>
  )
}
