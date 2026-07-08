import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Loader2 } from 'lucide-react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
  secondary: 'bg-[#f2f2ef] text-[#111] hover:bg-[#e8e8e5]',
  ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted',
  outline: 'border border-border bg-white text-foreground hover:bg-muted',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
}

const sizes = {
  sm: 'h-9 px-3 text-xs rounded-lg',
  md: 'h-[52px] px-5 text-sm rounded-[12px]',
  lg: 'h-14 px-6 text-base rounded-[12px]',
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
