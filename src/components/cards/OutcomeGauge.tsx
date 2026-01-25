import { cn } from '@/lib/utils'

export type OutcomeStatus = 'underperforming' | 'at-risk' | 'healthy' | 'strong' | 'exceptional'

export type OutcomeGaugeSize = 'default' | 'small'

/**
 * Derives OutcomeStatus from a numeric score (0-1000 scale).
 * Thresholds aligned with gauge segment filling:
 * - 0-333: underperforming (1 segment)
 * - 334-750: healthy (2 segments)
 * - 751+: strong (3 segments)
 */
export function getStatusFromScore(score: number): OutcomeStatus {
  if (score > 750) return 'strong'
  if (score > 333) return 'healthy'
  return 'underperforming'
}

export interface OutcomeGaugeProps {
  /** Status determining segment colors */
  status: OutcomeStatus
  /** Size variant: 'default' (268×142) or 'small' (142×76) */
  size?: OutcomeGaugeSize
  /** Additional CSS classes */
  className?: string
}

/** Gauge segment colors for default size (tri-color) */
const COLORS = {
  red: '#F87171',
  yellow: '#FBBF24',
  green: '#2FAF8F',
  gray: '#D4D4D8',
}

/** Gauge segment colors for small size (brand color) */
const BRAND_COLORS = {
  filled: '#0164A3',
  unfilled: '#E4E4E7',
}

/** Dimension configurations for each size */
const DIMENSIONS = {
  default: {
    width: 268,
    height: 142,
    radius: 120,
    strokeWidth: 14,
    responsiveClass: 'w-[200px] h-[106px] md:w-[268px] md:h-[142px]',
  },
  small: {
    width: 142,
    height: 76,
    radius: 60,
    strokeWidth: 8,
    responsiveClass: 'w-[120px] h-[64px] sm:w-[142px] sm:h-[76px]',
  },
}

/**
 * Get segment colors based on status for default size (tri-color).
 * - underperforming/at-risk: red only, middle and right gray
 * - healthy: red and yellow, right gray
 * - strong/exceptional: all three colors lit
 */
function getSegmentColors(status: OutcomeStatus) {
  switch (status) {
    case 'underperforming':
    case 'at-risk':
      return {
        left: COLORS.red,
        middle: COLORS.gray,
        right: COLORS.gray,
      }
    case 'healthy':
      return {
        left: COLORS.red,
        middle: COLORS.yellow,
        right: COLORS.gray,
      }
    case 'strong':
    case 'exceptional':
      return {
        left: COLORS.red,
        middle: COLORS.yellow,
        right: COLORS.green,
      }
    default:
      return {
        left: COLORS.gray,
        middle: COLORS.gray,
        right: COLORS.gray,
      }
  }
}

/**
 * Get segment colors based on status for small size (brand color).
 * Uses primary blue for filled segments and light gray for unfilled.
 * - underperforming/at-risk: 1 segment filled
 * - healthy: 2 segments filled
 * - strong/exceptional: 3 segments filled
 */
function getSmallSegmentColors(status: OutcomeStatus) {
  switch (status) {
    case 'underperforming':
    case 'at-risk':
      return {
        left: BRAND_COLORS.filled,
        middle: BRAND_COLORS.unfilled,
        right: BRAND_COLORS.unfilled,
      }
    case 'healthy':
      return {
        left: BRAND_COLORS.filled,
        middle: BRAND_COLORS.filled,
        right: BRAND_COLORS.unfilled,
      }
    case 'strong':
    case 'exceptional':
      return {
        left: BRAND_COLORS.filled,
        middle: BRAND_COLORS.filled,
        right: BRAND_COLORS.filled,
      }
    default:
      return {
        left: BRAND_COLORS.unfilled,
        middle: BRAND_COLORS.unfilled,
        right: BRAND_COLORS.unfilled,
      }
  }
}

/**
 * OutcomeGauge - A semicircular gauge with status-based coloring.
 *
 * Displays a 3-segment arc where segments light up based on the status.
 *
 * Default size (268×142) uses tri-color scheme:
 * - underperforming/at-risk: Only left segment (red)
 * - healthy: Left (red) and middle (yellow) segments
 * - strong/exceptional: All three segments (red, yellow, green)
 *
 * Small size (142×76) uses brand color (primary blue):
 * - underperforming/at-risk: 1 segment filled
 * - healthy: 2 segments filled
 * - strong/exceptional: 3 segments filled
 *
 * @example
 * ```tsx
 * // Large gauge with tri-color
 * <OutcomeGauge status="healthy" />
 *
 * // Small gauge with brand color
 * <OutcomeGauge status="exceptional" size="small" />
 * ```
 */
export function OutcomeGauge({
  status,
  size = 'default',
  className,
}: OutcomeGaugeProps) {
  // Use brand color for small size, tri-color for default size
  const colors = size === 'small'
    ? getSmallSegmentColors(status)
    : getSegmentColors(status)
  const dims = DIMENSIONS[size]

  const { width, height, radius, strokeWidth } = dims
  const centerX = width / 2
  const centerY = height - 4

  /**
   * Creates an SVG arc path between two angles.
   * Angles are in degrees, where 180° is left and 360° is right.
   */
  const createArc = (startAngle: number, endAngle: number): string => {
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = centerX + radius * Math.cos(startRad)
    const y1 = centerY + radius * Math.sin(startRad)
    const x2 = centerX + radius * Math.cos(endRad)
    const y2 = centerY + radius * Math.sin(endRad)

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  }

  return (
    <div className={cn('relative', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={dims.responsiveClass}
        aria-label={`Status gauge showing ${status}`}
        role="img"
      >
        {/* Left segment - 180° to 235° */}
        <path
          d={createArc(180, 235)}
          fill="none"
          stroke={colors.left}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Middle segment - 245° to 295° */}
        <path
          d={createArc(245, 295)}
          fill="none"
          stroke={colors.middle}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Right segment - 305° to 360° */}
        <path
          d={createArc(305, 360)}
          fill="none"
          stroke={colors.right}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
