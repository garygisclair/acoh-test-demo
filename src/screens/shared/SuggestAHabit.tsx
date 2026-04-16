import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { Mic, ChevronDown, Check } from 'lucide-react'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { useToast } from '../../components/Toast'

type Frequency = 'Daily' | 'Weekly' | 'Monthly' | 'Custom'
type HabitType = 'Shared' | 'Partner'

const FOCUS_AREAS = ['Finances', 'Intimacy', 'Parenting']

export function SuggestAHabit() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const toast = useToast()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('Daily')
  const [habitType, setHabitType] = useState<HabitType>('Partner')
  const [focusArea, setFocusArea] = useState('Finances')

  const openFocusAreaPicker = () => {
    sheet.open({
      title: 'Focus Area',
      body: (
        <FocusAreaList
          selected={focusArea}
          onSelect={(area) => {
            setFocusArea(area)
            sheet.close()
          }}
        />
      ),
    })
  }

  return (
    <AuthShell>
      <HomeNavBar title="Suggest a Habit" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={16}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-muted)"
        >
          Suggest a new habit for your partner to try
        </Text>

        <FieldLabel>Habit Name</FieldLabel>
        <PillInput
          placeholder="e.g., Morning meditation"
          value={name}
          onChange={setName}
        />

        <XStack justifyContent="space-between" alignItems="center">
          <FieldLabel>Message to Partner</FieldLabel>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            Optional
          </Text>
        </XStack>
        <MessageArea
          placeholder='"I think this would be great for us..."'
          value={message}
          onChange={setMessage}
        />

        <FieldLabel>Suggested Frequency</FieldLabel>
        <XStack gap={8}>
          {(['Daily', 'Weekly', 'Monthly', 'Custom'] as Frequency[]).map(f => (
            <Pill
              key={f}
              label={f}
              active={frequency === f}
              onPress={() => setFrequency(f)}
            />
          ))}
        </XStack>

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
            color="var(--acoh-foreground)"
          >
            {focusArea}
          </Text>
          <ChevronDown size={18} color="var(--acoh-muted)" />
        </XStack>

        <FieldLabel>Type</FieldLabel>
        <XStack gap={8}>
          <Pill
            label="Shared"
            active={habitType === 'Shared'}
            onPress={() => setHabitType('Shared')}
          />
          <Pill
            label="Partner"
            active={habitType === 'Partner'}
            onPress={() => setHabitType('Partner')}
          />
        </XStack>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
        >
          Shared habits require partner approval
        </Text>

        <PrimaryPillButton
          label="Send Suggestion"
          onPress={() => {
            toast.show('You suggested a habit')
            navigate('/habits')
          }}
        />
      </YStack>
    </AuthShell>
  )
}

function FocusAreaList({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (area: string) => void
}) {
  return (
    <YStack gap={4}>
      {FOCUS_AREAS.map((area) => {
        const isSelected = area === selected
        return (
          <XStack
            key={area}
            height={52}
            paddingHorizontal={16}
            alignItems="center"
            justifyContent="space-between"
            borderRadius={9}
            cursor="pointer"
            onPress={() => onSelect(area)}
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
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontFamily="Outfit, sans-serif"
      fontSize={13}
      fontWeight="600"
      color="var(--acoh-foreground)"
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
        height: 42,
        paddingLeft: 20,
        paddingRight: 16,
        borderRadius: 24,
        border: '1px solid #d4d4d4',
        background: '#FFFFFF',
        fontFamily: 'Outfit, sans-serif',
        fontSize: 14,
        color: 'var(--acoh-foreground)',
        outline: 'none',
      }}
    />
  )
}

function MessageArea({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <YStack
      backgroundColor="#FFFFFF"
      borderRadius={24}
      paddingHorizontal={20}
      paddingVertical={14}
      gap={4}
      style={{ border: '1px solid #d4d4d4' }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          resize: 'none',
          background: 'transparent',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 14,
          color: 'var(--acoh-foreground)',
        }}
      />
      <XStack justifyContent="flex-end">
        <Mic size={20} color="var(--acoh-muted)" />
      </XStack>
    </YStack>
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
