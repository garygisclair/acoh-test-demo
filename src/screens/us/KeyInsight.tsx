import { YStack, XStack, Text } from 'tamagui'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText } from '../../components/shared'

export function KeyInsight() {
  return (
    <YStack flex={1}>
      <NavBar title="Key Insight" />
      <ScreenContent>
        <BorderCard>
          <YStack gap={12} padding={8}>
            <MutedText>This Week's Insight</MutedText>
            <Text fontSize={16} fontWeight="600" color="#1C1C1C">
              Intimacy alignment is dropping
            </Text>
            <MutedText size={14}>
              Your Intimacy ratings differ by 2 points this week. You rated it 5, your partner rated it 7. Consider discussing what each of you means by this focus area.
            </MutedText>
            <Text fontSize={14} fontWeight="700" color="#1C1C1C">Based on:</Text>
            <YStack gap={4}>
              <Text fontSize={14} color="#1C1C1C">{'\u2022'} Weekly check-in ratings (4-week rolling)</Text>
              <Text fontSize={14} color="#1C1C1C">{'\u2022'} Partner alignment score: 40%</Text>
              <Text fontSize={14} color="#1C1C1C">{'\u2022'} Trend: down 15 points over 2 weeks</Text>
            </YStack>
          </YStack>
        </BorderCard>

        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Previous Insights</Text>
        <BorderCard>
          <YStack gap={4}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Communication streak!</Text>
              <MutedText>1w ago</MutedText>
            </XStack>
            <MutedText>Both completed all habits 7 days in a row</MutedText>
          </YStack>
        </BorderCard>
        <BorderCard>
          <YStack gap={4}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Quality Time needs attention</Text>
              <MutedText>2w ago</MutedText>
            </XStack>
            <MutedText>Habit completion dropped to 40%</MutedText>
          </YStack>
        </BorderCard>
      </ScreenContent>
    </YStack>
  )
}
