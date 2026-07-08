import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router'
import { UtensilsCrossed, Search, ShoppingCart, Bell, Menu, X, Heart, ClipboardList, User, LogIn, Compass, Tag } from 'lucide-react'
import { cn } from '../../shared/utils/cn'
import { getTabForRoute } from '../routes'

interface Props {
  activeTab: string
  onNavigate: (tab: string) => void
  cartCount: number
  isAuthenticated: boolean
  onSearchClick?: () => void
  onAuthClick?: () => void
}

const DESKTOP_LINKS = [
  { id: 'home', path: '/home', label: 'Home' },
  { id: 'discover', path: '/discover', label: 'Discover' },
  { id: 'offers', path: '/offers', label: 'Offers' },
  { id: 'orders', path: '/orders', label: 'Orders' },
]

export function Navbar({ activeTab: _activeTab, onNavigate, cartCount, isAuthenticated, onSearchClick, onAuthClick }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = getTabForRoute(location.pathname)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-primary/90 to-primary/70">
          <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 lg:h-10">
              <div className="flex items-center gap-2 text-xs text-primary-foreground/90">
                <span className="hidden sm:inline">Sign up for free to save favorites, track orders & more</span>
                <span className="sm:hidden">Create an account for the best experience</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/auth')} className="text-xs font-semibold text-primary-foreground bg-white/20 hover:bg-white/30 rounded-full px-3.5 py-1 transition-all">Sign Up</button>
                <button onClick={() => navigate('/auth')} className="text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">Log In</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <UtensilsCrossed size={16} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground hidden sm:block">E-MENU</span>
          </Link>

          <nav className="hidden md:flex items-center mx-4 flex-1 justify-center">
            {DESKTOP_LINKS.map(link => (
              <Link
                key={link.id}
                to={link.path}
                className={cn(
                  'relative px-4 py-1.5 text-sm font-medium transition-colors duration-200',
                  activeTab === link.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <button
              onClick={onSearchClick || (() => navigate('/search'))}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm w-44 lg:w-56 border border-border/50 hover:border-border"
            >
              <Search size={14} className="text-muted-foreground/60" />
              <span className="text-xs text-muted-foreground/40">Search...</span>
            </button>

            <button
              onClick={onSearchClick || (() => navigate('/search'))}
              className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search size={18} />
            </button>

            <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
            </button>

            <Link to="/cart" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] min-h-[18px] shadow-sm">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <Link
              to={isAuthenticated ? '/profile' : '/auth'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              {isAuthenticated ? <User size={16} /> : <LogIn size={16} />}
              {isAuthenticated ? 'Profile' : 'Login'}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-2 pb-3 space-y-0.5 bg-white/95 backdrop-blur-md">
            <MobileNavItem icon={UtensilsCrossed} label="Home" active={activeTab === 'home'} onClick={() => { navigate('/home'); setMobileMenuOpen(false) }} />
            <MobileNavItem icon={Compass} label="Discover" active={activeTab === 'discover'} onClick={() => { navigate('/discover'); setMobileMenuOpen(false) }} />
            <MobileNavItem icon={Tag} label="Offers" active={activeTab === 'offers'} onClick={() => { navigate('/offers'); setMobileMenuOpen(false) }} />
            <MobileNavItem icon={ClipboardList} label="Orders" active={activeTab === 'orders'} onClick={() => { navigate('/orders'); setMobileMenuOpen(false) }} />
            <MobileNavItem icon={Heart} label="Favorites" active={activeTab === 'favorites'} onClick={() => { navigate('/favorites'); setMobileMenuOpen(false) }} />
            <MobileNavItem icon={isAuthenticated ? User : LogIn} label={isAuthenticated ? 'Profile' : 'Login'} active={false} onClick={() => { navigate(isAuthenticated ? '/profile' : '/auth'); setMobileMenuOpen(false) }} />
          </div>
        )}
      </div>
    </header>
  )
}

function MobileNavItem({ icon: Icon, label, active, onClick }: { icon?: typeof User; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors',
        active ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'
      )}
    >
      {Icon && <Icon size={17} className={active ? 'text-primary' : 'text-muted-foreground'} />}
      {label}
    </button>
  )
}
