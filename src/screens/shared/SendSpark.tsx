import { useState } from 'react'
import { YStack, XStack, Text, Input } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../../components/NavBar'
import { ScreenContent, PrimaryButton, Chip } from '../../components/shared'
import { SPARK_TYPES } from '../../data/fakeData'
import { Flame, Star, ThumbsUp, Heart, Target, HandHeart, Handshake, Sparkles, Plus, Mic } from 'lucide-react'

const iconMap: Record<string, any> = {
  flame: Flame, star: Star, 'thumbs-up': ThumbsUp, heart: Heart,
  target: Target, 'hand-heart': HandHeart, handshake: Handshake, sparkles: Sparkles,
}

export function SendSpark() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>('star')

  return (
    <YStack flex={1}>
      <NavBar title="Send Spark" />
      <ScreenContent>
        <Text fontSize={14} fontWeight="600" color="#1C1C1C">Choose a spark type</Text>
        <XStack flexWrap="wrap" gap={8}>
          {SPARK_TYPES.map(st => {
            const Icon = iconMap[st.icon]
            return (
              <Chip
                key={st.icon}
                label={st.label}
                selected={selected === st.icon}
                onPress={() => setSelected(st.icon)}
                icon={<Icon size={16} color={selected === st.icon ? '#FFFFFF' : '#1C1C1C'} />}
              />
            )
          })}
          <XStack
            borderRadius={20}
            borderWidth={1}
            borderColor="#D4D4D4"
            borderStyle="dashed"
            paddingHorizontal={14}
            paddingVertical={8}
            gap={6}
            alignItems="center"
            cursor="pointer"
          >
            <Plus size={14} color="#8C8C8C" />
            <Text fontSize={14} color="#8C8C8C">Custom</Text>
          </XStack>
        </XStack>

        <YStack gap={6} marginTop={16}>
          <Text fontSize={14} fontWeight="600" color="#1C1C1C">Add a message (optional)</Text>
          <XStack alignItems="center">
            <Input
              height={44}
              flex={1}
              borderRadius={9}
              borderWidth={1}
              borderColor="#D4D4D4"
              paddingHorizontal={16}
              paddingRight={40}
              fontSize={14}
              placeholder="Great job today!"
              placeholderTextColor={"#8C8C8C" as any}
            />
            <XStack marginLeft={-36} paddingRight={12}>
              <Mic size={18} color="#8C8C8C" />
            </XStack>
          </XStack>
        </YStack>

        <YStack flex={1} />
        <PrimaryButton label="Send Spark" onPress={() => navigate('/home')} />
      </ScreenContent>
    </YStack>
  )
}
