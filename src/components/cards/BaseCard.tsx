import { cn } from '@/lib/utils'

export interface BaseCardProps {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-6',
  lg: 'p-5 md:p-8',
}

const variantClasses = {
  default: 'bg-card border border-border',
  bordered: 'bg-card border-2 border-border',
  elevated: 'bg-card border border-border shadow-md',
}

export function BaseCard({
  variant = 'default',
  padding = 'md',
  className,
  children,
}: BaseCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
