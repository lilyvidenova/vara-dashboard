import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'
import { ChangeIndicator } from './ChangeIndicator'
import { OutcomeGauge, type OutcomeStatus } from './OutcomeGauge'

/**
 * Derives OutcomeStatus from a numeric score (0-1000 scale).
 * Used when status is not explicitly provided.
 */
function getStatusFromScore(score: number): OutcomeStatus {
  if (score >= 800) return 'exceptional'
  if (score >= 650) return 'strong'
  if (score >= 450) return 'healthy'
  if (score >= 300) return 'at-risk'
  return 'underperforming'
}

export interface ContentImpactCardProps {
  title?: string
  subtitle?: string
  score: number
  /** Status for gauge coloring. If not provided, will be calculated from score. */
  status?: OutcomeStatus
  statusLabel: string
  changeValue: string
  changeDirection: 'up' | 'down'
  className?: string
}

export function ContentImpactCard({
  title = 'Vara Content Impact Score',
  subtitle = 'Overall Performance Across Platforms & Content',
  score,
  status,
  statusLabel,
  changeValue,
  changeDirection,
  className,
}: ContentImpactCardProps) {
  // Use provided status or calculate from score
  const computedStatus = status ?? getStatusFromScore(score)

  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('px-6 py-5 md:px-10 md:py-6', className)}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-[30px] md:leading-9">
            {title}
          </h2>
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        </div>

        {/* Gauge Section */}
        <div className="relative flex flex-col items-center">
          <OutcomeGauge status={computedStatus} />

          {/* Score and Badge - positioned over gauge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
            <p className="text-4xl font-bold text-foreground md:text-5xl md:leading-[48px]">
              {score}
            </p>
            <div className="mt-3">
              <StatusBadge label={statusLabel} variant="outline" />
            </div>
          </div>
        </div>

        {/* Change Indicator */}
        <ChangeIndicator
          value={changeValue}
          direction={changeDirection}
          suffix="vs last period"
        />
      </div>
    </BaseCard>
  )
}
