import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AuthShell } from '../../components/auth-ui'
import { HomeNavBar } from '../../components/home-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { TERMS_TITLE, PRIVACY_TITLE, TermsBody, PrivacyBody } from '../../data/legal'

export function AppSettings() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()

  const openTerms = () => sheet.open({ title: TERMS_TITLE, body: <TermsBody /> })
  const openPrivacy = () => sheet.open({ title: PRIVACY_TITLE, body: <PrivacyBody /> })

  return (
    <AuthShell>
      <HomeNavBar title="App Settings" onBack={() => navigate(-1)} />

      <YStack paddingHorizontal={16} paddingTop={16} paddingBottom={32} gap={12}>
        <SectionHeader>Appearance</SectionHeader>
        <InfoRow label="Theme" value="System Default" />

        <YStack height={4} />
        <SectionHeader>About</SectionHeader>
        <InfoRow label="Version" value="1.0.0 (Build 42)" />
        <NavRow label="Terms of Service" onPress={openTerms} />
        <NavRow label="Privacy Policy" onPress={openPrivacy} />

        <YStack height={4} />
        <SectionHeader>Data & Privacy</SectionHeader>
        <NavRow label="Export My Data" />
        <NavRow label="Delete Account" />

        <YStack height={8} />

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={12}
          color="var(--acoh-muted)"
          lineHeight={18}
        >
          E2E encryption: Your personal data is encrypted and cannot be read by the server.
        </Text>
      </YStack>
    </AuthShell>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontFamily="Outfit, sans-serif"
      fontSize={16}
      fontWeight="700"
      color="var(--acoh-foreground)"
    >
      {children}
    </Text>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        color="var(--acoh-body)"
      >
        {label}
      </Text>
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        color="var(--acoh-body)"
      >
        {value}
      </Text>
    </XStack>
  )
}

function NavRow({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      onPress={onPress}
      pressStyle={{ scale: 0.99, opacity: 0.95 }}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        fontWeight="600"
        color="var(--acoh-body)"
      >
        {label}
      </Text>
      <ArrowRight size={16} color="var(--acoh-muted)" />
    </XStack>
  )
}
