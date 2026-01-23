import { cn } from '@/lib/utils'

export interface ValueBadgeProps {
  value: string
  className?: string
}

export function ValueBadge({ value, className }: ValueBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-primary bg-background px-2.5 pb-0.5',
        className
      )}
    >
      <span className="text-xs font-bold leading-4 text-primary">{value}</span>
    </div>
  )
}
