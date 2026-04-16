import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Check } from 'lucide-react'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar, Toggle } from '../../components/home-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { useToast } from '../../components/Toast'

type Frequency = 'Daily' | 'Weekly' | 'Monthly' | 'Custom'
type HabitType = 'Personal' | 'Shared' | 'Partner'
type ReminderTime = 'Morning' | 'Afternoon' | 'Evening'

const PRESETS = [
  '10-min check-in',
  'Express gratitude',
  'Date night',
  'Exercise together',
  'Read together',
  'Budget review',
]

const FOCUS_AREAS = ['Finances', 'Intimacy', 'Parenting']

export function AddHabit() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const toast = useToast()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('Daily')
  const [habitType, setHabitType] = useState<HabitType>('Shared')
  const [focusArea, setFocusArea] = useState<string | null>(null)
  const [reminderOn, setReminderOn] = useState(true)
  const [reminderTime, setReminderTime] = useState<ReminderTime>('Morning')

  const openFocusAreaPicker = () => {
    sheet.open({
      title: 'Focus Area',
      body: (
        <YStack gap={4}>
          {FOCUS_AREAS.map(area => {
            const isSelected = area === focusArea
            return (
              <XStack
                key={area}
                height={52}
                paddingHorizontal={16}
                alignItems="center"
                justifyContent="space-between"
                borderRadius={9}
                cursor="pointer"
                onPress={() => {
                  setFocusArea(area)
                  sheet.close()
                }}
                pressStyle={{ scale: 0.99, opacity: 0.92 }}
                backgroundColor={isSelected ? '#ebebf9' : 'transparent'}
              >
                <Text
                  fontFamily="Outfit, sans-serif"
                  fontSize={15}
                  fontWeight={isSelected ? '600' : '400'}
                  color="var(--acoh-foreground)"
                >
                  {area}
                </Text>
                {isSelected && <Check size={18} color="var(--acoh-accent)" />}
              </XStack>
            )
          })}
        </YStack>
      ),
    })
  }

  return (
    <AuthShell>
      <HomeNavBar title="Add Habit" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={16}>
        {/* Suggested Habits */}
        <FieldLabel large>Suggested Habits</FieldLabel>
        <XStack flexWrap="wrap" gap={8}>
          {PRESETS.map(preset => (
            <XStack
              key={preset}
              paddingHorizontal={14}
              paddingVertical={6}
              borderRadius={20}
              alignItems="center"
              backgroundColor="#FFFFFF"
              cursor="pointer"
              onPress={() => setName(preset)}
              pressStyle={{ scale: 0.97, opacity: 0.92 }}
              style={{ border: '1px solid #d4d4d4' }}
            >
              <Text
                fontFamily="Outfit, sans-serif"
                fontSize={13}
                color="var(--acoh-foreground)"
              >
                + {preset}
              </Text>
            </XStack>
          ))}
        </XStack>

        {/* Divider */}
        <XStack gap={10} alignItems="center">
          <YStack flex={1} height={1} backgroundColor="rgba(44,46,42,0.1)" />
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            or create custom
          </Text>
          <YStack flex={1} height={1} backgroundColor="rgba(44,46,42,0.1)" />
        </XStack>

        {/* Habit Name */}
        <YStack gap={6}>
          <FieldLabel>Habit Name</FieldLabel>
          <PillInput
            placeholder="e.g., Morning walk together"
            value={name}
            onChange={setName}
          />
        </YStack>

        {/* Description */}
        <YStack gap={6}>
          <FieldLabel>Description (optional)</FieldLabel>
          <PillInput
            placeholder="What does this habit involve?"
            value={description}
            onChange={setDescription}
          />
        </YStack>

        {/* Frequency */}
        <YStack gap={6}>
          <FieldLabel>Frequency</FieldLabel>
          <XStack gap={8} flexWrap="wrap">
            {(['Daily', 'Weekly', 'Monthly', 'Custom'] as Frequency[]).map(f => (
              <Pill
                key={f}
                label={f}
                active={frequency === f}
                onPress={() => setFrequency(f)}
              />
            ))}
          </XStack>
        </YStack>

        {/* Type */}
        <YStack gap={6}>
          <FieldLabel>Type</FieldLabel>
          <XStack gap={8}>
            {(['Personal', 'Shared', 'Partner'] as HabitType[]).map(t => (
              <Pill
                key={t}
                label={t}
                active={habitType === t}
                onPress={() => setHabitType(t)}
              />
            ))}
          </XStack>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            Shared habits require partner approval
          </Text>
        </YStack>

        {/* Focus Area */}
        <YStack gap={6}>
          <FieldLabel>Focus Area</FieldLabel>
          <XStack
            height={42}
            paddingLeft={20}
            paddingRight={14}
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="#FFFFFF"
            borderRadius={22}
            cursor="pointer"
            onPress={openFocusAreaPicker}
            pressStyle={{ scale: 0.99, opacity: 0.95 }}
            style={{ border: '1px solid #d4d4d4' }}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={14}
              color={focusArea ? 'var(--acoh-foreground)' : 'var(--acoh-muted)'}
            >
              {focusArea ?? 'Select a focus area'}
            </Text>
            <ChevronDown size={18} color="var(--acoh-muted)" />
          </XStack>
        </YStack>

        {/* Reminder */}
        <YStack gap={8}>
          <FieldLabel>Reminder</FieldLabel>
          <XStack
            backgroundColor="#ebebf9"
            borderRadius={9}
            paddingHorizontal={14}
            paddingVertical={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={14}
              color="var(--acoh-body)"
            >
              Enable reminder
            </Text>
            <Toggle value={reminderOn} onChange={() => setReminderOn(v => !v)} />
          </XStack>
          {reminderOn && (
            <XStack gap={8} flexWrap="wrap">
              {(['Morning', 'Afternoon', 'Evening'] as ReminderTime[]).map(t => (
                <Pill
                  key={t}
                  label={t}
                  active={reminderTime === t}
                  onPress={() => setReminderTime(t)}
                />
              ))}
            </XStack>
          )}
        </YStack>

        <YStack height={8} />

        <PrimaryPillButton
          label="Create Habit"
          onPress={() => {
            toast.show('You created a habit')
            navigate('/habits')
          }}
        />
      </YStack>
    </AuthShell>
  )
}

function FieldLabel({
  children,
  large,
}: {
  children: React.ReactNode
  large?: boolean
}) {
  return (
    <Text
      fontFamily="Outfit, sans-serif"
      fontSize={large ? 16 : 14}
      fontWeight={large ? '700' : '600'}
      color="var(--acoh-body)"
    >
      {children}
    </Text>
  )
}

function PillInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        height: 44,
        paddingLeft: 20,
        paddingRight: 16,
        borderRadius: 22,
        border: '1px solid var(--acoh-border)',
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif',
        fontSize: 14,
        color: 'var(--acoh-foreground)',
        outline: 'none',
      }}
    />
  )
}

function Pill({
  label,
  active,
  onPress,
}: {
  label: string
  active: boolean
  onPress: () => void
}) {
  return (
    <XStack
      paddingHorizontal={14}
      paddingVertical={6}
      borderRadius={20}
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.97, opacity: 0.92 }}
      backgroundColor={active ? 'var(--acoh-foreground)' : '#FFFFFF'}
      style={{
        border: active ? 'none' : '1px solid #d4d4d4',
      }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={13}
        fontWeight={active ? '600' : '400'}
        color={active ? '#FFFFFF' : 'var(--acoh-foreground)'}
      >
        {label}
      </Text>
    </XStack>
  )
}
