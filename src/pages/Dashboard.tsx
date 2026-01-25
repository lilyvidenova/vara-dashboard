import { useState } from 'react'
import {
  Gauge,
  FileText,
  CalendarClock,
  Radio,
  Zap,
  TrendingUp,
  Sparkles,
  Target,
  Repeat,
  CircleDollarSign,
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContentImpactCard, IndustryComparisonCard, MetricsCardReusable } from '@/components/cards'
import {
  FinancialOverviewSection,
  PlatformPerformanceSection,
  OtherBusinessOutcomesSection,
  AIHotTipsSection,
  TopPerformingContentSection,
  SectionHeader,
} from '@/components/sections'
import type { PlatformData, BusinessOutcome, AITip, ContentItem } from '@/components/sections'
import { ContentImpactGrowthChart, ContentImpactEfficiencyChart } from '@/components/charts'
import { useAppNavigation } from '@/hooks/useAppNavigation'
import type { PlatformId } from '@/types/platforms'
import type { OutcomeId } from '@/types/outcomes'

// Sample chart data
const CHART_DATA = [
  { month: 'Jan', value: 5 },
  { month: 'Feb', value: 17 },
  { month: 'Mar', value: 15 },
  { month: 'Apr', value: 20 },
  { month: 'May', value: 40 },
  { month: 'Jun', value: 50 },
  { month: 'Jul', value: 46 },
  { month: 'Aug', value: 46 },
  { month: 'Sep', value: 55 },
  { month: 'Oct', value: 76 },
  { month: 'Nov', value: 85 },
  { month: 'Dec', value: 95 },
]

// Sample efficiency chart data
const EFFICIENCY_DATA = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 52 },
  { month: 'Mar', value: 58 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 95 },
  { month: 'Jul', value: 68 },
  { month: 'Aug', value: 62 },
  { month: 'Sep', value: 48 },
  { month: 'Oct', value: 42 },
  { month: 'Nov', value: 78 },
  { month: 'Dec', value: 70 },
]

const DATE_FILTER_OPTIONS = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last Quarter', value: 'quarter' },
  { label: 'Last Year', value: 'year' },
  { label: 'All Time', value: 'all' },
]

// Sample platform data
const PLATFORM_DATA: PlatformData[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    contentCount: 356,
    score: 848,
    status: 'exceptional',
    icon: null,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    contentCount: 36,
    score: 751,
    status: 'strong',
    icon: null,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    contentCount: 128,
    score: 695,
    status: 'healthy',
    icon: null,
  },
  {
    id: 'x',
    name: 'X',
    contentCount: 445,
    score: 622,
    status: 'healthy',
    icon: null,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    contentCount: 231,
    score: 548,
    status: 'healthy',
    icon: null,
  },
  {
    id: 'snapchat',
    name: 'SnapChat',
    contentCount: 89,
    score: 412,
    status: 'at-risk',
    icon: null,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    contentCount: 67,
    score: 285,
    status: 'underperforming',
    icon: null,
  },
]

// Sample business outcomes data
const BUSINESS_OUTCOMES_DATA: BusinessOutcome[] = [
  {
    id: 'audience-satisfaction',
    icon: Repeat,
    title: 'Audience Satisfaction',
    subtitle: 'Reach, visibility & Impressions',
    score: 884,
    status: 'exceptional',
    growth: '+ 54%',
    growthDirection: 'up',
  },
  {
    id: 'audience-loyalty',
    icon: CircleDollarSign,
    title: 'Audience Loyalty',
    subtitle: 'Platform-generated revenue',
    score: 486,
    status: 'at-risk',
    growth: '+ 21%',
    growthDirection: 'up',
  },
]

// Sample AI tips data
const AI_TIPS_DATA: AITip[] = [
  {
    id: 'opening-hook',
    title: 'Optimize Your Opening Hook',
    riskLevel: 'low',
    bullets: [
      { text: 'Your video loses 42% of viewers within 10 seconds.', variant: 'muted' },
      { text: 'Start with a punchy question to improve retention.', variant: 'default' },
    ],
  },
  {
    id: 'shorter-intros',
    title: 'Shorter Intros Improve Watch Time',
    riskLevel: 'high',
    bullets: [
      { text: 'Quickly jumping to value retains 22% more viewers.', variant: 'muted' },
      { text: 'Cut filler/branding elements in the first 20 seconds.', variant: 'default' },
    ],
  },
]

