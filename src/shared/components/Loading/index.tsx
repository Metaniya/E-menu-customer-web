import { cn } from '../../utils/cn'
import { Loader2 } from 'lucide-react'

interface Props {
  text?: string
  fullScreen?: boolean
  className?: string
}

export function Loading({ text = 'Loading...', fullScreen, className }: Props) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-20', className)}>
      <Loader2 size={28} className="animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
  if (fullScreen) {
    return <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">{content}</div>
  }
  return content
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-muted/30', className)} />
}

export function SkeletonCard() {
  return (
    <div className="flex gap-3 p-3">
      <SkeletonBlock className="w-20 h-20 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
        <SkeletonBlock className="h-3 w-1/3" />
      </div>
    </div>
  )
}
