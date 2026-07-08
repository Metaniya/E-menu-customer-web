import { MapPin } from 'lucide-react'
import { Button } from '../../../shared/components/Button'

interface Props {
  onGrant: () => void
  onDeny: () => void
  onEnable?: () => void
  onManual?: () => void
}

export default function LocationPermissionPage({ onGrant, onDeny }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-8">
        <MapPin size={40} className="text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-foreground text-center mb-3">
        Find restaurants near you
      </h1>
      <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8 max-w-xs">
        Allow E-MENU to access your location so we can find the best restaurants
        near you and provide accurate delivery estimates.
      </p>

      <div className="w-full max-w-sm space-y-3">
        <Button fullWidth size="lg" onClick={onGrant}>
          Enable Location
        </Button>
        <Button fullWidth size="lg" variant="outline" onClick={onDeny}>
          Enter Manually
        </Button>
      </div>
    </div>
  )
}
