import { cn } from '@/lib/utils'

export interface SectionHeaderProps {
  /** Main title text */
  title: string
  /** Optional subtitle/description text */
  subtitle?: string
  /** Title size variant */
  size?: 'default' | 'large'
  /** Additional class names */
  className?: string
}

/**
 * SectionHeader - A reusable header component for page sections.
 *
 * Displays a title and optional subtitle with consistent styling.
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Content Performance"
 *   subtitle="Your best and worst performing TikTok Content"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With large title
 * <SectionHeader
 *   title="Selected Business Outcomes"
 *   subtitle="How TikTok is performing across your chosen areas"
 *   size="large"
 * />
 * ```
 */
export function SectionHeader({
  title,
  subtitle,
  size = 'large',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <h2
        className={cn(
          'font-bold leading-none text-foreground',
          size === 'large' ? 'text-2xl' : 'text-lg'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm leading-5 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
