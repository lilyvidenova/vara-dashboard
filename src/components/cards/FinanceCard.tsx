import { Info, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ValueBadge } from './ValueBadge'

export interface FinanceCardBreakdownItem {
  label: string
  value: string
}

export interface FinanceCardProps {
  icon: React.ReactNode
  title: string
  value: string
  breakdown: FinanceCardBreakdownItem[]
  position: 'first' | 'middle' | 'last'
  onInfoClick?: () => void
  className?: string
}

export function FinanceCard({
  icon,
  title,
  value,
  breakdown,
  position,
  onInfoClick,
  className,
}: FinanceCardProps) {
  // Position-based border and corner styles
  const positionClasses = {
    first: 'border-l border-t border-b rounded-l-md',
    middle: 'border-l border-t border-b',
    last: 'border rounded-r-md',
  }

  return (
    <div
      className={cn(
        'flex flex-1 flex-col justify-center bg-white p-4 md:p-5',
        positionClasses[position],
        className
      )}
    >
      <div className="flex flex-col gap-5">
        {/* Header: Icon, Title, Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center text-foreground">
                {icon}
              </div>
              <span className="text-base font-bold text-foreground">{title}</span>
            </div>
            <button
              type="button"
              onClick={onInfoClick}
              className="flex h-6 w-6 items-center justify-center text-primary hover:opacity-80"
              aria-label={`More info about ${title}`}
            >
              <Info className="h-5 w-5" />
            </button>
          </div>

          {/* Value */}
          <p className="text-3xl font-bold leading-10 text-popover-foreground md:text-4xl">
            {value}
          </p>
        </div>

        {/* Breakdown */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {breakdown.map((item, index) => (
            <div key={item.label} className="flex items-center gap-1.5">
              {index > 0 && position === 'first' && (
                <Plus className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <ValueBadge value={item.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
