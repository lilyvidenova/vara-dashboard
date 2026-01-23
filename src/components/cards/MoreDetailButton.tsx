import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MoreDetailButtonProps {
  onClick?: () => void
  label?: string
  className?: string
}

export function MoreDetailButton({
  onClick,
  label = 'More Detail',
  className,
}: MoreDetailButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2',
        'min-h-touch md:min-h-0 md:h-9',
        'text-sm font-medium text-foreground',
        'transition-colors hover:bg-muted active:bg-muted/80',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className
      )}
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}
