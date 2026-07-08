import { useEffect, useState } from 'react'
import { UtensilsCrossed, QrCode, Table, ArrowRight } from 'lucide-react'
import { RESTAURANTS } from '../../home/data/restaurants'
import { Button } from '../../../shared/components/Button'

interface Props {
  restaurantId?: string
  tableNumber?: string
  onRedirect: () => void
  onError: () => void
}

export default function QRMenuAccessPage({ restaurantId = 'r1', tableNumber = 'T3', onRedirect, onError }: Props) {
  const [countdown, setCountdown] = useState(3)
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId)

  useEffect(() => {
    if (!restaurant || restaurant.suspended) {
      const t = setTimeout(onError, 1000)
      return () => clearTimeout(t)
    }
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onRedirect()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [restaurant, onRedirect, onError])

  if (!restaurant || restaurant.suspended) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center mx-auto mb-6">
            <QrCode size={36} className="text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Restaurant Unavailable</h1>
          <p className="text-muted-foreground text-sm mb-8">
            This restaurant is currently unavailable. Please scan a different QR code or browse other restaurants.
          </p>
          <Button onClick={onError}>Browse Restaurants</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto border-2 border-border shadow-lg">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-1 -right-1 sm:right-[calc(50%-70px)] px-2 py-1 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center gap-1">
            <Table size={10} /> {tableNumber}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{restaurant.name}</h1>
        <p className="text-muted-foreground text-sm mb-2">
          {restaurant.cuisine.join(' \u00B7 ')}
        </p>
        <p className="text-xs text-muted-foreground mb-8">
          Table {tableNumber} &middot; Auto-redirecting in {countdown}s...
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        <Button onClick={onRedirect} className="w-full">
          View Menu <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}
