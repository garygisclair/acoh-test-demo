import { XStack, YStack, Text, Input, Separator } from 'tamagui'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

// Reusable card wrapper
export function WireCard({ children, onPress, padding = 16 }: { children: ReactNode; onPress?: () => void; padding?: number }) {
  return (
    <YStack
      backgroundColor="#F2F2F2"
      borderRadius={9}
      padding={padding}
      cursor={onPress ? 'pointer' : undefined}
      onPress={onPress}
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : undefined}
    >
      {children}
    </YStack>
  )
}

// Bordered card
export function BorderCard({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
  return (
    <YStack
      backgroundColor="#FFFFFF"
      borderRadius={9}
      padding={16}
      borderWidth={1}
      borderColor="#D4D4D4"
      cursor={onPress ? 'pointer' : undefined}
      onPress={onPress}
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : undefined}
    >
      {children}
    </YStack>
  )
}

// Section header with optional right link
export function SectionHeader({ title, linkText, linkTo }: { title: string; linkText?: string; linkTo?: string }) {
  const navigate = useNavigate()
  return (
    <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={24} paddingVertical={8}>
      <Text fontSize={16} fontWeight="600" color="#1C1C1C">{title}</Text>
      {linkText && linkTo && (
        <Text
          fontSize={13}
          color="#8C8C8C"
          cursor="pointer"
          onPress={() => navigate(linkTo)}
        >
          {linkText}
        </Text>
      )}
    </XStack>
  )
}

// Primary button (dark fill)
export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <XStack
      height={44}
      borderRadius={9}
      backgroundColor="#1C1C1C"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.97, opacity: 0.85 }}
    >
      <Text fontSize={14} fontWeight="600" color="#FFFFFF">{label}</Text>
    </XStack>
  )
}

// Outline button
export function OutlineButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <XStack
      height={44}
      borderRadius={9}
      backgroundColor="#FFFFFF"
      borderWidth={1}
      borderColor="#1C1C1C"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.97, opacity: 0.85 }}
    >
      <Text fontSize={14} fontWeight="600" color="#1C1C1C">{label}</Text>
    </XStack>
  )
}

// Labeled input
export function LabeledInput({ label, placeholder, defaultValue }: { label: string; placeholder: string; defaultValue?: string }) {
  return (
    <YStack gap={6}>
      <Text fontSize={14} color="#1C1C1C">{label}</Text>
      <Input
        height={44}
        borderRadius={9}
        borderWidth={1}
        borderColor="#D4D4D4"
        paddingHorizontal={16}
        fontSize={14}
        placeholder={placeholder}
        placeholderTextColor={"#8C8C8C" as any}
        defaultValue={defaultValue}
      />
    </YStack>
  )
}

// Chip / pill — rounded pill shape matching Figma
export function Chip({ label, selected, onPress, icon }: { label: string; selected?: boolean; onPress?: () => void; icon?: ReactNode }) {
  return (
    <XStack
      backgroundColor={selected ? '#1C1C1C' : '#FFFFFF'}
      borderRadius={20}
      paddingHorizontal={16}
      paddingVertical={10}
      gap={6}
      alignItems="center"
      cursor="pointer"
      onPress={onPress}
      borderWidth={1}
      borderColor={selected ? '#1C1C1C' : '#D4D4D4'}
      hoverStyle={{ opacity: 0.85 }}
      pressStyle={{ scale: 0.97, opacity: 0.9 }}
    >
      {icon}
      <Text fontSize={14} color={selected ? '#FFFFFF' : '#1C1C1C'}>{label}</Text>
    </XStack>
  )
}

// Progress bar
export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <XStack height={6} backgroundColor="#D4D4D4" borderRadius={3} overflow="hidden" flex={1}>
      <XStack height={6} backgroundColor="#1C1C1C" borderRadius={3} width={`${pct}%` as any} />
    </XStack>
  )
}

// Scroll wrapper for screen content
export function ScreenContent({ children, padding = 24 }: { children: ReactNode; padding?: number }) {
  return (
    <YStack padding={padding} paddingBottom={32} gap={16} flex={1}>
      {children}
    </YStack>
  )
}

// Habit checkbox row
export function HabitRow({ name, completed, onToggle }: { name: string; completed: boolean; onToggle?: () => void }) {
  return (
    <XStack alignItems="center" gap={12} paddingVertical={8} cursor="pointer" onPress={onToggle}>
      <XStack
        width={22}
        height={22}
        borderRadius={4}
        borderWidth={completed ? 0 : 1.5}
        borderColor="#D4D4D4"
        backgroundColor={completed ? '#1C1C1C' : '#FFFFFF'}
        alignItems="center"
        justifyContent="center"
      >
        {completed && <Text color="#FFFFFF" fontSize={14} fontWeight="700">&#10003;</Text>}
      </XStack>
      <Text
        fontSize={14}
        color={completed ? '#8C8C8C' : '#1C1C1C'}
        textDecorationLine={completed ? 'line-through' : 'none'}
        flex={1}
      >
        {name}
      </Text>
    </XStack>
  )
}

// Avatar circle
export function Avatar({ letter, size = 48 }: { letter: string; size?: number }) {
  return (
    <XStack
      width={size}
      height={size}
      borderRadius={size / 2}
      backgroundColor="#F2F2F2"
      borderWidth={1}
      borderColor="#D4D4D4"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize={size * 0.4} fontWeight="600" color="#1C1C1C">{letter}</Text>
    </XStack>
  )
}

// Muted text
export function MutedText({ children, size = 13 }: { children: ReactNode; size?: number }) {
  return <Text fontSize={size} color="#8C8C8C">{children}</Text>
}

// Divider alias
export { Separator as Divider }
