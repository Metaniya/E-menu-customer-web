import { CircleCheck, ArrowRight, Home, Receipt } from 'lucide-react'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { formatDate, formatTime } from '../../../shared/utils/formatDate'
import type { Order } from '../../../shared/types'

interface OrderConfirmationPageProps {
  order?: Order
  onTrackOrder?: () => void
  onViewOrder?: () => void
  onViewReceipt?: () => void
  onHome?: () => void
  onBackToHome?: () => void
}

const defaultOrder: Order = {
  id: 'EM-10001', restaurantId: 'r1', restaurantName: 'Restaurant',
  restaurantLogo: '', items: [], subtotal: 0, serviceFee: 0, total: 0,
  status: 'confirmed', paymentMethod: 'cash', createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(), estimatedTime: 15,
}

export default function OrderConfirmationPage({
  order = defaultOrder,
  onViewOrder,
  onViewReceipt,
  onBackToHome,
}: OrderConfirmationPageProps) {
  const onTrackOrder = onViewOrder || (() => {})
  const onHome = onBackToHome || (() => {})
  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-10">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center animate-[scale-in_0.4s_ease-out]">
            <CircleCheck size={36} className="text-emerald-400" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10 animate-ping" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
          Order Placed!
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Your order has been received by the restaurant. We'll notify you when it's ready.
        </p>

        <Card className="w-full mb-8 text-left">
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Order ID</span>
              <span className="text-foreground text-sm font-semibold">{order.id}</span>
            </div>
            <div className="border-t border-border/50" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Restaurant</span>
              <span className="text-foreground text-sm font-medium">{order.restaurantName}</span>
            </div>
            {order.tableNumber && (
              <>
                <div className="border-t border-border/50" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Table</span>
                  <span className="text-foreground text-sm font-medium">Table {order.tableNumber}</span>
                </div>
              </>
            )}
            <div className="border-t border-border/50" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Date</span>
              <span className="text-foreground text-sm font-medium">
                {formatDate(order.createdAt)} &middot; {formatTime(order.createdAt)}
              </span>
            </div>
            <div className="border-t border-border/50" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Est. Time</span>
              <span className="text-foreground text-sm font-semibold">{order.estimatedTime} min</span>
            </div>
          </div>
        </Card>

        <div className="w-full space-y-3">
          <Button fullWidth onClick={onTrackOrder}>
            Track Order <ArrowRight size={18} />
          </Button>

          {onViewReceipt && (
            <Button variant="outline" fullWidth onClick={onViewReceipt}>
              <Receipt size={16} /> View Receipt
            </Button>
          )}

          <Button variant="ghost" fullWidth onClick={onHome}>
            <Home size={16} /> Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
