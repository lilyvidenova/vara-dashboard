import { ArrowLeft, FileText, CalendarClock } from 'lucide-react'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  OutcomeScoreCard,
  OutcomeDescriptionCard,
  IndustryComparisonCard,
  AgeGroupBreakdownCard,
  type OutcomeStatus,
  type AgeGroupData,
} from '@/components/cards'
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

// Descriptions for each outcome
const OUTCOME_DESCRIPTIONS: Record<OutcomeId, { title: string; description: string }> = {
  'brand-awareness': {
    title: 'Vara Brand Awareness Score',
    description: 'measures how well your brand is recognized and recalled by your target audience. It tracks brand mentions, reach, and recognition across various channels.',
  },
  'engagement': {
    title: 'Vara Engagement Score',
    description: 'tracks how actively your audience interacts with your content. It measures likes, comments, shares, and time spent engaging with your brand.',
  },
  'targeting': {
    title: 'Vara Targeting Score',
    description: 'evaluates how effectively you reach your intended audience segments. It analyzes demographic alignment and audience quality metrics.',
  },
  'audience-satisfaction': {
    title: 'Vara Audience Satisfaction Score',
    description: 'captures overall viewer sentiment and engagement. It surfaces approval trends, emerging audience patterns and the impact of your messaging at a glance.',
  },
  'audience-loyalty': {
    title: 'Vara Audience Loyalty Score',
    description: 'measures the strength of repeat engagement and long-term audience retention. It tracks returning visitors and sustained interaction patterns.',
  },
}

// Industry comparison data for each outcome
const INDUSTRY_COMPARISON_DATA: Record<OutcomeId, {
  userScore: number
  industryLeaderScore: number
  percentageDiff: string
  comparisonDirection: 'up' | 'down'
  description: string
}> = {
  'brand-awareness': {
    userScore: 763,
    industryLeaderScore: 812,
    percentageDiff: '-6%',
    comparisonDirection: 'down',
    description: 'Close to industry leader performance',
  },
  'engagement': {
    userScore: 132,
    industryLeaderScore: 645,
    percentageDiff: '-80%',
    comparisonDirection: 'down',
    description: 'Significantly below industry leader',
  },
  'targeting': {
    userScore: 668,
    industryLeaderScore: 724,
    percentageDiff: '-8%',
    comparisonDirection: 'down',
    description: 'Slightly below industry leader',
  },
  'audience-satisfaction': {
    userScore: 564,
    industryLeaderScore: 758,
    percentageDiff: '-26%',
    comparisonDirection: 'down',
    description: 'Underperforming the industry leader',
  },
  'audience-loyalty': {
    userScore: 486,
    industryLeaderScore: 692,
    percentageDiff: '-30%',
    comparisonDirection: 'down',
    description: 'Below industry leader benchmark',
  },
}

// Age group breakdown data for each outcome
const AGE_GROUP_DATA: Record<OutcomeId, AgeGroupData[]> = {
  'brand-awareness': [
    { ageGroup: '18-24', score: 812, status: 'exceptional' },
    { ageGroup: '25-34', score: 785, status: 'strong', isTarget: true },
    { ageGroup: '35-44', score: 743, status: 'strong', isTarget: true },
    { ageGroup: '45-54', score: 621, status: 'healthy' },
    { ageGroup: '55-64', score: 534, status: 'healthy' },
    { ageGroup: '65+', score: 412, status: 'healthy' },
  ],
  'engagement': [
    { ageGroup: '18-24', score: 245, status: 'underperforming' },
    { ageGroup: '25-34', score: 178, status: 'underperforming' },
    { ageGroup: '35-44', score: 132, status: 'underperforming' },
    { ageGroup: '45-54', score: 98, status: 'underperforming' },
    { ageGroup: '55-64', score: 67, status: 'underperforming' },
    { ageGroup: '65+', score: 45, status: 'underperforming' },
  ],
  'targeting': [
    { ageGroup: '18-24', score: 724, status: 'strong' },
    { ageGroup: '25-34', score: 698, status: 'healthy', isTarget: true },
    { ageGroup: '35-44', score: 672, status: 'healthy', isTarget: true },
    { ageGroup: '45-54', score: 589, status: 'healthy' },
    { ageGroup: '55-64', score: 456, status: 'healthy' },
    { ageGroup: '65+', score: 378, status: 'underperforming' },
  ],
  'audience-satisfaction': [
    { ageGroup: '18-24', score: 764, status: 'strong' },
    { ageGroup: '25-34', score: 848, status: 'exceptional', isTarget: true },
    { ageGroup: '35-44', score: 812, status: 'exceptional', isTarget: true },
    { ageGroup: '45-54', score: 524, status: 'healthy' },
    { ageGroup: '55-64', score: 325, status: 'underperforming' },
    { ageGroup: '65+', score: 263, status: 'underperforming' },
  ],
  'audience-loyalty': [
    { ageGroup: '18-24', score: 534, status: 'healthy' },
    { ageGroup: '25-34', score: 612, status: 'healthy', isTarget: true },
    { ageGroup: '35-44', score: 578, status: 'healthy', isTarget: true },
    { ageGroup: '45-54', score: 423, status: 'healthy' },
    { ageGroup: '55-64', score: 312, status: 'underperforming' },
    { ageGroup: '65+', score: 245, status: 'underperforming' },
  ],
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

      {/* Cards Section */}
      <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Score Card */}
        <OutcomeScoreCard
          title={`${outcome.name} Score`}
          score={OUTCOME_DATA[outcome.id].score}
          status={OUTCOME_DATA[outcome.id].status}
          statusLabel={OUTCOME_DATA[outcome.id].statusLabel}
          changeValue={OUTCOME_DATA[outcome.id].changeValue}
          changeDirection={OUTCOME_DATA[outcome.id].changeDirection}
        />

        {/* Description and Industry Comparison Cards - Stacked */}
        <div className="flex flex-col gap-3">
          <OutcomeDescriptionCard
            title={OUTCOME_DESCRIPTIONS[outcome.id].title}
            description={OUTCOME_DESCRIPTIONS[outcome.id].description}
          />
          <IndustryComparisonCard
            userScore={INDUSTRY_COMPARISON_DATA[outcome.id].userScore}
            industryLeaderScore={INDUSTRY_COMPARISON_DATA[outcome.id].industryLeaderScore}
            percentageDiff={INDUSTRY_COMPARISON_DATA[outcome.id].percentageDiff}
            comparisonDirection={INDUSTRY_COMPARISON_DATA[outcome.id].comparisonDirection}
            description={INDUSTRY_COMPARISON_DATA[outcome.id].description}
          />
        </div>
      </div>

      {/* Age Group Breakdown Card */}
      <div className="mt-6">
        <AgeGroupBreakdownCard
          title={`${outcome.name} Score by Age Group`}
          subtitle="Identify high-performing and underperforming age segments"
          data={AGE_GROUP_DATA[outcome.id]}
        />
      </div>
    </DashboardLayout>
  )
}
