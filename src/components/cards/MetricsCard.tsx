import { Zap, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge, type StatusBadgeProps } from './StatusBadge'
import { ChangeIndicator } from './ChangeIndicator'
import { GaugeVisualization, type GaugeStatus } from './GaugeVisualization'
import { MetricItem } from './MetricItem'
import { MoreDetailButton } from './MoreDetailButton'

export interface MetricsCardProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  score: number
  maxScore?: number
  scoreStatus?: GaugeStatus
  badgeText: string
  badgeVariant?: StatusBadgeProps['variant']
  changeDirection: 'up' | 'down'
  changeValue: string
  efficiency: {
    value: string | number
    suffix?: string
  }
  growth: {
    value: string | number
    suffix?: string
  }
  onMoreDetail?: () => void
  className?: string
}

// Map gauge status to badge variant
function getBadgeVariant(status: GaugeStatus): StatusBadgeProps['variant'] {
  switch (status) {
    case 'underperforming':
      return 'error'
    case 'healthy':
      return 'warning'
    case 'strong':
      return 'success'
    default:
      return 'default'
  }
}

export function MetricsCard({
  icon,
  title,
  subtitle,
  score,
  maxScore = 1000,
  scoreStatus,
  badgeText,
  badgeVariant,
  changeDirection,
  changeValue,
  efficiency,
  growth,
  onMoreDetail,
  className,
}: MetricsCardProps) {
  // Calculate status from score if not provided
  const computedStatus = scoreStatus || (
    score <= 333 ? 'underperforming' :
    score <= 750 ? 'healthy' : 'strong'
  )

  const computedBadgeVariant = badgeVariant || getBadgeVariant(computedStatus)

  return (
    <BaseCard padding="md" className={cn('w-full', className)}>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center">
          <div className="flex items-center justify-center gap-1.5">
            {icon && (
              <div className="flex h-5 w-5 items-center justify-center text-primary">
                {icon}
              </div>
            )}
            <h3 className="text-lg font-bold text-card-foreground md:text-xl">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Gauge and Score */}
        <div className="flex flex-col items-center gap-3">
          <GaugeVisualization
            score={score}
            maxScore={maxScore}
            status={computedStatus}
          />
          <p className="text-3xl font-bold text-card-foreground md:text-4xl">
            {score}
          </p>
          <StatusBadge label={badgeText} variant={computedBadgeVariant} />
          <ChangeIndicator
            value={changeValue}
            direction={changeDirection}
            suffix="vs last period"
          />
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-border" />

        {/* Metrics */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <MetricItem
            icon={<Zap className="h-4 w-4 text-primary" />}
            label="Efficiency"
            value={efficiency.value}
            suffix={efficiency.suffix}
          />
          <MetricItem
            icon={<TrendingUp className="h-4 w-4 text-primary" />}
            label="Growth"
            value={growth.value}
            suffix={growth.suffix}
          />
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-border" />

        {/* Action Button */}
        <MoreDetailButton onClick={onMoreDetail} />
      </div>
    </BaseCard>
  )
}
