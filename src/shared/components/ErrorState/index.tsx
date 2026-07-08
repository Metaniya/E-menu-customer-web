import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '../Button'
import { cn } from '../../utils/cn'

interface Props {
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ message = 'Something went wrong', onRetry, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-20 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertTriangle size={28} className="text-red-400" />
      </div>
      <h3 className="font-semibold text-base mb-1">Error</h3>
      <p className="text-sm text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw size={14} />
          Try Again
        </Button>
      )}
    </div>
  )
}