// Sample top performing content data
const TOP_CONTENT_DATA: ContentItem[] = [
  {
    id: '1',
    rank: 1,
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=108&fit=crop',
    platform: 'instagram',
    title: 'A BUGS LIFE',
    artist: 'Sudan Archives',
    dateUploaded: '21 Jul, 2025',
    score: 848,
    status: 'exceptional',
  },
  {
    id: '2',
    rank: 2,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=108&fit=crop',
    platform: 'facebook',
    title: 'La Rumba del Perdó',
    artist: 'Rosalia',
    dateUploaded: '5 Nov, 2025',
    score: 813,
    status: 'strong',
  },
  {
    id: '3',
    rank: 3,
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=108&fit=crop',
    platform: 'youtube',
    title: 'Nausicaä (Love Will Be Revealed)',
    artist: 'Cameron Winter',
    dateUploaded: '24 Jun, 2025',
    score: 731,
    status: 'strong',
  },
]

// Sample worst performing content data
const WORST_CONTENT_DATA: ContentItem[] = [
  {
    id: '8',
    rank: 8,
    thumbnail: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200&h=108&fit=crop',
    platform: 'snapchat',
    title: 'viscus',
    artist: 'Oklu & FKA Twigs',
    dateUploaded: '18 Aug, 2025',
    score: 567,
    status: 'healthy',
  },
  {
    id: '9',
    rank: 9,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=108&fit=crop',
    platform: 'x',
    title: 'Automatic Love',
    artist: 'Nourished by Time',
    dateUploaded: '23 Aug, 2025',
    score: 287,
    status: 'underperforming',
  },
  {
    id: '10',
    rank: 10,
    thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=200&h=108&fit=crop',
    platform: 'tiktok',
    title: 'Not Hell, Not Heaven',
    artist: 'Scowl',
    dateUploaded: '5 Feb, 2025',
    score: 181,
    status: 'underperforming',
  },
]

