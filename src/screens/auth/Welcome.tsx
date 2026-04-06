import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, OutlineButton } from '../../components/shared'
import { Heart } from 'lucide-react'

export function Welcome() {
  const navigate = useNavigate()
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding={24} gap={16}>
      <YStack height={160} />
      {/* Logo — rounded square matching Figma */}
      <YStack
        width={80}
        height={80}
        borderRadius={16}
        backgroundColor="#1C1C1C"
        alignItems="center"
        justifyContent="center"
      >
        <Heart size={40} color="#FFFFFF" fill="#FFFFFF" />
      </YStack>
      <Text fontSize={24} fontWeight="700" color="#1C1C1C" textAlign="center">
        A Couple of Habits
      </Text>
      <Text fontSize={14} color="#8C8C8C" textAlign="center">
        Build better habits together
      </Text>
      <YStack height={40} />
      <YStack width="100%" gap={16}>
        <PrimaryButton label="Get Started" onPress={() => navigate('/sign-up')} />
        <OutlineButton label="Sign In" onPress={() => navigate('/sign-in')} />
      </YStack>
    </YStack>
  )
}
