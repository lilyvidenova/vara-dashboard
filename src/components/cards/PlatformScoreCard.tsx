import { ArrowUpRight, ArrowDownRight, CircleArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'
import { SmallGauge } from './SmallGauge'

export interface PlatformMetric {
  icon: LucideIcon
  label: string
  value: string
}

export interface PlatformScoreCardProps {
  platformName: string
  platformIcon: React.ReactNode
  contentCount: number
  score: number
  statusLabel: string
  changeValue: string
  changeDirection: 'up' | 'down'
  metrics: PlatformMetric[]
  onMoreDetail?: () => void
  className?: string
}

interface MetricRowProps {
  icon: LucideIcon
  label: string
  value: string
  showSeparator?: boolean
}

function MetricRow({ icon: Icon, label, value, showSeparator = true }: MetricRowProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm text-foreground">{label}</span>
        </div>
        <span className="text-sm text-foreground">{value}</span>
      </div>
      {showSeparator && <div className="h-px w-full bg-border" />}
    </>
  )
}

export function PlatformScoreCard({
  platformName,
  platformIcon,
  contentCount,
  score,
  statusLabel,
  changeValue,
  changeDirection,
  metrics,
  onMoreDetail,
  className,
}: PlatformScoreCardProps) {
  const isUp = changeDirection === 'up'
  const ArrowIcon = isUp ? ArrowUpRight : ArrowDownRight

  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('flex flex-col gap-[26px] p-4', className)}
    >
      {/* Header + Score Section */}
      <div className="flex flex-col items-center">
        {/* Platform Header */}
        <div className="flex w-full gap-3">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-sidebar-border bg-card">
            {platformIcon}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-6 text-foreground">
              {platformName}
            </span>
            <span className="text-sm text-muted-foreground">
              {contentCount} Pieces of Content
            </span>
          </div>
        </div>

        {/* Score Display */}
        <div className="mt-4 flex w-full flex-col items-center gap-2.5">
          {/* Gauge with Score */}
          <div className="relative flex flex-col items-center">
            <SmallGauge />
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-[26px] font-bold leading-7 text-foreground">
                {score}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <StatusBadge label={statusLabel} variant="outline" />

          {/* Change Indicator */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <ArrowIcon
                className={cn(
                  'h-4 w-4',
                  isUp ? 'text-green-600' : 'text-red-600'
                )}
              />
              <span
                className={cn(
                  'text-sm',
                  isUp ? 'text-green-600' : 'text-red-600'
                )}
              >
                {changeValue}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">vs last period</span>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="flex flex-col gap-3">
        {metrics.map((metric, index) => (
          <MetricRow
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            showSeparator={index < metrics.length - 1}
          />
        ))}
      </div>

      {/* More Detail Button */}
      <div className="pt-2">
        <button
          onClick={onMoreDetail}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-primary bg-card px-3 py-2 text-sm text-primary hover:bg-muted/50"
        >
          <span>More Detail</span>
          <CircleArrowRight className="h-4 w-4" />
        </button>
      </div>
    </BaseCard>
  )
}
