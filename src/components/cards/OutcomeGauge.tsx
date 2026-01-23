import { cn } from '@/lib/utils'

export type OutcomeStatus = 'underperforming' | 'at-risk' | 'healthy' | 'strong' | 'exceptional'

export interface OutcomeGaugeProps {
  status: OutcomeStatus
  className?: string
}

// Gauge segment colors
const COLORS = {
  red: '#F87171',
  yellow: '#FBBF24',
  green: '#2FAF8F',
  gray: '#D4D4D8',
}

// Get segment colors based on status
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

export function OutcomeGauge({ status, className }: OutcomeGaugeProps) {
  const colors = getSegmentColors(status)

  // SVG dimensions
  const width = 268
  const height = 142
  const centerX = width / 2
  const centerY = height - 4
  const radius = 120
  const strokeWidth = 14

  // Create arc path for a segment
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
        className="w-[200px] h-[106px] md:w-[268px] md:h-[142px]"
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
