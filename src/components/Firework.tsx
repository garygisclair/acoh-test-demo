import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Web port of the RN Animated firework loop:
 *   delay → parallel(scale 0.6→1.4 / opacity 0→1) → opacity 1→0 → repeat
 * Drives transform + opacity only so the compositor can offload to the GPU.
 */
type FireworkProps = {
  src: string
  delay?: number
  style?: CSSProperties
  alt?: string
}

const SCALE_FROM = 0.6
const SCALE_TO = 1.4
const FADE_IN_MS = 300
const SCALE_MS = 1200
const FADE_OUT_MS = 600

export function Firework({ src, delay = 0, style, alt = '' }: FireworkProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cycleMs = SCALE_MS + FADE_OUT_MS

    const animation = el.animate(
      [
        { transform: `scale(${SCALE_FROM})`, opacity: 0, offset: 0 },
        {
          transform: `scale(${SCALE_FROM + (SCALE_TO - SCALE_FROM) * (FADE_IN_MS / SCALE_MS)})`,
          opacity: 1,
          offset: FADE_IN_MS / cycleMs,
        },
        {
          transform: `scale(${SCALE_TO})`,
          opacity: 1,
          offset: SCALE_MS / cycleMs,
        },
        { transform: `scale(${SCALE_TO})`, opacity: 0, offset: 1 },
      ],
      {
        duration: cycleMs,
        delay,
        iterations: Infinity,
        easing: 'ease-out',
      },
    )

    return () => animation.cancel()
  }, [delay])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        ...style,
        opacity: 0,
        willChange: 'transform, opacity',
        pointerEvents: 'none',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
