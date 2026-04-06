import { YStack, XStack, Text } from 'tamagui'
import { useParams, useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, PrimaryButton, OutlineButton, BorderCard, MutedText } from '../../components/shared'
import { SPARKS } from '../../data/fakeData'
import { Flame, Star, ThumbsUp, Heart, Trophy, Sparkles } from 'lucide-react'

const iconMap: Record<string, any> = {
  flame: Flame, star: Star, 'thumbs-up': ThumbsUp, heart: Heart,
  trophy: Trophy, sparkles: Sparkles,
}

export function SparkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const spark = SPARKS.find(s => s.id === Number(id)) ?? SPARKS[0]
  const Icon = iconMap[spark.type] || Sparkles

  return (
    <YStack flex={1}>
      <NavBar title="Spark Detail" />
      <ScreenContent>
        <YStack alignItems="center" gap={16} marginTop={40}>
          <Icon size={48} color="#1C1C1C" />
          <Text fontSize={18} fontWeight="600" color="#1C1C1C">From {spark.from}</Text>
          <MutedText>{spark.time}</MutedText>
          {spark.message && (
            <BorderCard>
              <Text fontSize={14} color="#1C1C1C" textAlign="center">{spark.message}</Text>
            </BorderCard>
          )}
          {spark.habitName && (
            <BorderCard>
              <XStack gap={8} alignItems="center">
                <MutedText>Tied to habit</MutedText>
                <YStack>
                  <Text fontSize={14} color="#1C1C1C">{spark.habitName}</Text>
                  <MutedText>Communication · Daily · Shared</MutedText>
                </YStack>
              </XStack>
            </BorderCard>
          )}
        </YStack>
        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Send a Spark Back" onPress={() => navigate('/shared/send-spark')} />
          <OutlineButton label="Mark as Read" onPress={() => navigate('/home/sparks')} />
          <Text
            fontSize={14}
            color="#8C8C8C"
            textAlign="center"
            cursor="pointer"
          >
            Delete Spark
          </Text>
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
