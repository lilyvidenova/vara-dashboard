import { ArrowLeft, FileText, CalendarClock } from 'lucide-react'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  OutcomeScoreCard,
  OutcomeDescriptionCard,
  IndustryComparisonCard,
  AgeGroupBreakdownCard,
  GenderBreakdownCard,
  type OutcomeStatus,
  type AgeGroupData,
  type GenderScoreData,
} from '@/components/cards'
import {
  ContentImpactGrowthChart,
  type ChartDataPoint,
} from '@/components/charts/ContentImpactGrowthChart'
import {
  ContentImpactEfficiencyChart,
  type EfficiencyDataPoint,
} from '@/components/charts/ContentImpactEfficiencyChart'
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

// Gender breakdown data for each outcome
const GENDER_DATA: Record<OutcomeId, GenderScoreData[]> = {
  'brand-awareness': [
    { gender: 'Men', score: 712, status: 'strong', fill: '#85c6db' },
    { gender: 'Women', score: 798, status: 'strong', isTarget: true, fill: '#0164a3' },
  ],
  'engagement': [
    { gender: 'Men', score: 156, status: 'underperforming', fill: '#85c6db' },
    { gender: 'Women', score: 108, status: 'underperforming', isTarget: true, fill: '#0164a3' },
  ],
  'targeting': [
    { gender: 'Men', score: 645, status: 'healthy', fill: '#85c6db' },
    { gender: 'Women', score: 691, status: 'healthy', isTarget: true, fill: '#0164a3' },
  ],
  'audience-satisfaction': [
    { gender: 'Men', score: 524, status: 'healthy', fill: '#85c6db' },
    { gender: 'Women', score: 848, status: 'exceptional', isTarget: true, fill: '#0164a3' },
  ],
  'audience-loyalty': [
    { gender: 'Men', score: 467, status: 'healthy', fill: '#85c6db' },
    { gender: 'Women', score: 512, status: 'healthy', isTarget: true, fill: '#0164a3' },
  ],
}

// Growth chart data for each outcome
const GROWTH_DATA: Record<OutcomeId, {
  percentageChange: string
  changeDirection: 'up' | 'down'
  data: ChartDataPoint[]
}> = {
  'brand-awareness': {
    percentageChange: '+32%',
    changeDirection: 'up',
    data: [
      { month: 'Jan', value: 420 },
      { month: 'Feb', value: 445 },
      { month: 'Mar', value: 460 },
      { month: 'Apr', value: 478 },
      { month: 'May', value: 495 },
      { month: 'Jun', value: 520 },
      { month: 'Jul', value: 548 },
      { month: 'Aug', value: 572 },
      { month: 'Sep', value: 598 },
      { month: 'Oct', value: 625 },
      { month: 'Nov', value: 652 },
      { month: 'Dec', value: 680 },
    ],
  },
  'engagement': {
    percentageChange: '-18%',
    changeDirection: 'down',
    data: [
      { month: 'Jan', value: 180 },
      { month: 'Feb', value: 175 },
      { month: 'Mar', value: 168 },
      { month: 'Apr', value: 162 },
      { month: 'May', value: 155 },
      { month: 'Jun', value: 148 },
      { month: 'Jul', value: 145 },
      { month: 'Aug', value: 140 },
      { month: 'Sep', value: 138 },
      { month: 'Oct', value: 135 },
      { month: 'Nov', value: 133 },
      { month: 'Dec', value: 132 },
    ],
  },
  'targeting': {
    percentageChange: '+12%',
    changeDirection: 'up',
    data: [
      { month: 'Jan', value: 520 },
      { month: 'Feb', value: 535 },
      { month: 'Mar', value: 548 },
      { month: 'Apr', value: 562 },
      { month: 'May', value: 578 },
      { month: 'Jun', value: 590 },
      { month: 'Jul', value: 605 },
      { month: 'Aug', value: 618 },
      { month: 'Sep', value: 632 },
      { month: 'Oct', value: 645 },
      { month: 'Nov', value: 658 },
      { month: 'Dec', value: 668 },
    ],
  },
  'audience-satisfaction': {
    percentageChange: '+46%',
    changeDirection: 'up',
    data: [
      { month: 'Jan', value: 280 },
      { month: 'Feb', value: 295 },
      { month: 'Mar', value: 310 },
      { month: 'Apr', value: 345 },
      { month: 'May', value: 380 },
      { month: 'Jun', value: 395 },
      { month: 'Jul', value: 420 },
      { month: 'Aug', value: 445 },
      { month: 'Sep', value: 478 },
      { month: 'Oct', value: 512 },
      { month: 'Nov', value: 538 },
      { month: 'Dec', value: 564 },
    ],
  },
  'audience-loyalty': {
    percentageChange: '+24%',
    changeDirection: 'up',
    data: [
      { month: 'Jan', value: 320 },
      { month: 'Feb', value: 335 },
      { month: 'Mar', value: 348 },
      { month: 'Apr', value: 365 },
      { month: 'May', value: 382 },
      { month: 'Jun', value: 398 },
      { month: 'Jul', value: 415 },
      { month: 'Aug', value: 432 },
      { month: 'Sep', value: 448 },
      { month: 'Oct', value: 462 },
      { month: 'Nov', value: 475 },
      { month: 'Dec', value: 486 },
    ],
  },
}

