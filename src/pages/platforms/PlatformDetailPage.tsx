import {
  ArrowLeft,
  FileText,
  CalendarClock,
  Youtube,
  Instagram,
  Music2,
  Facebook,
  Twitter,
  Linkedin,
  Ghost,
  Users,
  Eye,
  ShoppingBag,
  Coins,
  DollarSign,
  CircleCheck,
} from 'lucide-react'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  ScoreCard,
  IndustryComparisonCard,
  StatCard,
  type OutcomeStatus,
} from '@/components/cards'
import { useAppNavigation } from '@/hooks/useAppNavigation'

import type { PlatformConfig, PlatformId } from '@/types/platforms'

/**
 * Platform icon mapping for the page header
 */
const PLATFORM_ICONS: Record<PlatformId, React.ReactNode> = {
  youtube: <Youtube className="h-full w-full text-red-600" />,
  tiktok: <Music2 className="h-full w-full text-foreground" />,
  instagram: <Instagram className="h-full w-full text-pink-600" />,
  facebook: <Facebook className="h-full w-full text-blue-600" />,
  x: <Twitter className="h-full w-full text-foreground" />,
  linkedin: <Linkedin className="h-full w-full text-blue-700" />,
  snapchat: <Ghost className="h-full w-full text-yellow-400" />,
}

/**
 * Platform score data - would come from API in production
 */
const PLATFORM_SCORE_DATA: Record<PlatformId, {
  score: number
  status: OutcomeStatus
  statusLabel: string
  changeValue: string
  changeDirection: 'up' | 'down'
}> = {
  youtube: {
    score: 881,
    status: 'exceptional',
    statusLabel: 'Exceptional',
    changeValue: '32%',
    changeDirection: 'up',
  },
  tiktok: {
    score: 464,
    status: 'at-risk',
    statusLabel: 'At Risk',
    changeValue: '8%',
    changeDirection: 'down',
  },
  instagram: {
    score: 756,
    status: 'strong',
    statusLabel: 'Strong',
    changeValue: '12%',
    changeDirection: 'up',
  },
  facebook: {
    score: 623,
    status: 'healthy',
    statusLabel: 'Healthy',
    changeValue: '8%',
    changeDirection: 'up',
  },
  x: {
    score: 534,
    status: 'healthy',
    statusLabel: 'Healthy',
    changeValue: '5%',
    changeDirection: 'down',
  },
  linkedin: {
    score: 589,
    status: 'healthy',
    statusLabel: 'Healthy',
    changeValue: '15%',
    changeDirection: 'up',
  },
  snapchat: {
    score: 398,
    status: 'at-risk',
    statusLabel: 'At Risk',
    changeValue: '22%',
    changeDirection: 'up',
  },
}

/**
 * Platform industry comparison data - would come from API in production
 */
const PLATFORM_INDUSTRY_DATA: Record<PlatformId, {
  userScore: number
  industryLeaderScore: number
  percentageDiff: string
  comparisonDirection: 'up' | 'down'
  description: string
}> = {
  youtube: {
    userScore: 881,
    industryLeaderScore: 920,
    percentageDiff: '-4%',
    comparisonDirection: 'down',
    description: 'Very close to industry leader performance',
  },
  tiktok: {
    userScore: 465,
    industryLeaderScore: 758,
    percentageDiff: '-16%',
    comparisonDirection: 'down',
    description: 'Slightly underperforming the industry leader',
  },
  instagram: {
    userScore: 756,
    industryLeaderScore: 845,
    percentageDiff: '-11%',
    comparisonDirection: 'down',
    description: 'Approaching industry leader benchmark',
  },
  facebook: {
    userScore: 623,
    industryLeaderScore: 712,
    percentageDiff: '-12%',
    comparisonDirection: 'down',
    description: 'Room for improvement vs industry leader',
  },
  x: {
    userScore: 534,
    industryLeaderScore: 678,
    percentageDiff: '-21%',
    comparisonDirection: 'down',
    description: 'Below industry leader performance',
  },
  linkedin: {
    userScore: 589,
    industryLeaderScore: 634,
    percentageDiff: '-7%',
    comparisonDirection: 'down',
    description: 'Close to industry leader benchmark',
  },
  snapchat: {
    userScore: 398,
    industryLeaderScore: 567,
    percentageDiff: '-30%',
    comparisonDirection: 'down',
    description: 'Significant gap to industry leader',
  },
}

/**
 * Stat card configuration for a single metric
 */
