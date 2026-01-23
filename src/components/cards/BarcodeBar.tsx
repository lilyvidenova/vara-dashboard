import { cn } from '@/lib/utils'

export interface BarcodeBarProps {
  className?: string
}

// Gray colors (alternating pattern)
const GRAY_200 = '#e5e7eb'
const GRAY_300 = '#d1d5db'

// Blue colors (sequential repeating pattern)
const BLUE_COLORS = ['#b9e4fe', '#7ccffd', '#0077be', '#0164a3']

// Total number of stripes in the bar
const TOTAL_STRIPES = 76

// Number of gray stripes at the start
const GRAY_STRIPES = 12

export function BarcodeBar({ className }: BarcodeBarProps) {
  const stripes = []

  for (let i = 0; i < TOTAL_STRIPES; i++) {
    let color: string

    if (i < GRAY_STRIPES) {
      // Alternating gray pattern
      color = i % 2 === 0 ? GRAY_200 : GRAY_300
    } else {
      // Repeating blue sequence: 200 → 300 → 600 → 700
      const blueIndex = (i - GRAY_STRIPES) % 4
      color = BLUE_COLORS[blueIndex]
    }

    stripes.push(
      <div
        key={i}
        className="h-full w-[5px] shrink-0"
        style={{ backgroundColor: color }}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex h-6 gap-[1px] overflow-hidden rounded-md border border-border',
        className
      )}
    >
      {stripes}
    </div>
  )
}
