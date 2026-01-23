import { cn } from '@/lib/utils'

export interface BarcodeBarProps {
  /** Percentage of bar filled with blue (0-1). If not provided, uses default 5 gray + 14 blue columns */
  fillPercentage?: number
  className?: string
}

// Gray bar colors (alternating pattern within each column)
const GRAY_BARS = ['#e5e7eb', '#d1d5db', '#e5e7eb', '#d1d5db']

// Blue bar colors (gradient pattern within each column: light to dark)
const BLUE_BARS = ['#b9e4fe', '#7ccffd', '#0077be', '#0164a3']

// Total number of stripe columns
const TOTAL_COLUMNS = 19

// Renders a single stripe column with 4 vertical bars side-by-side
function StripeColumn({ colors }: { colors: string[] }) {
  return (
    <div className="flex flex-1 flex-row gap-[1px]">
      {colors.map((color, i) => (
        <div
          key={i}
          className="h-full flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}

export function BarcodeBar({ fillPercentage, className }: BarcodeBarProps) {
  const columns = []

  // Calculate number of blue columns based on fill percentage
  const blueColumns =
    fillPercentage !== undefined
      ? Math.round(fillPercentage * TOTAL_COLUMNS)
      : 14
  const grayColumns = TOTAL_COLUMNS - blueColumns

  // Add blue columns (filled portion) - on left
  for (let i = 0; i < blueColumns; i++) {
    columns.push(<StripeColumn key={`blue-${i}`} colors={BLUE_BARS} />)
  }

  // Add gray columns (unfilled portion) - on right
  for (let i = 0; i < grayColumns; i++) {
    columns.push(<StripeColumn key={`gray-${i}`} colors={GRAY_BARS} />)
  }

  return (
    <div
      className={cn(
        'flex h-[18px] gap-[1px] overflow-hidden rounded border border-border',
        className
      )}
    >
      {columns}
    </div>
  )
}
