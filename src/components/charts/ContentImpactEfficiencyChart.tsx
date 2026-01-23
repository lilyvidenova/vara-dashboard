import { Zap, ArrowUpRight, ArrowDownRight, Gauge, TrendingUp } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts'
import { cn } from '@/lib/utils'
import { BaseCard } from '../cards/BaseCard'
import { ChartTooltipWrapper } from './ChartTooltip'

export interface EfficiencyDataPoint {
  month: string
  value: number
}

export interface ContentImpactEfficiencyChartProps {
  data: EfficiencyDataPoint[]
  title?: string
  metricValue: number
  metricDirection: 'up' | 'down'
  comparisonLabel?: string
  unitLabel?: string
  animated?: boolean
  animationDuration?: number
  animationDelay?: number
  className?: string
}

// Custom bar shape with rounded top corners
function RoundedBar(props: any) {
  const { x, y, width, height, fill } = props
  const radius = 4

  if (height <= 0) return null

  // Create path with rounded top corners
  const path = `
    M ${x},${y + height}
    L ${x},${y + radius}
    Q ${x},${y} ${x + radius},${y}
    L ${x + width - radius},${y}
    Q ${x + width},${y} ${x + width},${y + radius}
    L ${x + width},${y + height}
    Z
  `

  return <path d={path} fill={fill} />
}

export function ContentImpactEfficiencyChart({
  data,
  title = 'Content Impact Efficiency',
  metricValue,
  metricDirection,
  comparisonLabel = 'vs Last Period',
  unitLabel = '/new content piece',
  animated = true,
  animationDuration = 1500,
  animationDelay = 0,
  className,
}: ContentImpactEfficiencyChartProps) {
  const isUp = metricDirection === 'up'
  const ArrowIcon = isUp ? ArrowUpRight : ArrowDownRight
  const sign = isUp ? '+' : '-'

  return (
    <BaseCard variant="bordered" padding="md" className={cn('flex flex-col gap-6', className)}>
      {/* Header */}
      <div className="flex flex-col gap-3">
        {/* Title row */}
        <div className="flex items-center gap-1">
          <Zap className="h-4 w-4 text-foreground" />
          <span className="text-base font-bold text-foreground">{title}</span>
        </div>

        {/* Metric section */}
        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            {/* Large metric value */}
            <span className="text-4xl font-bold leading-none text-foreground">
              <span className="text-green-900">{sign}</span>
              {Math.abs(metricValue)}
            </span>

            {/* Comparison indicator */}
            <div className="flex items-center pt-1">
              <ArrowIcon
                className={cn(
                  'h-4 w-4',
                  isUp ? 'text-green-600' : 'text-red-600'
                )}
              />
              <span className="text-xs text-muted-foreground">{comparisonLabel}</span>
            </div>
          </div>

          {/* Unit label */}
          <span className="text-xs font-bold text-foreground">{unitLabel}</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barCategoryGap="20%"
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
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
                    { icon: Gauge, label: 'Efficiency Score', value: payload[0]?.value ?? 0 },
                    { icon: TrendingUp, label: 'Change', value: `+${Math.round((payload[0]?.value ?? 0) * 0.12)}%` },
                    { icon: Zap, label: 'Per Content Piece', value: Math.round((payload[0]?.value ?? 0) / 10) },
                  ]}
                />
              }
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            />

            <Bar
              dataKey="value"
              shape={<RoundedBar />}
              isAnimationActive={animated}
              animationBegin={animationDelay}
              animationDuration={animationDuration}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BaseCard>
  )
}
