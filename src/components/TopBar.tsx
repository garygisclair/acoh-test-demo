import { XStack, Text } from 'tamagui'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate()

  return (
    <XStack
      height={48}
      backgroundColor="#FFFFFF"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={24}
    >
      <Text fontSize={20} fontWeight="700" color="#1C1C1C">{title}</Text>
      <XStack cursor="pointer" onPress={() => navigate('/notifications')}>
        <Bell size={22} color="#1C1C1C" />
      </XStack>
    </XStack>
  )
}
