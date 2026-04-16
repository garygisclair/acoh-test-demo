import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type Approval = {
  id: number
  title: string
  description: string
  time: string
  expires: string
}

const APPROVALS_DATA: Approval[] = [
  { id: 1, title: 'Proposed baseline ratings', description: 'Communication: 6 · Quality Time: 7', time: '3h ago', expires: 'Expires in 6d 21h' },
  { id: 2, title: 'Partner wants to add "Finances"', description: 'New focus area · Requires your approval', time: '2h ago', expires: 'Expires in 4d 22h' },
  { id: 3, title: 'New shared habit proposed', description: '"Weekly budget review" · Finances', time: '5h ago', expires: 'Expires in 2d 3h' },
  { id: 4, title: 'Priority change requested', description: 'Move "Communication" from #2 to #1', time: '1d ago', expires: 'Expires in 6d 1h' },
]

export function ApprovalBanners() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Pending Approvals" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={12}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          Actions requiring your approval
        </Text>

        {APPROVALS_DATA.map(a => (
          <YStack
            key={a.id}
            backgroundColor="#ebebf9"
            borderRadius={9}
            paddingHorizontal={16}
            paddingVertical={14}
            gap={10}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                fontWeight="600"
                color="var(--acoh-foreground)"
                flex={1}
                paddingRight={8}
              >
                {a.title}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                {a.time}
              </Text>
            </XStack>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              color="var(--acoh-body)"
            >
              {a.description}
            </Text>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={11}
              fontWeight="600"
              color="var(--acoh-muted)"
            >
              {a.expires}
            </Text>
            <XStack
              height={48}
              borderRadius={24}
              backgroundColor="#FFFFFF"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onPress={() => navigate('/shared/approval-review')}
              pressStyle={{ scale: 0.98, opacity: 0.92 }}
              style={{ border: '1px solid rgba(0,0,0,0.15)' }}
            >
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={15}
                fontWeight="600"
                color="var(--acoh-foreground)"
              >
                View Details
              </Text>
            </XStack>
          </YStack>
        ))}

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          Approvals expire if not acted on
        </Text>
      </YStack>
    </AuthShell>
  )
}
