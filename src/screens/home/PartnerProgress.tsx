import { YStack, XStack, Text } from 'tamagui'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, MutedText, WireCard } from '../../components/shared'
import { PARTNER_COMPLETIONS } from '../../data/fakeData'
import { SquareCheckBig, Square } from 'lucide-react'

export function PartnerProgress() {
  const completed = PARTNER_COMPLETIONS.filter(p => p.completed).length
  return (
    <YStack flex={1}>
      <NavBar title="Partner's Progress" />
      <ScreenContent>
        <MutedText>What your partner has done today</MutedText>
        <YStack gap={8}>
          {PARTNER_COMPLETIONS.map(p => (
            <WireCard key={p.habitName} padding={12}>
              <XStack gap={12} alignItems="center">
                {p.completed
                  ? <SquareCheckBig size={20} color="#1C1C1C" />
                  : <Square size={20} color="#D4D4D4" />
                }
                <YStack flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{p.habitName}</Text>
                  <MutedText>{p.focusArea} &middot; {p.completed ? 'Completed ✓' : 'Not yet'}</MutedText>
                </YStack>
              </XStack>
            </WireCard>
          ))}
        </YStack>
        <WireCard>
          <Text fontSize={14} color="#1C1C1C" textAlign="center">
            {completed} of {PARTNER_COMPLETIONS.length} habits completed today
          </Text>
        </WireCard>
      </ScreenContent>
    </YStack>
  )
}
