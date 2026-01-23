import { PoundSterling, Target, LineChart, CircleArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FinanceCard, type FinanceCardBreakdownItem } from '../cards/FinanceCard'

export interface FinancialOverviewSectionProps {
  title?: string
  subtitle?: string
  totalInvestment: {
    value: string
    breakdown: FinanceCardBreakdownItem[]
  }
  attributedRevenue: {
    value: string
    breakdown: FinanceCardBreakdownItem[]
  }
  roi: {
    value: string
    breakdown: FinanceCardBreakdownItem[]
  }
  onMoreDetail?: () => void
  onInfoClick?: (metric: string) => void
  className?: string
}

export function FinancialOverviewSection({
  title = 'Financial Overview',
  subtitle = 'The effect of your content on your bottom line',
  totalInvestment,
  attributedRevenue,
  roi,
  onMoreDetail,
  onInfoClick,
  className,
}: FinancialOverviewSectionProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Section Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold leading-none text-card-foreground">
          {title}
        </h2>
        <p className="text-sm leading-5 text-muted-foreground">{subtitle}</p>
      </div>

      {/* Finance Cards and Button */}
      <div className="flex flex-col gap-6">
        {/* Cards Row - Stack on mobile, row on tablet+ */}
        <div className="flex flex-col md:flex-row">
          {/* Mobile: Each card has full borders */}
          {/* Desktop: Cards share borders (connected) */}

          {/* Total Investment */}
          <FinanceCard
            icon={<PoundSterling className="h-4 w-4" />}
            title="Total Investment"
            value={totalInvestment.value}
            breakdown={totalInvestment.breakdown}
            position="first"
            onInfoClick={() => onInfoClick?.('totalInvestment')}
            className="rounded-t-md border md:rounded-none md:rounded-l-md md:border-r-0"
          />

          {/* Attributed Revenue */}
          <FinanceCard
            icon={<Target className="h-4 w-4" />}
            title="Attributed Revenue"
            value={attributedRevenue.value}
            breakdown={attributedRevenue.breakdown}
            position="middle"
            onInfoClick={() => onInfoClick?.('attributedRevenue')}
            className="border-x border-b md:border-y md:border-l md:border-r-0"
          />

          {/* ROI */}
          <FinanceCard
            icon={<LineChart className="h-4 w-4" />}
            title="ROI"
            value={roi.value}
            breakdown={roi.breakdown}
            position="last"
            onInfoClick={() => onInfoClick?.('roi')}
            className="rounded-b-md border-x border-b md:rounded-none md:rounded-r-md md:border"
          />
        </div>

        {/* More Detail Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onMoreDetail}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-primary bg-white px-3 py-2 text-sm text-primary hover:bg-primary/5 transition-colors"
          >
            <span>More Detail</span>
            <CircleArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
