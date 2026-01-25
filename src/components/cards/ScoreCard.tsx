import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'
import { ChangeIndicator } from './ChangeIndicator'
import { OutcomeGauge, type OutcomeStatus } from './OutcomeGauge'

/**
 * Props for the ScoreCard component.
 */
export interface ScoreCardProps {
  /** The card title (e.g., "Audience Satisfaction Score" or "Content Impact Score for TikTok") */
  title: string
  /** The score value (0-1000) */
  score: number
  /** The status level determining gauge color */
  status: OutcomeStatus
  /** The status label displayed in the badge (e.g., "Healthy", "At Risk") */
  statusLabel: string
  /** The change percentage value (e.g., "8%", "+12%") */
  changeValue: string
  /** Direction of change for styling (up = green, down = red) */
  changeDirection: 'up' | 'down'
  /** Title font size - 'default' (20px) or 'large' (24px) */
  titleSize?: 'default' | 'large'
  /** Title text alignment - 'left' or 'center' */
  titleAlign?: 'left' | 'center'
  /** Optional additional CSS classes */
  className?: string
}

/**
 * ScoreCard - A reusable card component for displaying score metrics with a gauge visualization.
 *
 * Used on both Outcome detail pages and Platform detail pages to show:
 * - A title describing the metric
 * - A semicircle gauge visualization
 * - The numeric score
 * - A status badge
 * - A change indicator comparing to the previous period
 *
 * @example
 * ```tsx
 * // For Outcome pages (default styling)
 * <ScoreCard
 *   title="Audience Satisfaction Score"
 *   score={564}
 *   status="at-risk"
 *   statusLabel="At Risk"
 *   changeValue="8%"
 *   changeDirection="down"
 * />
 *
 * // For Platform pages (larger, centered title)
 * <ScoreCard
 *   title="Content Impact Score for TikTok"
 *   score={464}
 *   status="at-risk"
 *   statusLabel="At Risk"
 *   changeValue="8%"
 *   changeDirection="down"
 *   titleSize="large"
 *   titleAlign="center"
 * />
 * ```
 */
export function ScoreCard({
  title,
  score,
  status,
  statusLabel,
  changeValue,
  changeDirection,
  titleSize = 'default',
  titleAlign = 'left',
  className,
}: ScoreCardProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('p-6', className)}
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        {/* Title */}
        <div className="w-full">
          <h2
            className={cn(
              'font-bold text-foreground',
              titleSize === 'large' ? 'text-2xl' : 'text-xl',
              titleAlign === 'center' && 'text-center'
            )}
          >
            {title}
          </h2>
        </div>

        {/* Gauge Section */}
        <div className="relative flex flex-col items-center">
          <OutcomeGauge status={status} />

          {/* Score, Badge, and Change - positioned over gauge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-[42px]">
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

/**
 * @deprecated Use ScoreCard instead. OutcomeScoreCard is kept for backwards compatibility.
 */
export const OutcomeScoreCard = ScoreCard

/**
 * @deprecated Use ScoreCardProps instead.
 */
export type OutcomeScoreCardProps = ScoreCardProps
