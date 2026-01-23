import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'

/**
 * Represents a single metric indicator with its icon, label, and description.
 */
export interface MetricIndicator {
  /** The Lucide icon component to display */
  icon: LucideIcon
  /** The name/label of the indicator (e.g., "Estimated Reach") */
  label: string
  /** Description of what this indicator measures */
  description: string
}

/**
 * Props for the MetricsExplainedCard component.
 */
export interface MetricsExplainedCardProps {
  /** Main card title (default: "Vara Metrics Explained") */
  title?: string
  /** Subtitle describing the outcome being measured */
  subtitle: string
  /** Methodology section title (default: "Methodology") */
  methodologyTitle?: string
  /** Description of the methodology used for this outcome */
  methodologyDescription: string
  /** Array of metric indicators to display in the table */
  indicators: MetricIndicator[]
  /** Optional additional CSS classes */
  className?: string
}

/**
 * Avatar component displaying an icon in a circular container.
 */
interface IconAvatarProps {
  icon: LucideIcon
}

function IconAvatar({ icon: Icon }: IconAvatarProps) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
      <Icon className="h-5 w-5 text-primary" />
    </div>
  )
}

/**
 * Table header component for the indicators table.
 */
function TableHeader() {
  return (
    <div className="flex w-full border-b border-border">
      <div className="flex h-12 w-[216px] shrink-0 items-center px-4">
        <span className="text-sm text-muted-foreground">Indicator</span>
      </div>
      <div className="flex h-12 flex-1 items-center px-4">
        <span className="text-sm text-muted-foreground">What this measures</span>
      </div>
    </div>
  )
}

/**
 * Table row component for a single indicator.
 */
interface IndicatorRowProps {
  indicator: MetricIndicator
  isLast?: boolean
}

function IndicatorRow({ indicator, isLast = false }: IndicatorRowProps) {
  const Icon = indicator.icon

  return (
    <div className={cn('flex w-full', !isLast && 'border-b border-border')}>
      {/* Indicator column */}
      <div className="flex h-[72px] w-[216px] shrink-0 items-center gap-2 px-4">
        <IconAvatar icon={Icon} />
        <span className="text-sm font-bold text-foreground">{indicator.label}</span>
      </div>
      {/* Description column */}
      <div className="flex h-[72px] flex-1 items-center px-4">
        <span className="text-sm text-foreground">{indicator.description}</span>
      </div>
    </div>
  )
}

/**
 * MetricsExplainedCard - Displays methodology and indicator breakdowns for outcome metrics.
 *
 * This card component shows:
 * - A header with title and subtitle
 * - A methodology section explaining how the outcome is measured
 * - A table of indicators with icons and descriptions
 *
 * @example
 * ```tsx
 * <MetricsExplainedCard
 *   subtitle="How we measure Audience Satisfaction"
 *   methodologyDescription="The Audience Satisfaction Score provides..."
 *   indicators={[
 *     { icon: Users, label: "Estimated Reach", description: "..." },
 *     // ... more indicators
 *   ]}
 * />
 * ```
 */
export function MetricsExplainedCard({
  title = 'Vara Metrics Explained',
  subtitle,
  methodologyTitle = 'Methodology',
  methodologyDescription,
  indicators,
  className,
}: MetricsExplainedCardProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('flex flex-col gap-6 p-10', className)}
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Methodology Section */}
      <div className="flex flex-col gap-6">
        {/* Top separator */}
        <div className="h-px w-full bg-border" />

        {/* Methodology content */}
        <div className="flex flex-col gap-3">
          <h4 className="text-base font-bold text-foreground">{methodologyTitle}</h4>
          <p className="text-sm text-foreground">{methodologyDescription}</p>
        </div>

        {/* Bottom separator */}
        <div className="h-px w-full bg-border" />
      </div>

      {/* Indicators Table */}
      <div className="flex flex-col">
        <TableHeader />
        {indicators.map((indicator, index) => (
          <IndicatorRow
            key={indicator.label}
            indicator={indicator}
            isLast={index === indicators.length - 1}
          />
        ))}
      </div>
    </BaseCard>
  )
}
