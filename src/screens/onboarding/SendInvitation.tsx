import { YStack, XStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Mail, MessageSquare, Copy, MoreHorizontal } from 'lucide-react'
import {
  AuthShell,
  PillInput,
  PrimaryPillButton,
  OutlinePillButton,
  OrSeparator,
} from '../../components/auth-ui'
import { useBottomSheet } from '../../components/BottomSheet'
import { useToast } from '../../components/Toast'
import { HANDS_HEART } from '../../assets/onboarding'
import type { ReactNode } from 'react'

type ShareTarget = {
  label: string
  bg: string
  icon: ReactNode
  onSelect: () => void
}

export function SendInvitation() {
  const navigate = useNavigate()
  const sheet = useBottomSheet()
  const toast = useToast()

  const goNext = () => navigate('/onboarding/invitation-sent')
  const goSkip = () => navigate('/onboarding/baseline-ratings')

  const openShareSheet = () => {
    const selectAndClose = (msg: string) => {
      sheet.close()
      toast.show(msg)
    }
    const targets: ShareTarget[] = [
      {
        label: 'Messages',
        bg: '#34C759',
        icon: <MessageCircle size={26} color="#FFFFFF" fill="#FFFFFF" strokeWidth={0} />,
        onSelect: () => selectAndClose('Link shared via Messages'),
      },
      {
        label: 'Mail',
        bg: 'linear-gradient(180deg, #66B3FB 0%, #0D7AFF 100%)',
        icon: <Mail size={24} color="#FFFFFF" strokeWidth={2} />,
        onSelect: () => selectAndClose('Link shared via Mail'),
      },
      {
        label: 'WhatsApp',
        bg: '#25D366',
        icon: <MessageSquare size={24} color="#FFFFFF" fill="#FFFFFF" strokeWidth={0} />,
        onSelect: () => selectAndClose('Link shared via WhatsApp'),
      },
      {
        label: 'Copy Link',
        bg: '#E5E5EA',
        icon: <Copy size={22} color="#2c2e2a" strokeWidth={2} />,
        onSelect: () => selectAndClose('Link copied to clipboard'),
      },
      {
        label: 'More',
        bg: '#E5E5EA',
        icon: <MoreHorizontal size={24} color="#2c2e2a" strokeWidth={2.5} />,
        onSelect: () => selectAndClose('More options'),
      },
    ]

    sheet.open({
      title: 'Share Invitation',
      body: (
        <YStack gap={8}>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={13}
            color="var(--acoh-muted)"
            paddingBottom={4}
          >
            Send your partner the link so they can join you.
          </Text>
          <div
            style={{
              display: 'flex',
              gap: 14,
              overflowX: 'auto',
              paddingBottom: 8,
              paddingTop: 4,
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}
          >
            {targets.map((t) => (
              <div
                key={t.label}
                onClick={t.onSelect}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  minWidth: 68,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: t.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  {t.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 11,
                    color: 'var(--acoh-foreground)',
                    textAlign: 'center',
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </YStack>
      ),
    })
  }

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
          onPress={goSkip}
        >
          Skip
        </Text>
      </XStack>

      {/* Content block */}
      <YStack
        paddingTop={90}
        paddingBottom={24}
        paddingHorizontal={24}
        gap={16}
        alignItems="center"
      >
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={24}
          fontWeight="700"
          color="var(--acoh-foreground)"
          textAlign="center"
        >
          Invite Your Partner
        </Text>
        <Text
          fontFamily="Outfit, sans-serif"
          fontSize={14}
          color="var(--acoh-body)"
          textAlign="center"
          lineHeight={20}
        >
          Send an invitation to start building habits together.
        </Text>

        {/* Hands-heart illustration — Figma exports it flipped, so scaleY(-1) restores it */}
        <img
          src={HANDS_HEART}
          alt=""
          aria-hidden="true"
          style={{
            width: 136,
            height: 118.94,
            display: 'block',
            transform: 'scaleY(-1)',
          }}
        />

        <YStack height={8} />

        <PillInput
          label="Partner's Email"
          placeholder="partner@example.com"
          type="email"
        />

        <YStack height={8} />

        <PrimaryPillButton label="Send Invitation" onPress={goNext} />

        <OrSeparator />

        <OutlinePillButton label="Share Invite Link" onPress={openShareSheet} />
      </YStack>
    </AuthShell>
  )
}
