import { CircleArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'
import { ChangeIndicator } from './ChangeIndicator'
import { OutcomeGauge, getStatusFromScore } from './OutcomeGauge'
import { MetricStat } from './MetricStat'
import { OutlineButton } from './OutlineButton'
import type { LucideIcon } from 'lucide-react'

export interface MetricStatData {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
}

export interface MetricsCardReusableProps {
  // Header
  icon: LucideIcon
  title: string
  subtitle: string

  // Gauge & Score
  score: number
  statusLabel: string

  // Change indicator
  changeValue: string
  changeDirection: 'up' | 'down'

  // Stats (optional)
  stats?: MetricStatData[]

  // Action
  onMoreDetail?: () => void

  className?: string
}

export function MetricsCardReusable({
  icon: HeaderIcon,
  title,
  subtitle,
  score,
  statusLabel,
  changeValue,
  changeDirection,
  stats,
  onMoreDetail,
  className,
}: MetricsCardReusableProps) {
  return (
    <BaseCard variant="bordered" padding="md" className={cn('flex flex-col gap-6', className)}>
      {/* Header */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5 pr-5">
          <HeaderIcon className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Gauge Section */}
      <div className="flex flex-col items-center gap-2">
        {/* Gauge with Score overlay */}
        <div className="relative flex items-center justify-center">
          <OutcomeGauge status={getStatusFromScore(score)} size="small" />
          {/* Score positioned over gauge */}
          <div className="absolute bottom-0 flex flex-col items-center">
            <span className="text-4xl font-bold text-black">{score}</span>
          </div>
        </div>

        {/* Status Badge */}
        <StatusBadge label={statusLabel} variant="outline" />

        {/* Change Indicator */}
        <ChangeIndicator
          value={changeValue}
          direction={changeDirection}
          suffix="vs last period"
        />
      </div>

      {/* Stats Section (if stats provided) */}
      {stats && stats.length > 0 && (
        <>
          {/* Separator */}
          <div className="h-px w-full bg-border" />

          {/* Stats Row */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {stats.map((stat, index) => (
              <MetricStat
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
              />
            ))}
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-border" />
        </>
      )}

      {/* More Detail Button */}
      {onMoreDetail && (
        <OutlineButton
          label="More Detail"
          icon={CircleArrowRight}
          onClick={onMoreDetail}
          fullWidth
        />
      )}
    </BaseCard>
  )
}
