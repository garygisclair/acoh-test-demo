import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, WireCard, MutedText, Chip } from '../../components/shared'
import { SPARKS } from '../../data/fakeData'
import { Sparkles } from 'lucide-react'

export function SparksFeed() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Sparks" />
      <ScreenContent>
        <XStack gap={8}>
          <Chip label="Received" selected={true} />
          <Chip label="Sent" selected={false} />
        </XStack>
        <MutedText>Recent encouragement from your partner</MutedText>
        <YStack gap={12}>
          {SPARKS.map(spark => (
            <WireCard key={spark.id} onPress={() => navigate(`/shared/spark-detail/${spark.id}`)}>
              <XStack gap={12} alignItems="flex-start">
                <Sparkles size={20} color="#1C1C1C" />
                <YStack flex={1} gap={4}>
                  <XStack justifyContent="space-between">
                    <Text fontSize={14} fontWeight="600" color="#1C1C1C">{spark.from}</Text>
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
          ))}
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
