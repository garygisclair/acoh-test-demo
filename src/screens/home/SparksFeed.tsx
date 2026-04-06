import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, MutedText, Chip, PrimaryButton } from '../../components/shared'
import { SPARKS } from '../../data/fakeData'
import { Flame, Star, ThumbsUp, Heart, Target, HandHeart, Handshake, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const SPARK_ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  star: Star,
  'thumbs-up': ThumbsUp,
  heart: Heart,
  target: Target,
  'hand-heart': HandHeart,
  handshake: Handshake,
  sparkles: Sparkles,
}

const SENT_SPARKS = [
  { id: 101, type: 'heart', to: 'Alex', message: 'You made my day!', time: '3 hours ago', habitName: 'Express appreciation' },
  { id: 102, type: 'sparkles', to: 'Alex', message: 'Proud of us this week', time: 'Yesterday', habitName: null },
  { id: 103, type: 'flame', to: 'Alex', message: 'Keep it up!', time: '2 days ago', habitName: '10-min check-in' },
  { id: 104, type: 'handshake', to: 'Alex', message: 'Great teamwork today', time: '3 days ago', habitName: 'No-phone time together' },
]

export function SparksFeed() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'received' | 'sent'>('received')
  const sparks = tab === 'received' ? SPARKS : SENT_SPARKS

  return (
    <YStack flex={1}>
      <NavBar title="Sparks" />
      <ScreenContent>
        <XStack gap={8}>
          <Chip label="Received" selected={tab === 'received'} onPress={() => setTab('received')} />
          <Chip label="Sent" selected={tab === 'sent'} onPress={() => setTab('sent')} />
        </XStack>
        <MutedText>{tab === 'received' ? 'Recent encouragement from your partner' : 'Sparks you sent to your partner'}</MutedText>
        <YStack gap={12}>
          {sparks.map(spark => {
            const Icon = SPARK_ICONS[spark.type] || Sparkles
            const label = tab === 'received' ? `From: ${(spark as any).from}` : `To: ${(spark as any).to}`
            return (
              <WireCard key={spark.id} onPress={() => navigate(`/shared/spark-detail/${spark.id}`)}>
                <XStack gap={12} alignItems="flex-start">
                  <Icon size={20} color="#1C1C1C" />
                  <YStack flex={1} gap={4}>
                    <XStack justifyContent="space-between">
                      <Text fontSize={14} fontWeight="600" color="#1C1C1C">{label}</Text>
                      <MutedText>{spark.time}</MutedText>
                    </XStack>
                    {spark.message ? (
                      <Text fontSize={14} color="#1C1C1C">{spark.message}</Text>
                    ) : null}
                    {spark.habitName && (
                      <MutedText>{spark.habitName}</MutedText>
                    )}
                  </YStack>
                </XStack>
              </WireCard>
            )
          })}
        </YStack>
        <PrimaryButton label="Send Spark" onPress={() => navigate('/shared/send-spark')} />
      </ScreenContent>
    </YStack>
  )
}
