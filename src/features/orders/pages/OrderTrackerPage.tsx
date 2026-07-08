import { useState } from 'react'
import {
  ChevronLeft, CircleCheck, Circle, Loader2,
  Package, ChefHat, Bell, Utensils,
  ChevronDown, ChevronUp, AlertTriangle, X, Clock,
} from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { cn } from '../../../shared/utils/cn'
import { formatTime } from '../../../shared/utils/formatDate'
import { Button } from '../../../shared/components/Button'
import { Badge } from '../../../shared/components/Badge'
import { Card } from '../../../shared/components/Card'
import { formatCurrency } from '../../../shared/utils/formatCurrency'

interface OrderTrackerPageProps {
  orderId?: string
  onBack: () => void
}

const STEP_CONFIG = [
  { label: 'Received', icon: Package },
  { label: 'Preparing', icon: ChefHat },
  { label: 'Ready', icon: Bell },
  { label: 'Completed', icon: Utensils },
]

export default function OrderTrackerPage({ orderId, onBack }: OrderTrackerPageProps) {
  const { orders } = useApp()
  const [showItems, setShowItems] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const order = (orders.find(o => o.id === orderId)) || orders[0]

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 border border-border">
          <AlertTriangle size={24} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Fraunces', serif" }}>Order Not Found</h2>
        <p className="text-muted-foreground text-sm mb-6">This order doesn't exist or has been removed.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    )
  }

  const statusOrder: Record<string, number> = {
    received: 0, preparing: 1, ready: 2, completed: 3, cancelled: -1,
  }

  const currentStep = statusOrder[order.status] ?? 0
  const isCancelled = order.status === 'cancelled'
  const canCancel = order.status === 'received'

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4 max-w-[var(--container-max)] mx-auto">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 text-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{order.id}</p>
            <h2 className="font-semibold text-foreground text-sm leading-tight">{order.restaurantName}</h2>
          </div>
          <div className="w-9" />
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8">
          <div>
            {isCancelled ? (
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <X size={28} className="text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                  Order Cancelled
                </h1>
                <p className="text-muted-foreground text-sm">This order has been cancelled.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-1">Live Status</p>
                  <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                    {currentStep >= 3 ? 'Completed' : 'In Progress...'}
                  </h1>
                  {currentStep < 3 && (
                    <p className="text-muted-foreground text-xs mt-1 flex items-center justify-center gap-1.5">
                      <Clock size={12} /> Estimated {order.estimatedTime} min
                    </p>
                  )}
                </div>

                {/* Desktop horizontal stepper */}
                <div className="hidden lg:block mb-12">
                  <div className="relative">
                    <div className="absolute top-1/2 left-[calc(12.5%)] right-[calc(12.5%)] h-0.5 bg-border -translate-y-1/2" />
                    <div
                      className="absolute top-1/2 left-[calc(12.5%)] h-0.5 bg-primary -translate-y-1/2 transition-all duration-700 ease-out rounded-r-full"
                      style={{ width: `${(currentStep / 3) * 75}%` }}
                    />
                    <div className="relative flex justify-between">
                      {STEP_CONFIG.map((step, i) => {
                        const done = i < currentStep
                        const active = i === currentStep
                        return (
                          <div key={step.label} className="flex flex-col items-center gap-3 w-24">
                            <div className={cn(
                              'relative z-10 w-14 h-14 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500',
                              done && 'bg-primary border-primary text-white shadow-lg shadow-primary/30',
                              active && 'bg-primary/15 border-primary text-primary shadow-lg shadow-primary/10',
                              !done && !active && 'bg-card border-border text-muted-foreground',
                            )}>
                              {done ? <CircleCheck size={24} /> : active ? <Loader2 size={20} className="animate-spin" /> : <Circle size={20} />}
                            </div>
                            <div className="text-center">
                              <p className={cn('text-sm font-semibold', (done || active) ? 'text-foreground' : 'text-muted-foreground/60')}>
                                {step.label}
                              </p>
                              {active && (
                                <p className="text-[10px] text-muted-foreground mt-0.5 animate-pulse">
                                  {i === 0 && 'In queue'}
                                  {i === 1 && 'Cooking...'}
                                  {i === 2 && 'Almost done'}
                                  {i === 3 && 'Enjoy!'}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile vertical timeline */}
                <div className="lg:hidden relative mb-12">
                  <div className="absolute top-6 left-6 bottom-6 w-0.5 bg-border" />
                  <div className="absolute top-6 left-6 w-0.5 bg-primary transition-all duration-700 ease-out" style={{ height: `${(currentStep / 3) * 100}%` }} />
                  <div className="relative space-y-8">
                    {STEP_CONFIG.map((step, i) => {
                      const done = i < currentStep
                      const active = i === currentStep
                      return (
                        <div key={step.label} className="flex items-start gap-4">
                          <div className={cn(
                            'relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500',
                            done && 'bg-primary border-primary text-white',
                            active && 'bg-primary/15 border-primary text-primary',
                            !done && !active && 'bg-card border-border text-muted-foreground',
                          )}>
                            {done ? <CircleCheck size={20} /> : active ? <Loader2 size={18} className="animate-spin" /> : <Circle size={18} />}
                          </div>
                          <div className="pt-2.5">
                            <p className={cn('text-sm font-semibold', (done || active) ? 'text-foreground' : 'text-muted-foreground/60')}>
                              {step.label}
                            </p>
                            {active && (
                              <p className="text-xs text-muted-foreground mt-0.5 animate-pulse">
                                {i === 0 && 'The kitchen has your order'}
                                {i === 1 && 'Chef is cooking your dishes'}
                                {i === 2 && 'Your food is ready!'}
                                {i === 3 && 'Enjoy your meal!'}
                              </p>
                            )}
                            {done && <p className="text-xs text-muted-foreground/50 mt-0.5">{formatTime(order.updatedAt)}</p>}
                            {active && i === 0 && <p className="text-xs text-muted-foreground/50 mt-0.5">{formatTime(order.createdAt)}</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <Card className="overflow-hidden">
              <button onClick={() => setShowItems(!showItems)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium text-sm text-foreground">Order Items ({order.items.length})</span>
                {showItems ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
              </button>
              {showItems && (
                <div className="px-4 pb-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-foreground">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 space-y-1.5">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service Fee</span><span>{formatCurrency(order.serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-foreground border-t border-border pt-1.5">
                      <span>Total</span><span className="text-foreground font-semibold">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Payment</span>
                <Badge variant="outline">{order.paymentMethod}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'danger' : 'default'}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </Card>

            {canCancel && (
              <Button variant="danger" fullWidth onClick={() => setShowCancelConfirm(true)}>
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)} />
          <div className="relative w-full max-w-sm bg-card border border-border rounded-3xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Cancel Order?</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowCancelConfirm(false)}>Keep Order</Button>
              <Button variant="danger" className="flex-1" onClick={() => setShowCancelConfirm(false)}>Yes, Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
