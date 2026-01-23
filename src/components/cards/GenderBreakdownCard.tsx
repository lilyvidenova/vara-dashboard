import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
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

export interface GenderBreakdownCardProps {
  title: string
  subtitle: string
  data: GenderScoreData[]
  maxScore?: number
  className?: string
}

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

export function GenderBreakdownCard({
  title,
  subtitle,
  data,
  maxScore = 1000,
  className,
}: GenderBreakdownCardProps) {
  return (
    <BaseCard variant="default" padding="none" className={cn('p-6', className)}>
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Chart */}
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

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4">
        {data.map((item) => (
          <LegendItem key={item.gender} color={item.fill} label={item.gender} />
        ))}
      </div>
    </BaseCard>
  )
}
