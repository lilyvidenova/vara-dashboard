import { TrendingUp, ArrowUpRight, ArrowDownRight, Gauge, Zap } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { cn } from '@/lib/utils'
import { BaseCard } from '../cards/BaseCard'
import { ChartTooltipWrapper } from './ChartTooltip'

export interface ChartDataPoint {
  month: string
  value: number
  /** Optional date string for tooltip display (e.g., "Aug 28") */
  date?: string
}

export interface ContentImpactGrowthChartProps {
  data: ChartDataPoint[]
  title?: string
  description?: string
  /** Percentage change to display (required when showHeaderMetrics is true) */
  percentageChange?: string
  /** Direction of change (required when showHeaderMetrics is true) */
  changeDirection?: 'up' | 'down'
  /** Show the percentage change metrics in the header (default: true) */
  showHeaderMetrics?: boolean
  /** Show the Y-axis with labels (default: false) */
  showYAxis?: boolean
  /** Show a separator line below the header (default: false) */
  showSeparator?: boolean
  /** Format Y-axis tick values (e.g., 100000 → "100k") */
  yAxisFormatter?: (value: number) => string
  /** Use simple tooltip showing just date + value (default: false) */
  simpleTooltip?: boolean
  showIcon?: boolean
  animated?: boolean
  animationDuration?: number
  animationDelay?: number
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  className?: string
}

// Custom dot component for data points
function CustomDot(props: any) {
  const { cx, cy } = props

  if (cx === undefined || cy === undefined) {
    return null
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill="white"
      stroke="#2b6e8f"
      strokeWidth={2}
    />
  )
}


/**
 * Default Y-axis formatter that converts large numbers to "k" notation
 * e.g., 100000 → "100k", 50000 → "50k"
 */
function defaultYAxisFormatter(value: number): string {
  if (value >= 1000) {
    return `${value / 1000}k`
  }
  return String(value)
}

/**
 * Simple tooltip component for showing date + value
 */
function SimpleTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; payload: { date?: string } }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const value = payload[0]?.value ?? 0
  const date = payload[0]?.payload?.date ?? label

  return (
    <div
      className={cn(
        'rounded-md px-3 py-1.5',
        'bg-[rgba(185,228,254,0.25)] backdrop-blur-[30px]',
        'border border-[#e0f1fe]',
        'shadow-sm'
      )}
    >
      <p className="text-sm text-muted-foreground">
        <span>{date} </span>
        <span className="font-bold text-foreground">
          {value.toLocaleString()}
        </span>
      </p>
    </div>
  )
}

export function ContentImpactGrowthChart({
  data,
  title = 'Content Impact Growth',
  description = 'Periodic change in your Content Impact Score',
  percentageChange,
  changeDirection,
  showHeaderMetrics = true,
  showYAxis = false,
  showSeparator = false,
  yAxisFormatter = defaultYAxisFormatter,
  simpleTooltip = false,
  showIcon = true,
  animated = true,
  animationDuration = 1500,
  animationDelay = 0,
  animationEasing = 'ease-out',
  className,
}: ContentImpactGrowthChartProps) {
  const isUp = changeDirection === 'up'
  const ArrowIcon = isUp ? ArrowUpRight : ArrowDownRight

  // Calculate chart margins based on Y-axis visibility
  const chartMargin = showYAxis
    ? { top: 10, right: 10, left: -10, bottom: 0 }
    : { top: 10, right: 10, left: 0, bottom: 0 }

  return (
    <BaseCard
      variant="bordered"
      padding="md"
      className={cn(showHeaderMetrics ? 'relative' : 'flex flex-col gap-6', className)}
    >
      {/* Header */}
      {showHeaderMetrics ? (
        // Original layout with absolute positioning for metrics overlay
        <div className="absolute left-6 top-6 z-10 flex flex-col gap-3">
          {/* Title row */}
          <div className="flex items-center gap-1">
            {showIcon && <TrendingUp className="h-4 w-4 text-foreground" />}
            <span className="text-base font-bold text-foreground">{title}</span>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <span className="text-3xl font-bold leading-10 text-foreground md:text-4xl">
                {percentageChange}
              </span>
              <div className="flex items-center pt-2">
                <ArrowIcon
                  className={cn(
                    'h-4 w-4',
                    isUp ? 'text-green-600' : 'text-red-600'
                  )}
                />
                <span className="text-xs text-muted-foreground">vs Last Period</span>
              </div>
            </div>
            <p className="text-sm leading-5 text-muted-foreground">{description}</p>
          </div>
        </div>
      ) : (
        // Simple header layout without metrics
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold leading-7 text-card-foreground">{title}</h3>
          {description && (
            <p className="text-sm leading-5 text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Separator */}
      {showSeparator && <div className="h-px w-full bg-border" />}

      {/* Chart */}
      <div className={showHeaderMetrics ? 'mt-24 md:mt-20' : ''}>
        <ResponsiveContainer width="100%" height={showHeaderMetrics ? 240 : 200}>
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2b6e8f" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2b6e8f" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={{ stroke: '#d4d4d8' }}
              tickLine={false}
              tick={{ fill: '#52525b', fontSize: 12, fontWeight: 'bold' }}
              dy={10}
            />

            <YAxis
              hide={!showYAxis}
              domain={[0, 'dataMax + 10']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#52525b', fontSize: 10, fontWeight: 'bold' }}
              tickFormatter={yAxisFormatter}
              width={35}
            />

            <Tooltip
              content={
                simpleTooltip ? (
                  <SimpleTooltip />
                ) : (
                  <ChartTooltipWrapper
                    formatTitle={(label) => `${label} 2025`}
                    formatItems={(payload) => [
                      { icon: Gauge, label: 'Content Impact Score', value: payload[0]?.value ?? 0 },
                      { icon: Zap, label: 'Growth', value: `+${Math.round((payload[0]?.value ?? 0) * 0.15)}%` },
                    ]}
                  />
                )
              }
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#2b6e8f"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={<CustomDot />}
              activeDot={{ r: 8, fill: '#2b6e8f', stroke: 'white', strokeWidth: 2 }}
              isAnimationActive={animated}
              animationBegin={animationDelay}
              animationDuration={animationDuration}
              animationEasing={animationEasing}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </BaseCard>
  )
}
