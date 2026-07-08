import { useState, useMemo } from 'react'
import { RESTAURANTS } from '../data/restaurants'
import { MapPin, ArrowUpDown, ChevronLeft, X, RefreshCw } from 'lucide-react'
import { RestaurantCard } from '../../../shared/components/RestaurantCard'
import type { Restaurant } from '../../../shared/types'

interface Props {
  restaurants?: Restaurant[]
  onRestaurantClick: (id: string) => void
  onBack?: () => void
  filters?: { cuisine?: string[]; priceRange?: string[]; dietary?: string[] }
}

type SortOption = 'distance' | 'price'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'distance', label: 'Distance' },
  { value: 'price', label: 'Price' },
]

export default function RestaurantListPage({ restaurants = RESTAURANTS, onRestaurantClick, onBack, filters: initialFilters }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>('distance')
  const [showSort, setShowSort] = useState(false)
  const [displayCount, setDisplayCount] = useState(6)
  const PAGE_SIZE = 6
  const [activeCuisineFilters, setActiveCuisineFilters] = useState<string[]>(initialFilters?.cuisine || [])

  const sorted = useMemo(() => {
    const list = [...restaurants]
    if (sortBy === 'distance') list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    else if (sortBy === 'price') list.sort((a, b) => a.priceRange.length - b.priceRange.length)
    return list
  }, [restaurants, sortBy])

  const filtered = useMemo(() => {
    if (activeCuisineFilters.length === 0) return sorted
    return sorted.filter(r => r.cuisine.some(c => activeCuisineFilters.includes(c)))
  }, [sorted, activeCuisineFilters])

  const displayed = filtered.slice(0, displayCount)
  const hasMore = displayCount < filtered.length
  const removeCuisineFilter = (cuisine: string) => setActiveCuisineFilters(prev => prev.filter(c => c !== cuisine))
  const allCuisines = Array.from(new Set(restaurants.flatMap(r => r.cuisine)))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 max-w-[var(--container-max)] mx-auto">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft size={20} />
              </button>
            )}
            <h1 className="font-semibold text-foreground">{filtered.length} Restaurant{filtered.length !== 1 ? 's' : ''}</h1>
          </div>
          <div className="relative">
            <button onClick={() => setShowSort(!showSort)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">
              <ArrowUpDown size={13} /> {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
            </button>
            {showSort && (
              <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden min-w-[140px]">
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt.value ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeCuisineFilters.length > 0 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-card/50 border-b border-border max-w-[var(--container-max)] mx-auto w-full" style={{ scrollbarWidth: 'none' }}>
          {activeCuisineFilters.map(c => (
            <span key={c} className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {c}
              <button onClick={() => removeCuisineFilter(c)} className="hover:text-primary/70"><X size={12} /></button>
            </span>
          ))}
          <button onClick={() => setActiveCuisineFilters([])} className="shrink-0 text-xs text-muted-foreground hover:text-foreground font-medium px-2">Clear all</button>
        </div>
      )}

      {activeCuisineFilters.length === 0 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-border max-w-[var(--container-max)] mx-auto w-full" style={{ scrollbarWidth: 'none' }}>
          {allCuisines.map(c => (
            <button key={c} onClick={() => setActiveCuisineFilters([c])}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 max-w-[var(--container-max)] mx-auto w-full px-4 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
              <MapPin size={22} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No restaurants found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">Try adjusting your filters to see more options</p>
            <button onClick={() => { setActiveCuisineFilters([]); setSortBy('distance') }} className="text-sm text-primary font-medium hover:underline">Reset all filters</button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-3">Showing {displayed.length} of {filtered.length}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {displayed.map(r => (
                <RestaurantCard key={r.id} restaurant={r} variant="list" onClick={() => onRestaurantClick(r.id)} />
              ))}
            </div>
            {hasMore && (
              <button onClick={() => setDisplayCount(prev => prev + PAGE_SIZE)} className="w-full mt-4 py-3.5 rounded-2xl border border-border bg-card text-foreground font-medium text-sm hover:border-primary/40 transition-colors flex items-center justify-center gap-2">
                <RefreshCw size={14} /> Load More
              </button>
            )}
            {!hasMore && filtered.length > PAGE_SIZE && (
              <p className="text-center text-xs text-muted-foreground mt-4">All restaurants loaded</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
