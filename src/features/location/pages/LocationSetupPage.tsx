import { useState } from 'react'
import { MapPin, Crosshair, ChevronLeft } from 'lucide-react'
import { Button } from '../../../shared/components/Button'

interface LocationItem {
  lat: number
  lng: number
  address: string
  area: string
}

interface Props {
  onConfirm: (loc: LocationItem) => void
  onBack?: () => void
  onSkip?: () => void
}

const AREA_SUGGESTIONS = ['Bole', 'Kazanchis', 'Piassa', 'Cazanches', 'Sarbet', 'Old Airport', 'Megenagna', 'Ayat']

export default function LocationSetupPage({ onConfirm, onBack, onSkip }: Props) {
  const [address, setAddress] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="font-semibold text-foreground">Set Your Location</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-5">
        <div className="relative">
          <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your address..."
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="h-48 rounded-xl bg-card border border-border flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Map preview</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground font-medium mb-3">Suggested Areas</p>
          <div className="flex flex-wrap gap-2">
            {AREA_SUGGESTIONS.map(area => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedArea === area
                    ? 'bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(255,238,0,0.35)]'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => onConfirm({ lat: 9.0222, lng: 38.7468, address, area: selectedArea })}
            disabled={!address && !selectedArea}
          >
            Confirm Location
          </Button>
          {onSkip ? (
            <button onClick={onSkip} className="w-full py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors text-sm">
              Skip for now
            </button>
          ) : (
            <button className="w-full py-3 rounded-2xl font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 text-sm">
              <Crosshair size={14} />
              Use Current Location
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
