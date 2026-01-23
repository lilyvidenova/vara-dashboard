import { cn } from '@/lib/utils'

export interface StatusBadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline'
  className?: string
}

const variantClasses = {
  default: 'bg-muted border-border text-foreground',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  error: 'bg-red-50 border-red-200 text-red-700',
  outline: 'bg-background border-border text-foreground',
}

export function StatusBadge({
  label,
  variant = 'default',
  className,
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-2.5 pb-0.5',
        variantClasses[variant],
        className
      )}
    >
      <span className="text-xs font-bold leading-4">{label}</span>
    </div>
  )
}
