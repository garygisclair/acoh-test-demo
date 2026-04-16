import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { AuthShell, PrimaryPillButton } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useToast } from '../../components/Toast'

export function SparkDetail() {
  const navigate = useNavigate()
  const toast = useToast()

  const handleMarkRead = () => {
    toast.show('Spark marked as read')
    navigate('/home/sparks')
  }

  return (
    <AuthShell>
      <HomeNavBar title="Spark Detail" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={40} paddingBottom={32} gap={16} alignItems="center">
        <Sparkles size={48} color="var(--acoh-foreground)" />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
        >
          From Partner
        </Text>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={20}
          fontWeight="600"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          Great job on the check-in!
        </Text>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={13}
          color="var(--acoh-body)"
        >
          2 minutes ago
        </Text>

        {/* Linked habit card */}
        <YStack
          backgroundColor="#ebebf9"
          borderRadius={9}
          padding={16}
          gap={8}
          width="100%"
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            fontWeight="600"
            color="var(--acoh-muted)"
          >
            Tied to habit
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="700"
            color="var(--acoh-body)"
          >
            Daily hug or kiss
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={12}
            color="var(--acoh-muted)"
          >
            Intimacy · Daily · Shared
          </Text>
        </YStack>

        <YStack height={16} width="100%" />

        <YStack width="100%" gap={12}>
          <PrimaryPillButton
            label="Send a Spark Back"
            onPress={() => navigate('/shared/send-spark')}
          />
          <XStack
            height={48}
            borderRadius={24}
            backgroundColor="#FFFFFF"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={handleMarkRead}
            pressStyle={{ scale: 0.98, opacity: 0.92 }}
            style={{ border: '1px solid var(--acoh-border)' }}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={15}
              fontWeight="600"
              color="var(--acoh-body)"
            >
              Mark as Read
            </Text>
          </XStack>
          <XStack
            paddingVertical={10}
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onPress={() => navigate(-1)}
            pressStyle={{ opacity: 0.7 }}
          >
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={13}
              fontWeight="700"
              color="var(--acoh-body)"
            >
              Delete Spark
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </AuthShell>
  )
}
