import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, BorderCard, MutedText } from '../../components/shared'
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
            <BorderCard key={a.id}>
              <YStack gap={6}>
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={14} fontWeight="600" color="#1C1C1C" flex={1}>{a.title}</Text>
                  <MutedText size={12}>{a.time}</MutedText>
                </XStack>
                <MutedText size={13}>{a.description}</MutedText>
                <Text fontSize={13} color="#C45C2C">Expires in {a.expires}</Text>
                <YStack marginTop={4} height={40} borderRadius={9} borderWidth={1} borderColor="#1C1C1C" alignItems="center" justifyContent="center" cursor="pointer" onPress={() => navigate('/shared/approval-review')} pressStyle={{ scale: 0.97, opacity: 0.85 }}>
                  <Text fontSize={13} fontWeight="600" color="#1C1C1C">View Details</Text>
                </YStack>
              </YStack>
            </BorderCard>
          ))}
        </YStack>
        <MutedText size={13}>Approvals expire if not acted on</MutedText>
      </ScreenContent>
    </YStack>
  )
}
