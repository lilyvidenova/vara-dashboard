import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'
import { ChangeIndicator } from './ChangeIndicator'
import { OutcomeGauge, type OutcomeStatus } from './OutcomeGauge'

export interface OutcomeScoreCardProps {
  title: string
  score: number
  status: OutcomeStatus
  statusLabel: string
  changeValue: string
  changeDirection: 'up' | 'down'
  className?: string
}

export function OutcomeScoreCard({
  title,
  score,
  status,
  statusLabel,
  changeValue,
  changeDirection,
  className,
}: OutcomeScoreCardProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('p-6', className)}
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        {/* Title */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-foreground">
            {title}
          </h2>
        </div>

        {/* Gauge Section */}
        <div className="relative flex flex-col items-center">
          <OutcomeGauge status={status} />

          {/* Score, Badge, and Change - positioned over gauge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-[30px]">
            <p className="text-5xl font-bold leading-[48px] text-foreground">
              {score}
            </p>
            <div className="mt-3">
              <StatusBadge label={statusLabel} variant="outline" />
            </div>
            <div className="mt-3">
              <ChangeIndicator
                value={changeValue}
                direction={changeDirection}
                suffix="vs last period"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  )
}
