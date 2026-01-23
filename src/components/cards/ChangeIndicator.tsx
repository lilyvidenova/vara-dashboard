import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChangeIndicatorProps {
  value: string
  direction: 'up' | 'down'
  suffix?: string
  className?: string
  /**
   * When true, displays value before icon (e.g., "86% ↗")
   * When false (default), displays icon before value (e.g., "↗ 86%")
   */
  reversed?: boolean
}

export function ChangeIndicator({
  value,
  direction,
  suffix = 'vs last period',
  className,
  reversed = false,
}: ChangeIndicatorProps) {
  const isUp = direction === 'up'
  const Icon = isUp ? ArrowUpRight : ArrowDownRight
  const colorClass = isUp ? 'text-green-700' : 'text-red-800'

  return (
    <div className={cn('flex items-center gap-0.5 text-sm', className)}>
      <div className={cn('flex items-center', reversed && 'flex-row-reverse')}>
        <Icon className={cn('h-4 w-4', colorClass)} strokeWidth={2} />
        <span className={cn('font-medium', colorClass)}>{value}</span>
      </div>
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  )
}
