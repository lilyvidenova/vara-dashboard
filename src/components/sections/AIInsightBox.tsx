import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AIInsightBoxProps {
  insight: string
  className?: string
}

export function AIInsightBox({ insight, className }: AIInsightBoxProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-border bg-muted/50 px-3 py-4',
        className
      )}
    >
      <Sparkles className="h-6 w-6 shrink-0 text-primary" />
      <p className="text-sm leading-relaxed text-foreground">{insight}</p>
    </div>
  )
}
