import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, PrimaryButton, OutlineButton, MutedText } from '../../components/shared'
import { APPROVALS } from '../../data/fakeData'

export function ApprovalBanners() {
  const navigate = useNavigate()
  return (
    <YStack flex={1}>
      <NavBar title="Pending Approvals" />
      <ScreenContent>
        <MutedText>Actions requiring your approval</MutedText>
        <YStack gap={12}>
          {APPROVALS.map(a => (
            <BorderCard key={a.id} onPress={() => navigate('/shared/approval-review')}>
              <YStack gap={8}>
                <XStack justifyContent="space-between">
                  <Text fontSize={13} color="#8C8C8C">{a.type}</Text>
                  <MutedText>{a.daysLeft} days left</MutedText>
                </XStack>
                <Text fontSize={16} fontWeight="600" color="#1C1C1C">{a.title}</Text>
                <MutedText>From {a.from}</MutedText>
                <XStack gap={8} marginTop={4}>
                  <XStack flex={1}><PrimaryButton label="Approve" /></XStack>
                  <XStack flex={1}><OutlineButton label="Decline" /></XStack>
                </XStack>
              </YStack>
            </BorderCard>
          ))}
        </YStack>
        <Text fontSize={13} color="#8C8C8C" textAlign="center" width="100%">Approvals expire if not acted on</Text>
      </ScreenContent>
    </YStack>
  )
}
