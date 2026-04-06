import { useState } from 'react'
import { YStack, XStack, Text, Input } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Mic, MessageCircle, Heart, Zap, Wallet, X } from 'lucide-react'
import { Dumbbell, BookOpen, Star, Flame } from 'lucide-react'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, LabeledInput, PrimaryButton, BorderCard, MutedText } from '../../components/shared'

const ICONS = [
  { name: 'MessageCircle', Icon: MessageCircle },
  { name: 'Heart', Icon: Heart },
  { name: 'Zap', Icon: Zap },
  { name: 'Wallet', Icon: Wallet },
  { name: 'Dumbbell', Icon: Dumbbell },
  { name: 'BookOpen', Icon: BookOpen },
  { name: 'Star', Icon: Star },
  { name: 'Flame', Icon: Flame },
]

const COLORS = [
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Teal', hex: '#14B8A6' },
]

export function EditFocusArea() {
  const navigate = useNavigate()
  const [selectedIcon, setSelectedIcon] = useState('MessageCircle')
  const [selectedColor, setSelectedColor] = useState<string | null>('Blue')

  return (
    <YStack flex={1}>
      <NavBar title="Edit Focus Area" />
      <ScreenContent>
        {/* Preview card */}
        <BorderCard>
          <XStack alignItems="center" gap={12}>
            <XStack
              width={48}
              height={48}
              borderRadius={24}
              backgroundColor="#F2F2F2"
              alignItems="center"
              justifyContent="center"
            >
              <MessageCircle size={24} color="#1C1C1C" />
            </XStack>
            <YStack gap={2}>
              <Text fontSize={16} fontWeight="600" color="#1C1C1C">Communication</Text>
              <MutedText>Score: 78/100 · Trending up</MutedText>
            </YStack>
          </XStack>
        </BorderCard>

        <LabeledInput label="Name" placeholder="Enter name" defaultValue="Communication" />

        {/* Description with Mic icon overlay */}
        <YStack gap={6}>
          <Text fontSize={14} color="#1C1C1C">Description (optional)</Text>
          <XStack position="relative">
            <Input
              flex={1}
              height={44}
              borderRadius={9}
              borderWidth={1}
              borderColor="#D4D4D4"
              paddingHorizontal={16}
              paddingRight={40}
              fontSize={14}
              placeholder="How we talk, listen, and connect"
              placeholderTextColor={"#8C8C8C" as any}
            />
            <XStack position="absolute" right={12} top={0} bottom={0} alignItems="center" pointerEvents="none">
              <Mic size={18} color="#8C8C8C" />
            </XStack>
          </XStack>
        </YStack>

        {/* Icon section */}
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Icon</Text>
        <XStack flexWrap="wrap" gap={12}>
          {ICONS.map(({ name, Icon }) => {
            const isSelected = selectedIcon === name
            return (
              <XStack
                key={name}
                width={48}
                height={48}
                borderRadius={24}
                backgroundColor={isSelected ? '#1C1C1C' : '#F2F2F2'}
                borderWidth={1}
                borderColor={isSelected ? '#1C1C1C' : '#D4D4D4'}
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onPress={() => setSelectedIcon(name)}
              >
                <Icon size={22} color={isSelected ? '#FFFFFF' : '#1C1C1C'} />
              </XStack>
            )
          })}
        </XStack>

        {/* Color section */}
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Color</Text>
        <XStack gap={12} flexWrap="wrap">
          {COLORS.map(({ name, hex }) => (
            <XStack
              key={name}
              width={32}
              height={32}
              borderRadius={16}
              backgroundColor={hex}
              borderWidth={selectedColor === name ? 2 : 0}
              borderColor="#1C1C1C"
              cursor="pointer"
              onPress={() => setSelectedColor(name)}
              alignItems="center"
              justifyContent="center"
            />
          ))}
          {/* None swatch */}
          <XStack
            width={32}
            height={32}
            borderRadius={16}
            backgroundColor="#F2F2F2"
            borderWidth={1}
            borderColor="#D4D4D4"
            cursor="pointer"
            onPress={() => setSelectedColor(null)}
            alignItems="center"
            justifyContent="center"
          >
            <X size={14} color="#8C8C8C" />
          </XStack>
        </XStack>
        <MutedText>Color is used for visual identification only</MutedText>

        {/* Priority as dropdown-style input */}
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Priority</Text>
        <XStack position="relative">
          <Input
            flex={1}
            height={44}
            borderRadius={9}
            borderWidth={1}
            borderColor="#D4D4D4"
            paddingHorizontal={16}
            paddingRight={40}
            fontSize={14}
            defaultValue="#1 — Highest"
            disabled
          />
          <XStack position="absolute" right={12} top={0} bottom={0} alignItems="center" pointerEvents="none">
            <ChevronDown size={18} color="#8C8C8C" />
          </XStack>
        </XStack>
        <MutedText>Priority changes require partner approval</MutedText>

        <YStack flex={1} />
        <PrimaryButton label="Save Changes" onPress={() => navigate(-1 as any)} />
      </ScreenContent>
    </YStack>
  )
}
