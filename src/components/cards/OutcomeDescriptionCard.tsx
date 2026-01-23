import { Info } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'

export interface OutcomeDescriptionCardProps {
  title: string
  description: string
  className?: string
}

export function OutcomeDescriptionCard({
  title,
  description,
  className,
}: OutcomeDescriptionCardProps) {
  return (
    <BaseCard
      variant="default"
      padding="none"
      className={cn('p-4', className)}
    >
      <div className="flex gap-[10px]">
        <Info className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <p className="text-sm leading-5 text-foreground">
          <span className="font-bold">{title}</span>{' '}
          {description}
        </p>
      </div>
    </BaseCard>
  )
}
