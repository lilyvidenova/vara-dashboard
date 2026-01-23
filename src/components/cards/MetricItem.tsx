import { cn } from '@/lib/utils'

export interface MetricItemProps {
  icon: React.ReactNode
  label: string
  value: string | number
  suffix?: string
  className?: string
}

export function MetricItem({
  icon,
  label,
  value,
  suffix,
  className,
}: MetricItemProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-base font-bold text-foreground">{value}</span>
        {suffix && (
          <span className="text-xs text-foreground">{suffix}</span>
        )}
      </div>
    </div>
  )
}
