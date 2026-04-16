import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  Flame,
  Star,
  ThumbsUp,
  HandHeart,
  Target,
  Heart,
  Handshake,
  Sparkles,
  Mic,
  type LucideIcon,
} from 'lucide-react'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useToast } from '../../components/Toast'

type SparkType = {
  key: string
  label: string
  icon: LucideIcon
}

const SPARK_TYPES: SparkType[] = [
  { key: 'fire', label: 'Fire', icon: Flame },
  { key: 'star', label: 'Star', icon: Star },
  { key: 'nice', label: 'Nice!', icon: ThumbsUp },
  { key: 'love', label: 'Love', icon: HandHeart },
  { key: 'goal', label: 'Goal!', icon: Target },
  { key: 'heart', label: 'Heart', icon: Heart },
  { key: 'team', label: 'Team', icon: Handshake },
  { key: 'spark', label: 'Spark', icon: Sparkles },
]

export function SendSpark() {
  const navigate = useNavigate()
  const toast = useToast()
  const [selected, setSelected] = useState<string>('fire')
  const [message, setMessage] = useState('')

  const handleSend = () => {
    toast.show('You sent a spark')
    navigate('/home/sparks')
  }

  return (
    <AuthShell>
      <HomeNavBar title="Send Spark" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={20} paddingBottom={32} gap={20}>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Choose a spark type
        </Text>

        <XStack flexWrap="wrap" gap={8}>
          {SPARK_TYPES.map(t => {
            const Icon = t.icon
            const active = selected === t.key
            return (
              <XStack
                key={t.key}
                paddingHorizontal={12}
                paddingVertical={6}
                borderRadius={20}
                gap={6}
                alignItems="center"
                cursor="pointer"
                onPress={() => setSelected(t.key)}
                pressStyle={{ scale: 0.97, opacity: 0.92 }}
                backgroundColor={active ? 'var(--acoh-foreground)' : '#FFFFFF'}
                style={{ border: active ? 'none' : '1px solid #d4d4d4' }}
              >
                <Icon size={18} color={active ? '#FFFFFF' : 'var(--acoh-foreground)'} />
                <Text
                  fontFamily="Outfit, sans-serif"
                  fontSize={13}
                  fontWeight={active ? '600' : '400'}
                  color={active ? '#FFFFFF' : 'var(--acoh-foreground)'}
                >
                  {t.label}
                </Text>
              </XStack>
            )
          })}
          <XStack
            paddingHorizontal={12}
            paddingVertical={6}
            borderRadius={20}
            alignItems="center"
            cursor="pointer"
            pressStyle={{ scale: 0.97, opacity: 0.92 }}
            style={{ border: '1px dashed #d4d4d4' }}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              color="var(--acoh-body)"
            >
              + Custom
            </Text>
          </XStack>
        </XStack>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={16}
          fontWeight="700"
          color="var(--acoh-body)"
        >
          Add a message (optional)
        </Text>

        <XStack
          backgroundColor="#FFFFFF"
          borderRadius={22}
          paddingLeft={20}
          paddingRight={14}
          paddingVertical={12}
          alignItems="center"
          justifyContent="space-between"
          gap={12}
          style={{ border: '1px solid var(--acoh-border)' }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Great job today!"
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              color: 'var(--acoh-foreground)',
            }}
          />
          <Mic size={20} color="var(--acoh-muted)" />
        </XStack>

        <YStack height={8} />

        <PrimaryPillButton label="Send a Spark" onPress={handleSend} />
      </YStack>
    </AuthShell>
  )
}
