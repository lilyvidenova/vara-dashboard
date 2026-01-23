import { cn } from '@/lib/utils'

export interface ScoreTooltipProps {
  label: string
  score: number
  variant?: 'primary' | 'secondary'
  position?: 'above' | 'below'
  className?: string
}

export function ScoreTooltip({
  label,
  score,
  variant = 'primary',
  position = 'above',
  className,
}: ScoreTooltipProps) {
  const isPrimary = variant === 'primary'
  const isAbove = position === 'above'

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)}>
      {/* Arrow pointing up (when tooltip is below) */}
      {!isAbove && (
        <div
          className={cn(
            'h-0 w-0 border-l-[9px] border-r-[9px] border-b-[13px] border-l-transparent border-r-transparent',
            isPrimary ? 'border-b-[#b9e4fe40]' : 'border-b-background'
          )}
          style={!isPrimary ? {
            filter: 'drop-shadow(0 -1px 0 #d4d4d8)'
          } : undefined}
        />
      )}

      {/* Tooltip body */}
      <div
        className={cn(
          'flex items-center justify-center gap-1 rounded-md px-3 py-1.5',
          'shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_4px_6px_-1px_rgba(0,0,0,0.1)]',
          isPrimary
            ? 'bg-[#b9e4fe40]'
            : 'border border-border bg-background'
        )}
      >
        <span className={cn(
          'text-sm leading-5',
          isPrimary ? 'text-popover-foreground' : 'text-muted-foreground'
        )}>
          {label}
        </span>
        <span className="text-sm font-bold leading-5 text-popover-foreground">
          {score}
        </span>
      </div>

      {/* Arrow pointing down (when tooltip is above) */}
      {isAbove && (
        <div
          className={cn(
            'h-0 w-0 border-l-[9px] border-r-[9px] border-t-[13px] border-l-transparent border-r-transparent',
            isPrimary ? 'border-t-[#b9e4fe40]' : 'border-t-background'
          )}
          style={!isPrimary ? {
            filter: 'drop-shadow(0 1px 0 #d4d4d8)'
          } : undefined}
        />
      )}
    </div>
  )
}
