import { useState, useMemo } from 'react'
import { ChevronLeft, Search, ShoppingCart, Plus, Flame, Leaf, Camera, X } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { MENU_ITEMS, MENU_CATEGORIES } from '../../home/data/menuItems'
import { RESTAURANTS } from '../../home/data/restaurants'
import { Card, CardContent } from '../../../shared/components/Card'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { cn } from '../../../shared/utils/cn'
import { formatCurrency } from '../../../shared/utils/formatCurrency'
import type { MenuItem } from '../../../shared/types'

interface Props {
  onItemClick: (itemId: string) => void
  onBack: () => void
  onCartClick: () => void
  onNavigate?: (tab: string) => void
}

export default function MenuBrowsePage({ onItemClick, onBack, onCartClick }: Props) {
  const { getCartCount, language, cart, getCartTotal } = useApp()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const restaurantId = RESTAURANTS[0]?.id
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId)
  const cartCount = getCartCount()
  const { total } = getCartTotal()

  const items = MENU_ITEMS.filter(item => item.restaurantId === restaurantId && item.available !== false)

  const filteredItems = useMemo(() => items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nameAm && item.nameAm.includes(searchQuery))
    return matchesCategory && matchesSearch
  }), [items, activeCategory, searchQuery])

  function getDietaryTags(item: MenuItem) {
    const tags: { label: string; variant: 'success' | 'warning' | 'default' }[] = []
    if (item.tags.includes('Vegetarian')) tags.push({ label: 'Veg', variant: 'success' })
    if (item.tags.includes('Vegan')) tags.push({ label: 'Vegan', variant: 'success' })
    if (item.tags.includes('Halal')) tags.push({ label: 'Halal', variant: 'warning' })
    return tags
  }

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: items.length }
    MENU_CATEGORIES.filter(c => c !== 'All').forEach(cat => {
      counts[cat] = items.filter(i => i.category === cat).length
    })
    return counts
  }, [items])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 max-w-[var(--container-max)] mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-secondary/50 transition-colors">
              <ChevronLeft size={22} />
            </button>
            <div>
              <h1 className="font-bold text-sm leading-tight">{restaurant?.name || 'Menu'}</h1>
              <p className="text-[11px] text-muted-foreground">{items.length} items</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSearch(!showSearch)} className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
              <Search size={18} />
            </button>
            <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] min-h-[18px]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {showSearch && (
          <div className="px-4 pb-3 max-w-[var(--container-max)] mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-secondary text-sm text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 flex">
        <aside className="hidden lg:block w-[250px] shrink-0 border-r border-border bg-muted/20 p-4 space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Categories</h3>
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <span>{cat}</span>
              <span className={cn('text-xs', activeCategory === cat ? 'text-primary-foreground/70' : 'text-muted-foreground/60')}>
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </aside>

        <div className="flex-1 min-w-0">
          <div className="sticky top-14 z-20 bg-background/95 backdrop-blur-md border-b border-border lg:hidden">
            <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
              {MENU_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary text-muted-foreground hover:text-foreground',
                  )}
                >
                  {cat}
                  <span className={cn('ml-1.5 text-[11px]', activeCategory === cat ? 'text-primary-foreground/70' : 'text-muted-foreground/60')}>
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 pb-24 lg:pb-4">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Camera size={40} className="text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No items found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredItems.map(item => {
                  const dietaryTags = getDietaryTags(item)
                  return (
                    <Card
                      key={item.id}
                      className="overflow-hidden cursor-pointer active:scale-[0.98] transition-transform hover:shadow-md"
                      onClick={() => onItemClick(item.id)}
                    >
                      <div className="relative aspect-[4/3] bg-muted/20">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                        {item.popular && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="warning"><Flame size={10} className="mr-0.5" />Popular</Badge>
                          </div>
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); onItemClick(item.id) }}
                          className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <CardContent className="space-y-1.5 p-3">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-1">{item.name}</h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-primary">{formatCurrency(item.price)}</span>
                          <div className="flex gap-1">
                            {dietaryTags.map(tag => (
                              <Badge key={tag.label} variant={tag.variant}>{tag.label}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {cartCount > 0 && (
          <aside className="hidden lg:block w-[300px] shrink-0 border-l border-border bg-card p-4">
            <div className="sticky top-20 space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Cart Summary</h3>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={`${item.id}-${JSON.stringify(item.selectedCustomizations)}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-sm font-bold text-primary">{formatCurrency(total)}</span>
              </div>
              <Button fullWidth size="sm" onClick={onCartClick}>
                View Cart ({cartCount})
              </Button>
            </div>
          </aside>
        )}
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent lg:hidden">
          <button
            onClick={onCartClick}
            className="w-full flex items-center justify-between bg-primary text-primary-foreground rounded-2xl px-5 py-3.5 shadow-xl active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={20} />
              <span className="font-semibold text-sm">View Cart ({cartCount})</span>
            </div>
            <span className="font-bold text-sm">{formatCurrency(total)}</span>
          </button>
        </div>
      )}
    </div>
  )
}
