import { useState, useEffect } from 'react'
import {
  UtensilsCrossed, Search, Clock, Shield, ArrowRight, ChevronRight, Menu, X, Sparkles,
} from 'lucide-react'
import { cn } from '../../../shared/utils/cn'
import { RESTAURANTS } from '../../home/data/restaurants'
import { RestaurantCard } from '../../../shared/components/RestaurantCard'

interface Props {
  onNavigate: (screen: string) => void
  onSearchClick: () => void
  onRestaurantClick: (id: string) => void
}

const FEATURES = [
  { icon: Search, title: 'Browse Menus', desc: 'Explore digital menus with photos, prices, and dietary info before you order.' },
  { icon: Clock, title: 'Easy Ordering', desc: 'Order directly from your table or for pickup in just a few taps.' },
  { icon: Shield, title: 'Real-time Tracking', desc: 'Track your order status live from the kitchen to your table.' },
  { icon: Sparkles, title: 'Exclusive Offers', desc: 'Get access to special deals and promotions from your favorite spots.' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Find a Restaurant', desc: 'Browse our curated selection or scan the QR code at your table.' },
  { step: '02', title: 'Browse the Menu', desc: 'Explore the full menu with photos, prices, and customization options.' },
  { step: '03', title: 'Place Your Order', desc: 'Add items to your cart, customize, and place your order instantly.' },
  { step: '04', title: 'Enjoy Your Meal', desc: 'Track your order in real-time and enjoy a seamless dining experience.' },
]

export default function PublicLandingPage({ onNavigate, onSearchClick, onRestaurantClick }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featured = RESTAURANTS.filter(r => r.promoted).slice(0, 6)

  return (
    <div className="min-h-screen bg-background">

      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
      )}>
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <UtensilsCrossed size={16} className="text-primary-foreground lg:hidden" />
                <UtensilsCrossed size={20} className="text-primary-foreground hidden lg:block" />
              </div>
              <span className="text-lg lg:text-xl font-bold tracking-tight text-foreground">E-MENU</span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: 'Discover', action: () => onNavigate('discover') },
                { label: 'How It Works', action: () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Offers', action: () => onNavigate('promotions') },
              ].map(link => (
                <button key={link.label} onClick={link.action}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">{link.label}</button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={onSearchClick} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors text-sm w-48 lg:w-64 border border-border/50">
                <Search size={15} /><span className="text-xs text-muted-foreground/60">Search restaurants...</span>
              </button>
              <button onClick={() => onNavigate('auth')} className="hidden sm:inline-flex px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">Sign In</button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors">
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md px-4 py-4 space-y-1 shadow-lg">
            <MobileLink label="Discover" onClick={() => { onNavigate('discover'); setMobileMenuOpen(false) }} />
            <MobileLink label="How It Works" onClick={() => { setMobileMenuOpen(false); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
            <MobileLink label="Offers" onClick={() => { onNavigate('promotions'); setMobileMenuOpen(false) }} />
            <button onClick={() => { onNavigate('auth'); setMobileMenuOpen(false) }} className="w-full mt-3 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-sm shadow-primary/20">Sign In</button>
          </div>
        )}
      </header>

      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-primary/30 hidden lg:block" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-primary/20 hidden lg:block" />
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 lg:py-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6 shadow-sm">
                <Sparkles size={12} /> Dine & Discover with E-MENU
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-5">
                Browse Menus,<br />
                <span className="text-primary">Order Easy</span><br />
                Dine Happy
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Discover the best restaurants around you, browse digital menus, and order directly from your table. No app download needed.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <button onClick={() => onNavigate('discover')} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98]">
                  Find Restaurants <ArrowRight size={16} />
                </button>
                <button onClick={() => onNavigate('auth')} className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:bg-muted/30 transition-all active:scale-[0.98]">Create Account</button>
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-background flex items-center justify-center text-[10px] font-semibold text-primary shadow-sm">U{i}</div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground"><span className="text-foreground font-bold">500+</span> happy customers</p>
                <span className="w-px h-6 bg-border" />
                <p className="text-sm text-muted-foreground"><span className="text-foreground font-bold">26+</span> restaurants</p>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl bg-card border border-border/50 overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                    alt="Restaurant dining experience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      <UtensilsCrossed size={12} /> Order from your table
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/20">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Why E-MENU</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">Built for Modern Dining</h2>
            <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mx-auto">We make dining out simpler, faster, and more enjoyable for everyone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="group bg-card border border-border rounded-2xl p-6 lg:p-7 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                  <f.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mx-auto">Getting started is easy. Just follow these simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="relative text-center lg:text-left">
                <div className="hidden lg:block absolute top-0 -left-3 text-7xl font-bold text-primary/5 select-none -z-10">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-sm">
                  <span className="text-lg font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto lg:mx-0">{item.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <ChevronRight size={20} className="hidden lg:block absolute -right-7 top-7 text-muted-foreground/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/20">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Featured</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">Popular Restaurants</h2>
            </div>
            <button onClick={() => onNavigate('discover')} className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              View All <ArrowRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(r => (
              <RestaurantCard key={r.id} restaurant={r} variant="featured" onClick={() => onRestaurantClick(r.id)} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <button onClick={() => onNavigate('discover')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
              View All Restaurants <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-foreground text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3 block">Get Started</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Ready to Get Started?</h2>
          <p className="text-white/60 text-sm lg:text-base max-w-xl mx-auto mb-8">Join hundreds of customers who enjoy dining with E-MENU. No app download required.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button onClick={() => onNavigate('auth')} className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98]">
              Create Free Account <ArrowRight size={16} />
            </button>
            <button onClick={() => onNavigate('discover')} className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all active:scale-[0.98]">
              Browse as Guest
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-10">
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <UtensilsCrossed size={13} className="text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">E-MENU</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Terms</button>
              <span className="text-muted-foreground/30">·</span>
              <button className="hover:text-foreground transition-colors">Privacy</button>
              <span className="text-muted-foreground/30">·</span>
              <span>&copy; 2026 E-MENU Ethiopia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function MobileLink({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick} className="w-full px-4 py-3 rounded-lg text-sm text-foreground hover:bg-muted transition-colors text-left">{label}</button>
}
