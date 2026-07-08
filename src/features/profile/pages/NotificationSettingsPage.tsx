import { useState } from 'react'
import { ChevronLeft, Bell, Tag, Store, Smartphone, Send, Lock, Info } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { cn } from '../../../shared/utils/cn'
import { Button } from '../../../shared/components/Button'

interface NotificationSettingsPageProps {
  onSave?: (prefs: { orderUpdates: boolean; promotions: boolean; newRestaurants: boolean; appUpdates: boolean }) => void
  onBack: () => void
}

interface NotificationOption {
  key: 'orderUpdates' | 'promotions' | 'newRestaurants' | 'appUpdates'
  label: string
  description: string
  icon: typeof Bell
  locked?: boolean
}

export default function NotificationSettingsPage({ onSave = () => {}, onBack }: NotificationSettingsPageProps) {
  const { user } = useApp()

  const [prefs, setPrefs] = useState(user?.notificationPreferences || {
    orderUpdates: true,
    promotions: true,
    newRestaurants: false,
    appUpdates: true,
  })

  const options: NotificationOption[] = [
    {
      key: 'orderUpdates',
      label: 'Order Updates',
      description: 'Get notified about order status changes and delivery updates',
      icon: Bell,
      locked: true,
    },
    {
      key: 'promotions',
      label: 'Promotions',
      description: 'Receive special deals, discounts, and promotional offers',
      icon: Tag,
    },
    {
      key: 'newRestaurants',
      label: 'New Restaurants',
      description: 'Be the first to know when new restaurants join E-MENU in your area',
      icon: Store,
    },
    {
      key: 'appUpdates',
      label: 'App Updates',
      description: 'Stay informed about new features and app improvements',
      icon: Smartphone,
    },
  ]

  const toggle = (key: NotificationOption['key']) => {
    if (key === 'orderUpdates') return
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleTestNotification = () => {
    // triggers native notification in real app
  }

  const handleSave = () => {
    onSave(prefs)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-semibold text-foreground">Notifications</h2>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 pb-12">
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
          {options.map((opt, idx) => (
            <div
              key={opt.key}
              className={cn(
                'flex items-center gap-3 px-4 py-4',
                idx < options.length - 1 && 'border-b border-border/50',
              )}
            >
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                <opt.icon size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-foreground">{opt.label}</p>
                  {opt.locked && <Lock size={11} className="text-muted-foreground/50" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
              </div>
              <button
                onClick={() => toggle(opt.key)}
                disabled={opt.locked}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors shrink-0',
                  prefs[opt.key]
                    ? 'bg-primary'
                    : opt.locked
                      ? 'bg-muted/50'
                      : 'bg-muted/30',
                  opt.locked && 'opacity-60 cursor-not-allowed',
                )}
              >
                <div
                  className={cn(
                    'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform',
                    prefs[opt.key] && 'translate-x-5',
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Button variant="outline" fullWidth onClick={handleTestNotification}>
            <Send size={14} /> Test Notification
          </Button>
        </div>

        <div className="bg-muted/30 border border-border rounded-2xl p-4 flex items-start gap-3">
          <Info size={16} className="text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Order update notifications are required and cannot be disabled to ensure you never miss important updates about your orders.
          </p>
        </div>
      </div>
    </div>
  )
}
