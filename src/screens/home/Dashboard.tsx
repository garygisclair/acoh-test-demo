import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../../components/TopBar'
import { SectionHeader, WireCard, MutedText, ProgressBar, BorderCard } from '../../components/shared'
import { TODAYS_HABITS, PARTNER_COMPLETIONS, SPARKS, APPROVALS } from '../../data/fakeData'
import { Sparkles, ArrowRight, Square, SquareCheckBig, Flame } from 'lucide-react'

export function Dashboard() {
  const navigate = useNavigate()
  const [habits, setHabits] = useState(TODAYS_HABITS.map(h => ({ ...h })))

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h))
  }

  const completed = habits.filter(h => h.completed).length
  const partnerCompleted = PARTNER_COMPLETIONS.filter(p => p.completed).length

  return (
    <YStack flex={1}>
      <TopBar title="Today" />
      <YStack padding={0} paddingBottom={24} gap={0} flex={1}>
        {/* Approval banner */}
        {APPROVALS.length > 0 && (
          <XStack
            backgroundColor="#F2F2F2"
            paddingVertical={12}
            paddingHorizontal={24}
            gap={8}
            alignItems="center"
            cursor="pointer"
            onPress={() => navigate('/home/approvals')}
          >
            <Text fontSize={13} color="#1C1C1C" flex={1}>
              Partner wants to add "{APPROVALS[0].title}"
            </Text>
            <ArrowRight size={16} color="#8C8C8C" />
          </XStack>
        )}

        {/* Today's Spark score card */}
        <YStack paddingHorizontal={24} paddingTop={12}>
          <BorderCard>
            <YStack gap={8}>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={6} alignItems="center">
                  <Sparkles size={18} color="#1C1C1C" />
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C">Today's Spark</Text>
                </XStack>
                <Text fontSize={16} fontWeight="700" color="#1C1C1C">75/100</Text>
              </XStack>
              <MutedText>Good progress!</MutedText>
              <ProgressBar value={75} />
              <XStack justifyContent="space-between">
                <MutedText>You: {completed} completed</MutedText>
                <MutedText>Partner: {partnerCompleted} completed</MutedText>
              </XStack>
            </YStack>
          </BorderCard>
        </YStack>

        {/* Your Habits Today */}
        <SectionHeader title="Your Habits Today" linkText="View all &rarr;" linkTo="/habits" />
        <YStack paddingHorizontal={24} gap={4}>
          {habits.map(h => (
            <WireCard key={h.id} onPress={() => toggleHabit(h.id)} padding={12}>
              <XStack gap={12} alignItems="center">
                {h.completed
                  ? <SquareCheckBig size={22} color="#1C1C1C" />
                  : <Square size={22} color="#D4D4D4" />
                }
                <YStack flex={1}>
                  <Text
                    fontSize={14}
                    color={h.completed ? '#8C8C8C' : '#1C1C1C'}
                    textDecorationLine={h.completed ? 'line-through' : 'none'}
                  >
                    {h.name}
                  </Text>
                  <MutedText>{h.focusArea} &middot; {h.frequency}</MutedText>
                </YStack>
              </XStack>
            </WireCard>
          ))}
        </YStack>

        {/* Partner's Progress */}
        <SectionHeader title="Partner's Progress" linkText="View all &rarr;" linkTo="/home/partner-progress" />
        <YStack paddingHorizontal={24} gap={4}>
          {PARTNER_COMPLETIONS.slice(0, 2).map(p => (
            <WireCard key={p.habitName} padding={12}>
              <XStack gap={12} alignItems="center">
                {p.completed
                  ? <SquareCheckBig size={20} color="#1C1C1C" />
                  : <Square size={20} color="#D4D4D4" />
                }
                <YStack flex={1}>
                  <Text fontSize={14} color={p.completed ? '#8C8C8C' : '#1C1C1C'}>{p.habitName}</Text>
                  <MutedText>{p.completed ? 'Completed ✓' : 'Not yet'}</MutedText>
                </YStack>
              </XStack>
            </WireCard>
          ))}
        </YStack>

        {/* Recent Sparks */}
        <SectionHeader title="Recent Sparks" linkText="View all &rarr;" linkTo="/home/sparks" />
        <YStack paddingHorizontal={24}>
          <WireCard onPress={() => navigate('/home/sparks')} padding={12}>
            <XStack gap={8} alignItems="center">
              <Flame size={18} color="#1C1C1C" />
              <YStack flex={1}>
                <Text fontSize={14} fontWeight="600" color="#1C1C1C">Partner</Text>
                <MutedText>{SPARKS[0].message}</MutedText>
              </YStack>
            </XStack>
          </WireCard>
        </YStack>

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" linkText="View all &rarr;" linkTo="/home/quick-actions" />
        <XStack paddingHorizontal={24} gap={8} paddingBottom={16}>
          <XStack flex={1}>
            <BorderCard onPress={() => navigate('/shared/send-spark')}>
              <Text fontSize={13} fontWeight="600" color="#1C1C1C" textAlign="center">Send Spark</Text>
            </BorderCard>
          </XStack>
          <XStack flex={1}>
            <BorderCard onPress={() => navigate('/us/weekly-check-in')}>
              <Text fontSize={13} fontWeight="600" color="#1C1C1C" textAlign="center">Check-In</Text>
            </BorderCard>
          </XStack>
        </XStack>
      </YStack>
    </YStack>
  )
}
