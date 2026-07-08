import { useState } from 'react'
import { ChevronLeft, Camera, X } from 'lucide-react'
import { formatRelativeTime } from '../../../shared/utils/formatDate'
import { Button } from '../../../shared/components/Button'

interface Props {
  onSubmit?: (text: string) => void
  onBack: () => void
}

interface PastReview {
  id: string
  restaurantName: string
  text: string
  createdAt: string
}

const PAST_REVIEWS: PastReview[] = [
  { id: 'pr1', restaurantName: 'Habesha 2000', text: 'The Doro Wat was absolutely incredible!', createdAt: '2026-06-28T14:30:00Z' },
  { id: 'pr2', restaurantName: "Lucy's Kitchen", text: 'Great food and fast service.', createdAt: '2026-06-25T10:15:00Z' },
]

export default function RatingsReviewsPage({ onSubmit = () => {}, onBack }: Props) {
  const [text, setText] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const CHAR_LIMIT = 500

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit(text)
    setText('')
    setPhotos([])
  }

  const handleAddPhoto = () => {
    if (photos.length >= 3) return
    setPhotos(prev => [...prev, `https://picsum.photos/seed/${Date.now()}/200/200`])
  }

  const handleRemovePhoto = (idx: number) => setPhotos(prev => prev.filter((_, i) => i !== idx))

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"><ChevronLeft size={20} /></button>
          <h2 className="font-semibold text-foreground">Share Your Experience</h2>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-8 pb-24">
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="relative mb-4">
            <textarea value={text} onChange={e => setText(e.target.value.slice(0, CHAR_LIMIT))}
              placeholder="Tell us about your experience..."
              rows={4} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 transition-colors" />
            <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">{text.length}/{CHAR_LIMIT}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                <button onClick={() => handleRemovePhoto(idx)} className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center">
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
            {photos.length < 3 && (
              <button onClick={handleAddPhoto} className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-primary/40 transition-colors">
                <Camera size={18} className="text-muted-foreground" />
              </button>
            )}
          </div>

          <Button fullWidth disabled={!text.trim()} onClick={handleSubmit}>Submit Review</Button>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Your Past Reviews</h3>
          {PAST_REVIEWS.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">No reviews yet</p>
          ) : (
            <div className="space-y-3">
              {PAST_REVIEWS.map(review => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{review.restaurantName}</p>
                    <span className="text-[10px] text-muted-foreground">{formatRelativeTime(review.createdAt)}</span>
                  </div>
                  {review.text && <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
