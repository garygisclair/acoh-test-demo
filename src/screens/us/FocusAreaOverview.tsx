import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../../components/TopBar'
import { SectionHeader, BorderCard, ProgressBar, MutedText } from '../../components/shared'
import { FOCUS_AREAS } from '../../data/fakeData'
import { ArrowRight } from 'lucide-react'

const trendText = (trend: string) => {
  if (trend === 'up') return 'Trending up'
  if (trend === 'down') return 'Trending down'
  return 'Stable'
}

const ALIGNMENT_PCT: Record<string, string> = {
  'Communication': '90%',
  'Quality Time': '70%',
  'Health & Energy': '85%',
  'Intimacy': '40%',
  'Personal Growth': '80%',
}

const alignmentPct = (name: string) => ALIGNMENT_PCT[name] ?? '—'

export function FocusAreaOverview() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <TopBar title="Us" />
      <YStack padding={0} paddingBottom={24} gap={0} flex={1}>
        <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={24} paddingVertical={8}>
          <Text fontSize={16} fontWeight="600" color="#1C1C1C">Focus Areas</Text>
          <MutedText>{FOCUS_AREAS.length} areas</MutedText>
        </XStack>
        <YStack paddingHorizontal={24} gap={8}>
          {FOCUS_AREAS.map(fa => (
            <BorderCard key={fa.id} onPress={() => navigate(`/shared/focus-area-detail/${fa.id}`)}>
              <YStack gap={6}>
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">{fa.name}</Text>
                  <Text fontSize={16} fontWeight="700" color="#1C1C1C">{fa.score}/100</Text>
                </XStack>
                <ProgressBar value={fa.score} />
                <XStack justifyContent="space-between">
                  <MutedText>{trendText(fa.trend)}</MutedText>
                  <MutedText>Alignment: {alignmentPct(fa.name)}</MutedText>
                </XStack>
              </YStack>
            </BorderCard>
          ))}
        </YStack>

        {/* Weekly Check-In */}
        <SectionHeader title="Weekly Check-In" linkText="Start &rarr;" linkTo="/us/weekly-check-in" />
        <YStack paddingHorizontal={24}>
          <BorderCard onPress={() => navigate('/us/weekly-check-in')}>
            <XStack justifyContent="space-between" alignItems="center">
              <YStack>
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">Check-in due this week</Text>
                <MutedText>You: Not started &middot; Partner: Not started</MutedText>
              </YStack>
              <ArrowRight size={16} color="#8C8C8C" />
            </XStack>
          </BorderCard>
        </YStack>

        {/* This Week's Insight */}
        <SectionHeader title="This Week's Insight" linkText="View &rarr;" linkTo="/us/key-insight" />
        <YStack paddingHorizontal={24}>
          <BorderCard onPress={() => navigate('/us/key-insight')}>
            <XStack justifyContent="space-between" alignItems="center">
              <YStack flex={1}>
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">Intimacy alignment is dropping</Text>
                <MutedText>Your ratings differ by 2 points</MutedText>
              </YStack>
              <ArrowRight size={16} color="#8C8C8C" />
            </XStack>
          </BorderCard>
        </YStack>

        {/* Suggested Action */}
        <SectionHeader title="Suggested Action" linkText="View &rarr;" linkTo="/us/suggested-actions" />
        <YStack paddingHorizontal={24} paddingBottom={16}>
          <BorderCard onPress={() => navigate('/us/suggested-actions')}>
            <XStack justifyContent="space-between" alignItems="center">
              <YStack flex={1}>
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">Have a conversation about Intimacy</Text>
                <MutedText>Based on alignment score (40%)</MutedText>
              </YStack>
              <ArrowRight size={16} color="#8C8C8C" />
            </XStack>
          </BorderCard>
        </YStack>
      </YStack>
    </YStack>
  )
}
