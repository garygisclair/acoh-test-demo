import { useState } from 'react'
import { YStack, XStack, Text, Separator } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'

type AreaState = {
  key: string
  label: string
  youRated: number
  proposal: number
}

const INITIAL_AREAS: AreaState[] = [
  { key: 'communication', label: 'Communication', youRated: 7, proposal: 6 },
  { key: 'quality_time', label: 'Quality Time', youRated: 8, proposal: 7 },
]

export function ReviewRatings() {
  const navigate = useNavigate()
  const [areas, setAreas] = useState<AreaState[]>(INITIAL_AREAS)

  const setProposal = (key: string, v: number) =>
    setAreas(prev => prev.map(a => (a.key === key ? { ...a, proposal: v } : a)))

  return (
    <AuthShell>
      <HomeNavBar title="Review Ratings" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={24}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="500"
          color="var(--acoh-body)"
          lineHeight={20}
        >
          Align on shared baselines so health scoring can begin. Your partner will review your proposed ratings.
        </Text>

        {areas.map(area => (
          <AreaCard
            key={area.key}
            area={area}
            onProposalChange={(v) => setProposal(area.key, v)}
          />
        ))}

        <PrimaryPillButton
          label="Submit Proposal"
          onPress={() => navigate('/home')}
        />
      </YStack>
    </AuthShell>
  )
}

function AreaCard({
  area,
  onProposalChange,
}: {
  area: AreaState
  onProposalChange: (v: number) => void
}) {
  return (
    <YStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      padding={16}
      gap={12}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={16}
        fontWeight="600"
        color="var(--acoh-foreground)"
      >
        {area.label}
      </Text>

      <XStack justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          fontWeight="500"
          color="var(--acoh-body)"
        >
          You rated
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          fontWeight="600"
          color="var(--acoh-body)"
        >
          {area.youRated}
        </Text>
      </XStack>

      <Separator borderColor="#d4d4d4" />

      <XStack justifyContent="space-between" alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-body)"
        >
          Your proposal
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="600"
          color="var(--acoh-body)"
        >
          {area.proposal}
        </Text>
      </XStack>

      <Slider value={area.proposal} onChange={onProposalChange} />
    </YStack>
  )
}

/**
 * Custom slider — 6px track with purple fill + 20px white handle (accent border).
 * Invisible native range input overlaid for drag interaction.
 */
function Slider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const pct = ((value - 1) / 9) * 100
  return (
    <div style={{ position: 'relative', height: 22, width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 0,
          right: 0,
          height: 6,
          borderRadius: 3,
          background: 'var(--acoh-border)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 0,
          width: `${pct}%`,
          height: 6,
          borderRadius: 3,
          background: 'var(--acoh-accent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 1,
          left: `calc(${pct}% - 10px)`,
          width: 20,
          height: 20,
          borderRadius: 10,
          background: '#FFFFFF',
          border: '2px solid var(--acoh-accent)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  )
}
