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
}

export interface ContentImpactGrowthChartProps {
  data: ChartDataPoint[]
  title?: string
  percentageChange: string
  changeDirection: 'up' | 'down'
  description?: string
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


export function ContentImpactGrowthChart({
  data,
  title = 'Content Impact Growth',
  percentageChange,
  changeDirection,
  description = 'Periodic change in your Content Impact Score',
  animated = true,
  animationDuration = 1500,
  animationDelay = 0,
  animationEasing = 'ease-out',
  className,
}: ContentImpactGrowthChartProps) {
  const isUp = changeDirection === 'up'
  const ArrowIcon = isUp ? ArrowUpRight : ArrowDownRight

  return (
    <BaseCard variant="bordered" padding="md" className={cn('relative', className)}>
      {/* Header - positioned in top-left */}
      <div className="absolute left-6 top-6 z-10 flex flex-col gap-3">
        {/* Title row */}
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4 text-foreground" />
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

      {/* Chart */}
      <div className="mt-24 md:mt-20">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
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

            <YAxis hide domain={[0, 'dataMax + 10']} />

            <Tooltip
              content={
                <ChartTooltipWrapper
                  formatTitle={(label) => `${label} 2025`}
                  formatItems={(payload) => [
                    { icon: Gauge, label: 'Content Impact Score', value: payload[0]?.value ?? 0 },
                    { icon: Zap, label: 'Growth', value: `+${Math.round((payload[0]?.value ?? 0) * 0.15)}%` },
                  ]}
                />
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
