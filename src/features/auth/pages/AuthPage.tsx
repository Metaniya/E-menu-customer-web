import { useState } from 'react'
import { Chrome, Phone, Eye, EyeOff, UtensilsCrossed, Sparkles, ArrowLeft } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface Props {
  onLogin: () => void
  onBack: () => void
  onForgotPassword: () => void
  onEmailVerification: () => void
}

export default function AuthPage({ onLogin, onBack, onForgotPassword, onEmailVerification }: Props) {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex w-[480px] xl:w-[520px] min-h-screen bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-10 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/5" />
        <div>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <UtensilsCrossed size={18} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-primary-foreground">E-MENU</span>
          </div>
          <div className="space-y-2 mt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-primary-foreground/90 w-fit">
              <Sparkles size={12} /> Welcome
            </div>
            <h2 className="text-3xl font-bold text-primary-foreground leading-tight">
              {tab === 'login' ? 'Welcome Back!' : 'Join the Experience'}
            </h2>
            <p className="text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              {tab === 'login'
                ? 'Sign in to access your favorites, track orders, and more.'
                : 'Create an account to unlock the full E-MENU experience.'}
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            'Save your favorite restaurants',
            'Track orders in real-time',
            'Get exclusive offers & discounts',
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-primary-foreground/80">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-screen overflow-y-auto">
        <div className="min-h-full flex flex-col">
          <div className="flex items-center gap-3 px-6 pt-5 pb-2 lg:px-10 lg:pt-8">
            <button onClick={onBack} className="p-2 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <ArrowLeft size={20} />
            </button>
            <span className="text-sm font-semibold text-foreground lg:hidden">E-MENU</span>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 lg:px-16 py-8 lg:py-0">
            <div className="w-full max-w-md">
              <div className="lg:hidden mb-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <UtensilsCrossed size={20} className="text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{tab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {tab === 'login' ? 'Sign in to continue' : 'Sign up to get started'}
                </p>
              </div>

              <div className="flex bg-muted/70 rounded-xl p-1 mb-6">
                <button onClick={() => setTab('login')}
                  className={cn('flex-1 py-2.5 text-sm font-medium rounded-lg transition-all', tab === 'login' ? 'bg-white text-foreground shadow-sm shadow-black/5' : 'text-muted-foreground hover:text-foreground')}>
                  Login
                </button>
                <button onClick={() => setTab('register')}
                  className={cn('flex-1 py-2.5 text-sm font-medium rounded-lg transition-all', tab === 'register' ? 'bg-white text-foreground shadow-sm shadow-black/5' : 'text-muted-foreground hover:text-foreground')}>
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe"
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {tab === 'login' && (
                  <button type="button" onClick={onForgotPassword} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                    Forgot password?
                  </button>
                )}
                <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                  {tab === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground">or continue with</span></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/30 transition-all active:scale-[0.98]">
                  <Chrome size={17} /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/30 transition-all active:scale-[0.98]">
                  <Phone size={17} /> Phone
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By continuing, you agree to our{' '}
                <button className="text-foreground hover:text-primary underline underline-offset-2 transition-colors">Terms</button>
                {' '}and{' '}
                <button className="text-foreground hover:text-primary underline underline-offset-2 transition-colors">Privacy Policy</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
