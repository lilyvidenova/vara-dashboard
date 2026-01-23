import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface MetricStatProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  className?: string
}

export function MetricStat({ icon: Icon, label, value, unit, className }: MetricStatProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Icon and Label */}
      <div className="flex items-center gap-1">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      {/* Value and Unit */}
      <div className="flex items-baseline">
        <span className="text-base font-bold text-foreground">{value}</span>
        {unit && <span className="text-xs text-foreground">{unit}</span>}
      </div>
    </div>
  )
}
