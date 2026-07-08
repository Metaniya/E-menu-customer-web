import { useState } from 'react'
import { Bell, ShoppingBag, Megaphone } from 'lucide-react'
import { Button } from '../../../shared/components/Button'

interface NotificationPrefs {
  orderUpdates: boolean
  promotions: boolean
}

interface Props {
  onGrant: () => void
  onDeny: () => void
  onEnable?: (prefs: NotificationPrefs) => void
  onSkip?: () => void
}

export default function NotificationPermissionPage({ onGrant, onDeny }: Props) {
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    orderUpdates: true,
    promotions: false,
  })

  const toggle = (key: keyof NotificationPrefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-8">
        <Bell size={40} className="text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-foreground text-center mb-3">
        Stay in the loop
      </h1>
      <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8 max-w-xs">
        Get notified when your order status changes, and discover new
        restaurants and exclusive offers.
      </p>

      <div className="w-full max-w-sm space-y-4 mb-8">
        <label className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 cursor-pointer hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Order Updates</p>
              <p className="text-xs text-muted-foreground">Status changes and timing</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={prefs.orderUpdates}
            onChange={() => toggle('orderUpdates')}
            className="w-5 h-5 rounded-md border-border bg-card checked:bg-primary checked:border-primary transition-colors"
          />
        </label>

        <label className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 cursor-pointer hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <Megaphone size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Promotions</p>
              <p className="text-xs text-muted-foreground">Offers and new restaurants</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={prefs.promotions}
            onChange={() => toggle('promotions')}
            className="w-5 h-5 rounded-md border-border bg-card checked:bg-primary checked:border-primary transition-colors"
          />
        </label>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Button fullWidth size="lg" onClick={onGrant}>
          Enable Notifications
        </Button>
        <Button fullWidth size="lg" variant="outline" onClick={onDeny}>
          Not Now
        </Button>
      </div>
    </div>
  )
}
