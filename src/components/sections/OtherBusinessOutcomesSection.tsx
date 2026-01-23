import { CircleArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from '../cards/BaseCard'
import type { LucideIcon } from 'lucide-react'

export type OutcomeStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

export interface BusinessOutcome {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  score: number
  status: OutcomeStatus
  growth: string
  growthDirection: 'up' | 'down'
}

export interface OtherBusinessOutcomesSectionProps {
  title?: string
  subtitle?: string
  outcomes: BusinessOutcome[]
  onMoreDetail?: (outcomeId: string) => void
  className?: string
}

function getStatusLabel(status: OutcomeStatus): string {
  switch (status) {
    case 'exceptional':
      return 'Exceptional'
    case 'strong':
      return 'Strong'
    case 'healthy':
      return 'Healthy'
    case 'at-risk':
      return 'At Risk'
    case 'underperforming':
      return 'Underperforming'
  }
}

function IconAvatar({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50">
      <Icon className="h-6 w-6 text-primary" />
    </div>
  )
}

function OutcomeRow({
  outcome,
  onMoreDetail,
}: {
  outcome: BusinessOutcome
  onMoreDetail?: () => void
}) {
  const { icon, title, subtitle, score, status, growth, growthDirection } = outcome
  const growthColor = growthDirection === 'up' ? 'text-[#2FAF8F]' : 'text-[#F1666A]'

  return (
    <tr className="border-b border-border">
      {/* Metric Column */}
      <td className="h-[52px] px-4 py-2">
        <div className="flex items-center gap-2">
          <IconAvatar icon={icon} />
          <div className="flex flex-col">
            <span className="text-base font-medium text-foreground">{title}</span>
            <span className="text-sm text-muted-foreground">{subtitle}</span>
          </div>
        </div>
      </td>

      {/* Score Column */}
      <td className="h-[52px] px-4 py-2">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">{score}</span>
          <span className="text-sm text-muted-foreground">{getStatusLabel(status)}</span>
        </div>
      </td>

      {/* Growth Column */}
      <td className="h-[52px] px-4 py-2">
        <span className={cn('text-sm', growthColor)}>{growth}</span>
      </td>

      {/* Action Column */}
      <td className="h-[52px] px-4 py-2">
        <button
          onClick={onMoreDetail}
          className={cn(
            'flex h-8 items-center gap-2 rounded-md border border-input bg-muted/50 px-3 py-2',
            'text-sm text-foreground transition-colors hover:bg-muted'
          )}
        >
          <span>More Detail</span>
          <CircleArrowRight className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}

export function OtherBusinessOutcomesSection({
  title = 'Other Business Outcomes',
  subtitle = 'How you are performing in non focus areas',
  outcomes,
  onMoreDetail,
  className,
}: OtherBusinessOutcomesSectionProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="md"
      className={cn('flex flex-col gap-6 shadow-sm', className)}
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold leading-7 text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[356px]">
          <thead>
            <tr className="border-b border-border">
              <th className="h-12 px-4 text-left text-sm font-normal text-muted-foreground">
                Metric
              </th>
              <th className="h-12 px-4 text-left text-sm font-normal text-muted-foreground">
                Score
              </th>
              <th className="h-12 px-4 text-left text-sm font-normal text-muted-foreground">
                <div className="flex flex-col">
                  <span>Growth</span>
                  <span>vs last period</span>
                </div>
              </th>
              <th className="h-12 px-4" />
            </tr>
          </thead>
          <tbody>
            {outcomes.map((outcome) => (
              <OutcomeRow
                key={outcome.id}
                outcome={outcome}
                onMoreDetail={() => onMoreDetail?.(outcome.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </BaseCard>
  )
}
