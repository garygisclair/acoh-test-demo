import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText } from '../../components/shared'
import { GOALS } from '../../data/fakeData'
import { Plus } from 'lucide-react'

export function Goals() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Goals" />
      <ScreenContent>
        <YStack gap={12}>
          {GOALS.map(g => (
            <BorderCard key={g.id}>
              <YStack gap={8}>
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">{g.name}</Text>
                <MutedText>{g.focusArea}</MutedText>
                <YStack gap={4} marginTop={4}>
                  {g.habits.map(h => (
                    <MutedText key={h}>&bull; {h}</MutedText>
                  ))}
                </YStack>
              </YStack>
            </BorderCard>
          ))}
        </YStack>
        <BorderCard onPress={() => navigate('/shared/add-goal')}>
          <XStack gap={8} alignItems="center" justifyContent="center">
            <Plus size={18} color="#1C1C1C" />
            <Text fontSize={14} fontWeight="600" color="#1C1C1C">Add Goal</Text>
          </XStack>
        </BorderCard>
      </ScreenContent>
    </YStack>
  )
}
