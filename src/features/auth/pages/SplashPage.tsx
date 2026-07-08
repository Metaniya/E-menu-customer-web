import { useEffect, useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface SplashPageProps {
  onTimeout: () => void
  onComplete?: () => void
}

export default function SplashPage({ onComplete }: SplashPageProps) {
  const [fadeIn, setFadeIn] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeIn(true), 100)
    const t2 = setTimeout(() => setShowSpinner(true), 600)
    const t3 = setTimeout(() => onComplete(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 select-none">
      <div className={cn(
        'flex flex-col items-center transition-all duration-700 ease-out',
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}>
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-[#ffee00] flex items-center justify-center shadow-[0_0_40px_rgba(255,238,0,0.3)]">
            <UtensilsCrossed size={44} className="text-[#111]" />
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-[#ffee00]/20 animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-foreground tracking-tight mb-1">
          E-MENU
        </h1>
        <p className="text-muted-foreground text-sm tracking-[0.15em] uppercase font-medium">
          Dine & Discover
        </p>
      </div>

      {showSpinner && (
        <div className="absolute bottom-16 flex flex-col items-center gap-3 transition-all duration-500">
          <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-[10px] text-muted-foreground/60 tracking-widest uppercase">
            Loading
          </p>
        </div>
      )}

      <p className="absolute bottom-8 text-[10px] text-muted-foreground/40 tracking-wider">
        v1.0.0
      </p>
    </div>
  )
}
