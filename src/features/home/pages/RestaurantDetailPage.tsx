import { useState } from 'react'
import { ChevronLeft, Heart, Share2, Clock, MapPin, Phone, ArrowRight, Star } from 'lucide-react'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../../../app/providers/AppProvider'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'

interface Props {
  onMenuClick?: () => void
  onReviewClick?: () => void
  onBack: () => void
  onNavigate?: (tab: string) => void
  onFavoriteToggle?: () => void
}

export default function RestaurantDetailPage({ onMenuClick, onReviewClick, onBack }: Props) {
  const { favorites, addFavorite, removeFavorite, activeRestaurantId } = useApp()
  const restaurantId = activeRestaurantId || RESTAURANTS[0]?.id
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    )
  }

  const isFav = favorites.includes(restaurantId)
  const allImages = restaurant.images?.length ? restaurant.images : [restaurant.cover]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative h-64 sm:h-80 lg:h-[500px] bg-muted overflow-hidden">
        <img src={allImages[currentImageIndex]} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <button onClick={onBack} className="absolute top-5 left-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="absolute top-5 right-4 flex items-center gap-2">
          <button className="p-2.5 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors">
            <Share2 size={18} />
          </button>
          <button onClick={() => isFav ? removeFavorite(restaurantId) : addFavorite(restaurantId)} className="p-2.5 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors">
            <Heart size={18} className={isFav ? 'fill-red-500 text-red-500' : 'text-white'} />
          </button>
        </div>
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, i) => (
              <button key={i} onClick={() => setCurrentImageIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`} />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[var(--container-max)] mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-24 lg:pb-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {restaurant.cuisine.map(c => (<Badge key={c}>{c}</Badge>))}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-1">{restaurant.name}</h1>
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span className="text-muted-foreground">{restaurant.priceRange}</span>
                <span className={restaurant.isOpen ? 'text-emerald-500 font-medium' : 'text-red-400 font-medium'}>
                  {restaurant.isOpen ? 'Open now' : 'Closed'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <p className="text-sm font-medium text-foreground">{restaurant.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground truncate">{restaurant.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{restaurant.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-base font-semibold text-foreground mb-2">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.description}</p>
            </div>

            {allImages.length > 1 && (
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">Photos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {(showAllPhotos ? allImages : allImages.slice(0, 6)).map((img, i) => (
                    <button key={i} className="aspect-square rounded-xl overflow-hidden bg-muted">
                      <img src={img} alt={`${restaurant.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </button>
                  ))}
                </div>
                {!showAllPhotos && allImages.length > 6 && (
                  <button onClick={() => setShowAllPhotos(true)} className="w-full mt-2 py-2 text-sm text-primary font-medium hover:underline text-center">View all {allImages.length} photos</button>
                )}
              </div>
            )}
          </div>

          <div className="hidden lg:block space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
              <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button fullWidth onClick={onMenuClick}>View Menu <ArrowRight size={16} /></Button>
                <Button variant="outline" fullWidth><MapPin size={15} /> Get Directions</Button>
                <Button variant="outline" fullWidth><Phone size={15} /> Call</Button>
                <button onClick={onReviewClick} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  <Star size={15} /> Read Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 lg:hidden">
        <button onClick={onMenuClick} className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25">
          View Menu <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
