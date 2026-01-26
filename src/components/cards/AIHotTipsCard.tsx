import { Sparkles, Gauge, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'

export type TipRiskLevel = 'high' | 'low'

export interface AITip {
  riskLevel: TipRiskLevel
  title: string
  bulletPoints: string[]
  // Legacy fields for backwards compatibility
  icon?: LucideIcon
  description?: string
  insight?: string
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
        'rounded-full border px-2.5 py-0.5 text-xs font-bold',
        isHigh
          ? 'border-red-400 bg-card text-red-600'
          : 'border-primary bg-muted text-primary'
      )}
    >
      {isHigh ? 'High Risk' : 'Low Risk'}
    </div>
  )
}

interface TipCardProps {
  tip: AITip
}

function TipCard({ tip }: TipCardProps) {
  // Support both new bulletPoints format and legacy description/insight format
  const bulletPoints = tip.bulletPoints?.length
    ? tip.bulletPoints
    : [tip.description, tip.insight].filter(Boolean) as string[]

  return (
    <div className="flex flex-1 flex-col gap-3 rounded-md border border-border bg-muted/50 p-4">
      {/* Risk Badge */}
      <div className="flex justify-center">
        <RiskBadge level={tip.riskLevel} />
      </div>

      {/* Title */}
      <h4 className="text-center text-sm font-bold text-foreground">
        {tip.title}
      </h4>

      {/* Bullet Points */}
      <ul className="flex flex-col gap-2">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
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

      {/* Tips - horizontal on desktop, stacked on mobile */}
      <div className="flex flex-col gap-4 md:flex-row">
        {tips.map((tip, index) => (
          <TipCard key={index} tip={tip} />
        ))}
      </div>
    </BaseCard>
  )
}

// Default tips data (updated format with bullet points)
export const DEFAULT_AI_TIPS: AITip[] = [
  {
    riskLevel: 'high',
    title: 'Experiment with Faster Pacing',
    bulletPoints: [
      'Your average words-per-minute is lower than top performers',
      'Slightly faster delivery can improve retention.',
    ],
    // Legacy fields for backwards compatibility
    icon: Gauge,
    description: 'Your average words-per-minute is lower than top performers',
    insight: 'Slightly faster delivery can improve retention.',
  },
  {
    riskLevel: 'low',
    title: 'Add Chapters to your videos',
    bulletPoints: [
      'Videos over 8 minutes perform better with chapters',
      'Break your content into sections to improve user experience',
    ],
    // Legacy fields for backwards compatibility
    icon: BookOpen,
    description: 'Videos over 8 minutes perform better with chapters',
    insight: 'Break your content into sections to improve user experience',
  },
]
