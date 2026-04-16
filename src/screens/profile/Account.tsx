import { useState } from 'react'
import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Pencil, Camera, Image as ImageIcon } from 'lucide-react'
import { AuthShell } from '../../components/auth-ui'
import { TabTopBar } from '../../components/home-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { AVATAR_ME } from '../../assets/home'

export function Account() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex@example.com')

  const openPhotoPicker = () => {
    sheet.open({
      title: 'Select an option',
      body: (
        <YStack>
          <XStack
            gap={16}
            paddingHorizontal={4}
            paddingVertical={14}
            alignItems="center"
            cursor="pointer"
            onPress={() => sheet.close()}
            pressStyle={{ opacity: 0.7 }}
          >
            <Camera size={22} color="var(--acoh-foreground)" />
            <Text fontFamily="Outfit, sans-serif" fontSize={15} color="var(--acoh-foreground)">
              Take a photo
            </Text>
          </XStack>
          <XStack
            gap={16}
            paddingHorizontal={4}
            paddingVertical={14}
            alignItems="center"
            cursor="pointer"
            onPress={() => sheet.close()}
            pressStyle={{ opacity: 0.7 }}
          >
            <ImageIcon size={22} color="var(--acoh-foreground)" />
            <Text fontFamily="Outfit, sans-serif" fontSize={15} color="var(--acoh-foreground)">
              Choose from library
            </Text>
          </XStack>
        </YStack>
      ),
    })
  }

  return (
    <AuthShell>
      <TabTopBar title="Profile" onAvatarPress={() => navigate('/notifications')} />

      <YStack paddingHorizontal={16} paddingTop={24} paddingBottom={32} gap={16} alignItems="center">
        {/* Avatar with edit badge when editing */}
        <YStack position="relative" width={80} height={80}>
          <XStack width={80} height={80} borderRadius={40} overflow="hidden" backgroundColor="#dadaf1">
            <img
              src={AVATAR_ME}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </XStack>
          {editing && (
            <XStack
              position="absolute"
              right={-2}
              bottom={-2}
              width={28}
              height={28}
              borderRadius={14}
              backgroundColor="var(--acoh-accent)"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onPress={openPhotoPicker}
              pressStyle={{ scale: 0.92, opacity: 0.92 }}
              style={{ border: '3px solid var(--acoh-bg-pale)' }}
            >
              <Pencil size={14} color="#FFFFFF" strokeWidth={2.5} />
            </XStack>
          )}
        </YStack>

        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={20}
          fontWeight="600"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          {displayName}
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
          textAlign="center"
        >
          {email}
        </Text>

        <XStack
          paddingHorizontal={16}
          paddingVertical={10}
          borderRadius={24}
          backgroundColor={editing ? 'var(--acoh-accent)' : '#FFFFFF'}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onPress={() => setEditing(v => !v)}
          pressStyle={{ scale: 0.98, opacity: 0.92 }}
          style={{ border: editing ? 'none' : '1px solid var(--acoh-border)' }}
        >
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            fontWeight="600"
            color={editing ? '#FFFFFF' : 'var(--acoh-foreground)'}
          >
            {editing ? 'Done' : 'Edit Profile'}
          </Text>
        </XStack>

        <YStack height={4} />

        {/* Info rows — editable when `editing` is true */}
        <EditableRow
          label="Display Name"
          value={displayName}
          onChange={setDisplayName}
          editing={editing}
        />
        <EditableRow
          label="Email"
          value={email}
          onChange={setEmail}
          editing={editing}
          inputType="email"
        />
        <InfoRow
          label="Password"
          value={editing ? 'Change password' : '••••••••'}
          actionable={editing}
        />
        <InfoRow label="Connected Accounts" value="Google" />

        <YStack height={4} />

        {/* Nav rows */}
        <NavRow label="Partnership" onPress={() => navigate('/profile/partnership')} />
        <NavRow label="Notification Preferences" onPress={() => navigate('/profile/notification-prefs')} />
        <NavRow label="App Settings" onPress={() => navigate('/profile/app-settings')} />

        <YStack height={8} />

        <NavRow label="Sign Out" onPress={() => navigate('/profile/sign-out')} />
      </YStack>
    </AuthShell>
  )
}

function InfoRow({
  label,
  value,
  actionable,
}: {
  label: string
  value: string
  actionable?: boolean
}) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
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
        fontWeight={actionable ? '500' : '400'}
        color={actionable ? 'var(--acoh-accent)' : 'var(--acoh-body)'}
        cursor={actionable ? 'pointer' : 'default'}
      >
        {value}
      </Text>
    </XStack>
  )
}

function EditableRow({
  label,
  value,
  onChange,
  editing,
  inputType = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  editing: boolean
  inputType?: 'text' | 'email'
}) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      gap={12}
    >
      <Text
        fontFamily="Outfit, sans-serif"
        fontSize={14}
        color="var(--acoh-body)"
        flexShrink={0}
      >
        {label}
      </Text>
      {editing ? (
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            textAlign: 'right',
            fontFamily: 'Outfit, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--acoh-foreground)',
          }}
        />
      ) : (
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
        >
          {value}
        </Text>
      )}
    </XStack>
  )
}

function NavRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <XStack
      backgroundColor="#ebebf9"
      borderRadius={9}
      paddingHorizontal={16}
      paddingVertical={14}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
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