interface StatCardConfig {
  icon: 'shares' | 'watchTime' | 'shopRevenue' | 'rpm' | 'revenue' | 'completion'
  title: string
  value: string
  change?: { value: string; direction: 'up' | 'down' }
  description: string
}

/**
 * Platform-specific stat card data - would come from API in production
 */
const PLATFORM_STATS_DATA: Record<PlatformId, StatCardConfig[]> = {
  youtube: [
    { icon: 'shares', title: 'Subscribers', value: '2.4M', description: 'Total channel subscribers' },
    { icon: 'watchTime', title: 'Average Watch Time', value: '8.2 mins', change: { value: '12%', direction: 'up' }, description: 'Average video watch duration' },
    { icon: 'shopRevenue', title: 'Ad Revenue', value: '£45k', change: { value: '18%', direction: 'up' }, description: 'Revenue from YouTube ads' },
    { icon: 'rpm', title: 'RPM', value: '£4.50', change: { value: '8%', direction: 'up' }, description: 'Revenue per 1,000 views' },
    { icon: 'revenue', title: 'Overall Revenue', value: '£52k', description: 'Total revenue from YouTube' },
    { icon: 'completion', title: 'Video Completion Rate', value: '68%', change: { value: '5%', direction: 'up' }, description: 'Viewers who watch to the end' },
  ],
  tiktok: [
    { icon: 'shares', title: 'Shares', value: '563', description: 'Total video shares across all content' },
    { icon: 'watchTime', title: 'Average Watch Time', value: '1.35 mins', change: { value: '86%', direction: 'up' }, description: 'Average video watch duration' },
    { icon: 'shopRevenue', title: 'TikTok Shop Revenue', value: '£18k', change: { value: '5%', direction: 'down' }, description: 'Revenue from TikTok Shop sales' },
    { icon: 'rpm', title: 'RPM', value: '£2,100', change: { value: '21%', direction: 'up' }, description: 'Revenue per 1,000 views' },
    { icon: 'revenue', title: 'Overall Revenue', value: '£34k', description: 'Total revenue from TikTok' },
    { icon: 'completion', title: 'Completion Rate', value: '1,235', change: { value: '5%', direction: 'down' }, description: 'Videos watched to completion' },
  ],
  instagram: [
    { icon: 'shares', title: 'Followers', value: '856K', description: 'Total account followers' },
    { icon: 'watchTime', title: 'Avg. Reel Watch Time', value: '0.45 mins', change: { value: '23%', direction: 'up' }, description: 'Average reel watch duration' },
    { icon: 'shopRevenue', title: 'Shop Revenue', value: '£12k', change: { value: '15%', direction: 'up' }, description: 'Revenue from Instagram Shop' },
    { icon: 'rpm', title: 'Engagement Rate', value: '4.2%', change: { value: '0.8%', direction: 'up' }, description: 'Likes and comments per follower' },
    { icon: 'revenue', title: 'Overall Revenue', value: '£28k', description: 'Total revenue from Instagram' },
    { icon: 'completion', title: 'Story Completion', value: '72%', change: { value: '3%', direction: 'up' }, description: 'Stories viewed to the end' },
  ],
  facebook: [
    { icon: 'shares', title: 'Page Followers', value: '1.2M', description: 'Total page followers' },
    { icon: 'watchTime', title: 'Video Watch Time', value: '3.2 mins', change: { value: '8%', direction: 'up' }, description: 'Average video watch duration' },
    { icon: 'shopRevenue', title: 'Shop Revenue', value: '£8.5k', change: { value: '12%', direction: 'up' }, description: 'Revenue from Facebook Shop' },
    { icon: 'rpm', title: 'Post Reach', value: '245K', change: { value: '15%', direction: 'up' }, description: 'Average reach per post' },
    { icon: 'revenue', title: 'Overall Revenue', value: '£15k', description: 'Total revenue from Facebook' },
    { icon: 'completion', title: 'Video Completion', value: '45%', change: { value: '2%', direction: 'down' }, description: 'Videos watched to completion' },
  ],
  x: [
    { icon: 'shares', title: 'Followers', value: '523K', description: 'Total account followers' },
    { icon: 'watchTime', title: 'Impressions', value: '2.1M', change: { value: '18%', direction: 'up' }, description: 'Total post impressions' },
    { icon: 'shopRevenue', title: 'Link Clicks', value: '45.2K', change: { value: '7%', direction: 'down' }, description: 'Clicks on shared links' },
    { icon: 'rpm', title: 'Engagement Rate', value: '2.8%', change: { value: '0.3%', direction: 'up' }, description: 'Engagements per impression' },
    { icon: 'revenue', title: 'Referral Revenue', value: '£6.2k', description: 'Revenue from X referrals' },
    { icon: 'completion', title: 'Video Views', value: '892K', change: { value: '25%', direction: 'up' }, description: 'Total video views' },
  ],
  linkedin: [
    { icon: 'shares', title: 'Followers', value: '125K', description: 'Total company page followers' },
    { icon: 'watchTime', title: 'Post Impressions', value: '456K', change: { value: '32%', direction: 'up' }, description: 'Total post impressions' },
    { icon: 'shopRevenue', title: 'Lead Generation', value: '234', change: { value: '18%', direction: 'up' }, description: 'Leads generated via LinkedIn' },
    { icon: 'rpm', title: 'Engagement Rate', value: '5.2%', change: { value: '1.2%', direction: 'up' }, description: 'Engagements per impression' },
    { icon: 'revenue', title: 'B2B Revenue', value: '£42k', description: 'Revenue attributed to LinkedIn' },
    { icon: 'completion', title: 'Article Reads', value: '12.4K', change: { value: '8%', direction: 'up' }, description: 'Full article reads' },
  ],
  snapchat: [
    { icon: 'shares', title: 'Subscribers', value: '89K', description: 'Total Snapchat subscribers' },
    { icon: 'watchTime', title: 'Story View Time', value: '0.28 mins', change: { value: '5%', direction: 'down' }, description: 'Average story view duration' },
    { icon: 'shopRevenue', title: 'Spotlight Revenue', value: '£2.1k', change: { value: '45%', direction: 'up' }, description: 'Revenue from Spotlight' },
    { icon: 'rpm', title: 'Story Completions', value: '42%', change: { value: '3%', direction: 'down' }, description: 'Stories viewed to completion' },
    { icon: 'revenue', title: 'Overall Revenue', value: '£4.8k', description: 'Total revenue from Snapchat' },
    { icon: 'completion', title: 'Snap Opens', value: '156K', change: { value: '12%', direction: 'up' }, description: 'Total snaps opened' },
  ],
}

