import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from '../cards/BaseCard'

export type RiskLevel = 'low' | 'high'

export interface TipBullet {
  text: string
  variant?: 'muted' | 'default'
}

export interface AITip {
  id: string
  title: string
  riskLevel: RiskLevel
  bullets: TipBullet[]
}

export interface AIHotTipsSectionProps {
  title?: string
  tips: AITip[]
  className?: string
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const isLow = level === 'low'

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-2.5 pb-0.5 text-xs font-bold',
        isLow
          ? 'border-primary bg-muted/50 text-primary'
          : 'border-red-400 bg-white text-red-600'
      )}
    >
      {isLow ? 'Low Risk' : 'High Risk'}
    </span>
  )
}

function BulletItem({ text, variant = 'default' }: TipBullet) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <p
        className={cn(
          'text-sm leading-none',
          variant === 'muted' ? 'text-muted-foreground' : 'text-foreground'
        )}
      >
        {text}
      </p>
    </div>
  )
}

function TipCard({ tip }: { tip: AITip }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-border bg-[#f0f8ff] p-3">
      {/* Title row with badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">{tip.title}</span>
        <RiskBadge level={tip.riskLevel} />
      </div>

      {/* Bullet points */}
      <div className="flex flex-col gap-2.5">
        {tip.bullets.map((bullet, index) => (
          <BulletItem key={index} text={bullet.text} variant={bullet.variant} />
        ))}
      </div>
    </div>
  )
}

export function AIHotTipsSection({
  title = 'AI Hot Tips',
  tips,
  className,
}: AIHotTipsSectionProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('flex flex-col gap-4 px-4 py-6', className)}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold leading-7 text-foreground">{title}</h2>
      </div>

      {/* Tips list */}
      <div className="flex flex-col gap-4">
        {tips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </BaseCard>
  )
}
