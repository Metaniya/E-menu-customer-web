import { useState, useMemo } from 'react'
import { ChevronLeft, Gift, Share2, Clock, Tag, ExternalLink } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { cn } from '../../../shared/utils/cn'
import { Button } from '../../../shared/components/Button'
import { EmptyState } from '../../../shared/components/EmptyState'
import { Badge } from '../../../shared/components/Badge'
import type { Promotion } from '../../../shared/types'

interface PromotionsPageProps {
  onRestaurantClick?: (id: string) => void
  onPromotionClick?: (id: string) => void
  onBack?: () => void
  onNavigate?: (tab: string) => void
}

type FilterMode = 'all' | 'expiring'

export default function PromotionsPage({ onPromotionClick = () => {}, onBack }: PromotionsPageProps) {
  const { promotions } = useApp()
  const [filter, setFilter] = useState<FilterMode>('all')

  const filtered = useMemo(() => {
    if (filter === 'expiring') return promotions.filter(p => p.expiringSoon)
    return promotions
  }, [promotions, filter])

  const getDaysRemaining = (validity: string): number | null => {
    const match = validity.match(/(\w+)\s(\d+),?\s(\d{4})/)
    if (!match) return null
    const months: Record<string, number> = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    }
    const month = months[match[1]]
    if (month === undefined) return null
    const day = parseInt(match[2])
    const year = parseInt(match[3])
    const date = new Date(year, month, day)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return Math.max(0, Math.ceil(diff / 86400000))
  }

  const handleShare = async (promotion: Promotion) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${promotion.discount} at ${promotion.restaurantName}`, text: promotion.description })
      } catch { /* user cancelled */ }
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-4 max-w-[var(--container-max)] mx-auto">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 className="font-semibold text-foreground">Offers</h2>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as FilterMode, label: 'All' },
              { key: 'expiring' as FilterMode, label: 'Expiring Soon' },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={cn('px-4 py-1.5 rounded-full text-xs font-medium transition-colors',
                  filter === f.key ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40')}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-4 pt-4">
        {filtered.length === 0 ? (
          <EmptyState icon={Gift} title="No offers available" description="Check back later for new promotions and deals." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(promotion => {
              const daysRemaining = getDaysRemaining(promotion.validity)
              return (
                <div key={promotion.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="relative h-36 bg-muted">
                    <img src={promotion.banner} alt={promotion.restaurantName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <div className="bg-primary px-3 py-1.5 rounded-xl shadow-lg">
                        <p className="text-white text-sm font-bold">{promotion.discount}</p>
                      </div>
                    </div>
                    {daysRemaining !== null && daysRemaining <= 7 && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="warning" className="flex items-center gap-1">
                          <Clock size={10} />{daysRemaining === 0 ? 'Last day' : `${daysRemaining}d left`}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted/80 shrink-0">
                          <img src={promotion.restaurantLogo} alt="" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-white text-sm font-semibold drop-shadow-sm">{promotion.restaurantName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-foreground mb-2">{promotion.description}</p>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{promotion.validity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-4">
                      <Tag size={12} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{promotion.terms}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleShare(promotion)}>
                        <Share2 size={14} /> Share
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => onPromotionClick(promotion.id)}>
                        <ExternalLink size={14} /> View Restaurant
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
