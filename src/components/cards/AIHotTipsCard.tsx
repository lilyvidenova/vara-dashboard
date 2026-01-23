import { Sparkles, Gauge, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'

export type TipRiskLevel = 'high' | 'low'

export interface AITip {
  riskLevel: TipRiskLevel
  icon: LucideIcon
  title: string
  description: string
  insight: string
}

export interface AIHotTipsCardProps {
  tips: AITip[]
  className?: string
}

interface RiskBadgeProps {
  level: TipRiskLevel
}

function RiskBadge({ level }: RiskBadgeProps) {
  const isHigh = level === 'high'

  return (
    <div
      className={cn(
        'rounded-full border px-2.5 pb-0.5 text-xs font-bold',
        isHigh
          ? 'border-red-400 bg-card text-red-600'
          : 'border-primary bg-muted text-primary'
      )}
    >
      {isHigh ? 'High Risk' : 'Low Risk'}
    </div>
  )
}

interface TipSectionProps {
  tip: AITip
}

function TipSection({ tip }: TipSectionProps) {
  const Icon = tip.icon

  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-border bg-muted/50 p-3">
      <RiskBadge level={tip.riskLevel} />

      <div className="flex flex-col items-center gap-3.5 w-full">
        {/* Title with icon */}
        <div className="flex items-center gap-1.5">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-bold text-foreground">{tip.title}</span>
        </div>

        {/* Description and insight */}
        <div className="flex flex-col items-center gap-2.5 text-center">
          <p className="text-sm text-muted-foreground">{tip.description}</p>
          <p className="text-sm text-foreground">{tip.insight}</p>
        </div>
      </div>
    </div>
  )
}

export function AIHotTipsCard({ tips, className }: AIHotTipsCardProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('flex flex-col gap-4 p-4', className)}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="text-base font-bold text-foreground">AI Hot Tips</span>
      </div>

      {/* Tips */}
      <div className="flex flex-col gap-5">
        {tips.map((tip, index) => (
          <TipSection key={index} tip={tip} />
        ))}
      </div>
    </BaseCard>
  )
}

// Default tips data
export const DEFAULT_AI_TIPS: AITip[] = [
  {
    riskLevel: 'high',
    icon: Gauge,
    title: 'Experiment with Faster Pacing',
    description: 'Your average words-per-minute is lower than top performers',
    insight: 'Slightly faster delivery can improve retention.',
  },
  {
    riskLevel: 'low',
    icon: BookOpen,
    title: 'Add Chapters to your videos',
    description: 'Videos over 8 minutes perform better with chapters',
    insight: 'Break your content into sections to improve user experience',
  },
]
