import { MapPin, Clock, Heart } from 'lucide-react'
import { Restaurant } from '../../data/types'
import { useApp } from '../../context/AppContext'

interface Props {
  restaurant: Restaurant
  onClick: () => void
  variant?: 'featured' | 'list'
}

export function RestaurantCard({ restaurant, onClick, variant = 'list' }: Props) {
  const { favorites, addFavorite, removeFavorite } = useApp()
  const isFav = favorites.includes(restaurant.id)

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation()
    isFav ? removeFavorite(restaurant.id) : addFavorite(restaurant.id)
  }

  if (variant === 'featured') {
    return (
      <div
        onClick={onClick}
        className="flex-shrink-0 w-56 snap-start cursor-pointer group"
      >
        <div className="relative rounded-xl overflow-hidden mb-2 aspect-[4/3]">
          <img
            src={restaurant.cover}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-sm">{restaurant.name}</h3>
            <p className="text-white/80 text-xs">{restaurant.cuisine.join(' • ')}</p>
          </div>
          {restaurant.promoted && (
            <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-medium">
              Promoted
            </span>
          )}
          <button onClick={handleFav} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
            <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : 'text-white'} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="flex gap-3 p-3 rounded-xl bg-card hover:bg-card/80 transition-colors cursor-pointer active:scale-[0.98]"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <img src={restaurant.cover} alt={restaurant.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-semibold text-sm truncate">{restaurant.name}</h3>
          <button onClick={handleFav} className="p-0.5 flex-shrink-0">
            <Heart size={14} className={isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">{restaurant.cuisine.join(' • ')}</p>
        <div className="flex items-center gap-2 mt-1.5 text-xs">
          <span>{restaurant.priceRange}</span>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-muted-foreground" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {!restaurant.isOpen && (
            <span className="text-xs text-red-400 font-medium">Closed</span>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={10} />
            {restaurant.distance}
          </span>
        </div>
      </div>
    </div>
  )
}
