import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { PrimaryButton, OutlineButton, ScreenContent, MutedText, BorderCard } from '../../components/shared'
import { CheckCircle, Clock } from 'lucide-react'

export function ReviewConfirm() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Review" onBack={() => navigate('/onboarding/initial-goals')} />
      <ScreenContent>
        <Text fontSize={22} fontWeight="700" color="#1C1C1C" textAlign="center">Review Setup</Text>
        <MutedText size={14}>
          <Text fontSize={14} color="#8C8C8C" textAlign="center">Both partners need to confirm before the app unlocks.</Text>
        </MutedText>

        <BorderCard>
          <YStack gap={8}>
            <Text fontSize={14} fontWeight="600" color="#1C1C1C">Focus Areas</Text>
            <YStack gap={4}>
              <Text fontSize={14} color="#1C1C1C">Communication — Baseline: 7</Text>
              <Text fontSize={14} color="#1C1C1C">Quality Time — Baseline: 7</Text>
            </YStack>
          </YStack>
        </BorderCard>

        <BorderCard>
          <YStack gap={8}>
            <Text fontSize={14} fontWeight="600" color="#1C1C1C">Habits Added</Text>
            <YStack gap={4}>
              <Text fontSize={14} color="#1C1C1C">10-min check-in · Daily</Text>
              <Text fontSize={14} color="#1C1C1C">Express appreciation · Daily</Text>
              <Text fontSize={14} color="#1C1C1C">Date night · Weekly</Text>
            </YStack>
          </YStack>
        </BorderCard>

        <BorderCard>
          <YStack gap={12}>
            <Text fontSize={14} fontWeight="600" color="#1C1C1C">Confirmation</Text>
            <XStack gap={8} alignItems="center">
              <CheckCircle size={16} color="#1C1C1C" />
              <Text fontSize={14} color="#1C1C1C">You — Confirmed</Text>
            </XStack>
            <XStack gap={8} alignItems="center">
              <Clock size={16} color="#8C8C8C" />
              <Text fontSize={14} color="#8C8C8C">Partner — Waiting...</Text>
            </XStack>
          </YStack>
        </BorderCard>

        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Confirm Setup" onPress={() => navigate('/home')} />
          <OutlineButton label="Edit Setup" />
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
