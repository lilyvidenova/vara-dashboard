import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
} from 'recharts'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'

export type GenderStatus = 'exceptional' | 'strong' | 'healthy' | 'underperforming'

export interface GenderScoreData {
  gender: string
  score: number
  status: GenderStatus
  isTarget?: boolean
  fill: string
}

export interface PieSegmentData {
  /** Label for the segment (e.g., "Men", "Women") */
  label: string
  /** Value/percentage for the segment */
  value: number
  /** Fill color for the segment */
  fill: string
  /** Background color for the badge (optional) */
  badgeBg?: string
  /** Border color for the badge (optional) */
  badgeBorder?: string
  /** Text color for the badge (optional) */
  badgeText?: string
}

interface BaseProps {
  title: string
  subtitle: string
  className?: string
}

interface BarVariantProps extends BaseProps {
  variant?: 'bar'
  data: GenderScoreData[]
  maxScore?: number
}

interface PieVariantProps extends BaseProps {
  variant: 'pie'
  data: PieSegmentData[]
  maxScore?: never
}

export type GenderBreakdownCardProps = BarVariantProps | PieVariantProps

const STATUS_LABELS: Record<GenderStatus, string> = {
  exceptional: 'Exceptional',
  strong: 'Strong',
  healthy: 'Healthy',
  underperforming: 'Underperforming',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomBarLabel(props: any) {
  const { x, y, width, value, index, data } = props
  const item = data?.[index] as GenderScoreData | undefined
  if (!item || x === undefined || y === undefined) return null

  const centerX = x + width / 2
  const statusLabel = STATUS_LABELS[item.status]

  return (
    <g>
      {/* Target Badge */}
      {item.isTarget && (
        <foreignObject x={centerX - 29} y={y - 75} width={58} height={24}>
          <div className="flex justify-center">
            <StatusBadge label="Target" variant="outline" />
          </div>
        </foreignObject>
      )}
      {/* Score */}
      <text
        x={centerX}
        y={item.isTarget ? y - 38 : y - 24}
        textAnchor="middle"
        className="fill-foreground text-sm font-bold"
      >
        {value}
      </text>
      {/* Status Label */}
      <text
        x={centerX}
        y={item.isTarget ? y - 22 : y - 8}
        textAnchor="middle"
        className="fill-muted-foreground text-xs"
      >
        {statusLabel}
      </text>
    </g>
  )
}

interface LegendItemProps {
  color: string
  label: string
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="h-2 w-2 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
    </div>
  )
}

/**
 * Custom tooltip for pie chart with badge styling
 */
interface PieTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: PieSegmentData
  }>
}

function PieTooltip({ active, payload }: PieTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const data = payload[0].payload
  const badgeBg = data.badgeBg || '#fafafa'
  const badgeBorder = data.badgeBorder || data.fill
  const badgeText = data.badgeText || data.fill

  return (
    <div
      className="rounded-full border px-2.5 py-0.5 text-xs font-bold leading-4"
      style={{
        backgroundColor: badgeBg,
        borderColor: badgeBorder,
        color: badgeText,
      }}
    >
      {data.label} - {data.value}%
    </div>
  )
}

interface BarChartContentProps {
  data: GenderScoreData[]
  maxScore: number
}

function BarChartContent({ data, maxScore }: BarChartContentProps) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 80, right: 20, bottom: 10, left: 20 }}
          barGap={40}
        >
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            stroke="#d4d4d8"
          />
          <XAxis dataKey="gender" hide />
          <YAxis domain={[0, maxScore]} hide />
          <Bar
            dataKey="score"
            radius={[5, 5, 0, 0]}
            barSize={68}
            label={(props) => <CustomBarLabel {...props} data={data} />}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface PieChartContentProps {
  data: PieSegmentData[]
}

function PieChartContent({ data }: PieChartContentProps) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={85}
            dataKey="value"
            nameKey="label"
            stroke="#d4d4d8"
            strokeWidth={1}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

/**
 * GenderBreakdownCard - Displays demographic breakdown data.
 *
 * Supports two variants:
 * - `bar` (default): Bar chart showing scores with status labels
 * - `pie`: Pie chart showing percentage distribution with hover badges
 *
 * @example
 * // Bar chart variant (default)
 * <GenderBreakdownCard
 *   title="Content Impact Score by Gender"
 *   subtitle="How your content resonates across genders"
 *   data={[
 *     { gender: 'Men', score: 720, status: 'strong', fill: '#0164a3' },
 *     { gender: 'Women', score: 650, status: 'healthy', fill: '#85c6db' },
 *   ]}
 * />
 *
 * @example
 * // Pie chart variant
 * <GenderBreakdownCard
 *   variant="pie"
 *   title="TikTok by Gender"
 *   subtitle="Evaluate alignment to your target market"
 *   data={[
 *     { label: 'Men', value: 60, fill: '#0164a3' },
 *     { label: 'Women', value: 40, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
 *   ]}
 * />
 */
export function GenderBreakdownCard(props: GenderBreakdownCardProps) {
  const { title, subtitle, className, variant = 'bar' } = props

  // Get legend data based on variant
  const legendData = variant === 'pie'
    ? (props.data as PieSegmentData[]).map(item => ({ label: item.label, color: item.fill }))
    : (props.data as GenderScoreData[]).map(item => ({ label: item.gender, color: item.fill }))

  return (
    <BaseCard variant="default" padding="none" className={cn('p-6', className)}>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold leading-7 text-card-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{subtitle}</p>
      </div>

      {/* Chart */}
      {variant === 'pie' ? (
        <PieChartContent data={props.data as PieSegmentData[]} />
      ) : (
        <BarChartContent data={props.data as GenderScoreData[]} maxScore={props.maxScore ?? 1000} />
      )}

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4">
        {legendData.map((item) => (
          <LegendItem key={item.label} color={item.color} label={item.label} />
        ))}
      </div>
    </BaseCard>
  )
}
