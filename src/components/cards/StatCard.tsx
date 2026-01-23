import { cn } from '@/lib/utils'
import { ChangeIndicator } from './ChangeIndicator'

export interface StatCardProps {
  /** Icon element to display in the header (should be 16x16) */
  icon: React.ReactNode
  /** Card title displayed next to the icon */
  title: string
  /** Main value to display (can be number, currency, time, etc.) */
  value: string
  /** Optional change indicator data */
  change?: {
    value: string
    direction: 'up' | 'down'
  }
  /** Description text shown below the value */
  description: string
  /** Additional CSS classes for the card container */
  className?: string
}

/**
 * StatCard - Displays a single statistic with optional change indicator.
 *
 * Used on platform detail pages to show metrics like shares, watch time,
 * revenue, etc.
 */
export function StatCard({
  icon,
  title,
  value,
  change,
  description,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'flex h-full items-center overflow-hidden rounded-md border border-border bg-card px-5 py-8',
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-6">
        {/* Header: Icon + Title */}
        <div className="flex items-start gap-1.5">
          <div className="h-4 w-4 shrink-0 text-primary">{icon}</div>
          <span className="text-base font-semibold leading-none text-foreground">
            {title}
          </span>
        </div>

        {/* Value Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-4xl font-bold leading-10 text-foreground">
              {value}
            </span>
            {change && (
              <ChangeIndicator
                value={change.value}
                direction={change.direction}
                suffix="vs Last Period"
                reversed
                className="pt-1"
              />
            )}
          </div>
          <p className="text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
