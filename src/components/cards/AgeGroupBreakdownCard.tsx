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

export interface AgeGroupBreakdownCardProps {
  title: string
  subtitle: string
  data: AgeGroupData[]
  maxScore?: number
  className?: string
}

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

export function AgeGroupBreakdownCard({
  title,
  subtitle,
  data,
  maxScore = 1000,
  className,
}: AgeGroupBreakdownCardProps) {
  return (
    <BaseCard variant="default" padding="none" className={cn('p-6', className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Age Group Rows */}
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <AgeGroupRow
            key={item.ageGroup}
            ageGroup={item.ageGroup}
            score={item.score}
            status={item.status}
            isTarget={item.isTarget}
            maxScore={maxScore}
          />
        ))}
      </div>
    </BaseCard>
  )
}
