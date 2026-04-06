import { XStack, Text } from 'tamagui'
import { Battery, Signal, Wifi } from 'lucide-react'

export function StatusBar() {
  return (
    <XStack
      height={44}
      backgroundColor="#FFFFFF"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={24}
    >
      <Text fontSize={15} fontWeight="600" color="#1C1C1C">9:41</Text>
      <XStack gap={6} alignItems="center">
        <Signal size={14} color="#1C1C1C" />
        <Wifi size={14} color="#1C1C1C" />
        <Battery size={14} color="#1C1C1C" />
      </XStack>
    </XStack>
  )
}
