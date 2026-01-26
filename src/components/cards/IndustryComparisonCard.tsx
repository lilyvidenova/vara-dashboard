import { PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { BarcodeBar } from './BarcodeBar'
import { ScoreTooltip } from './ScoreTooltip'

export interface IndustryComparisonCardProps {
  userScore: number
  industryLeaderScore: number
  maxScore?: number
  percentageDiff: string
  comparisonDirection: 'up' | 'down'
  comparisonLabel?: string
  description: string
  className?: string
}

export function IndustryComparisonCard({
  userScore,
  industryLeaderScore,
  maxScore = 1000,
  percentageDiff,
  comparisonDirection,
  comparisonLabel = 'vs Industry Leader',
  description,
  className,
}: IndustryComparisonCardProps) {
  const isUp = comparisonDirection === 'up'
  const ArrowIcon = isUp ? ArrowUpRight : ArrowDownRight

  // Calculate tooltip positions as percentages
  // Align with BarcodeBar's discrete 19-column grid for accurate positioning
  const TOTAL_COLUMNS = 19
  const userScoreColumns = Math.round((userScore / maxScore) * TOTAL_COLUMNS)
  const userScorePercent = (userScoreColumns / TOTAL_COLUMNS) * 100
  const industryLeaderColumns = Math.round((industryLeaderScore / maxScore) * TOTAL_COLUMNS)
  const industryLeaderPercent = (industryLeaderColumns / TOTAL_COLUMNS) * 100

  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('px-5 py-5 md:px-8 md:py-6', className)}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-3">
          {/* Title row */}
          <div className="flex items-center gap-1">
            <PieChart className="h-4 w-4 text-primary" />
            <span className="text-base font-bold text-foreground">
              Industry Comparison
            </span>
          </div>

          {/* Stats row */}
          <div className="flex items-start gap-1">
            <span className="text-2xl font-bold text-foreground md:text-[30px] md:leading-9">
              {percentageDiff}
            </span>
            <div className="flex items-center pt-1">
              <ArrowIcon
                className={cn(
                  'h-4 w-4',
                  isUp ? 'text-green-600' : 'text-red-600'
                )}
              />
              <span className="text-xs text-muted-foreground">
                {comparisonLabel}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-none text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Bar Chart Section */}
        <div className="flex flex-col">
          {/* Your Score Tooltip - aligned with bar */}
          <div className="flex items-end gap-1">
            {/* Spacer matching left scale */}
            <div className="flex items-center gap-1">
              <span className="invisible text-xs font-bold">0</span>
              <div className="w-px" />
            </div>

            {/* Tooltip container - matches bar width */}
            <div className="relative flex-1 min-h-[60px]">
              <div
                className="absolute bottom-0 -translate-x-1/2"
                style={{ left: `${userScorePercent}%` }}
              >
                <ScoreTooltip
                  label="Your Score"
                  score={userScore}
                  variant="primary"
                  position="above"
                />
              </div>
            </div>

            {/* Spacer matching right scale */}
            <div className="flex items-center gap-1">
              <div className="w-px" />
              <span className="invisible text-xs font-bold">{maxScore}</span>
            </div>
          </div>

          {/* Scale row with bar */}
          <div className="flex items-center gap-1">
            {/* Left scale */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-muted-foreground">0</span>
              <div className="h-[30px] w-px bg-border" />
            </div>

            {/* Barcode bar */}
            <BarcodeBar fillPercentage={userScore / maxScore} className="flex-1" />

            {/* Right scale */}
            <div className="flex items-center gap-1">
              <div className="h-[30px] w-px bg-border" />
              <span className="text-xs font-bold text-muted-foreground">
                {maxScore}
              </span>
            </div>
          </div>

          {/* Industry Leader Tooltip - aligned with bar */}
          <div className="flex items-start gap-1">
            {/* Spacer matching left scale */}
            <div className="flex items-center gap-1">
              <span className="invisible text-xs font-bold">0</span>
              <div className="w-px" />
            </div>

            {/* Tooltip container - matches bar width */}
            <div className="relative flex-1 min-h-[60px]">
              <div
                className="absolute top-0 -translate-x-1/2"
                style={{ left: `${industryLeaderPercent}%` }}
              >
                <ScoreTooltip
                  label="Industry Leader"
                  score={industryLeaderScore}
                  variant="secondary"
                  position="below"
                />
              </div>
            </div>

            {/* Spacer matching right scale */}
            <div className="flex items-center gap-1">
              <div className="w-px" />
              <span className="invisible text-xs font-bold">{maxScore}</span>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  )
}
