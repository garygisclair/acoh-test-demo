import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../../components/TopBar'
import { SectionHeader, WireCard, MutedText, PrimaryButton } from '../../components/shared'
import { HABITS, GOALS, FOCUS_AREAS } from '../../data/fakeData'
import { SquareCheckBig, Square } from 'lucide-react'

export function HabitList() {
  const navigate = useNavigate()
  const grouped = FOCUS_AREAS.reduce((acc, fa) => {
    acc[fa.name] = HABITS.filter(h => h.focusArea === fa.name)
    return acc
  }, {} as Record<string, typeof HABITS>)

  return (
    <YStack flex={1}>
      <TopBar title="Habits" />
      <YStack padding={0} paddingBottom={24} gap={0} flex={1}>
        {Object.entries(grouped).map(([area, habits]) => (
          habits.length > 0 && (
            <YStack key={area}>
              <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={24} paddingTop={12} paddingBottom={4}>
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">{area}</Text>
                <MutedText>{habits.length} habits</MutedText>
              </XStack>
              <YStack paddingHorizontal={24} gap={4}>
                {habits.map(h => (
                  <WireCard key={h.id} onPress={() => navigate(`/shared/habit-detail/${h.id}`)} padding={12}>
                    <XStack gap={12} alignItems="center">
                      {h.completed
                        ? <SquareCheckBig size={22} color="#1C1C1C" />
                        : <Square size={22} color="#D4D4D4" />
                      }
                      <YStack flex={1}>
                        <Text fontSize={14} fontWeight="600" color="#1C1C1C">{h.name}</Text>
                        <MutedText>{h.frequency} &middot; {h.type}</MutedText>
                      </YStack>
                    </XStack>
                  </WireCard>
                ))}
              </YStack>
            </YStack>
          )
        ))}

        {/* Add Habit button — full width black */}
        <YStack paddingHorizontal={24} marginTop={12}>
          <PrimaryButton label="+ Add Habit" onPress={() => navigate('/shared/add-habit')} />
        </YStack>

        <Separator marginVertical={12} borderColor="#F2F2F2" />

        {/* Goals summary */}
        <SectionHeader title="Goals" linkText="View all" linkTo="/habits/goals" />
        <YStack paddingHorizontal={24}>
          <WireCard>
            <YStack gap={4}>
              {GOALS.slice(0, 3).map(g => (
                <XStack key={g.id} justifyContent="space-between" alignItems="center" paddingVertical={6}>
                  <YStack flex={1}>
                    <Text fontSize={14} color="#1C1C1C">{g.name}</Text>
                    <MutedText>{g.focusArea}</MutedText>
                  </YStack>
                  <MutedText>In progress</MutedText>
                </XStack>
              ))}
            </YStack>
          </WireCard>
        </YStack>

        <Separator marginVertical={12} borderColor="#F2F2F2" />

        {/* Focus Areas summary */}
        <SectionHeader title="Focus Areas" linkText="Manage &rarr;" linkTo="/habits/focus-area-management" />
        <YStack paddingHorizontal={24} paddingBottom={16}>
          <WireCard onPress={() => navigate('/habits/focus-area-management')}>
            <XStack justifyContent="space-between" alignItems="center">
              <YStack>
                <Text fontSize={14} color="#1C1C1C">{FOCUS_AREAS.length} active focus areas</Text>
                <MutedText>Add, remove, or reorder priorities</MutedText>
              </YStack>
              <Text fontSize={13} color="#8C8C8C">&rarr;</Text>
            </XStack>
          </WireCard>
        </YStack>
      </YStack>
    </YStack>
  )
}
