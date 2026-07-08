import { useState, useEffect, useRef } from 'react'
import { Camera, Zap, ZapOff, X, CircleCheck, CircleX } from 'lucide-react'
import { Button } from '../../../shared/components/Button'
import { cn } from '../../../shared/utils/cn'

interface Props {
  onScanned?: (restaurantId: string, tableNumber: string) => void
  onScan?: (restaurantId: string, tableNumber: string) => void
  onClose?: () => void
  onBack: () => void
}

export default function QRScannerPage({ onScan, onBack }: Props) {
  const onScanned = onScan || (() => {})
  const onClose = onBack
  const [flashOn, setFlashOn] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleScan() {
    setScanState('scanning')
    timeoutRef.current = setTimeout(() => {
      const success = Math.random() > 0.3
      setScanState(success ? 'success' : 'error')
      if (success) {
        setTimeout(() => {
          onScanned('r1', 'T3')
        }, 800)
      } else {
        setTimeout(() => setScanState('idle'), 2000)
      }
    }, 2000)
  }

  function handleManualSubmit() {
    const match = manualCode.match(/^EM#(\w+)-T(\w+)$/i)
    if (match) {
      onScanned(match[1], match[2])
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 h-14">
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center">
          <X size={20} />
        </button>
        <button
          onClick={() => setFlashOn(!flashOn)}
          className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center"
        >
          {flashOn ? <Zap size={18} /> : <ZapOff size={18} />}
        </button>
      </div>

      {/* Scan Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Scan Frame */}
        <div className="relative w-64 h-64 mb-8">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-primary rounded-br-lg" />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {scanState === 'idle' && (
              <Camera size={56} className="text-primary/60" />
            )}
            {scanState === 'scanning' && (
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              </div>
            )}
            {scanState === 'success' && (
              <CircleCheck size={56} className="text-green-400" />
            )}
            {scanState === 'error' && (
              <CircleX size={56} className="text-red-400" />
            )}
          </div>

          {/* Scan line animation */}
          {scanState === 'scanning' && (
            <div className="absolute left-2 right-2 h-0.5 bg-primary/60 animate-pulse rounded-full"
              style={{
                top: '25%',
                animation: 'scanLine 1.5s ease-in-out infinite',
              }}
            />
          )}
        </div>

        {/* Instructions */}
        {scanState === 'idle' && (
          <>
            <p className="text-base font-semibold mb-1">Scan QR Code</p>
            <p className="text-sm text-muted-foreground text-center max-w-xs mb-6">
              Point your camera at the QR code on your table to start ordering
            </p>
            <Button onClick={handleScan} size="lg" className="w-full max-w-xs">
              <Camera size={18} />
              Start Scanning
            </Button>
          </>
        )}

        {scanState === 'scanning' && (
          <p className="text-sm text-muted-foreground animate-pulse">Scanning...</p>
        )}

        {scanState === 'success' && (
          <p className="text-sm text-green-400 font-medium">QR Code detected! Redirecting...</p>
        )}

        {scanState === 'error' && (
          <div className="text-center">
            <p className="text-sm text-red-400 font-medium mb-1">Couldn't read QR code</p>
            <p className="text-xs text-muted-foreground mb-4">Try adjusting your camera or enter manually</p>
            <Button variant="outline" size="sm" onClick={() => setScanState('idle')}>
              Try Again
            </Button>
          </div>
        )}

        {/* Manual Entry */}
        {!showManualInput ? (
          <button
            onClick={() => setShowManualInput(true)}
            className="mt-6 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Enter code manually
          </button>
        ) : (
          <div className="mt-6 w-full max-w-xs space-y-3">
            <input
              type="text"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              placeholder="EM#R1-T3"
              className="w-full h-11 px-4 rounded-xl bg-secondary text-sm text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 text-center tracking-wider uppercase"
              autoFocus
            />
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => { setShowManualInput(false); setManualCode('') }}>
                Cancel
              </Button>
              <Button size="sm" className="flex-1" onClick={handleManualSubmit} disabled={!manualCode}>
                Submit
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground/60 text-center">
              Format: EM#&lt;RestaurantID&gt;-T&lt;TableNumber&gt;
            </p>
          </div>
        )}
      </div>

      {/* Bottom safe area */}
      <div className="h-6" />
    </div>
  )
}
