import { YStack, XStack, Text, Input } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, PrimaryButton, OutlineButton, BorderCard, MutedText } from '../../components/shared'
import { Mic } from 'lucide-react'
import { APPROVALS } from '../../data/fakeData'

export function ApprovalReview() {
  const navigate = useNavigate()
  const approval = APPROVALS[0]

  return (
    <YStack flex={1}>
      <NavBar title="Approval" />
      <ScreenContent>
        <MutedText>Your partner wants to make a change.</MutedText>

        <BorderCard>
          <YStack gap={8}>
            <XStack justifyContent="space-between">
              <MutedText>Request</MutedText>
              <Text fontSize={14} color="#1C1C1C">{approval.type}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Area</MutedText>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">{approval.title}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Requested by</MutedText>
              <Text fontSize={14} color="#1C1C1C">Partner</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Expires in</MutedText>
              <Text fontSize={14} color="#1C1C1C">{approval.daysLeft} days</Text>
            </XStack>
          </YStack>
        </BorderCard>

        {approval.note && (
          <>
            <Text fontSize={16} fontWeight="700" color="#1C1C1C">Note from partner</Text>
            <BorderCard>
              <Text fontSize={14} color="#1C1C1C">{approval.note}</Text>
            </BorderCard>
          </>
        )}

        <YStack gap={6}>
          <Text fontSize={14} fontWeight="700" color="#1C1C1C">Reason for declining (optional)</Text>
          <XStack position="relative">
            <Input
              flex={1}
              height={44}
              borderRadius={9}
              borderWidth={1}
              borderColor="#D4D4D4"
              paddingHorizontal={16}
              paddingRight={44}
              fontSize={14}
              placeholder="Why are you declining?"
              placeholderTextColor={"#8C8C8C" as any}
            />
            <XStack
              position="absolute"
              right={12}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              pointerEvents="none"
            >
              <Mic size={18} color="#8C8C8C" />
            </XStack>
          </XStack>
        </YStack>

        <YStack flex={1} />
        <YStack gap={12}>
          <PrimaryButton label="Approve" onPress={() => navigate('/home')} />
          <OutlineButton label="Decline" onPress={() => navigate('/home')} />
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
