import { useState } from 'react'
import { ChevronLeft, ChevronDown, ChevronUp, CreditCard, Banknote, Check } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { Card, CardContent } from '../../../shared/components/Card'
import { Button } from '../../../shared/components/Button'
import { cn } from '../../../shared/utils/cn'
import { formatCurrency } from '../../../shared/utils/formatCurrency'

interface Props {
  onSubmit?: (paymentMethod: string) => void
  onPlaceOrder?: (paymentMethod: string) => void
  onBack: () => void
}

export default function CheckoutPage({ onPlaceOrder = () => {}, onBack }: Props) {
  const { cart, getCartTotal, activeTableNumber } = useApp()
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(false)

  const { subtotal, serviceFee, total } = getCartTotal()

  function handleSubmit() {
    if (!termsAccepted) return
    setLoading(true)
    setTimeout(() => {
      onPlaceOrder(paymentMethod)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14 max-w-[var(--container-max)] mx-auto">
          <button onClick={onBack} className="p-1.5 -ml-1.5 rounded-full hover:bg-secondary/50 transition-colors">
            <ChevronLeft size={22} />
          </button>
          <h1 className="font-bold text-base">Checkout</h1>
        </div>
      </header>

      <div className="flex-1 max-w-[var(--container-max)] mx-auto w-full px-4 py-6">
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-6">
          <div className="space-y-4">
            <Card>
              <CardContent>
                <h2 className="font-semibold text-sm mb-2">Dining Option</h2>
                <div className="flex items-center gap-3 bg-secondary/50 rounded-xl px-3.5 py-3 border border-border">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">T</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dine-in</p>
                    <p className="text-xs text-muted-foreground">Table {activeTableNumber || '—'} · {cart.length} item{cart.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="font-semibold text-sm mb-3">Payment Method</h2>
                <div className="space-y-2">
                  <button onClick={() => setPaymentMethod('cash')}
                    className={cn('w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-sm transition-all',
                      paymentMethod === 'cash' ? 'border-primary/30 bg-primary/10 text-foreground' : 'border-border bg-secondary/30 text-muted-foreground')}>
                    <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      paymentMethod === 'cash' ? 'border-primary' : 'border-muted-foreground/40')}>
                      {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <Banknote size={18} className="text-green-400" />
                    <span>Cash</span>
                  </button>
                  <button disabled
                    className={cn('w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-sm transition-all opacity-50 cursor-not-allowed',
                      paymentMethod === 'card' ? 'border-primary/30 bg-primary/10 text-foreground' : 'border-border bg-secondary/30 text-muted-foreground')}>
                    <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      paymentMethod === 'card' ? 'border-primary' : 'border-muted-foreground/40')}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <CreditCard size={18} className="text-amber-400" />
                    <div className="flex-1 text-left">
                      <span>Card Payment</span>
                      <span className="block text-[11px] text-muted-foreground">Coming soon</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium">Soon</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:hidden">
              <button onClick={() => setShowSummary(!showSummary)} className="w-full flex items-center justify-between px-4 py-3.5">
                <h2 className="font-semibold text-sm">Order Summary</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
                  {showSummary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {showSummary && (
                <CardContent className="pt-0 space-y-2.5 border-t border-border">
                  {cart.map(item => (
                    <div key={`${item.id}-${JSON.stringify(item.selectedCustomizations)}`} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted/20">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            <Card>
              <CardContent className="space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span className="font-medium">{formatCurrency(serviceFee)}</span>
                </div>
                <div className="border-t border-border pt-2.5 flex items-center justify-between">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-base text-primary">{formatCurrency(total)}</span>
                </div>
              </CardContent>
            </Card>

            <label className="flex items-start gap-2.5 cursor-pointer group">
              <button onClick={() => setTermsAccepted(!termsAccepted)}
                className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                  termsAccepted ? 'bg-primary border-primary' : 'border-muted-foreground/40 group-hover:border-muted-foreground/60')}>
                {termsAccepted && <Check size={12} className="text-white" />}
              </button>
              <span className="text-xs text-muted-foreground leading-relaxed">
                I confirm that all order details are correct and agree to the restaurant's terms and policies.
              </span>
            </label>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardContent>
                  <h2 className="font-semibold text-sm mb-3">Order Summary</h2>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={`${item.id}-${JSON.stringify(item.selectedCustomizations)}`} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted/20">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button fullWidth size="lg" onClick={handleSubmit} disabled={!termsAccepted} loading={loading}>
                {loading ? 'Placing Order...' : `Place Order · ${formatCurrency(total)}`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent lg:hidden">
        <Button fullWidth size="lg" onClick={handleSubmit} disabled={!termsAccepted} loading={loading}>
          {loading ? 'Placing Order...' : `Place Order · ${formatCurrency(total)}`}
        </Button>
      </div>
    </div>
  )
}
