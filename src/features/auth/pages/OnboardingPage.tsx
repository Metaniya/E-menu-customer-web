import { useState, useRef, useCallback } from 'react'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface OnboardingPageProps {
  onComplete: () => void
}

const slides = [
  {
    emoji: '🍽️',
    headline: 'Discover Restaurants',
    description: 'Explore a curated selection of the best restaurants near you. From local favorites to hidden gems — find your next meal.',
  },
  {
    emoji: '📖',
    headline: 'Browse Menus Instantly',
    description: 'View full menus with photos, prices, and dietary tags. Know exactly what you\'re ordering before you decide.',
  },
  {
    emoji: '🚀',
    headline: 'Order with Ease',
    description: 'Place your order in seconds, track it live, and enjoy a seamless dining experience from your table.',
  },
]

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(0)
  const isLast = current === slides.length - 1

  const handleNext = useCallback(() => {
    if (isLast) return onComplete()
    setCurrent(prev => Math.min(prev + 1, slides.length - 1))
  }, [isLast, onComplete])

  const handleDot = useCallback((i: number) => setCurrent(i), [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < slides.length - 1) setCurrent(prev => prev + 1)
      if (diff < 0 && current > 0) setCurrent(prev => prev - 1)
    }
  }, [current])

  const handleClick = useCallback(() => {
    if (current < slides.length - 1) {
      setCurrent(prev => prev + 1)
    }
  }, [current])

  return (
    <div className="min-h-screen bg-background flex flex-col relative select-none">
      <button
        onClick={onComplete}
        className="absolute top-6 right-4 z-10 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
      >
        Skip
      </button>

      <div
        className="flex-1 flex flex-col justify-center px-6"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden mx-auto w-full max-w-sm">
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full shrink-0 flex flex-col items-center text-center px-2">
                <div className="text-7xl mb-8">{slide.emoji}</div>
                <h2
                  className="text-2xl font-bold text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {slide.headline}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); handleDot(i) }}
              className={cn(
                'rounded-full transition-all duration-300',
                i === current
                  ? 'w-7 h-2 bg-primary shadow-[0_0_12px_rgba(255,238,0,0.4)]'
                  : 'w-2 h-2 bg-border hover:bg-muted-foreground/40'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-12">
        <button
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          className={cn(
            'w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.97]',
            isLast
              ? 'bg-primary text-primary-foreground shadow-[0_4px_24px_rgba(255,238,0,0.35)] hover:bg-primary/90'
              : 'bg-card border border-border text-foreground hover:border-primary/40'
          )}
        >
          {isLast ? (
            <>Get Started <ArrowRight size={18} /></>
          ) : (
            <>Next <ChevronRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  )
}
