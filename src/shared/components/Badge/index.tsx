import { cn } from '../../utils/cn'

interface Props {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline'
  className?: string
}

const variants = {
  default: 'bg-primary/15 text-primary',
  success: 'bg-green-500/15 text-green-400',
  warning: 'bg-amber-500/15 text-amber-400',
  danger: 'bg-red-500/15 text-red-400',
  outline: 'border border-border text-muted-foreground',
}

export function Badge({ children, variant = 'default', className }: Props) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
