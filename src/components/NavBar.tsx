import { XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface NavBarProps {
  title: string
  rightText?: string
  onBack?: () => void
}

export function NavBar({ title, rightText, onBack }: NavBarProps) {
  const navigate = useNavigate()

  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <XStack
      height={48}
      backgroundColor="#FFFFFF"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={16}
    >
      <XStack width={70} gap={4} alignItems="center" cursor="pointer" onPress={handleBack}>
        <ArrowLeft size={16} color="#1C1C1C" />
        <Text fontSize={14} color="#1C1C1C">Back</Text>
      </XStack>
      <Text fontSize={16} fontWeight="600" color="#1C1C1C">{title}</Text>
      <XStack width={70} justifyContent="flex-end">
        {rightText && (
          <Text fontSize={14} color="#8C8C8C">{rightText}</Text>
        )}
      </XStack>
    </XStack>
  )
}
