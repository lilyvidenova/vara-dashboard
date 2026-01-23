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
  const userScorePercent = (userScore / maxScore) * 100
  const industryLeaderPercent = (industryLeaderScore / maxScore) * 100

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
        <div className="flex flex-col gap-2">
          {/* Your Score Tooltip */}
          <div
            className="flex justify-start"
            style={{ paddingLeft: `${userScorePercent - 8}%` }}
          >
            <ScoreTooltip
              label="Your Score"
              score={userScore}
              variant="primary"
              position="above"
            />
          </div>

          {/* Scale row with bar */}
          <div className="flex items-center gap-1">
            {/* Left scale */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-muted-foreground">0</span>
              <div className="h-[30px] w-px bg-border" />
            </div>

            {/* Barcode bar */}
            <BarcodeBar className="flex-1" />

            {/* Right scale */}
            <div className="flex items-center gap-1">
              <div className="h-[30px] w-px bg-border" />
              <span className="text-xs font-bold text-muted-foreground">
                {maxScore}
              </span>
            </div>
          </div>

          {/* Industry Leader Tooltip */}
          <div
            className="flex justify-start"
            style={{ paddingLeft: `${industryLeaderPercent - 10}%` }}
          >
            <ScoreTooltip
              label="Industry Leader"
              score={industryLeaderScore}
              variant="secondary"
              position="below"
            />
          </div>
        </div>
      </div>
    </BaseCard>
  )
}
