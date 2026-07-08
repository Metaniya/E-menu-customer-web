import { useState, useEffect } from 'react'
import {
  MapPin, Search, Pizza, Beef, Soup, Coffee,
  Flame, UtensilsCrossed, ChefHat, Croissant,
} from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { RESTAURANTS } from '../data/restaurants'
import { PROMOTIONS } from '../data/promotions'
import { RestaurantCard } from '../../../shared/components/RestaurantCard'
import { SkeletonBlock } from '../../../shared/components/Loading'

interface Props {
  onRestaurantClick: (id: string) => void
  onSearchClick: () => void
}

const FILTERS = ['All', 'Fast Food', 'Ethiopian', 'Italian', 'Café', 'Chinese', 'Japanese', 'Indian']
const CATEGORIES = [
  { label: 'Pizza', icon: Pizza },
  { label: 'Burgers', icon: Beef },
  { label: 'Traditional', icon: Soup },
  { label: 'Café', icon: Coffee },
  { label: 'Fast Food', icon: Flame },
  { label: 'Ethiopian', icon: UtensilsCrossed },
  { label: 'Italian', icon: ChefHat },
  { label: 'Bakery', icon: Croissant },
]

export default function HomePage({ onRestaurantClick, onSearchClick }: Props) {
  const { location, user } = useApp()
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const greeting = user?.name ? `Hello, ${user.name.split(' ')[0]}` : 'Good evening'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const [promoIndex, setPromoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex(prev => (prev + 1) % PROMOTIONS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const featured = RESTAURANTS.filter(r => r.promoted)
  const nearby = RESTAURANTS.filter(r => r.isOpen)
  const filteredNearby = activeFilter === 'All'
    ? nearby
    : nearby.filter(r =>
        r.cuisine.some(c => c.toLowerCase().includes(activeFilter.toLowerCase())) ||
        r.cuisine.some(c => activeFilter.toLowerCase().includes(c.toLowerCase()))
      )

  return (
    <div className="space-y-4 lg:space-y-6">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-primary shrink-0" />
          <span className="text-sm font-medium text-foreground">{location?.area || 'Set Location'}</span>
          <span className="text-xs text-muted-foreground/50 mx-1">|</span>
          <span className="text-sm text-muted-foreground">{greeting}</span>
        </div>
        <button
          onClick={onSearchClick}
          className="sm:hidden flex items-center gap-1 text-xs text-muted-foreground bg-card border border-border rounded-lg px-2.5 py-1.5 hover:border-primary/40 transition-all"
        >
          <Search size={12} />
          Search
        </button>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-[120px] lg:h-[140px] group">
        <div className="relative w-full h-full flex" style={{ transform: `translateX(-${promoIndex * 100}%)`, transition: 'transform 500ms ease-in-out' }}>
          {PROMOTIONS.map(promo => (
            <div
              key={promo.id}
              onClick={() => onRestaurantClick(promo.restaurantId)}
              className="relative w-full h-full shrink-0 cursor-pointer"
            >
              <img src={promo.banner} alt={promo.restaurantName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-5 lg:px-6">
                <span className="text-xs font-semibold text-primary-foreground bg-primary/80 rounded-full px-2.5 py-0.5 w-fit mb-1.5">{promo.discount}</span>
                <p className="text-sm lg:text-base font-bold text-white leading-tight max-w-[60%]">{promo.description}</p>
                <p className="text-[11px] text-white/70 mt-1.5">at {promo.restaurantName}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {PROMOTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPromoIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === promoIndex ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeFilter === f
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <>
          <div>
            <SkeletonBlock className="h-5 w-32 mb-2.5" />
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4].map(i => (
                <SkeletonBlock key={i} className="w-44 shrink-0 aspect-[4/3] rounded-xl" />
              ))}
            </div>
          </div>
          <div>
            <SkeletonBlock className="h-5 w-28 mb-2.5" />
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonBlock key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-semibold text-foreground tracking-tight">Featured</h2>
              <span className="text-[11px] text-muted-foreground">{featured.length} spots</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
              {featured.map(r => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  variant="featured"
                  onClick={() => onRestaurantClick(r.id)}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-foreground tracking-tight mb-2.5">Categories</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {CATEGORIES.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 active:scale-95 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200">
                    <Icon size={17} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors">{label}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-semibold text-foreground tracking-tight">Near You</h2>
              <span className="text-[11px] text-muted-foreground">{filteredNearby.length} restaurants</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {filteredNearby.map(r => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  variant="list"
                  onClick={() => onRestaurantClick(r.id)}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
