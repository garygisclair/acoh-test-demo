import { useState } from 'react'
import { YStack, XStack, Text, Input } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, PrimaryButton, OutlineButton, BorderCard, MutedText } from '../../components/shared'
import { Mic, CheckCircle } from 'lucide-react'

export function ApprovalReview() {
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false)

  return (
    <YStack flex={1}>
      <NavBar title="Approval" />
      <ScreenContent>
        <MutedText>Your partner wants to make a change.</MutedText>

        <BorderCard>
          <YStack gap={8}>
            <XStack justifyContent="space-between">
              <MutedText>Request</MutedText>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Add Focus Area</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Area</MutedText>
              <Text fontSize={14} fontWeight="600" color="#1C1C1C">Finances</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Requested by</MutedText>
              <Text fontSize={14} color="#1C1C1C">Partner</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <MutedText>Expires in</MutedText>
              <Text fontSize={14} color="#1C1C1C">5 days</Text>
            </XStack>
          </YStack>
        </BorderCard>

        <Text fontSize={16} fontWeight="700" color="#1C1C1C">Note from partner</Text>
        <BorderCard>
          <Text fontSize={14} color="#1C1C1C">"I think we should start tracking our spending together."</Text>
        </BorderCard>

        <YStack gap={12}>
          {toast ? (
            <XStack
              height={44}
              borderRadius={9}
              backgroundColor="#1C1C1C"
              alignItems="center"
              justifyContent="center"
              gap={8}
            >
              <CheckCircle size={16} color="#FFFFFF" />
              <Text fontSize={14} fontWeight="600" color="#FFFFFF">You accepted Finances as a focus area</Text>
            </XStack>
          ) : (
            <PrimaryButton label="Approve" onPress={() => {
              setToast(true)
              setTimeout(() => navigate('/home'), 1500)
            }} />
          )}
          <OutlineButton label="Decline" onPress={() => {
            if (!reason.trim()) {
              setError('Must give a reason for declining.')
            } else {
              setError('')
              navigate('/home')
            }
          }} />
        </YStack>

        <YStack gap={6}>
          <MutedText size={13}>Reason for declining (optional)</MutedText>
          <XStack position="relative">
            <Input
              flex={1}
              height={44}
              borderRadius={9}
              borderWidth={1}
              borderColor={error ? '#C45C2C' : '#D4D4D4'}
              paddingHorizontal={16}
              paddingRight={44}
              fontSize={14}
              placeholder={'"I think we should focus on..."'}
              placeholderTextColor={"#8C8C8C" as any}
              value={reason}
              onChangeText={(t: string) => { setReason(t); if (error) setError('') }}
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
          {error && <Text fontSize={13} color="#C45C2C">{error}</Text>}
        </YStack>
      </ScreenContent>
    </YStack>
  )
}