// Efficiency chart data for each outcome
const EFFICIENCY_DATA: Record<OutcomeId, {
  metricValue: number
  metricDirection: 'up' | 'down'
  unitLabel: string
  data: EfficiencyDataPoint[]
}> = {
  'brand-awareness': {
    metricValue: 52,
    metricDirection: 'up',
    unitLabel: '/new content piece',
    data: [
      { month: 'Jan', value: 38 },
      { month: 'Feb', value: 42 },
      { month: 'Mar', value: 45 },
      { month: 'Apr', value: 48 },
      { month: 'May', value: 46 },
      { month: 'Jun', value: 50 },
      { month: 'Jul', value: 52 },
      { month: 'Aug', value: 55 },
      { month: 'Sep', value: 54 },
      { month: 'Oct', value: 58 },
      { month: 'Nov', value: 56 },
      { month: 'Dec', value: 52 },
    ],
  },
  'engagement': {
    metricValue: 12,
    metricDirection: 'down',
    unitLabel: '/new content piece',
    data: [
      { month: 'Jan', value: 28 },
      { month: 'Feb', value: 25 },
      { month: 'Mar', value: 22 },
      { month: 'Apr', value: 20 },
      { month: 'May', value: 18 },
      { month: 'Jun', value: 16 },
      { month: 'Jul', value: 15 },
      { month: 'Aug', value: 14 },
      { month: 'Sep', value: 13 },
      { month: 'Oct', value: 12 },
      { month: 'Nov', value: 12 },
      { month: 'Dec', value: 12 },
    ],
  },
  'targeting': {
    metricValue: 34,
    metricDirection: 'up',
    unitLabel: '/new content piece',
    data: [
      { month: 'Jan', value: 28 },
      { month: 'Feb', value: 30 },
      { month: 'Mar', value: 29 },
      { month: 'Apr', value: 32 },
      { month: 'May', value: 31 },
      { month: 'Jun', value: 33 },
      { month: 'Jul', value: 35 },
      { month: 'Aug', value: 34 },
      { month: 'Sep', value: 36 },
      { month: 'Oct', value: 35 },
      { month: 'Nov', value: 34 },
      { month: 'Dec', value: 34 },
    ],
  },
  'audience-satisfaction': {
    metricValue: 40,
    metricDirection: 'up',
    unitLabel: '/new content piece',
    data: [
      { month: 'Jan', value: 22 },
      { month: 'Feb', value: 25 },
      { month: 'Mar', value: 28 },
      { month: 'Apr', value: 30 },
      { month: 'May', value: 32 },
      { month: 'Jun', value: 35 },
      { month: 'Jul', value: 36 },
      { month: 'Aug', value: 38 },
      { month: 'Sep', value: 39 },
      { month: 'Oct', value: 40 },
      { month: 'Nov', value: 41 },
      { month: 'Dec', value: 40 },
    ],
  },
  'audience-loyalty': {
    metricValue: 28,
    metricDirection: 'up',
    unitLabel: '/new content piece',
    data: [
      { month: 'Jan', value: 20 },
      { month: 'Feb', value: 22 },
      { month: 'Mar', value: 23 },
      { month: 'Apr', value: 24 },
      { month: 'May', value: 25 },
      { month: 'Jun', value: 26 },
      { month: 'Jul', value: 27 },
      { month: 'Aug', value: 27 },
      { month: 'Sep', value: 28 },
      { month: 'Oct', value: 28 },
      { month: 'Nov', value: 28 },
      { month: 'Dec', value: 28 },
    ],
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

      {/* Main Content - Horizontal on desktop, vertical on mobile */}
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {/* Left Side: Cards stacked vertically */}
        <div className="flex flex-col gap-3 lg:w-[70%]">
          {/* Row 1: Score Card + Description/Industry */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="lg:w-[36%]">
              <OutcomeScoreCard
                title={`${outcome.name} Score`}
                score={OUTCOME_DATA[outcome.id].score}
                status={OUTCOME_DATA[outcome.id].status}
                statusLabel={OUTCOME_DATA[outcome.id].statusLabel}
                changeValue={OUTCOME_DATA[outcome.id].changeValue}
                changeDirection={OUTCOME_DATA[outcome.id].changeDirection}
                className="h-full"
              />
            </div>
            <div className="flex flex-col gap-3 lg:w-[64%]">
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

          {/* Row 2: Age Group + Gender - horizontal on desktop */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="lg:w-1/2">
              <AgeGroupBreakdownCard
                title={`${outcome.name} Score by Age Group`}
                subtitle="Identify high-performing and underperforming age segments"
                data={AGE_GROUP_DATA[outcome.id]}
              />
            </div>
            <div className="lg:w-1/2">
              <GenderBreakdownCard
                title={`${outcome.name} Score By Gender`}
                subtitle="Ensure your target gender is performing well"
                data={GENDER_DATA[outcome.id]}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Growth and Efficiency Charts stacked vertically */}
        <div className="flex flex-col gap-3 lg:h-full lg:w-[30%]">
          <div className="flex-1">
            <ContentImpactGrowthChart
              title={`${outcome.name} Growth`}
              percentageChange={GROWTH_DATA[outcome.id].percentageChange}
              changeDirection={GROWTH_DATA[outcome.id].changeDirection}
              description={`${outcome.name} periodic change`}
              data={GROWTH_DATA[outcome.id].data}
              showIcon={false}
              className="h-full"
            />
          </div>
          <div className="flex-1">
            <ContentImpactEfficiencyChart
              title={`${outcome.name} Efficiency`}
              metricValue={EFFICIENCY_DATA[outcome.id].metricValue}
              metricDirection={EFFICIENCY_DATA[outcome.id].metricDirection}
              unitLabel={EFFICIENCY_DATA[outcome.id].unitLabel}
              data={EFFICIENCY_DATA[outcome.id].data}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
