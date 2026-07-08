import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowLeft, Pencil } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface PhoneVerificationPageProps {
  phone?: string
  onVerified: () => void
  onEditNumber?: () => void
  onBack?: () => void
}

export default function PhoneVerificationPage({ phone = '+251-91-123-4567', onVerified, onEditNumber, onBack }: PhoneVerificationPageProps) {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) inputsRef.current[index + 1]?.focus()
  }, [code])

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }, [code])

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  const allFilled = code.every(d => d !== '')
  const masked = phone.slice(0, -4).replace(/\d/g, '*') + phone.slice(-4)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="font-semibold text-foreground">Verify Phone</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Pencil size={32} className="text-primary" />
        </div>

        <p className="text-sm text-muted-foreground text-center mb-2">
          Enter the 6-digit code sent to
        </p>
        <button
          onClick={onEditNumber}
          className="flex items-center gap-1 text-foreground font-medium text-sm mb-8 hover:text-primary transition-colors"
        >
          {masked}
          <Pencil size={14} className="text-muted-foreground" />
        </button>

        <div className="flex gap-2 mb-8">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputsRef.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className={cn(
                'w-11 h-12 text-center text-lg font-bold rounded-xl border transition-colors',
                'bg-card text-foreground',
                digit ? 'border-[#ffee00] shadow-[0_0_12px_rgba(255,238,0,0.3)]' : 'border-border'
              )}
            />
          ))}
        </div>

        <button
          onClick={onVerified}
          disabled={!allFilled}
          className={cn(
            'w-full max-w-sm py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]',
            allFilled
              ? 'bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(255,238,0,0.35)] hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          Verify Code
        </button>

        <p className="text-xs text-muted-foreground mt-6">
          {canResend ? (
            <button onClick={() => { setTimer(60); setCanResend(false) }} className="text-primary hover:underline">
              Resend Code
            </button>
          ) : (
            <>Resend code in <span className="text-foreground">{timer}s</span></>
          )}
        </p>
      </div>
    </div>
  )
}
