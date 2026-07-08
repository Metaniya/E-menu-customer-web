import { useState, useMemo } from 'react'
import { ChevronLeft, Heart, ArrowUpDown, Clock, MapPin, Search } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { RESTAURANTS } from '../../home/data/restaurants'
import { cn } from '../../../shared/utils/cn'
import { EmptyState } from '../../../shared/components/EmptyState'
import { Button } from '../../../shared/components/Button'

interface FavoritesPageProps {
  onRestaurantClick: (id: string) => void
  onBack?: () => void
}

type SortMode = 'recent' | 'name' | 'distance'

export default function FavoritesPage({ onRestaurantClick, onBack }: FavoritesPageProps) {
  const { favorites, removeFavorite } = useApp()
  const [sortMode, setSortMode] = useState<SortMode>('recent')
  const [showSort, setShowSort] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const favRestaurants = useMemo(() => {
    const filtered = RESTAURANTS.filter(r => favorites.includes(r.id) && (!searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase())))
    return [...filtered].sort((a, b) => {
      switch (sortMode) {
        case 'name': return a.name.localeCompare(b.name)
        case 'distance': return (parseFloat(a.distance) || 999) - (parseFloat(b.distance) || 999)
        default: return 0
      }
    })
  }, [favorites, searchQuery, sortMode])

  const sortOptions: { key: SortMode; label: string; icon: typeof Clock }[] = [
    { key: 'recent', label: 'Recent', icon: Clock },
    { key: 'name', label: 'Name', icon: ArrowUpDown },
    { key: 'distance', label: 'Distance', icon: MapPin },
  ]
  const currentSort = sortOptions.find(o => o.key === sortMode)!

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-4 max-w-[var(--container-max)] mx-auto">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"><ChevronLeft size={20} /></button>
            )}
            <h2 className="font-semibold text-foreground">Favorites <span className="text-muted-foreground font-normal text-sm">({favRestaurants.length})</span></h2>
          </div>
          <div className="relative">
            <button onClick={() => setShowSort(!showSort)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <currentSort.icon size={13} /> {currentSort.label}
            </button>
            {showSort && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 w-36 bg-card border border-border rounded-xl overflow-hidden shadow-xl">
                  {sortOptions.map(opt => (
                    <button key={opt.key} onClick={() => { setSortMode(opt.key); setShowSort(false) }}
                      className={cn('w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors', sortMode === opt.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30')}>
                      <opt.icon size={13} /> {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="px-4 pb-3 max-w-[var(--container-max)] mx-auto">
          <div className="relative max-w-md">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search favorites..."
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-4 pt-4">
        {favRestaurants.length === 0 ? (
          <EmptyState icon={Heart} title="No favorites yet" description="Save your go-to spots for quick ordering"
            action={<Button onClick={() => onRestaurantClick('explore')}>Explore Restaurants</Button>} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-card border border-border rounded-xl overflow-hidden active:scale-[0.98] transition-transform">
                <button onClick={() => onRestaurantClick(restaurant.id)} className="w-full text-left flex items-center gap-3 p-3">
                  <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                    <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">{restaurant.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{restaurant.cuisine.slice(0, 2).join(' · ')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{restaurant.distance}</span>
                      <span className="text-xs text-muted-foreground">· {restaurant.priceRange}</span>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeFavorite(restaurant.id) }} className="p-2 text-red-400 hover:text-red-300 transition-colors">
                    <Heart size={18} className="fill-red-400" />
                  </button>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
