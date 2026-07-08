import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface LanguageSelectionPageProps {
  onSelect: (lang: 'en' | 'am') => void
}

const languages = [
  { id: 'en' as const, label: 'English', sub: 'English', flag: '🇬🇧' },
  { id: 'am' as const, label: 'Amharic', sub: 'አማርኛ', flag: '🇪🇹' },
]

export default function LanguageSelectionPage({ onSelect }: LanguageSelectionPageProps) {
  const [selected, setSelected] = useState<'en' | 'am' | null>(null)

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 select-none">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5 shadow-[0_0_40px_rgba(255,238,0,0.2)]">
            <span className="text-2xl">🌐</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
            Choose Language
          </h1>
          <p className="text-muted-foreground text-sm">Select your preferred language</p>
        </div>

        <div className="space-y-4">
          {languages.map(lang => {
            const isSelected = selected === lang.id
            return (
              <button
                key={lang.id}
                onClick={() => setSelected(lang.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(255,238,0,0.15)]'
                    : 'border-border bg-card hover:border-primary/30'
                )}
              >
                <span className="text-3xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <p className="text-foreground font-semibold text-base">{lang.label}</p>
                  <p className="text-muted-foreground text-sm">{lang.sub}</p>
                </div>
                <div className={cn(
                  'w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all',
                  isSelected ? 'border-primary bg-primary' : 'border-border'
                )}>
                  {isSelected && <Check size={15} className="text-primary-foreground" />}
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className={cn(
            'w-full py-4 rounded-2xl font-semibold text-base mt-10 transition-all active:scale-[0.97]',
            selected
              ? 'bg-primary text-primary-foreground shadow-[0_4px_24px_rgba(255,238,0,0.35)] hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
