import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { RESTAURANTS } from '../../home/data/restaurants'
import { CartItemRow } from '../../../shared/components/CartItemRow'
import { EmptyState } from '../../../shared/components/EmptyState'
import { Button } from '../../../shared/components/Button'
import { Card, CardContent } from '../../../shared/components/Card'
import { formatCurrency } from '../../../shared/utils/formatCurrency'

interface Props {
  onCheckout: () => void
  onContinueShopping?: () => void
  onBack?: () => void
  onNavigate?: (tab: string) => void
  onUpdateQty?: (itemId: string, delta: number) => void
  onRemove?: (itemId: string) => void
}

export default function CartPage({ onCheckout, onContinueShopping, onBack }: Props) {
  const continueShopping = onContinueShopping || onBack || (() => {})
  const {
    cart, getCartTotal, removeFromCart, updateCartItemQty,
    updateSpecialInstructions, activeRestaurantId, getCartCount, language,
  } = useApp()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const restaurant = RESTAURANTS.find(r => r.id === activeRestaurantId)
  const cartCount = getCartCount()
  const { subtotal, serviceFee, total } = getCartTotal()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14 max-w-[var(--container-max)] mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-secondary/50 transition-colors">
              <ChevronLeft size={22} />
            </button>
            <div>
              <h1 className="font-bold text-sm leading-tight">Your Cart</h1>
              <p className="text-[11px] text-muted-foreground">
                {restaurant?.name || ''}{cartCount > 0 ? ` \u00B7 ${cartCount} item${cartCount !== 1 ? 's' : ''}` : ''}
              </p>
            </div>
          </div>
          <ShoppingCart size={18} className="text-muted-foreground" />
        </div>
      </header>

      {cart.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Looks like you haven't added any items yet. Browse the menu to get started."
          action={<Button onClick={continueShopping}>Continue Shopping</Button>}
          className="flex-1"
        />
      ) : (
        <div className="flex-1 max-w-[var(--container-max)] mx-auto w-full px-4 py-6">
          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-6">
            <div className="space-y-3">
              <Card>
                <CardContent className="p-0 divide-y divide-border">
                  {cart.map(item => (
                    <div key={`${item.id}-${JSON.stringify(item.selectedCustomizations)}`} className="px-4">
                      <CartItemRow
                        item={item}
                        onUpdateQty={(itemId, delta) => updateCartItemQty(itemId, delta)}
                        onRemove={(itemId) => removeFromCart(itemId)}
                        language={language}
                      />
                      <div className="pb-3">
                        <button
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.specialInstructions ? '✏️ Edit special instructions' : '+ Add special instructions'}
                        </button>
                        {expandedItem === item.id && (
                          <textarea
                            value={item.specialInstructions || ''}
                            onChange={e => updateSpecialInstructions(item.id, e.target.value)}
                            placeholder="e.g., No onions, extra sauce..."
                            className="w-full mt-2 px-3 py-2 rounded-xl bg-secondary text-sm text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                            rows={2}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <button onClick={continueShopping} className="text-sm text-primary hover:underline font-medium">
                Continue Shopping
              </button>
            </div>

            <div className="lg:sticky lg:top-24 space-y-4 mt-6 lg:mt-0">
              <Card>
                <CardContent className="space-y-3">
                  <h3 className="font-semibold text-sm text-foreground">Order Summary</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee (5%)</span>
                    <span className="font-medium">{formatCurrency(serviceFee)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="font-bold text-base">Total</span>
                    <span className="font-bold text-base text-primary">{formatCurrency(total)}</span>
                  </div>
                  <Button fullWidth size="lg" onClick={onCheckout} className="mt-2">
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
