import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { Mic } from 'lucide-react'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useToast } from '../../components/Toast'

const REQUEST_ROWS = [
  { label: 'Request', value: 'Add Focus Area' },
  { label: 'Area', value: 'Finances' },
  { label: 'Requested by', value: 'Partner' },
  { label: 'Expires in', value: '5 days' },
]

export function ApprovalReview() {
  const navigate = useNavigate()
  const toast = useToast()
  const [reason, setReason] = useState('')

  const handleApprove = () => {
    toast.show('You approved the request')
    navigate('/home')
  }

  const handleDecline = () => {
    toast.show('You declined the request')
    navigate('/home')
  }

  return (
    <AuthShell>
      <HomeNavBar title="Approval" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={14}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          Your partner wants to make a change.
        </Text>

        {/* Request info card */}
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          padding={16}
          gap={10}
        >
          {REQUEST_ROWS.map(row => (
            <XStack
              key={row.label}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                color="var(--acoh-body)"
              >
                {row.label}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                fontWeight="600"
                color="var(--acoh-body)"
              >
                {row.value}
              </Text>
            </XStack>
          ))}
        </YStack>

        <YStack height={4} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Note from partner
        </Text>

        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          paddingHorizontal={16}
          paddingVertical={12}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            color="var(--acoh-body)"
          >
            "I think we should start tracking our spending together."
          </Text>
        </YStack>

        <YStack height={8} />

        <PrimaryPillButton label="Approve" onPress={handleApprove} />

        <XStack
          height={48}
          borderRadius={24}
          backgroundColor="#FFFFFF"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onPress={handleDecline}
          pressStyle={{ scale: 0.98, opacity: 0.92 }}
          style={{ border: '1px solid var(--acoh-border)' }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={15}
            fontWeight="600"
            color="var(--acoh-body)"
          >
            Decline
          </Text>
        </XStack>

        <YStack gap={8}>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            Reason for declining (optional)
          </Text>
          <XStack
            backgroundColor="#FFFFFF"
            borderRadius={22}
            paddingLeft={20}
            paddingRight={14}
            paddingVertical={12}
            alignItems="center"
            justifyContent="space-between"
            gap={12}
            style={{ border: '1px solid #d4d4d4' }}
          >
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='"I think we should focus on..."'
              style={{
                flex: 1,
                minWidth: 0,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 14,
                color: 'var(--acoh-foreground)',
              }}
            />
            <Mic size={20} color="var(--acoh-muted)" />
          </XStack>
        </YStack>
      </YStack>
    </AuthShell>
  )
}
