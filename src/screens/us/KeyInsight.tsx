import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

const PREVIOUS = [
  {
    title: 'Communication streak!',
    subtitle: 'Both completed all habits 7 days in a row',
    time: '1w ago',
  },
  {
    title: 'Quality Time needs attention',
    subtitle: 'Habit completion dropped to 40%',
    time: '2w ago',
  },
]

export function KeyInsight() {
  const navigate = useNavigate()

  return (
    <AuthShell>
      <HomeNavBar title="Key Insight" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={12} paddingBottom={32} gap={16}>
        {/* Featured insight card */}
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={12}
          padding={16}
          gap={10}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={11}
            fontWeight="600"
            color="var(--acoh-muted)"
            textTransform="uppercase"
            letterSpacing={0.5}
          >
            This Week's Insight
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={16}
            fontWeight="700"
            color="var(--acoh-foreground)"
          >
            Intimacy alignment is dropping
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            color="var(--acoh-body)"
            lineHeight={18}
          >
            Your Intimacy ratings differ by 2 points this week. You rated it 5. Consider discussing what each of you means by this focus area.
          </Text>
          <YStack height={2} />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={11}
            fontWeight="600"
            color="var(--acoh-muted)"
          >
            Based on:
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={11}
            color="var(--acoh-muted)"
          >
            · Weekly check-in ratings (4-week rolling)
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={11}
            color="var(--acoh-muted)"
          >
            · Trend: down 15 points over 2 weeks
          </Text>
        </YStack>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-foreground)"
        >
          Previous Insights
        </Text>

        {PREVIOUS.map(item => (
          <YStack
            key={item.title}
            backgroundColor="#ebebf9"
            borderRadius={9}
            paddingHorizontal={16}
            paddingVertical={12}
            gap={4}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={14}
                fontWeight="600"
                color="var(--acoh-body)"
              >
                {item.title}
              </Text>
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={12}
                color="var(--acoh-muted)"
              >
                {item.time}
              </Text>
            </XStack>
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={12}
              color="var(--acoh-muted)"
            >
              {item.subtitle}
            </Text>
          </YStack>
        ))}
      </YStack>
    </AuthShell>
  )
}
