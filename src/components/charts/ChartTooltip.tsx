import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChartTooltipItem {
  icon: LucideIcon
  label: string
  value: string | number
}

export interface ChartTooltipProps {
  title: string
  items: ChartTooltipItem[]
  className?: string
}

/**
 * Base ChartTooltip component with glass effect styling.
 * Can be used directly or through ChartTooltipWrapper for Recharts integration.
 */
export function ChartTooltip({ title, items, className }: ChartTooltipProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-md p-2.5',
        'bg-[rgba(185,228,254,0.25)] backdrop-blur-[61px]',
        'shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.1)]',
        className
      )}
    >
      {/* Title */}
      <p className="text-sm font-bold leading-none text-foreground">{title}</p>

      {/* Separator */}
      <div className="h-px w-full bg-border" />

      {/* Items */}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <TooltipRow key={index} icon={item.icon} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}

function TooltipRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center gap-1">
      <Icon className="h-4 w-4 shrink-0 text-foreground" />
      <span className="text-xs leading-none text-muted-foreground">{label}</span>
      <span className="text-xs font-bold leading-none text-foreground">{value}</span>
    </div>
  )
}

/**
 * Recharts-compatible tooltip wrapper.
 * Transforms Recharts payload into ChartTooltip format.
 */
export interface ChartTooltipWrapperProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: Record<string, any>
  }>
  label?: string
  formatTitle?: (label: string) => string
  formatItems?: (
    payload: Array<{ name: string; value: number; payload: Record<string, any> }>,
    label: string
  ) => ChartTooltipItem[]
  className?: string
}

export function ChartTooltipWrapper({
  active,
  payload,
  label,
  formatTitle,
  formatItems,
  className,
}: ChartTooltipWrapperProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const title = formatTitle ? formatTitle(label ?? '') : label ?? ''
  const items = formatItems ? formatItems(payload, label ?? '') : []

  if (items.length === 0) {
    return null
  }

  return <ChartTooltip title={title} items={items} className={className} />
}
