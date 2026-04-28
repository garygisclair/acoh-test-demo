import { YStack, Text } from 'tamagui'
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
import { Firework } from '../../components/Firework'

/**
 * Animation lab copy of the splash. Iterate here without touching /welcome.
 * Sparkles run the firework loop with staggered delays; florals stay static.
 */
// Couple illustration: bottom=0, height=230 → top edge sits at phone-bottom + 230.
// Sparkle cluster + logo group both sit above that line, stacked tight.
type Sparkle = { src: string; x: number; y: number; w: number; h: number; delay: number }
const SPARKLE_SCALE = 0.6

const SPARKLES: Sparkle[] = [
  { src: SPARKLE_BURST_LEFT, x: 50, y: 540, w: 48.67, h: 69.69, delay: 0 },
  { src: SPARKLE_BURST_RIGHT, x: 250, y: 555, w: 125.77, h: 146.47, delay: 200 },
  { src: SPARKLE_MID_1, x: 70, y: 540, w: 48.54, h: 45.03, delay: 400 },
  { src: SPARKLE_MID_2, x: 270, y: 535, w: 43.75, h: 43.83, delay: 600 },
  { src: SPARKLE_MID_3, x: 175, y: 530, w: 46.1, h: 44.74, delay: 800 },
  { src: SPARKLE_TINY, x: 115, y: 595, w: 11.4, h: 13.83, delay: 1000 },
  { src: SPARKLE_TINY, x: 220, y: 580, w: 11.4, h: 13.83, delay: 1200 },
  { src: SPARKLE_TINY, x: 50, y: 595, w: 11.4, h: 13.83, delay: 1400 },
]

export function WelcomeLab() {
  return (
    <YStack
      flex={1}
      position="relative"
      style={{
        background:
          'linear-gradient(180deg, #3b3d7f 0%, #5355b2 68%, #6b6ee5 98%)',
      }}
    >
      {/* Logo + brand block bottom-anchored just above the sparkle band. */}
      <YStack
        position="absolute"
        bottom={400}
        left={0}
        right={0}
        alignItems="center"
        gap={16}
        zIndex={2}
      >
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

      <YStack position="absolute" bottom={0} left={0} right={0} height={230}>
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

      {SPARKLES.map((s, i) => (
        <Firework
          key={i}
          src={s.src}
          delay={s.delay}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.w * SPARKLE_SCALE,
            height: s.h * SPARKLE_SCALE,
            zIndex: 1,
          }}
        />
      ))}

      <img
        src={FLORAL_LEFT}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 27,
          top: 778,
          width: 36,
          height: 44,
          pointerEvents: 'none',
          transform: 'scaleX(-1)',
        }}
      />
      <img
        src={FLORAL_RIGHT}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 331,
          top: 778,
          width: 36,
          height: 44,
          pointerEvents: 'none',
        }}
      />
    </YStack>
  )
}
