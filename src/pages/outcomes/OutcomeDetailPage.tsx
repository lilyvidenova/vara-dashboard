import { ArrowLeft, FileText, CalendarClock } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import { OutcomeScoreCard, type OutcomeStatus } from '@/components/cards'
import { useAppNavigation } from '@/hooks/useAppNavigation'
import type { OutcomeConfig, OutcomeId } from '@/types/outcomes'

// Sample data for each outcome - would come from API in production
const OUTCOME_DATA: Record<OutcomeId, {
  score: number
  status: OutcomeStatus
  statusLabel: string
  changeValue: string
  changeDirection: 'up' | 'down'
}> = {
  'brand-awareness': {
    score: 763,
    status: 'strong',
    statusLabel: 'Strong',
    changeValue: '64%',
    changeDirection: 'up',
  },
  'engagement': {
    score: 132,
    status: 'underperforming',
    statusLabel: 'Underperforming',
    changeValue: '72%',
    changeDirection: 'down',
  },
  'targeting': {
    score: 668,
    status: 'healthy',
    statusLabel: 'Healthy',
    changeValue: '81%',
    changeDirection: 'down',
  },
  'audience-satisfaction': {
    score: 564,
    status: 'at-risk',
    statusLabel: 'At Risk',
    changeValue: '8%',
    changeDirection: 'down',
  },
  'audience-loyalty': {
    score: 486,
    status: 'at-risk',
    statusLabel: 'At Risk',
    changeValue: '21%',
    changeDirection: 'up',
  },
}

export interface OutcomeDetailPageProps {
  outcome: OutcomeConfig
}

export function OutcomeDetailPage({ outcome }: OutcomeDetailPageProps) {
  const { goBack } = useAppNavigation()
  const Icon = outcome.icon

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleGenerateReport = () => {
    console.log('Generate report for', outcome.name)
  }

  return (
    <DashboardLayout
      currentPage={outcome.name}
      onSearch={handleSearch}
      userName="John Doe"
    >
      {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <PageHeader
        icon={<Icon className="h-full w-full" />}
        label="Business Outcome"
        title={outcome.name}
        primaryAction={{
          label: 'Generate Report',
          shortLabel: 'Report',
          icon: <FileText className="h-4 w-4" />,
          onClick: handleGenerateReport,
        }}
        dateFilter={{
          value: 'Last Year',
          icon: <CalendarClock className="h-4 w-4" />,
          options: [
            { label: 'Last 7 Days', value: '7d' },
            { label: 'Last 30 Days', value: '30d' },
            { label: 'Last Quarter', value: 'quarter' },
            { label: 'Last Year', value: 'year' },
            { label: 'All Time', value: 'all' },
          ],
          onChange: (value) => console.log('Date filter:', value),
        }}
      />

      {/* Outcome Score Card */}
      <div className="mt-8">
        <OutcomeScoreCard
          title={`${outcome.name} Score`}
          score={OUTCOME_DATA[outcome.id].score}
          status={OUTCOME_DATA[outcome.id].status}
          statusLabel={OUTCOME_DATA[outcome.id].statusLabel}
          changeValue={OUTCOME_DATA[outcome.id].changeValue}
          changeDirection={OUTCOME_DATA[outcome.id].changeDirection}
          className="max-w-sm"
        />
      </div>
    </DashboardLayout>
  )
}
