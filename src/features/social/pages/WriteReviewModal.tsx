import { useState, useRef } from 'react'
import { X, Camera } from 'lucide-react'
import { Button } from '../../../shared/components/Button'

interface Props {
  restaurantName: string
  onSubmit: (text: string, photos: string[]) => void
  onClose: () => void
}

export default function WriteReviewModal({ restaurantName, onSubmit, onClose }: Props) {
  const [text, setText] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const CHAR_LIMIT = 500

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || photos.length >= 5) return
    const reader = new FileReader()
    reader.onload = () => setPhotos(prev => [...prev, reader.result as string])
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit(text.trim(), photos)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-h-[100dvh] overflow-y-auto sm:max-h-[90vh] sm:w-[580px] bg-background sm:rounded-2xl sm:shadow-2xl sm:border sm:border-border">
        <div className="flex items-center justify-between px-6 pt-6 pb-3 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Write a Review</h2>
            <p className="text-xs text-muted-foreground">{restaurantName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Your Experience</label>
            <div className="relative">
              <textarea value={text} onChange={e => setText(e.target.value.slice(0, CHAR_LIMIT))}
                placeholder="Share your experience... What did you like? What could be improved?"
                rows={4} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 transition-colors" />
              <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">{text.length}/{CHAR_LIMIT}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Photos (optional, max 5)</p>
            <div className="flex gap-2 flex-wrap">
              {photos.map((photo, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted border border-border">
                  <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => setPhotos(prev => prev.filter((_, i) => i !== idx))} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
              {photos.length < 5 && (
                <button onClick={() => fileRef.current?.click()} className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary/40 hover:bg-muted/30 transition-all">
                  <Camera size={18} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Add Photo</span>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
            </div>
          </div>

          <Button fullWidth disabled={!text.trim()} onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  )
}
