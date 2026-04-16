import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type ToastCtx = {
  show: (message: string, opts?: { duration?: number }) => void
}

const Ctx = createContext<ToastCtx | null>(null)

export function useToast(): ToastCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<number | null>(null)
  const unmountTimer = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    if (unmountTimer.current) window.clearTimeout(unmountTimer.current)
    hideTimer.current = null
    unmountTimer.current = null
  }, [])

  const show = useCallback<ToastCtx['show']>(
    (msg, opts) => {
      clearTimers()
      setMessage(msg)
      requestAnimationFrame(() => setVisible(true))
      const duration = opts?.duration ?? 2400
      hideTimer.current = window.setTimeout(() => setVisible(false), duration)
      unmountTimer.current = window.setTimeout(() => setMessage(null), duration + 260)
    },
    [clearTimers]
  )

  useEffect(() => () => clearTimers(), [clearTimers])

  const api = useMemo(() => ({ show }), [show])

  return (
    <Ctx.Provider value={api}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 60,
          }}
        >
          <div
            style={{
              maxWidth: 'calc(100% - 48px)',
              paddingLeft: 20,
              paddingRight: 20,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 22,
              background: 'rgba(44, 46, 42, 0.92)',
              color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              opacity: visible ? 1 : 0,
              transition: 'transform 240ms cubic-bezier(0.2,0.9,0.3,1), opacity 240ms ease',
            }}
          >
            {message}
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
