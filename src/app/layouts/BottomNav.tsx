import { useLocation, Link } from 'react-router'
import { Home, QrCode, ClipboardList, Heart, User } from 'lucide-react'
import { getTabForRoute } from '../routes'

const NAV_ITEMS = [
  { id: 'home', path: '/home', label: 'Home', icon: Home },
  { id: 'discover', path: '/discover', label: 'Discover', icon: QrCode },
  { id: 'orders', path: '/orders', label: 'Orders', icon: ClipboardList },
  { id: 'favorites', path: '/favorites', label: 'Favorites', icon: Heart },
  { id: 'profile', path: '/profile', label: 'Profile', icon: User },
]

interface Props {
  active?: string
  onNavigate?: (id: string) => void
  cartCount?: number
}

export function BottomNav({ active: _active, onNavigate: _onNavigate, cartCount }: Props) {
  const location = useLocation()
  const active = getTabForRoute(location.pathname)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[52px] h-full transition-colors ${
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.id === 'orders' && cartCount && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-foreground text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-0.5">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
