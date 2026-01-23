import { cn } from '@/lib/utils'

export interface SmallGaugeProps {
  className?: string
}

// Primary gauge color
const GAUGE_COLOR = '#0164a3'

export function SmallGauge({ className }: SmallGaugeProps) {
  const width = 142
  const height = 76
  const centerX = width / 2
  const centerY = height - 2
  const radius = 56
  const strokeWidth = 12

  // Create arc path for a segment
  const createArc = (startAngle: number, endAngle: number): string => {
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = centerX + radius * Math.cos(startRad)
    const y1 = centerY + radius * Math.sin(startRad)
    const x2 = centerX + radius * Math.cos(endRad)
    const y2 = centerY + radius * Math.sin(endRad)

    const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  }

  return (
    <div className={cn('relative', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-[120px] h-[64px] sm:w-[142px] sm:h-[76px]"
      >
        {/* Left arc segment - 180° to 235° */}
        <path
          d={createArc(180, 235)}
          fill="none"
          stroke={GAUGE_COLOR}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Center arc segment - 245° to 295° */}
        <path
          d={createArc(245, 295)}
          fill="none"
          stroke={GAUGE_COLOR}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Right arc segment - 305° to 360° */}
        <path
          d={createArc(305, 360)}
          fill="none"
          stroke={GAUGE_COLOR}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
