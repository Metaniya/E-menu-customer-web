import { useState, useRef, useEffect, useCallback } from 'react'
import { Mail, ArrowLeft } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface Props {
  email?: string
  onVerified: () => void
  onBack: () => void
  onResend: () => void
}

export default function EmailVerificationPage({ email = 'john@example.com', onVerified, onBack }: Props) {
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[450px] lg:max-w-[500px]">
        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Verify Email</h1>
          </div>

          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-primary" />
          </div>

          <p className="text-sm text-muted-foreground text-center mb-1">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm font-medium text-foreground text-center mb-6">{email}</p>

          <div className="flex justify-center gap-2 mb-6">
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
                  'w-11 h-12 text-center text-lg font-bold rounded-xl border transition-colors bg-card text-foreground',
                  digit ? 'border-primary shadow-[0_0_12px_rgba(255,238,0,0.3)]' : 'border-border'
                )}
              />
            ))}
          </div>

          <button
            onClick={onVerified}
            disabled={!allFilled}
            className={cn(
              'w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] mb-4',
              allFilled
                ? 'bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(255,238,0,0.35)] hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            Verify Email
          </button>

          <p className="text-xs text-muted-foreground text-center">
            {canResend ? (
              <button onClick={() => { setTimer(60); setCanResend(false) }} className="text-primary hover:underline font-medium">
                Resend Code
              </button>
            ) : (
              <>Resend code in <span className="text-foreground font-medium">{timer}s</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
