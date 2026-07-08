import { useState, useMemo } from 'react'
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { RESTAURANTS, CUISINE_OPTIONS, DIETARY_OPTIONS } from '../data/restaurants'
import { RestaurantCard } from '../../../shared/components/RestaurantCard'
import { EmptyState } from '../../../shared/components/EmptyState'
import { cn } from '../../../shared/utils/cn'

interface Props {
  onRestaurantClick: (id: string) => void
  onBack: () => void
  onClose?: () => void
}

type SortOption = 'distance' | 'price'

const RECENT_SEARCHES = ['Pizza', 'Ethiopian', 'Burger', 'Coffee', 'Ramen', 'Indian']

export default function SearchPage({ onRestaurantClick, onBack }: Props) {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('distance')
  const [maxDistance, setMaxDistance] = useState('')

  const toggleCuisine = (c: string) => setSelectedCuisines(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  const togglePrice = (p: string) => setPriceRange(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  const toggleDietary = (d: string) => setSelectedDietary(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  const results = useMemo(() => {
    let list = [...RESTAURANTS]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.some(c => c.toLowerCase().includes(q)))
    }
    if (selectedCuisines.length > 0) list = list.filter(r => r.cuisine.some(c => selectedCuisines.includes(c)))
    if (priceRange.length > 0) list = list.filter(r => priceRange.includes(r.priceRange))
    if (maxDistance) list = list.filter(r => parseFloat(r.distance) <= parseFloat(maxDistance))
    if (sortBy === 'distance') list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    else if (sortBy === 'price') list.sort((a, b) => a.priceRange.length - b.priceRange.length)
    return list
  }, [query, selectedCuisines, priceRange, maxDistance, sortBy])

  const hasFilters = selectedCuisines.length > 0 || priceRange.length > 0 || selectedDietary.length > 0 || maxDistance !== ''

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2 px-4 py-3 max-w-[var(--container-max)] mx-auto">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search restaurants or dishes..." value={query} onChange={e => setQuery(e.target.value)} autoFocus
              className="w-full pl-10 pr-9 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X size={16} /></button>}
          </div>
          <button onClick={onBack} className="p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"><X size={20} /></button>
        </div>
        <div className="flex items-center gap-2 px-4 pb-3 max-w-[var(--container-max)] mx-auto">
          <button onClick={() => setShowFilters(!showFilters)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors', showFilters || hasFilters ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:border-primary/40')}>
            <SlidersHorizontal size={13} /> Filters
          </button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <ArrowUpDown size={12} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)} className="bg-transparent text-foreground text-xs font-medium border-none outline-none appearance-none cursor-pointer">
              <option value="distance">Distance</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        {!query && !showFilters && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto max-w-[var(--container-max)] mx-auto scrollbar-none">
            {RECENT_SEARCHES.map(s => (
              <button key={s} onClick={() => setQuery(s)} className="shrink-0 px-3 py-1.5 rounded-full text-xs bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">{s}</button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 max-w-[var(--container-max)] mx-auto w-full px-4 py-4 lg:flex lg:gap-6">
        {showFilters && (
          <div className="lg:w-[280px] lg:shrink-0 lg:sticky lg:top-24 lg:self-start bg-card border border-border rounded-2xl p-4 mb-4 lg:mb-0 space-y-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Cuisine</p>
              <div className="flex flex-wrap gap-2">
                {CUISINE_OPTIONS.map(c => (
                  <button key={c} onClick={() => toggleCuisine(c)} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-all', selectedCuisines.includes(c) ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary/40')}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Price Range</p>
              <div className="flex gap-2">
                {['Br', 'BrBr', 'BrBrBr'].map(p => (
                  <button key={p} onClick={() => togglePrice(p)} className={cn('px-4 py-1.5 rounded-full text-xs font-medium transition-all', priceRange.includes(p) ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary/40')}>{p}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Dietary</p>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map(d => (
                  <button key={d} onClick={() => toggleDietary(d)} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-all', selectedDietary.includes(d) ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary/40')}>{d}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Max Distance (km)</p>
              <div className="flex flex-wrap gap-2">
                {['', '1', '2', '5', '10'].map(d => (
                  <button key={d || 'any'} onClick={() => setMaxDistance(d)} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-all', maxDistance === d ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary/40')}>{d || 'Any'}</button>
                ))}
              </div>
            </div>
            {hasFilters && (
              <button onClick={() => { setSelectedCuisines([]); setPriceRange([]); setSelectedDietary([]); setMaxDistance('') }} className="text-xs text-primary font-medium hover:underline">Clear All Filters</button>
            )}
          </div>
        )}
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-3">{results.length} restaurant{results.length !== 1 ? 's' : ''} found</p>
          {results.length === 0 ? (
            <EmptyState icon={Search} title="No results found" description="Try adjusting your search or filters to find more options" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.map(r => (
                <RestaurantCard key={r.id} restaurant={r} variant="list" onClick={() => onRestaurantClick(r.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
