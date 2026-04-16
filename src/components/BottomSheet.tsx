import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { X } from 'lucide-react'

type SheetContent = {
  title: string
  body: ReactNode
}

type BottomSheetCtx = {
  open: (content: SheetContent) => void
  close: () => void
}

const Ctx = createContext<BottomSheetCtx | null>(null)

export function useBottomSheet(): BottomSheetCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBottomSheet must be used inside <BottomSheetProvider>')
  return ctx
}

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SheetContent | null>(null)
  const [visible, setVisible] = useState(false)

  const open = useCallback((c: SheetContent) => {
    setContent(c)
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    // Unmount after slide-down animation completes
    setTimeout(() => setContent(null), 260)
  }, [])

  const api = useMemo(() => ({ open, close }), [open, close])

  return (
    <Ctx.Provider value={api}>
      {children}
      {content && <BottomSheet visible={visible} content={content} onClose={close} />}
    </Ctx.Provider>
  )
}

function BottomSheet({
  visible,
  content,
  onClose,
}: {
  visible: boolean
  content: SheetContent
  onClose: () => void
}) {
  // Lock the underlying scroll while sheet is open (within the phone only)
  useEffect(() => {
    return () => {
      /* nothing to clean up; parent handles content teardown */
    }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: visible ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
          transition: 'background 240ms ease',
          zIndex: 40,
        }}
      />
      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          maxHeight: '85%',
          background: '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: '0 -10px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1)',
          zIndex: 50,
          overflow: 'hidden',
        }}
      >
        {/* Drag handle */}
        <div style={{ paddingTop: 12, paddingBottom: 4, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              background: 'rgba(44,46,42,0.2)',
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px 16px 20px',
            borderBottom: '1px solid var(--acoh-border)',
          }}
        >
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--acoh-foreground)',
            }}
          >
            {content.title}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 6,
              cursor: 'pointer',
              color: 'var(--acoh-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div
          style={{
            padding: '16px 20px 24px 20px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            flex: 1,
          }}
        >
          {content.body}
        </div>
      </div>
    </>
  )
}
