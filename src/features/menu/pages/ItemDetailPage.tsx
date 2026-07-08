import { useState, useMemo } from 'react'
import { ChevronLeft, Plus, Minus, Flame, Leaf } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { MENU_ITEMS } from '../../home/data/menuItems'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { cn } from '../../../shared/utils/cn'
import { formatCurrency } from '../../../shared/utils/formatCurrency'
import type { CartItem, CustomizationGroup } from '../../../shared/types'

interface Props {
  itemId?: string
  onBack: () => void
  onAddedToCart?: () => void
  onAddToCart?: (item: CartItem) => void
}

export default function ItemDetailPage({ itemId = MENU_ITEMS[0]?.id, onBack, onAddToCart }: Props) {
  const addedToCart = onAddToCart || (() => onBack())
  const { addToCart, language } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string[]>>({})
  const [addedAnimation, setAddedAnimation] = useState(false)

  const item = MENU_ITEMS.find(i => i.id === itemId)

  const customizationTotal = useMemo(() => {
    if (!item?.customizations) return 0
    let total = 0
    for (const group of item.customizations) {
      const selected = selectedCustomizations[group.name]
      if (selected) {
        for (const optName of selected) {
          const opt = group.options.find(o => o.name === optName)
          if (opt) total += opt.price
        }
      }
    }
    return total
  }, [item, selectedCustomizations])

  const totalPrice = item ? (item.price + customizationTotal) * quantity : 0

  if (!item) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Item not found</p>
      </div>
    )
  }

  function handleCustomizationChange(group: CustomizationGroup, optionName: string) {
    setSelectedCustomizations(prev => {
      const current = prev[group.name] || []
      if (group.type === 'single') return { ...prev, [group.name]: [optionName] }
      const exists = current.includes(optionName)
      return { ...prev, [group.name]: exists ? current.filter(n => n !== optionName) : [...current, optionName] }
    })
  }

  function handleAddToCart() {
    const cartItem: CartItem = { ...item, quantity, selectedCustomizations }
    addToCart(cartItem)
    setAddedAnimation(true)
    setTimeout(() => { setAddedAnimation(false); addedToCart() }, 600)
  }

  const displayName = language === 'am' && item.nameAm ? item.nameAm : item.name
  const displayDesc = language === 'am' && item.descriptionAm ? item.descriptionAm : item.description

  const dietaryTags: { label: string; variant: 'success' | 'warning' | 'default' }[] = []
  if (item.tags.includes('Vegetarian')) dietaryTags.push({ label: 'Vegetarian', variant: 'success' })
  if (item.tags.includes('Vegan')) dietaryTags.push({ label: 'Vegan', variant: 'success' })
  if (item.tags.includes('Halal')) dietaryTags.push({ label: 'Halal', variant: 'warning' })
  if (item.tags.includes('Gluten-Free')) dietaryTags.push({ label: 'Gluten Free', variant: 'default' })

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="relative">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-muted/20">
            <img src={item.image} alt={displayName} className="w-full h-full object-cover lg:fixed lg:inset-0 lg:w-1/2 lg:h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:hidden" />
          <button onClick={onBack} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors lg:bg-background/80 lg:text-foreground lg:backdrop-blur-md lg:border lg:border-border">
            <ChevronLeft size={20} />
          </button>
          {item.popular && (
            <div className="absolute top-4 right-4">
              <Badge variant="warning"><Flame size={11} className="mr-0.5" />Popular</Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col min-h-0 lg:overflow-y-auto lg:pb-28">
          <div className="px-4 pt-4 lg:pt-8 space-y-4">
            <div>
              <h1 className="text-xl font-bold leading-tight">{displayName}</h1>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-primary">{formatCurrency(item.price)}</span>
                <div className="flex items-center gap-1">
                  {item.spicyLevel && item.spicyLevel > 0 && (
                    <div className="flex items-center gap-0.5 mr-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Flame key={i} size={13} className={i < item.spicyLevel! ? 'text-red-400' : 'text-muted-foreground/20'} />
                      ))}
                    </div>
                  )}
                  {dietaryTags.map(tag => (
                    <Badge key={tag.label} variant={tag.variant}>{tag.label}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{displayDesc}</p>

            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                <Leaf size={13} className="text-amber-400" />
                <span>Contains: {item.allergens.join(', ')}</span>
              </div>
            )}

            {item.customizations && item.customizations.map(group => {
              const selected = selectedCustomizations[group.name] || []
              return (
                <div key={group.name}>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <h3 className="font-semibold text-sm">{group.name}</h3>
                    {group.required && <span className="text-[10px] text-primary font-medium">Required</span>}
                    {group.type === 'single' && selected.length > 0 && (
                      <span className="text-[11px] text-muted-foreground ml-auto">
                        {formatCurrency(group.options.find(o => o.name === selected[0])?.price || 0)}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {group.options.map(opt => {
                      const isSelected = group.type === 'single' ? selected[0] === opt.name : selected.includes(opt.name)
                      return (
                        <button key={opt.name} onClick={() => handleCustomizationChange(group, opt.name)}
                          className={cn('w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all',
                            isSelected ? 'bg-primary/10 border border-primary/30 text-foreground' : 'bg-secondary/50 border border-transparent text-muted-foreground hover:text-foreground')}>
                          <div className="flex items-center gap-2.5">
                            <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                              group.type === 'single' ? 'rounded-full' : 'rounded-md',
                              isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/40')}>
                              {isSelected && <div className={cn('bg-white', group.type === 'single' ? 'w-1.5 h-1.5 rounded-full' : 'w-2 h-2 rounded-[2px]')} />}
                            </div>
                            <span>{opt.name}</span>
                          </div>
                          {opt.price > 0 && <span className="text-xs text-muted-foreground">+{formatCurrency(opt.price)}</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 py-3 pb-6 lg:pl-[calc(50%+1rem)] lg:pb-3">
        <div className="flex items-center gap-4 max-w-[var(--container-max)] mx-auto">
          <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-1.5">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 rounded-full hover:bg-secondary/80 transition-colors">
              <Minus size={16} />
            </button>
            <span className="w-7 text-center font-semibold text-sm">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="p-1 rounded-full hover:bg-secondary/80 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <Button fullWidth size="lg" onClick={handleAddToCart} className={cn(addedAnimation && 'scale-[0.98] opacity-80')}>
            {addedAnimation ? 'Added!' : `Add to Cart · ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </div>
    </div>
  )
}
