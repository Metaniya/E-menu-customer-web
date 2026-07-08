import { MapPin, Clock, Heart } from 'lucide-react'
import type { Restaurant } from '../../types'

interface Props {
  restaurant: Restaurant
  onClick: () => void
  onFavorite?: () => void
  isFavorite?: boolean
  variant?: 'featured' | 'list'
}

export function RestaurantCard({ restaurant, onClick, onFavorite, isFavorite, variant = 'list' }: Props) {
  if (variant === 'featured') {
    return (
      <div onClick={onClick} className="flex-shrink-0 w-56 snap-start cursor-pointer group">
        <div className="relative rounded-xl overflow-hidden mb-2 aspect-[4/3]">
          <img src={restaurant.cover} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-sm">{restaurant.name}</h3>
            <p className="text-white/80 text-xs">{restaurant.cuisine.join(' • ')}</p>
          </div>
          {restaurant.promoted && <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">Promoted</span>}
          {onFavorite && (
            <button onClick={(e) => { e.stopPropagation(); onFavorite() }} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
              <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1"><Clock size={12} /><span>{restaurant.deliveryTime}</span></div>
          <span>•</span>
          <div className="flex items-center gap-1"><MapPin size={12} /><span>{restaurant.distance}</span></div>
          <span>•</span>
          <span>{restaurant.priceRange}</span>
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick} className="group cursor-pointer active:scale-[0.98] transition-transform">
      <div className="relative rounded-xl overflow-hidden mb-2 aspect-[3/2] bg-muted">
        <img src={restaurant.cover} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-white/20 rounded-full px-3 py-1">Closed</span>
          </div>
        )}
        {restaurant.promoted && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">Promoted</span>
        )}
        {onFavorite && (
          <button onClick={(e) => { e.stopPropagation(); onFavorite() }} className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors">
            <Heart size={12} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'} />
          </button>
        )}
      </div>
      <div className="px-0.5">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-semibold text-[13px] text-foreground leading-tight truncate">{restaurant.name}</h3>
        </div>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5 truncate">{restaurant.cuisine.slice(0, 2).join(' • ')}</p>
        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
          <span>{restaurant.priceRange}</span>
          <span className="text-muted-foreground/20">·</span>
          <span>{restaurant.deliveryTime}</span>
          <span className="text-muted-foreground/20">·</span>
          <span>{restaurant.distance}</span>
        </div>
      </div>
    </div>
  )
}
