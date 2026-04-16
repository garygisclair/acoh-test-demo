import { YStack, Text } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import {
  HEART_LOGO,
  SPLASH_ILLUSTRATION,
  SPARKLE_BURST_LEFT,
  SPARKLE_BURST_RIGHT,
  SPARKLE_TINY,
  SPARKLE_MID_1,
  SPARKLE_MID_2,
  SPARKLE_MID_3,
  FLORAL_LEFT,
  FLORAL_RIGHT,
} from '../../assets/auth'

/**
 * Decorative sparkles + florals, positioned per Figma "Splash" frame coords.
 * All absolute inside the root YStack; pointerEvents:none so they don't block taps.
 *
 * The sparkle cluster is native ~240px tall — larger than the gap between the
 * logo block (ends y≈442) and the couple illustration (starts y=614).
 * SPARKLE_SCALE shrinks each sparkle proportionally; SPARKLE_LIFT tucks the
 * cluster into the gap. Florals are unaffected — they stay bottom-corner.
 */
type Deco = { src: string; x: number; y: number; w: number; h: number; lift?: boolean }
const SPARKLE_LIFT = 90
const SPARKLE_SCALE = 0.6
const SPLASH_DECO: Deco[] = [
  // Sparkle bursts (two large clusters)
  { src: SPARKLE_BURST_LEFT, x: 105.85, y: 557.5, w: 48.67, h: 69.69, lift: true },
  { src: SPARKLE_BURST_RIGHT, x: 226, y: 606.36, w: 125.77, h: 146.47, lift: true },
  // Mid-size sparkles
  { src: SPARKLE_MID_1, x: 70, y: 593, w: 48.54, h: 45.03, lift: true },
  { src: SPARKLE_MID_2, x: 259, y: 579.83, w: 43.75, h: 43.83, lift: true },
  { src: SPARKLE_MID_3, x: 179, y: 513.74, w: 46.1, h: 44.74, lift: true },
  // Tiny sparkles (same asset, three positions)
  { src: SPARKLE_TINY, x: 110.82, y: 641.83, w: 11.4, h: 13.83, lift: true },
  { src: SPARKLE_TINY, x: 162.82, y: 586.83, w: 11.4, h: 13.83, lift: true },
  { src: SPARKLE_TINY, x: 54.82, y: 567.83, w: 11.4, h: 13.83, lift: true },
  // Florals in bottom corners (stay low)
  { src: FLORAL_LEFT, x: 27, y: 778, w: 36, h: 44 },
  { src: FLORAL_RIGHT, x: 331, y: 778, w: 36, h: 44 },
]

export function Welcome() {
  const navigate = useNavigate()

  return (
    <YStack
      flex={1}
      position="relative"
      cursor="pointer"
      onPress={() => navigate('/intro')}
      style={{
        background:
          'linear-gradient(180deg, #3b3d7f 0%, #5355b2 68%, #6b6ee5 98%)',
      }}
    >
      {/*
        Spacer matching Figma — spans y=44 (below status bar) to y=614 (top of
        illustration). Logo + brand center vertically within this range, which
        places them in the upper-middle per design (not the whole-phone center).
      */}
      <YStack
        position="absolute"
        top={44}
        left={0}
        right={0}
        height={570}
        alignItems="center"
        justifyContent="center"
        zIndex={1}
      >
        {/*
          CenterContent — matches Figma geometry so vertical centering inside
          the 570px Spacer lands at y=216 (top) per the source frame.
        */}
        <YStack alignItems="center" gap={16} paddingTop={8} paddingBottom={24}>
          {/* Logo frame: 112×113.61 with 16h/24v padding around 80×66 heart */}
          <YStack
            width={112}
            height={113.61}
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={HEART_LOGO}
              alt="A Couple of Habits"
              style={{ width: 80, height: 65.61, display: 'block' }}
            />
          </YStack>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={24}
            fontWeight="700"
            color="#FFFFFF"
            textAlign="center"
          >
            A Couple of Habits
          </Text>
          <Text
            fontFamily="Outfit, sans-serif"
            fontSize={14}
            fontWeight="400"
            color="rgba(255,255,255,0.7)"
            textAlign="center"
          >
            Build better habits together
          </Text>
        </YStack>
      </YStack>

      {/* Bottom illustration — couple on bench, full bleed */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height={230}
      >
        <img
          src={SPLASH_ILLUSTRATION}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      </YStack>

      {/* Decorative sparkles + florals — absolute per Figma frame coords */}
      {SPLASH_DECO.map((d, i) => {
        const w = d.lift ? d.w * SPARKLE_SCALE : d.w
        const h = d.lift ? d.h * SPARKLE_SCALE : d.h
        const top = d.lift ? d.y - SPARKLE_LIFT : d.y
        return (
          <img
            key={i}
            src={d.src}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: d.x,
              top,
              width: w,
              height: h,
              pointerEvents: 'none',
              transform: d.src === FLORAL_LEFT ? 'scaleX(-1)' : undefined,
            }}
          />
        )
      })}
    </YStack>
  )
}
