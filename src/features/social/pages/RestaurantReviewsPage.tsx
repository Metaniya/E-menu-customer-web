import { useState, useMemo } from 'react'
import { ChevronLeft, ThumbsUp, Clock, MessageSquare } from 'lucide-react'
import { useApp } from '../../../app/providers/AppProvider'
import { formatRelativeTime } from '../../../shared/utils/formatDate'
import { EmptyState } from '../../../shared/components/EmptyState'

interface Props {
  restaurantId?: string
  onBack: () => void
}

export default function RestaurantReviewsPage({ restaurantId = 'r1', onBack }: Props) {
  const { reviews: allReviews } = useApp()

  const reviews = useMemo(() => {
    const filtered = allReviews.filter(r => r.restaurantId === restaurantId)
    return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [allReviews, restaurantId])

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4 max-w-[var(--container-max)] mx-auto">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-semibold text-foreground">Reviews</h2>
          <span className="text-xs text-muted-foreground ml-auto">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-4 pt-6">
        {reviews.length === 0 ? (
          <EmptyState icon={MessageSquare} title="No reviews yet" description="Be the first to share your experience!" />
        ) : (
          <div className="space-y-3 max-w-2xl">
            {reviews.map(review => (
              <div key={review.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-medium text-muted-foreground">
                    {review.userAvatar ? <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover rounded-full" /> : review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{review.userName}</p>
                      <span className="text-[10px] text-muted-foreground">{formatRelativeTime(review.createdAt)}</span>
                    </div>
                  </div>
                </div>
                {review.text && <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.text}</p>}
                {review.photos.length > 0 && (
                  <div className="flex gap-1.5 mb-3">
                    {review.photos.map((photo, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img src={photo} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ThumbsUp size={12} /> <span className="text-[10px]">{review.helpful}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
