import { useState } from 'react'
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface Props {
  onComplete: () => void
  onBack: () => void
}

export default function PasswordResetPage({ onComplete, onBack }: Props) {
  const [step, setStep] = useState<'email' | 'code' | 'reset' | 'done'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setStep('code')
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (code) setStep('reset')
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    if (password && password === confirmPassword) setStep('done')
  }

  if (step === 'done') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-[450px] lg:max-w-[500px] text-center">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Password Reset</h2>
            <p className="text-sm text-muted-foreground mb-6">Your password has been successfully reset.</p>
            <button
              onClick={onComplete}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[450px] lg:max-w-[500px]">
        <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Reset Password</h1>
          </div>

          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-primary" />
          </div>

          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Enter your email and we'll send you a reset code.
              </p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all">
                Send Reset Code
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Enter the reset code sent to {email}
              </p>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="6-digit code"
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors text-center tracking-[0.3em]"
              />
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all">
                Verify Code
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleReset} className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Choose a new password for your account.
              </p>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="New password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                minLength={8}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
