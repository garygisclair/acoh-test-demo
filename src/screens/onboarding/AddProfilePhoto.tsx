import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { User, Check, Camera, Image as ImageIcon } from 'lucide-react'
import {
  AuthShell,
  PrimaryPillButton,
  OutlinePillButton,
} from '../../components/auth-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { CROWN } from '../../assets/auth'
import {
  PHOTO_BOTTOM_SELFIE,
  PROFILE_PHOTO_SAMPLE,
  SPARKLE_PHOTO_1,
  SPARKLE_PHOTO_2,
} from '../../assets/onboarding'

type Status = 'empty' | 'added'

export function AddProfilePhoto() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const [status, setStatus] = useState<Status>('empty')

  const goNext = () => navigate('/onboarding/send-invitation')

  const openPicker = () => {
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
            onPress={() => {
              setStatus('added')
              sheet.close()
            }}
            pressStyle={{ opacity: 0.7 }}
          >
            <Camera size={22} color="var(--acoh-foreground)" />
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={15}
              color="var(--acoh-foreground)"
            >
              Take a photo
            </Text>
          </XStack>
          <XStack
            gap={16}
            paddingHorizontal={4}
            paddingVertical={14}
            alignItems="center"
            cursor="pointer"
            onPress={() => {
              setStatus('added')
              sheet.close()
            }}
            pressStyle={{ opacity: 0.7 }}
          >
            <ImageIcon size={22} color="var(--acoh-foreground)" />
            <Text
              fontFamily="Outfit, sans-serif"
              fontSize={15}
              color="var(--acoh-foreground)"
            >
              Choose from library
            </Text>
          </XStack>
        </YStack>
      ),
    })
  }

  const isAdded = status === 'added'

  return (
    <AuthShell>
      {/* Skip row (top-right) — clears the overlaid status bar */}
      <XStack
        marginTop={44}
        paddingHorizontal={24}
        paddingTop={8}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          fontWeight="500"
          color="var(--acoh-accent)"
          cursor="pointer"
          onPress={goNext}
        >
          Skip
        </Text>
      </XStack>

      {/* Header */}
      <YStack paddingHorizontal={24} paddingTop={16} gap={12} alignItems="center">
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={24}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          Add a Profile Photo
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={20}
        >
          Your partner will see this as your photo in A Couple of Habits.
        </Text>
      </YStack>

      {/* Avatar area */}
      <YStack
        height={320}
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {isAdded && (
          <img
            src={CROWN}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 24,
              left: '50%',
              transform: 'translateX(-50%) scaleY(-1)',
              width: 44,
              height: 40,
              pointerEvents: 'none',
            }}
          />
        )}
        <YStack position="relative" width={160} height={160}>
          <YStack
            width={160}
            height={160}
            borderRadius={80}
            backgroundColor="#dadaf1"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {isAdded ? (
              <img
                src={PROFILE_PHOTO_SAMPLE}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <User size={60} color="var(--acoh-foreground)" strokeWidth={1.75} />
            )}
          </YStack>
          {isAdded && (
            <YStack
              position="absolute"
              right={-4}
              bottom={8}
              width={36}
              height={36}
              borderRadius={18}
              backgroundColor="#33b58c"
              alignItems="center"
              justifyContent="center"
              style={{ border: '3px solid #faf8f2' }}
            >
              <Check size={20} color="#FFFFFF" strokeWidth={3} />
            </YStack>
          )}
        </YStack>
      </YStack>

      {/* Button area */}
      <YStack paddingHorizontal={24} gap={12} alignItems="center">
        <PrimaryPillButton
          label={isAdded ? 'Next' : 'Add Photo'}
          onPress={isAdded ? goNext : openPicker}
        />
        {isAdded && (
          <OutlinePillButton label="Change Photo" onPress={openPicker} />
        )}
      </YStack>

      {/* Bottom selfie illustration — full-width at bottom of phone */}
      <YStack
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height={162}
        zIndex={0}
      >
        <img
          src={PHOTO_BOTTOM_SELFIE}
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      </YStack>

      {/* Decorative sparkles (flanking the avatar) */}
      <img
        src={SPARKLE_PHOTO_1}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 108,
          top: 432,
          width: 44,
          height: 44,
          pointerEvents: 'none',
        }}
      />
      <img
        src={SPARKLE_PHOTO_2}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 245,
          top: 333,
          width: 46,
          height: 45,
          pointerEvents: 'none',
        }}
      />
    </AuthShell>
  )
}
