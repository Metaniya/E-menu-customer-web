import { useState } from 'react'
import {
  ClipboardList, X, RotateCcw, ChevronRight, Clock, Package,
} from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { cn } from '../../../shared/utils/cn'
import { formatDate, formatRelativeTime } from '../../../shared/utils/formatDate'
import { formatCurrency } from '../../../shared/utils/formatCurrency'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { EmptyState } from '../../../shared/components/EmptyState'
import type { Order } from '../../../shared/types'

interface Props {
  onOrderClick: (order: Order) => void
  onReorder?: (order: Order) => void
  onBack?: () => void
  onNavigate?: (tab: string) => void
}

type FilterStatus = 'all' | 'completed' | 'cancelled'

const FILTERS: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]

const STATUS_META: Record<string, { label: string; dot: string }> = {
  received: { label: 'Received', dot: 'bg-amber-400' },
  preparing: { label: 'Preparing', dot: 'bg-blue-400' },
  ready: { label: 'Ready', dot: 'bg-emerald-400' },
  completed: { label: 'Completed', dot: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400' },
}

export default function OrderHistoryPage({ onOrderClick, onReorder = () => {}, onBack }: Props) {
  const { orders } = useApp()
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = orders
    .filter(o => filter === 'all' || o.status === filter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const statusDot = (status: string) => STATUS_META[status]?.dot || 'bg-muted-foreground'
  const statusLabel = (status: string) => STATUS_META[status]?.label || status

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 to-primary/70 px-5 py-5 lg:py-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Package size={16} className="text-primary-foreground/80" />
            <span className="text-xs font-medium text-primary-foreground/80 uppercase tracking-wider">Orders</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-primary-foreground">
            {orders.length > 0
              ? `You've placed ${orders.length} order${orders.length !== 1 ? 's' : ''}`
              : 'No orders yet'}
          </h1>
          <p className="text-sm text-primary-foreground/70 mt-0.5">
            {orders.length > 0 ? 'Track, reorder, or review your past orders' : 'Your orders will appear here'}
          </p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/10 select-none pointer-events-none">
          <ClipboardList size={80} />
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              filter === f.key
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
        {filter !== 'all' && (
          <button onClick={() => setFilter('all')} className="shrink-0 text-xs text-muted-foreground hover:text-foreground px-2 font-medium transition-colors">Clear</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={orders.length === 0 ? 'No orders yet' : 'No matching orders'}
          description={orders.length === 0 ? 'Place your first order to see it here.' : 'Try a different filter to find what you\'re looking for.'}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map(order => {
            const meta = STATUS_META[order.status] || { label: order.status, dot: 'bg-muted-foreground' }
            return (
              <div
                key={order.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-muted ring-1 ring-border/50">
                      <img src={order.restaurantLogo} alt={order.restaurantName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-foreground truncate">{order.restaurantName}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(order.createdAt)} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                          <span className="font-bold text-sm text-foreground">{formatCurrency(order.total)}</span>
                          <span className={cn('flex items-center gap-1.5 text-[11px] font-medium', order.status === 'cancelled' ? 'text-red-400' : 'text-emerald-500')}>
                            <span className={cn('w-1.5 h-1.5 rounded-full', statusDot(order.status))} />
                            {statusLabel(order.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-medium"
                  >
                    View Details <ChevronRight size={12} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onReorder(order) }}
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Reorder
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between px-5 py-4 rounded-t-3xl z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-muted ring-1 ring-border/50">
                  <img src={selectedOrder.restaurantLogo} alt={selectedOrder.restaurantName} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate">{selectedOrder.restaurantName}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">{selectedOrder.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted shrink-0 ml-2">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground pb-2 border-b border-border/50">
                <span className="flex items-center gap-1.5"><Clock size={13} /> {formatRelativeTime(selectedOrder.createdAt)}</span>
                <span className="text-border">|</span>
                <span>{selectedOrder.items.length} item{selectedOrder.items.length !== 1 ? 's' : ''}</span>
                <span className="text-border">|</span>
                <span className={cn('flex items-center gap-1.5 font-medium', selectedOrder.status === 'cancelled' ? 'text-red-400' : 'text-emerald-500')}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', statusDot(selectedOrder.status))} />
                  {statusLabel(selectedOrder.status)}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Order Items</h4>
                <div className="space-y-2.5">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0 ring-1 ring-border/30">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Service Fee</span>
                  <span className="text-foreground">{formatCurrency(selectedOrder.serviceFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t border-border pt-2 mt-2">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground pt-1">
                  <span>Payment</span>
                  <span className="text-foreground capitalize">{selectedOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <Button variant="outline" className="flex-1" onClick={() => { const o = selectedOrder; setSelectedOrder(null); onOrderClick(o) }}>
                  Track Order
                </Button>
                <Button className="flex-1" onClick={() => { const o = selectedOrder; setSelectedOrder(null); onReorder(o) }}>
                  <RotateCcw size={14} /> Reorder
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
