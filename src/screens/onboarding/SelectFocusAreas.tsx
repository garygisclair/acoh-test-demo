import { useRef, useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  MessagesSquare,
  PiggyBank,
  HeartPulse,
  Home,
  Blend,
  Baby,
  Flower2,
  Clock,
  CheckCircle2,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'
import { AuthShell, BackButton, PrimaryPillButton } from '../../components/auth-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { IntroCarousel } from './BaselineRatings'

type FocusArea = {
  key: string
  label: string
  baseline: number
  icon: LucideIcon
}

const AREAS: FocusArea[] = [
  { key: 'communication', label: 'Communication', baseline: 7, icon: MessagesSquare },
  { key: 'finances', label: 'Finances', baseline: 4, icon: PiggyBank },
  { key: 'health', label: 'Health & Energy', baseline: 8, icon: HeartPulse },
  { key: 'household', label: 'Household', baseline: 6, icon: Home },
  { key: 'intimacy', label: 'Intimacy', baseline: 5, icon: Blend },
  { key: 'parenting', label: 'Parenting', baseline: 5, icon: Baby },
  { key: 'growth', label: 'Personal Growth', baseline: 7, icon: Flower2 },
  { key: 'quality_time', label: 'Quality Time', baseline: 7, icon: Clock },
]

// Starts with Figma's "suggested three" pre-selected
const INITIAL_SELECTED = ['finances', 'intimacy', 'parenting']

function FocusAreaCard({
  area,
  selected,
  onToggle,
}: {
  area: FocusArea
  selected: boolean
  onToggle: () => void
}) {
  const Icon = area.icon
  return (
    <XStack
      width="100%"
      padding={16}
      borderRadius={12}
      gap={12}
      alignItems="center"
      cursor="pointer"
      onPress={onToggle}
      pressStyle={{ scale: 0.99, opacity: 0.92 }}
      backgroundColor={selected ? 'var(--acoh-accent)' : '#ebebf9'}
    >
      <Icon
        size={18}
        color={selected ? '#FFFFFF' : 'var(--acoh-foreground)'}
        strokeWidth={2}
      />
      <YStack flex={1} gap={4}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="700"
          color={selected ? '#FFFFFF' : 'var(--acoh-foreground)'}
        >
          {area.label}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color={selected ? 'rgba(255,255,255,0.5)' : 'var(--acoh-muted)'}
        >
          Baseline: {area.baseline}
        </Text>
      </YStack>
      {selected && (
        <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={2} />
      )}
    </XStack>
  )
}

export function SelectFocusAreas() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const [selected, setSelected] = useState<string[]>(INITIAL_SELECTED)

  const openIntro = () =>
    sheet.open({ title: 'Next steps', body: <IntroCarousel /> })

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const goNext = () => navigate('/onboarding/review')
  const goSkip = () => navigate('/onboarding/review', { state: { skipped: true } })

  return (
    <AuthShell>
      {/* NavBar — clears the overlaid status bar via marginTop=44 */}
      <XStack
        marginTop={44}
        height={48}
        paddingHorizontal={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <BackButton onPress={() => navigate(-1)} />
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="600"
          color="var(--acoh-foreground)"
        >
          Setup (2/3)
        </Text>
        <XStack gap={12} alignItems="center">
          <HelpCircle
            size={22}
            color="var(--acoh-accent)"
            cursor="pointer"
            onClick={openIntro}
          />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="500"
            color="var(--acoh-accent)"
            cursor="pointer"
            onPress={goSkip}
          >
            Skip
          </Text>
        </XStack>
      </XStack>

      {/* Content */}
      <YStack padding={24} gap={16}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={22}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
          width="100%"
        >
          Suggested Focus Areas
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={18}
          width="100%"
        >
          We recommend these three based on your ratings. Tap to select or
          deselect. You can always change them in the future.
        </Text>

        <YStack gap={12} width="100%">
          {AREAS.map((area) => (
            <FocusAreaCard
              key={area.key}
              area={area}
              selected={selected.includes(area.key)}
              onToggle={() => toggle(area.key)}
            />
          ))}
        </YStack>

        <PrimaryPillButton label="Continue" onPress={goNext} />
      </YStack>
    </AuthShell>
  )
}
