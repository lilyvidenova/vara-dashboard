import { AlertTriangle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { BarcodeBar } from './BarcodeBar'
import { StatusBadge } from './StatusBadge'

export type AgeGroupStatus = 'exceptional' | 'strong' | 'healthy' | 'underperforming'

export interface AgeGroupData {
  ageGroup: string
  score: number
  status: AgeGroupStatus
  isTarget?: boolean
}

export interface PercentageAgeGroupData {
  /** Age group label (e.g., "18-24", "25-34") */
  ageGroup: string
  /** Percentage value (0-100) */
  percentage: number
  /** Shows "Target" badge when true */
  isTarget?: boolean
}

interface BaseProps {
  title: string
  subtitle: string
  className?: string
}

interface ScoreVariantProps extends BaseProps {
  variant?: 'score'
  data: AgeGroupData[]
  maxScore?: number
}

interface PercentageVariantProps extends BaseProps {
  variant: 'percentage'
  data: PercentageAgeGroupData[]
  maxScore?: never
}

export type AgeGroupBreakdownCardProps = ScoreVariantProps | PercentageVariantProps

const STATUS_LABELS: Record<AgeGroupStatus, string> = {
  exceptional: 'Exceptional',
  strong: 'Strong',
  healthy: 'Healthy',
  underperforming: 'Underperforming',
}

interface AgeGroupRowProps {
  ageGroup: string
  score: number
  status: AgeGroupStatus
  isTarget?: boolean
  maxScore: number
}

function AgeGroupRow({
  ageGroup,
  score,
  status,
  isTarget,
  maxScore,
}: AgeGroupRowProps) {
  const fillPercentage = score / maxScore
  const isUnderperforming = status === 'underperforming'

  return (
    <div className="flex items-center gap-3">
      {/* Age Label */}
      <span className="w-10 shrink-0 text-xs text-muted-foreground">
        {ageGroup}
      </span>

      {/* BarcodeBar */}
      <BarcodeBar fillPercentage={fillPercentage} className="flex-1" />

      {/* Score & Status */}
      <div className="flex items-start gap-2">
        <div className="w-[90px] text-right">
          <div className="text-sm font-bold text-foreground">{score}</div>
          <div className="flex items-center justify-end gap-1">
            <span className="text-xs text-muted-foreground">
              {STATUS_LABELS[status]}
            </span>
            {isUnderperforming && (
              <AlertTriangle className="h-3 w-3 text-red-500" />
            )}
          </div>
        </div>
        {isTarget && <StatusBadge label="Target" variant="outline" />}
      </div>
    </div>
  )
}

interface PercentageAgeGroupRowProps {
  ageGroup: string
  percentage: number
  isTarget?: boolean
}

/**
 * Row component for percentage variant - shows age group, barcode bar, percentage, and optional Target badge
 */
function PercentageAgeGroupRow({
  ageGroup,
  percentage,
  isTarget,
}: PercentageAgeGroupRowProps) {
  // Fill percentage is based on actual percentage value (30% = 0.3 fill)
  const fillPercentage = percentage / 100

  return (
    <div className="flex items-center gap-3">
      {/* Age Label */}
      <span className="w-10 shrink-0 text-xs text-muted-foreground">
        {ageGroup}
      </span>

      {/* BarcodeBar */}
      <BarcodeBar fillPercentage={fillPercentage} className="flex-1" />

      {/* Percentage & Target Badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-foreground">{percentage}%</span>
        {isTarget && <StatusBadge label="Target" variant="outline" />}
      </div>
    </div>
  )
}

/**
 * AgeGroupBreakdownCard - Displays age group demographic data.
 *
 * Supports two variants:
 * - `score` (default): Shows scores with status labels (e.g., 720 - Strong)
 * - `percentage`: Shows percentage distribution with optional Target badges
 *
 * @example
 * // Score variant (default)
 * <AgeGroupBreakdownCard
 *   title="Content Impact Score by Age"
 *   subtitle="How your content resonates across age groups"
 *   data={[
 *     { ageGroup: '18-24', score: 720, status: 'strong' },
 *     { ageGroup: '25-34', score: 650, status: 'healthy', isTarget: true },
 *   ]}
 * />
 *
 * @example
 * // Percentage variant
 * <AgeGroupBreakdownCard
 *   variant="percentage"
 *   title="TikTok by Age Group"
 *   subtitle="Identify high-performing and underperforming age segments"
 *   data={[
 *     { ageGroup: '18-24', percentage: 30 },
 *     { ageGroup: '25-34', percentage: 25, isTarget: true },
 *   ]}
 * />
 */
export function AgeGroupBreakdownCard(props: AgeGroupBreakdownCardProps) {
  const { title, subtitle, className, variant = 'score' } = props

  return (
    <BaseCard variant="default" padding="none" className={cn('p-6', className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold leading-7 text-card-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{subtitle}</p>
      </div>

      {/* Age Group Rows */}
      <div className="flex flex-col gap-4">
        {variant === 'percentage' ? (
          (props.data as PercentageAgeGroupData[]).map((item) => (
            <PercentageAgeGroupRow
              key={item.ageGroup}
              ageGroup={item.ageGroup}
              percentage={item.percentage}
              isTarget={item.isTarget}
            />
          ))
        ) : (
          (props.data as AgeGroupData[]).map((item) => (
            <AgeGroupRow
              key={item.ageGroup}
              ageGroup={item.ageGroup}
              score={item.score}
              status={item.status}
              isTarget={item.isTarget}
              maxScore={props.maxScore ?? 1000}
            />
          ))
        )}
      </div>
    </BaseCard>
  )
}
