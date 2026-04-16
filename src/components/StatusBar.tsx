import { XStack, Text } from 'tamagui'
import { Battery, Signal, Wifi } from 'lucide-react'

type Variant = 'dark' | 'light' | 'transparent'

export function StatusBar({ variant = 'dark' }: { variant?: Variant }) {
  const fg = variant === 'light' ? '#FFFFFF' : '#1C1C1C'
  const bg = variant === 'dark' ? '#FFFFFF' : 'transparent'
  return (
    <XStack
      height={44}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={24}
      style={{ background: bg }}
    >
      <Text fontSize={15} fontWeight="600" color={fg}>9:41</Text>
      <XStack gap={6} alignItems="center">
        <Signal size={14} color={fg} />
        <Wifi size={14} color={fg} />
        <Battery size={14} color={fg} />
      </XStack>
    </XStack>
  )
}
