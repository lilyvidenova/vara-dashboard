import { cn } from '@/lib/utils'

export type GaugeStatus = 'underperforming' | 'healthy' | 'strong'

export interface GaugeVisualizationProps {
  score: number
  maxScore?: number
  status?: GaugeStatus
  className?: string
}

// Calculate status based on score if not provided
function getStatusFromScore(score: number, maxScore: number): GaugeStatus {
  const percentage = (score / maxScore) * 100
  if (percentage <= 33) return 'underperforming'
  if (percentage <= 75) return 'healthy'
  return 'strong'
}

// Status-specific colors
const statusColors = {
  underperforming: {
    primary: '#DC2626', // Red
    secondary: '#F87171',
    tertiary: '#FCA5A5',
    background: '#FEE2E2',
  },
  healthy: {
    primary: '#F59E0B', // Amber/Yellow
    secondary: '#FBBF24',
    tertiary: '#FCD34D',
    background: '#FEF3C7',
  },
  strong: {
    primary: '#0164A3', // Primary blue
    secondary: '#38BDF8',
    tertiary: '#7DD3FC',
    background: '#E0F2FE',
  },
}

export function GaugeVisualization({
  score,
  maxScore = 1000,
  status,
  className,
}: GaugeVisualizationProps) {
  const computedStatus = status || getStatusFromScore(score, maxScore)
  const colors = statusColors[computedStatus]

  // SVG arc parameters
  const width = 142
  const height = 76
  const centerX = width / 2
  const centerY = height - 4
  const radius = 60
  const strokeWidth = 12

  // Create arc path
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

  // Calculate the indicator position based on score
  const scorePercentage = Math.min(score / maxScore, 1)
  const indicatorAngle = 180 + scorePercentage * 180 // 180 to 360 degrees
  const indicatorRad = (indicatorAngle * Math.PI) / 180
  const indicatorX = centerX + (radius - strokeWidth / 2) * Math.cos(indicatorRad)
  const indicatorY = centerY + (radius - strokeWidth / 2) * Math.sin(indicatorRad)

  return (
    <div className={cn('relative', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-[120px] h-[68px] md:w-[142px] md:h-[76px]"
      >
        {/* Background arc (light gray) */}
        <path
          d={createArc(180, 360)}
          fill="none"
          stroke="#E4E4E7"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Underperforming segment (left) */}
        <path
          d={createArc(180, 240)}
          fill="none"
          stroke={computedStatus === 'underperforming' ? colors.primary : '#FCA5A5'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={computedStatus === 'underperforming' ? 1 : 0.4}
        />

        {/* Healthy segment (middle) */}
        <path
          d={createArc(240, 300)}
          fill="none"
          stroke={computedStatus === 'healthy' ? colors.primary : '#FCD34D'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={computedStatus === 'healthy' ? 1 : 0.4}
        />

        {/* Strong segment (right) */}
        <path
          d={createArc(300, 360)}
          fill="none"
          stroke={computedStatus === 'strong' ? colors.primary : '#7DD3FC'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={computedStatus === 'strong' ? 1 : 0.4}
        />

        {/* Indicator dot */}
        <circle
          cx={indicatorX}
          cy={indicatorY}
          r={4}
          fill="white"
          stroke={colors.primary}
          strokeWidth={2}
        />
      </svg>
    </div>
  )
}
