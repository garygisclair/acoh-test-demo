import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type ActiveArea = {
  name: string
  habitCount: number
  priority: number
}

type PresetArea = {
  name: string
  description: string
}

const ACTIVE_AREAS: ActiveArea[] = [
  { name: 'Finances', habitCount: 2, priority: 1 },
  { name: 'Intimacy', habitCount: 2, priority: 2 },
  { name: 'Parenting', habitCount: 2, priority: 3 },
]

const PRESETS: PresetArea[] = [
  { name: 'Communication', description: 'Active listening, check-ins, expressing needs' },
  { name: 'Health & Energy', description: 'Exercise, sleep, nutrition, energy levels' },
  { name: 'Household', description: 'Chores, organization, shared responsibilities' },
  { name: 'Personal Growth', description: 'Learning, hobbies, self-improvement goals' },
  { name: 'Quality Time', description: 'Date nights, shared activities, presence' },
]

export function FocusAreaManagement() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Focus Area Management" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={12}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          Changes require partner approval.
        </Text>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Active Focus Areas
        </Text>

        {ACTIVE_AREAS.map(a => (
          <XStack
            key={a.name}
            backgroundColor="#ebebf9"
            borderRadius={9}
            paddingHorizontal={16}
            paddingVertical={14}
            alignItems="center"
            justifyContent="space-between"
          >
            <YStack flex={1} gap={2}>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                fontWeight="600"
                color="var(--acoh-foreground)"
              >
                {a.name}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                {a.habitCount} habits · Priority #{a.priority}
              </Text>
            </YStack>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={12}
              fontWeight="600"
              color="var(--acoh-primary)"
              cursor="pointer"
            >
              Remove
            </Text>
          </XStack>
        ))}

        <YStack height={4} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Available Presets
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
          textAlign="center"
          width="100%"
        >
          You already have three focus areas selected.
        </Text>

        <YStack gap={12}>
          {PRESETS.map(p => (
            <XStack
              key={p.name}
              backgroundColor="#ebebf9"
              borderRadius={9}
              paddingHorizontal={16}
              paddingVertical={12}
              alignItems="center"
              justifyContent="space-between"
            >
              <YStack flex={1} gap={2}>
                <Text
                  fontFamily="Outfit, sans-serif"
                  fontSize={14}
                  fontWeight="600"
                  color="var(--acoh-foreground)"
                >
                  {p.name}
                </Text>
                <Text
                  fontFamily="Outfit, sans-serif"
                  fontSize={12}
                  color="var(--acoh-muted)"
                >
                  {p.description}
                </Text>
              </YStack>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                fontWeight="500"
                color="var(--acoh-accent)"
                cursor="pointer"
              >
                + Add
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </AuthShell>
  )
}
