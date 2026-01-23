import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChangeIndicatorProps {
  value: string
  direction: 'up' | 'down'
  suffix?: string
  className?: string
}

export function ChangeIndicator({
  value,
  direction,
  suffix = 'vs last period',
  className,
}: ChangeIndicatorProps) {
  const isUp = direction === 'up'
  const Icon = isUp ? ArrowUpRight : ArrowDownRight
  const colorClass = isUp ? 'text-emerald-500' : 'text-red-600'

  return (
    <div className={cn('flex items-center gap-1 text-sm', className)}>
      <div className="flex items-center">
        <Icon className={cn('h-4 w-4', colorClass)} strokeWidth={2} />
        <span className={cn('font-medium', colorClass)}>{value}</span>
      </div>
      {suffix && <span className="text-muted-foreground">{suffix}</span>}
    </div>
  )
}
