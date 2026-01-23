import { cn } from '@/lib/utils'

export interface ImpactGaugeProps {
  className?: string
}

// Gauge segment colors
const COLORS = {
  underperforming: '#F87171', // Red/coral
  healthy: '#FBBF24',         // Amber
  strong: '#2FAF8F',          // Teal/green
}

export function ImpactGauge({ className }: ImpactGaugeProps) {
  // SVG dimensions
  const width = 268
  const height = 142
  const centerX = width / 2
  const centerY = height - 4
  const radius = 120
  const strokeWidth = 24

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
        {/* Left segment (underperforming) - 180° to 235° */}
        <path
          d={createArc(180, 235)}
          fill="none"
          stroke={COLORS.underperforming}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Middle segment (healthy) - 245° to 295° */}
        <path
          d={createArc(245, 295)}
          fill="none"
          stroke={COLORS.healthy}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Right segment (strong) - 305° to 360° */}
        <path
          d={createArc(305, 360)}
          fill="none"
          stroke={COLORS.strong}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