export function Dashboard() {
  const [dateFilter, setDateFilter] = useState('Last Year')
  const { goToFinancial, goToPlatform, goToOutcome } = useAppNavigation()

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleGenerateReport = () => {
    console.log('Generate report clicked')
  }

  const handleDateFilterChange = (value: string) => {
    const option = DATE_FILTER_OPTIONS.find((o) => o.value === value)
    if (option) {
      setDateFilter(option.label)
    }
  }

  return (
    <DashboardLayout
      currentPage="Overall Performance"
      onSearch={handleSearch}
      userName="John Doe"
    >
      <PageHeader
        icon={<Gauge className="h-full w-full" />}
        label="Metric Report"
        title="Overall Performance"
        primaryAction={{
          label: 'Generate Report',
          shortLabel: 'Report',
          icon: <FileText className="h-4 w-4" />,
          onClick: handleGenerateReport,
        }}
        dateFilter={{
          value: dateFilter,
          icon: <CalendarClock className="h-4 w-4" />,
          options: DATE_FILTER_OPTIONS,
          onChange: handleDateFilterChange,
        }}
      />

      {/* Content area - Cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ContentImpactCard
          score={865}
          statusLabel="Exceptional"
          changeValue="64%"
          changeDirection="up"
        />
        <IndustryComparisonCard
          userScore={865}
          industryLeaderScore={758}
          percentageDiff="+16%"
          comparisonDirection="up"
          description="Slightly outperforming the Industry leader"
        />
      </div>

      {/* Financial Overview Section */}
      <div className="mt-8">
        <FinancialOverviewSection
          totalInvestment={{
            value: '£131.5k',
            breakdown: [
              { label: 'Content', value: '£100k' },
              { label: 'Boosting', value: '£31k' },
            ],
          }}
          attributedRevenue={{
            value: '£79.5',
            breakdown: [
              { label: 'Direct Platform Revenue', value: '18%' },
              { label: 'Indirect Revenue', value: '72%' },
            ],
          }}
          roi={{
            value: '+13%',
            breakdown: [{ label: 'Financial Return', value: '£66k' }],
          }}
          onMoreDetail={goToFinancial}
        />
      </div>

      {/* Charts & Platform Performance Section */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        {/* Content Impact Charts - stacked vertically */}
        <div className="flex flex-col gap-6 lg:flex-1">
          <ContentImpactGrowthChart
            data={CHART_DATA}
            percentageChange="+64%"
            changeDirection="up"
            animated={true}
            animationDuration={1500}
          />
          <ContentImpactEfficiencyChart
            data={EFFICIENCY_DATA}
            metricValue={40}
            metricDirection="up"
            comparisonLabel="vs Last Period"
            unitLabel="/new content piece"
            animated={true}
            animationDuration={1500}
          />
        </div>

        {/* Platform Performance Section */}
        <PlatformPerformanceSection
          platforms={PLATFORM_DATA}
          aiInsight="Instagram shows both high performance and high scale, making it your most valuable platform. Consider increasing content production there while exploring ways to improve TikTok's underperformance."
          onMoreDetail={(platformId) => goToPlatform(platformId as PlatformId)}
          className="lg:flex-1"
        />
      </div>

      {/* Selected Business Outcomes */}
      <div className="mt-10">
        <SectionHeader
          title="Selected Business Outcomes"
          subtitle="How your content is performing across key business metrics"
          className="mb-4"
        />
        <div className="flex flex-col gap-6 lg:flex-row">
          <MetricsCardReusable
          icon={Radio}
          title="Brand Awareness"
          subtitle="Reach, visibility & impressions"
          score={763}
          statusLabel="Strong"
          changeValue="64%"
          changeDirection="up"
          stats={[
            { icon: Zap, label: 'Efficiency', value: 78, unit: '/post' },
            { icon: TrendingUp, label: 'Growth', value: '+ 54%' },
          ]}
          onMoreDetail={() => goToOutcome('brand-awareness')}
          className="lg:flex-1"
        />
        <MetricsCardReusable
          icon={Sparkles}
          title="Engagement"
          subtitle="Likes, comments, shares & interactions"
          score={132}
          statusLabel="Underperforming"
          changeValue="72%"
          changeDirection="down"
          stats={[
            { icon: Zap, label: 'Efficiency', value: 39, unit: '/post' },
            { icon: TrendingUp, label: 'Growth', value: '+ 14%' },
          ]}
          onMoreDetail={() => goToOutcome('engagement')}
          className="lg:flex-1"
        />
        <MetricsCardReusable
          icon={Target}
          title="Targeting"
          subtitle="Demographic alignment with target audience"
          score={668}
          statusLabel="Healthy"
          changeValue="81%"
          changeDirection="down"
          stats={[
            { icon: Zap, label: 'Efficiency', value: 49, unit: '/post' },
            { icon: TrendingUp, label: 'Growth', value: '- 31%' },
          ]}
          onMoreDetail={() => goToOutcome('targeting')}
          className="lg:flex-1"
        />
        </div>
      </div>

      {/* Other Business Outcomes & AI Hot Tips */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <OtherBusinessOutcomesSection
          outcomes={BUSINESS_OUTCOMES_DATA}
          onMoreDetail={(outcomeId) => goToOutcome(outcomeId as OutcomeId)}
          className="lg:w-2/3"
        />
        <AIHotTipsSection tips={AI_TIPS_DATA} className="lg:w-1/3" />
      </div>

      {/* Top & Worst Performing Content Sections */}
      <div className="mt-10">
        <SectionHeader
          title="Content Performance"
          subtitle="Your best and worst performing content"
          className="mb-4"
        />
        <div className="flex flex-col gap-6 lg:flex-row">
          <TopPerformingContentSection
            items={TOP_CONTENT_DATA}
            onTitleClick={() => console.log('Navigate to full content list')}
            className="lg:flex-1"
          />
          <TopPerformingContentSection
            variant="worst"
            items={WORST_CONTENT_DATA}
            onTitleClick={() => console.log('Navigate to worst content list')}
            className="lg:flex-1"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
