import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface OutlineButtonProps {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}

export function OutlineButton({
  label,
  icon: Icon,
  onClick,
  fullWidth = false,
  className,
}: OutlineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-8 items-center justify-center gap-2 rounded-md border border-primary bg-white px-3 py-2',
        'text-sm text-primary transition-colors',
        'hover:bg-primary/5',
        fullWidth && 'w-full',
        className
      )}
    >
      <span>{label}</span>
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  )
}