/**
 * Icon mapping for stat cards
 */
const STAT_ICONS: Record<StatCardConfig['icon'], React.ReactNode> = {
  shares: <Users className="h-full w-full" />,
  watchTime: <Eye className="h-full w-full" />,
  shopRevenue: <ShoppingBag className="h-full w-full" />,
  rpm: <Coins className="h-full w-full" />,
  revenue: <DollarSign className="h-full w-full" />,
  completion: <CircleCheck className="h-full w-full" />,
}

export interface PlatformDetailPageProps {
  platform: PlatformConfig
}

/**
 * PlatformDetailPage - Displays detailed analytics for a specific platform.
 *
 * Shows:
 * - Content Impact Score with gauge visualization
 * - Platform-specific metrics and insights
 */
export function PlatformDetailPage({ platform }: PlatformDetailPageProps) {
  const { goBack } = useAppNavigation()
  const platformIcon = PLATFORM_ICONS[platform.id]
  const scoreData = PLATFORM_SCORE_DATA[platform.id]
  const industryData = PLATFORM_INDUSTRY_DATA[platform.id]
  const statsData = PLATFORM_STATS_DATA[platform.id]

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleGenerateReport = () => {
    console.log('Generate report for', platform.name)
  }

  return (
    <DashboardLayout
      currentPage={platform.name}
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
        icon={platformIcon}
        label="Platform Report"
        title={platform.name}
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

      {/* Main Content */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Score Card and Industry Comparison */}
        <div className="flex w-full flex-col gap-4 lg:w-1/2">
          <ScoreCard
            title={`Content Impact Score for ${platform.name}`}
            score={scoreData.score}
            status={scoreData.status}
            statusLabel={scoreData.statusLabel}
            changeValue={scoreData.changeValue}
            changeDirection={scoreData.changeDirection}
            titleSize="large"
            titleAlign="center"
          />
          <IndustryComparisonCard
            userScore={industryData.userScore}
            industryLeaderScore={industryData.industryLeaderScore}
            percentageDiff={industryData.percentageDiff}
            comparisonDirection={industryData.comparisonDirection}
            description={industryData.description}
          />
        </div>

        {/* Platform Stats Grid */}
        <div className="grid w-full grid-cols-2 gap-6 lg:flex-1">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              icon={STAT_ICONS[stat.icon]}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
