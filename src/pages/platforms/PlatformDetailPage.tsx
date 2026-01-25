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
  Radio,
  Sparkles,
  Target,
  Repeat,
  CircleDollarSign,
  Zap,
  TrendingUp,
} from 'lucide-react'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  ScoreCard,
  IndustryComparisonCard,
  StatCard,
  GenderBreakdownCard,
  AgeGroupBreakdownCard,
  LocationBreakdownCard,
  MetricsCardReusable,
  type OutcomeStatus,
  type PieSegmentData,
  type PercentageAgeGroupData,
  type ViewsLocationData,
  type LocationAlert,
} from '@/components/cards'
import {
  OtherBusinessOutcomesSection,
  AIHotTipsSection,
  ContentPerformanceSection,
  SectionHeader,
  type BusinessOutcome,
  type AITip,
  type ContentItem,
} from '@/components/sections'
import {
  ContentImpactGrowthChart,
  type ChartDataPoint,
} from '@/components/charts'
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

/**
 * Platform growth chart data - would come from API in production
 */
const PLATFORM_GROWTH_DATA: Record<PlatformId, {
  title: string
  description: string
  data: ChartDataPoint[]
}> = {
  youtube: {
    title: 'YouTube Growth',
    description: 'YouTube subscriber changes over the period',
    data: [
      { month: 'Jan', value: 2100000, date: 'Jan 15' },
      { month: 'Feb', value: 2150000, date: 'Feb 12' },
      { month: 'Mar', value: 2180000, date: 'Mar 20' },
      { month: 'Apr', value: 2220000, date: 'Apr 18' },
      { month: 'May', value: 2280000, date: 'May 25' },
      { month: 'Jun', value: 2320000, date: 'Jun 10' },
      { month: 'Jul', value: 2350000, date: 'Jul 22' },
      { month: 'Aug', value: 2380000, date: 'Aug 28' },
      { month: 'Sep', value: 2400000, date: 'Sep 15' },
      { month: 'Oct', value: 2420000, date: 'Oct 8' },
      { month: 'Nov', value: 2450000, date: 'Nov 19' },
      { month: 'Dec', value: 2500000, date: 'Dec 30' },
    ],
  },
  tiktok: {
    title: 'TikTok Growth',
    description: 'TikTok subscriber changes over the period',
    data: [
      { month: 'Jan', value: 15000, date: 'Jan 10' },
      { month: 'Feb', value: 18000, date: 'Feb 14' },
      { month: 'Mar', value: 22000, date: 'Mar 22' },
      { month: 'Apr', value: 28000, date: 'Apr 5' },
      { month: 'May', value: 35000, date: 'May 18' },
      { month: 'Jun', value: 42000, date: 'Jun 28' },
      { month: 'Jul', value: 52000, date: 'Jul 12' },
      { month: 'Aug', value: 40163, date: 'Aug 28' },
      { month: 'Sep', value: 68000, date: 'Sep 9' },
      { month: 'Oct', value: 78000, date: 'Oct 21' },
      { month: 'Nov', value: 88000, date: 'Nov 15' },
      { month: 'Dec', value: 100000, date: 'Dec 25' },
    ],
  },
  instagram: {
    title: 'Instagram Growth',
    description: 'Instagram follower changes over the period',
    data: [
      { month: 'Jan', value: 720000, date: 'Jan 8' },
      { month: 'Feb', value: 735000, date: 'Feb 20' },
      { month: 'Mar', value: 750000, date: 'Mar 15' },
      { month: 'Apr', value: 768000, date: 'Apr 22' },
      { month: 'May', value: 785000, date: 'May 10' },
      { month: 'Jun', value: 800000, date: 'Jun 5' },
      { month: 'Jul', value: 815000, date: 'Jul 18' },
      { month: 'Aug', value: 830000, date: 'Aug 25' },
      { month: 'Sep', value: 842000, date: 'Sep 12' },
      { month: 'Oct', value: 850000, date: 'Oct 30' },
      { month: 'Nov', value: 855000, date: 'Nov 8' },
      { month: 'Dec', value: 865000, date: 'Dec 20' },
    ],
  },
  facebook: {
    title: 'Facebook Growth',
    description: 'Facebook page follower changes over the period',
    data: [
      { month: 'Jan', value: 1050000, date: 'Jan 5' },
      { month: 'Feb', value: 1065000, date: 'Feb 18' },
      { month: 'Mar', value: 1080000, date: 'Mar 12' },
      { month: 'Apr', value: 1095000, date: 'Apr 25' },
      { month: 'May', value: 1110000, date: 'May 8' },
      { month: 'Jun', value: 1125000, date: 'Jun 15' },
      { month: 'Jul', value: 1140000, date: 'Jul 22' },
      { month: 'Aug', value: 1155000, date: 'Aug 10' },
      { month: 'Sep', value: 1170000, date: 'Sep 28' },
      { month: 'Oct', value: 1185000, date: 'Oct 15' },
      { month: 'Nov', value: 1195000, date: 'Nov 5' },
      { month: 'Dec', value: 1210000, date: 'Dec 18' },
    ],
  },
  x: {
    title: 'X Growth',
    description: 'X follower changes over the period',
    data: [
      { month: 'Jan', value: 450000, date: 'Jan 12' },
      { month: 'Feb', value: 458000, date: 'Feb 8' },
      { month: 'Mar', value: 465000, date: 'Mar 25' },
      { month: 'Apr', value: 475000, date: 'Apr 15' },
      { month: 'May', value: 485000, date: 'May 20' },
      { month: 'Jun', value: 492000, date: 'Jun 10' },
      { month: 'Jul', value: 500000, date: 'Jul 5' },
      { month: 'Aug', value: 508000, date: 'Aug 18' },
      { month: 'Sep', value: 515000, date: 'Sep 22' },
      { month: 'Oct', value: 520000, date: 'Oct 10' },
      { month: 'Nov', value: 522000, date: 'Nov 28' },
      { month: 'Dec', value: 525000, date: 'Dec 15' },
    ],
  },
  linkedin: {
    title: 'LinkedIn Growth',
    description: 'LinkedIn company page follower changes over the period',
    data: [
      { month: 'Jan', value: 95000, date: 'Jan 20' },
      { month: 'Feb', value: 98000, date: 'Feb 15' },
      { month: 'Mar', value: 102000, date: 'Mar 8' },
      { month: 'Apr', value: 105000, date: 'Apr 12' },
      { month: 'May', value: 108000, date: 'May 25' },
      { month: 'Jun', value: 112000, date: 'Jun 18' },
      { month: 'Jul', value: 115000, date: 'Jul 10' },
      { month: 'Aug', value: 118000, date: 'Aug 22' },
      { month: 'Sep', value: 120000, date: 'Sep 5' },
      { month: 'Oct', value: 122000, date: 'Oct 28' },
      { month: 'Nov', value: 124000, date: 'Nov 15' },
      { month: 'Dec', value: 128000, date: 'Dec 8' },
    ],
  },
  snapchat: {
    title: 'Snapchat Growth',
    description: 'Snapchat subscriber changes over the period',
    data: [
      { month: 'Jan', value: 65000, date: 'Jan 18' },
      { month: 'Feb', value: 68000, date: 'Feb 10' },
      { month: 'Mar', value: 70000, date: 'Mar 22' },
      { month: 'Apr', value: 72000, date: 'Apr 8' },
      { month: 'May', value: 75000, date: 'May 15' },
      { month: 'Jun', value: 78000, date: 'Jun 25' },
      { month: 'Jul', value: 80000, date: 'Jul 12' },
      { month: 'Aug', value: 82000, date: 'Aug 28' },
      { month: 'Sep', value: 84000, date: 'Sep 18' },
      { month: 'Oct', value: 86000, date: 'Oct 5' },
      { month: 'Nov', value: 88000, date: 'Nov 22' },
      { month: 'Dec', value: 90000, date: 'Dec 10' },
    ],
  },
}

/**
 * Platform gender breakdown data - would come from API in production
 */
const PLATFORM_GENDER_DATA: Record<PlatformId, {
  title: string
  subtitle: string
  data: PieSegmentData[]
}> = {
  youtube: {
    title: 'YouTube by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Men', value: 65, fill: '#0164a3' },
      { label: 'Women', value: 35, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
    ],
  },
  tiktok: {
    title: 'TikTok by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Men', value: 60, fill: '#0164a3' },
      { label: 'Women', value: 40, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
    ],
  },
  instagram: {
    title: 'Instagram by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Women', value: 58, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
      { label: 'Men', value: 42, fill: '#0164a3' },
    ],
  },
  facebook: {
    title: 'Facebook by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Men', value: 52, fill: '#0164a3' },
      { label: 'Women', value: 48, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
    ],
  },
  x: {
    title: 'X by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Men', value: 68, fill: '#0164a3' },
      { label: 'Women', value: 32, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
    ],
  },
  linkedin: {
    title: 'LinkedIn by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Men', value: 57, fill: '#0164a3' },
      { label: 'Women', value: 43, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
    ],
  },
  snapchat: {
    title: 'Snapchat by Gender',
    subtitle: 'Evaluate alignment to your target market',
    data: [
      { label: 'Women', value: 55, fill: '#85c6db', badgeBg: '#f0f9fb', badgeBorder: '#85c6db', badgeText: '#3188a9' },
      { label: 'Men', value: 45, fill: '#0164a3' },
    ],
  },
}

/**
 * Platform age group breakdown data - would come from API in production
 */
const PLATFORM_AGE_DATA: Record<PlatformId, {
  title: string
  subtitle: string
  data: PercentageAgeGroupData[]
}> = {
  youtube: {
    title: 'YouTube by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 22 },
      { ageGroup: '25-34', percentage: 28, isTarget: true },
      { ageGroup: '35-44', percentage: 20, isTarget: true },
      { ageGroup: '45-54', percentage: 15 },
      { ageGroup: '55-64', percentage: 10 },
      { ageGroup: '65+', percentage: 5 },
    ],
  },
  tiktok: {
    title: 'TikTok by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 30 },
      { ageGroup: '25-34', percentage: 25, isTarget: true },
      { ageGroup: '35-44', percentage: 20, isTarget: true },
      { ageGroup: '45-54', percentage: 15 },
      { ageGroup: '55-64', percentage: 5 },
      { ageGroup: '65+', percentage: 5 },
    ],
  },
  instagram: {
    title: 'Instagram by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 28 },
      { ageGroup: '25-34', percentage: 32, isTarget: true },
      { ageGroup: '35-44', percentage: 18, isTarget: true },
      { ageGroup: '45-54', percentage: 12 },
      { ageGroup: '55-64', percentage: 6 },
      { ageGroup: '65+', percentage: 4 },
    ],
  },
  facebook: {
    title: 'Facebook by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 12 },
      { ageGroup: '25-34', percentage: 24, isTarget: true },
      { ageGroup: '35-44', percentage: 26, isTarget: true },
      { ageGroup: '45-54', percentage: 20 },
      { ageGroup: '55-64', percentage: 12 },
      { ageGroup: '65+', percentage: 6 },
    ],
  },
  x: {
    title: 'X by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 18 },
      { ageGroup: '25-34', percentage: 30, isTarget: true },
      { ageGroup: '35-44', percentage: 25, isTarget: true },
      { ageGroup: '45-54', percentage: 15 },
      { ageGroup: '55-64', percentage: 8 },
      { ageGroup: '65+', percentage: 4 },
    ],
  },
  linkedin: {
    title: 'LinkedIn by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 10 },
      { ageGroup: '25-34', percentage: 35, isTarget: true },
      { ageGroup: '35-44', percentage: 28, isTarget: true },
      { ageGroup: '45-54', percentage: 18 },
      { ageGroup: '55-64', percentage: 7 },
      { ageGroup: '65+', percentage: 2 },
    ],
  },
  snapchat: {
    title: 'Snapchat by Age Group',
    subtitle: 'Identify high-performing and underperforming age segments',
    data: [
      { ageGroup: '18-24', percentage: 42, isTarget: true },
      { ageGroup: '25-34', percentage: 28, isTarget: true },
      { ageGroup: '35-44', percentage: 15 },
      { ageGroup: '45-54', percentage: 10 },
      { ageGroup: '55-64', percentage: 3 },
      { ageGroup: '65+', percentage: 2 },
    ],
  },
}

/**
 * Platform location breakdown data - would come from API in production
 */
const PLATFORM_LOCATION_DATA: Record<PlatformId, {
  title: string
  subtitle: string
  metricLabel: string
  data: ViewsLocationData[]
  alerts: LocationAlert[]
}> = {
  youtube: {
    title: 'YouTube Views By Location',
    subtitle: 'YouTube viewers distributed throughout the globe',
    metricLabel: 'Views',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 1250000, isTarget: true },
      { rank: 2, country: 'United Kingdom', countryCode: 'gb', value: 425000, isTarget: true },
      { rank: 3, country: 'Germany', countryCode: 'de', value: 312000 },
      { rank: 4, country: 'Canada', countryCode: 'ca', value: 198000 },
      { rank: 5, country: 'Australia', countryCode: 'au', value: 156000, isTarget: true },
      { rank: 6, country: 'India', countryCode: 'in', value: 89000 },
    ],
    alerts: [
      { type: 'info', message: '52% from the US -', highlightedText: 'strong concentration' },
    ],
  },
  tiktok: {
    title: 'TikTok Views By Location',
    subtitle: 'TikTok viewers distributed throughout the globe',
    metricLabel: 'Views',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 193546, isTarget: true },
      { rank: 2, country: 'Germany', countryCode: 'de', value: 78546, isTarget: true },
      { rank: 3, country: 'Japan', countryCode: 'jp', value: 15546 },
      { rank: 4, country: 'United Kingdom', countryCode: 'gb', value: 9234 },
      { rank: 5, country: 'India', countryCode: 'in', value: 1001, isTarget: true, hasWarning: true },
      { rank: 6, country: 'Australia', countryCode: 'au', value: 453 },
    ],
    alerts: [
      { type: 'error', message: 'India not in the top 3 -', highlightedText: 'review strategy' },
      { type: 'info', message: '65% from the US -', highlightedText: 'highly concentrated' },
    ],
  },
  instagram: {
    title: 'Instagram Followers By Location',
    subtitle: 'Instagram followers distributed throughout the globe',
    metricLabel: 'Followers',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 342000, isTarget: true },
      { rank: 2, country: 'United Kingdom', countryCode: 'gb', value: 156000, isTarget: true },
      { rank: 3, country: 'Brazil', countryCode: 'br', value: 98000 },
      { rank: 4, country: 'Germany', countryCode: 'de', value: 67000 },
      { rank: 5, country: 'France', countryCode: 'fr', value: 45000, isTarget: true },
      { rank: 6, country: 'Mexico', countryCode: 'mx', value: 32000 },
    ],
    alerts: [
      { type: 'info', message: '40% from the US -', highlightedText: 'well distributed' },
    ],
  },
  facebook: {
    title: 'Facebook Followers By Location',
    subtitle: 'Facebook followers distributed throughout the globe',
    metricLabel: 'Followers',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 456000, isTarget: true },
      { rank: 2, country: 'India', countryCode: 'in', value: 234000, isTarget: true },
      { rank: 3, country: 'Brazil', countryCode: 'br', value: 189000 },
      { rank: 4, country: 'Mexico', countryCode: 'mx', value: 98000 },
      { rank: 5, country: 'United Kingdom', countryCode: 'gb', value: 67000 },
      { rank: 6, country: 'Philippines', countryCode: 'ph', value: 45000 },
    ],
    alerts: [
      { type: 'info', message: '38% from the US -', highlightedText: 'diverse audience' },
    ],
  },
  x: {
    title: 'X Followers By Location',
    subtitle: 'X followers distributed throughout the globe',
    metricLabel: 'Followers',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 287000, isTarget: true },
      { rank: 2, country: 'United Kingdom', countryCode: 'gb', value: 89000, isTarget: true },
      { rank: 3, country: 'Japan', countryCode: 'jp', value: 56000 },
      { rank: 4, country: 'Canada', countryCode: 'ca', value: 34000 },
      { rank: 5, country: 'Germany', countryCode: 'de', value: 23000, isTarget: true, hasWarning: true },
      { rank: 6, country: 'France', countryCode: 'fr', value: 18000 },
    ],
    alerts: [
      { type: 'error', message: 'Germany not in the top 3 -', highlightedText: 'review targeting' },
      { type: 'info', message: '55% from the US -', highlightedText: 'moderately concentrated' },
    ],
  },
  linkedin: {
    title: 'LinkedIn Followers By Location',
    subtitle: 'LinkedIn followers distributed throughout the globe',
    metricLabel: 'Followers',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 52000, isTarget: true },
      { rank: 2, country: 'United Kingdom', countryCode: 'gb', value: 23000, isTarget: true },
      { rank: 3, country: 'Germany', countryCode: 'de', value: 15000, isTarget: true },
      { rank: 4, country: 'Canada', countryCode: 'ca', value: 12000 },
      { rank: 5, country: 'Australia', countryCode: 'au', value: 8000 },
      { rank: 6, country: 'France', countryCode: 'fr', value: 6500 },
    ],
    alerts: [
      { type: 'info', message: 'All targets in top 3 -', highlightedText: 'excellent performance' },
    ],
  },
  snapchat: {
    title: 'Snapchat Subscribers By Location',
    subtitle: 'Snapchat subscribers distributed throughout the globe',
    metricLabel: 'Subscribers',
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', value: 45000, isTarget: true },
      { rank: 2, country: 'United Kingdom', countryCode: 'gb', value: 18000, isTarget: true },
      { rank: 3, country: 'France', countryCode: 'fr', value: 8500 },
      { rank: 4, country: 'Germany', countryCode: 'de', value: 6200, isTarget: true, hasWarning: true },
      { rank: 5, country: 'Canada', countryCode: 'ca', value: 4800 },
      { rank: 6, country: 'Australia', countryCode: 'au', value: 3200 },
    ],
    alerts: [
      { type: 'error', message: 'Germany not in the top 3 -', highlightedText: 'needs attention' },
      { type: 'info', message: '51% from the US -', highlightedText: 'highly concentrated' },
    ],
  },
}

/**
 * Business outcome data structure for selected outcomes (matches MetricsCardReusable)
 */
interface BusinessOutcomeData {
  score: number
  statusLabel: string
  changeDirection: 'up' | 'down'
  changeValue: string
  stats: {
    efficiency: { value: number | string; unit?: string }
    growth: { value: string }
  }
}

/**
 * Platform-specific business outcomes data - would come from API in production
 * Data structure matches MetricsCardReusable component props
 */
const PLATFORM_BUSINESS_OUTCOMES: Record<PlatformId, {
  brandAwareness: BusinessOutcomeData
  engagement: BusinessOutcomeData
  targeting: BusinessOutcomeData
}> = {
  youtube: {
    brandAwareness: {
      score: 756,
      statusLabel: 'Strong',
      changeDirection: 'up',
      changeValue: '18%',
      stats: { efficiency: { value: 234, unit: '/post' }, growth: { value: '+ 54%' } },
    },
    engagement: {
      score: 564,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '12%',
      stats: { efficiency: { value: 189, unit: '/post' }, growth: { value: '+ 32%' } },
    },
    targeting: {
      score: 312,
      statusLabel: 'Underperforming',
      changeDirection: 'down',
      changeValue: '8%',
      stats: { efficiency: { value: 98, unit: '/post' }, growth: { value: '- 12%' } },
    },
  },
  tiktok: {
    brandAwareness: {
      score: 645,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '22%',
      stats: { efficiency: { value: 312, unit: '/post' }, growth: { value: '+ 67%' } },
    },
    engagement: {
      score: 789,
      statusLabel: 'Strong',
      changeDirection: 'up',
      changeValue: '35%',
      stats: { efficiency: { value: 456, unit: '/post' }, growth: { value: '+ 89%' } },
    },
    targeting: {
      score: 423,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '5%',
      stats: { efficiency: { value: 167, unit: '/post' }, growth: { value: '+ 15%' } },
    },
  },
  instagram: {
    brandAwareness: {
      score: 698,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '15%',
      stats: { efficiency: { value: 267, unit: '/post' }, growth: { value: '+ 42%' } },
    },
    engagement: {
      score: 834,
      statusLabel: 'Strong',
      changeDirection: 'up',
      changeValue: '28%',
      stats: { efficiency: { value: 398, unit: '/post' }, growth: { value: '+ 56%' } },
    },
    targeting: {
      score: 567,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '10%',
      stats: { efficiency: { value: 203, unit: '/post' }, growth: { value: '+ 23%' } },
    },
  },
  facebook: {
    brandAwareness: {
      score: 534,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '8%',
      stats: { efficiency: { value: 178, unit: '/post' }, growth: { value: '+ 18%' } },
    },
    engagement: {
      score: 456,
      statusLabel: 'Healthy',
      changeDirection: 'down',
      changeValue: '3%',
      stats: { efficiency: { value: 145, unit: '/post' }, growth: { value: '+ 5%' } },
    },
    targeting: {
      score: 623,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '12%',
      stats: { efficiency: { value: 234, unit: '/post' }, growth: { value: '+ 28%' } },
    },
  },
  x: {
    brandAwareness: {
      score: 478,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '6%',
      stats: { efficiency: { value: 156, unit: '/post' }, growth: { value: '+ 12%' } },
    },
    engagement: {
      score: 534,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '9%',
      stats: { efficiency: { value: 189, unit: '/post' }, growth: { value: '+ 21%' } },
    },
    targeting: {
      score: 345,
      statusLabel: 'Underperforming',
      changeDirection: 'down',
      changeValue: '5%',
      stats: { efficiency: { value: 112, unit: '/post' }, growth: { value: '- 8%' } },
    },
  },
  linkedin: {
    brandAwareness: {
      score: 712,
      statusLabel: 'Strong',
      changeDirection: 'up',
      changeValue: '20%',
      stats: { efficiency: { value: 289, unit: '/post' }, growth: { value: '+ 45%' } },
    },
    engagement: {
      score: 498,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '7%',
      stats: { efficiency: { value: 167, unit: '/post' }, growth: { value: '+ 16%' } },
    },
    targeting: {
      score: 856,
      statusLabel: 'Strong',
      changeDirection: 'up',
      changeValue: '25%',
      stats: { efficiency: { value: 378, unit: '/post' }, growth: { value: '+ 52%' } },
    },
  },
  snapchat: {
    brandAwareness: {
      score: 389,
      statusLabel: 'Underperforming',
      changeDirection: 'down',
      changeValue: '12%',
      stats: { efficiency: { value: 89, unit: '/post' }, growth: { value: '- 18%' } },
    },
    engagement: {
      score: 512,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '8%',
      stats: { efficiency: { value: 178, unit: '/post' }, growth: { value: '+ 22%' } },
    },
    targeting: {
      score: 445,
      statusLabel: 'Healthy',
      changeDirection: 'up',
      changeValue: '3%',
      stats: { efficiency: { value: 145, unit: '/post' }, growth: { value: '+ 8%' } },
    },
  },
}

/**
 * Platform-specific other business outcomes - would come from API in production
 * Data structure matches OtherBusinessOutcomesSection component props (BusinessOutcome[])
 */
type OutcomeSectionStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

interface OtherOutcomeData {
  score: number
  status: OutcomeSectionStatus
  growth: string
  growthDirection: 'up' | 'down'
}

const PLATFORM_OTHER_OUTCOMES: Record<PlatformId, {
  audienceSatisfaction: OtherOutcomeData
  audienceLoyalty: OtherOutcomeData
}> = {
  youtube: {
    audienceSatisfaction: { score: 823, status: 'exceptional', growth: '+ 15%', growthDirection: 'up' },
    audienceLoyalty: { score: 756, status: 'strong', growth: '+ 12%', growthDirection: 'up' },
  },
  tiktok: {
    audienceSatisfaction: { score: 567, status: 'healthy', growth: '+ 8%', growthDirection: 'up' },
    audienceLoyalty: { score: 423, status: 'at-risk', growth: '- 5%', growthDirection: 'down' },
  },
  instagram: {
    audienceSatisfaction: { score: 745, status: 'strong', growth: '+ 18%', growthDirection: 'up' },
    audienceLoyalty: { score: 689, status: 'healthy', growth: '+ 10%', growthDirection: 'up' },
  },
  facebook: {
    audienceSatisfaction: { score: 512, status: 'healthy', growth: '+ 4%', growthDirection: 'up' },
    audienceLoyalty: { score: 634, status: 'healthy', growth: '+ 7%', growthDirection: 'up' },
  },
  x: {
    audienceSatisfaction: { score: 478, status: 'at-risk', growth: '- 3%', growthDirection: 'down' },
    audienceLoyalty: { score: 534, status: 'healthy', growth: '+ 5%', growthDirection: 'up' },
  },
  linkedin: {
    audienceSatisfaction: { score: 789, status: 'strong', growth: '+ 22%', growthDirection: 'up' },
    audienceLoyalty: { score: 712, status: 'strong', growth: '+ 15%', growthDirection: 'up' },
  },
  snapchat: {
    audienceSatisfaction: { score: 398, status: 'at-risk', growth: '- 8%', growthDirection: 'down' },
    audienceLoyalty: { score: 356, status: 'at-risk', growth: '- 12%', growthDirection: 'down' },
  },
}

/**
 * Platform-specific AI hot tips - would come from API in production
 * Data structure matches AIHotTipsSection component props
 */
const PLATFORM_AI_TIPS: Record<PlatformId, AITip[]> = {
  youtube: [
    {
      id: 'yt-pacing',
      title: 'Experiment with Faster Pacing',
      riskLevel: 'high',
      bullets: [
        { text: 'Your average words-per-minute is lower than top performers', variant: 'muted' },
        { text: 'Slightly faster delivery can improve retention.', variant: 'default' },
      ],
    },
    {
      id: 'yt-chapters',
      title: 'Add Chapters to your videos',
      riskLevel: 'low',
      bullets: [
        { text: 'Videos over 8 minutes perform better with chapters', variant: 'muted' },
        { text: 'Break your content into sections to improve user experience', variant: 'default' },
      ],
    },
  ],
  tiktok: [
    {
      id: 'tt-frequency',
      title: 'Increase Posting Frequency',
      riskLevel: 'high',
      bullets: [
        { text: 'Top performers post 3-5 times daily on TikTok', variant: 'muted' },
        { text: 'Your current frequency is below optimal engagement threshold.', variant: 'default' },
      ],
    },
    {
      id: 'tt-audio',
      title: 'Use Trending Audio',
      riskLevel: 'low',
      bullets: [
        { text: 'Videos with trending sounds get 2.5x more reach', variant: 'muted' },
        { text: 'Update audio choices weekly to stay relevant', variant: 'default' },
      ],
    },
  ],
  instagram: [
    {
      id: 'ig-timing',
      title: 'Optimize Posting Times',
      riskLevel: 'low',
      bullets: [
        { text: 'Your audience is most active between 6-9 PM', variant: 'muted' },
        { text: 'Shift posting schedule to maximize engagement', variant: 'default' },
      ],
    },
    {
      id: 'ig-reels',
      title: 'Improve Reel Quality',
      riskLevel: 'high',
      bullets: [
        { text: 'Reel completion rate is 15% below benchmark', variant: 'muted' },
        { text: 'Focus on stronger hooks in the first 3 seconds', variant: 'default' },
      ],
    },
  ],
  facebook: [
    {
      id: 'fb-groups',
      title: 'Leverage Facebook Groups',
      riskLevel: 'low',
      bullets: [
        { text: 'Group posts get 3x more organic reach', variant: 'muted' },
        { text: 'Create or join niche communities for better engagement', variant: 'default' },
      ],
    },
    {
      id: 'fb-reach',
      title: 'Address Declining Reach',
      riskLevel: 'high',
      bullets: [
        { text: 'Organic reach has dropped 20% this quarter', variant: 'muted' },
        { text: 'Consider boosting high-performing posts', variant: 'default' },
      ],
    },
  ],
  x: [
    {
      id: 'x-threads',
      title: 'Increase Thread Usage',
      riskLevel: 'high',
      bullets: [
        { text: 'Threads get 5x more engagement than single posts', variant: 'muted' },
        { text: 'Break down longer content into engaging threads', variant: 'default' },
      ],
    },
    {
      id: 'x-hashtags',
      title: 'Optimize Hashtag Strategy',
      riskLevel: 'low',
      bullets: [
        { text: 'Use 2-3 relevant hashtags per post maximum', variant: 'muted' },
        { text: 'Research trending topics in your niche', variant: 'default' },
      ],
    },
  ],
  linkedin: [
    {
      id: 'li-native',
      title: 'Post More Native Content',
      riskLevel: 'low',
      bullets: [
        { text: 'Native LinkedIn content gets 10x more reach than links', variant: 'muted' },
        { text: 'Share insights and stories directly on the platform', variant: 'default' },
      ],
    },
    {
      id: 'li-comments',
      title: 'Engage with Comments',
      riskLevel: 'low',
      bullets: [
        { text: 'Replying to comments boosts post visibility significantly', variant: 'muted' },
        { text: 'Aim to respond within the first hour of posting', variant: 'default' },
      ],
    },
  ],
  snapchat: [
    {
      id: 'sc-retention',
      title: 'Improve Story Retention',
      riskLevel: 'high',
      bullets: [
        { text: 'Story completion rate is significantly below average', variant: 'muted' },
        { text: 'Make stories more interactive with polls and questions', variant: 'default' },
      ],
    },
    {
      id: 'sc-ar',
      title: 'Increase AR Lens Usage',
      riskLevel: 'high',
      bullets: [
        { text: 'AR content drives higher engagement on Snapchat', variant: 'muted' },
        { text: 'Create branded lenses to boost brand awareness', variant: 'default' },
      ],
    },
  ],
}

/**
 * Platform-specific top and worst performing content - would come from API in production
 */
const PLATFORM_CONTENT_DATA: Record<PlatformId, {
  topItems: ContentItem[]
  worstItems: ContentItem[]
}> = {
  youtube: {
    topItems: [
      { id: 'yt-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=108&fit=crop', platform: 'youtube', title: 'Behind the Scenes', artist: 'Studio Sessions', dateUploaded: '15 Jul, 2025', score: 892, status: 'exceptional' },
      { id: 'yt-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=108&fit=crop', platform: 'youtube', title: 'Music Production Tips', artist: 'Producer Masterclass', dateUploaded: '8 Jul, 2025', score: 845, status: 'exceptional' },
      { id: 'yt-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=108&fit=crop', platform: 'youtube', title: 'Live Concert Highlights', artist: 'Summer Tour 2025', dateUploaded: '1 Jul, 2025', score: 798, status: 'strong' },
    ],
    worstItems: [
      { id: 'yt-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=108&fit=crop', platform: 'youtube', title: 'Q&A Session', artist: 'Fan Questions', dateUploaded: '20 Jun, 2025', score: 412, status: 'at-risk' },
      { id: 'yt-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=200&h=108&fit=crop', platform: 'youtube', title: 'Equipment Review', artist: 'Gear Talk', dateUploaded: '15 Jun, 2025', score: 356, status: 'underperforming' },
      { id: 'yt-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=200&h=108&fit=crop', platform: 'youtube', title: 'Old Archive Footage', artist: 'Throwback', dateUploaded: '10 Jun, 2025', score: 287, status: 'underperforming' },
    ],
  },
  tiktok: {
    topItems: [
      { id: 'tt-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=108&fit=crop', platform: 'tiktok', title: 'A BUGS LIFE', artist: 'Sudan Archives', dateUploaded: '21 Jul, 2025', score: 848, status: 'exceptional' },
      { id: 'tt-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=108&fit=crop', platform: 'tiktok', title: 'La Rumba del Perdón', artist: 'Rosalia', dateUploaded: '5 Nov, 2025', score: 813, status: 'exceptional' },
      { id: 'tt-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=108&fit=crop', platform: 'tiktok', title: 'Nausicaä (Love Will Be Revealed)', artist: 'Cameron Winter', dateUploaded: '24 Jun, 2025', score: 731, status: 'strong' },
    ],
    worstItems: [
      { id: 'tt-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=108&fit=crop', platform: 'tiktok', title: 'viscus', artist: 'Oklu & FKA Twigs', dateUploaded: '18 Aug, 2025', score: 567, status: 'healthy' },
      { id: 'tt-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=108&fit=crop', platform: 'tiktok', title: 'Automatic Love', artist: 'Nourished by Time', dateUploaded: '23 Aug, 2025', score: 287, status: 'underperforming' },
      { id: 'tt-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=200&h=108&fit=crop', platform: 'tiktok', title: 'Not Hell, Not Heaven', artist: 'Scowl', dateUploaded: '5 Feb, 2025', score: 181, status: 'underperforming' },
    ],
  },
  instagram: {
    topItems: [
      { id: 'ig-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=108&fit=crop', platform: 'instagram', title: 'Festival Vibes', artist: 'Summer Fest 2025', dateUploaded: '18 Jul, 2025', score: 876, status: 'exceptional' },
      { id: 'ig-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=108&fit=crop', platform: 'instagram', title: 'Studio Magic', artist: 'Recording Session', dateUploaded: '12 Jul, 2025', score: 834, status: 'exceptional' },
      { id: 'ig-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=108&fit=crop', platform: 'instagram', title: 'Fan Meet & Greet', artist: 'Tour Memories', dateUploaded: '5 Jul, 2025', score: 789, status: 'strong' },
    ],
    worstItems: [
      { id: 'ig-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=108&fit=crop', platform: 'instagram', title: 'Merchandise Drop', artist: 'New Collection', dateUploaded: '25 Jun, 2025', score: 445, status: 'at-risk' },
      { id: 'ig-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=200&h=108&fit=crop', platform: 'instagram', title: 'Podcast Clip', artist: 'Interview Highlights', dateUploaded: '20 Jun, 2025', score: 378, status: 'underperforming' },
      { id: 'ig-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=200&h=108&fit=crop', platform: 'instagram', title: 'Throwback Photo', artist: 'Memory Lane', dateUploaded: '15 Jun, 2025', score: 298, status: 'underperforming' },
    ],
  },
  facebook: {
    topItems: [
      { id: 'fb-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200&h=108&fit=crop', platform: 'facebook', title: 'Live Stream Event', artist: 'Virtual Concert', dateUploaded: '20 Jul, 2025', score: 723, status: 'strong' },
      { id: 'fb-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=108&fit=crop', platform: 'facebook', title: 'Behind the Music', artist: 'Documentary', dateUploaded: '14 Jul, 2025', score: 678, status: 'healthy' },
      { id: 'fb-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=200&h=108&fit=crop', platform: 'facebook', title: 'Fan Appreciation', artist: 'Thank You Post', dateUploaded: '8 Jul, 2025', score: 634, status: 'healthy' },
    ],
    worstItems: [
      { id: 'fb-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=200&h=108&fit=crop', platform: 'facebook', title: 'News Update', artist: 'Announcement', dateUploaded: '28 Jun, 2025', score: 345, status: 'underperforming' },
      { id: 'fb-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1497911174120-042e5c0886e2?w=200&h=108&fit=crop', platform: 'facebook', title: 'Shared Article', artist: 'Press Coverage', dateUploaded: '22 Jun, 2025', score: 289, status: 'underperforming' },
      { id: 'fb-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=108&fit=crop', platform: 'facebook', title: 'Text Post', artist: 'Quick Update', dateUploaded: '18 Jun, 2025', score: 198, status: 'underperforming' },
    ],
  },
  x: {
    topItems: [
      { id: 'x-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=108&fit=crop', platform: 'x', title: 'Album Teaser', artist: 'New Release', dateUploaded: '22 Jul, 2025', score: 645, status: 'healthy' },
      { id: 'x-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=200&h=108&fit=crop', platform: 'x', title: 'Industry Take', artist: 'Hot Take Thread', dateUploaded: '16 Jul, 2025', score: 598, status: 'healthy' },
      { id: 'x-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=200&h=108&fit=crop', platform: 'x', title: 'Collaboration Reveal', artist: 'Surprise Drop', dateUploaded: '10 Jul, 2025', score: 534, status: 'healthy' },
    ],
    worstItems: [
      { id: 'x-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=108&fit=crop', platform: 'x', title: 'Repost', artist: 'Shared Content', dateUploaded: '1 Jul, 2025', score: 234, status: 'underperforming' },
      { id: 'x-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=108&fit=crop', platform: 'x', title: 'Reply Thread', artist: 'Fan Interaction', dateUploaded: '25 Jun, 2025', score: 189, status: 'underperforming' },
      { id: 'x-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=108&fit=crop', platform: 'x', title: 'Poll Results', artist: 'Community Vote', dateUploaded: '20 Jun, 2025', score: 156, status: 'underperforming' },
    ],
  },
  linkedin: {
    topItems: [
      { id: 'li-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=108&fit=crop', platform: 'linkedin', title: 'Industry Insights', artist: 'Music Business', dateUploaded: '19 Jul, 2025', score: 812, status: 'exceptional' },
      { id: 'li-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=108&fit=crop', platform: 'linkedin', title: 'Career Milestone', artist: 'Achievement Post', dateUploaded: '13 Jul, 2025', score: 756, status: 'strong' },
      { id: 'li-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=108&fit=crop', platform: 'linkedin', title: 'Team Spotlight', artist: 'Behind the Scenes', dateUploaded: '7 Jul, 2025', score: 698, status: 'healthy' },
    ],
    worstItems: [
      { id: 'li-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=108&fit=crop', platform: 'linkedin', title: 'Job Posting', artist: 'Hiring Update', dateUploaded: '30 Jun, 2025', score: 345, status: 'underperforming' },
      { id: 'li-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=200&h=108&fit=crop', platform: 'linkedin', title: 'Shared Article', artist: 'Industry News', dateUploaded: '24 Jun, 2025', score: 267, status: 'underperforming' },
      { id: 'li-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=200&h=108&fit=crop', platform: 'linkedin', title: 'Generic Update', artist: 'Company News', dateUploaded: '18 Jun, 2025', score: 198, status: 'underperforming' },
    ],
  },
  snapchat: {
    topItems: [
      { id: 'sc-1', rank: 1, thumbnail: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200&h=108&fit=crop', platform: 'snapchat', title: 'AR Lens Launch', artist: 'Interactive Filter', dateUploaded: '21 Jul, 2025', score: 534, status: 'healthy' },
      { id: 'sc-2', rank: 2, thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=108&fit=crop', platform: 'snapchat', title: 'Day in the Life', artist: 'Story Series', dateUploaded: '15 Jul, 2025', score: 478, status: 'at-risk' },
      { id: 'sc-3', rank: 3, thumbnail: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=200&h=108&fit=crop', platform: 'snapchat', title: 'Exclusive Preview', artist: 'Sneak Peek', dateUploaded: '9 Jul, 2025', score: 423, status: 'at-risk' },
    ],
    worstItems: [
      { id: 'sc-8', rank: 8, thumbnail: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=200&h=108&fit=crop', platform: 'snapchat', title: 'Random Story', artist: 'Daily Update', dateUploaded: '2 Jul, 2025', score: 198, status: 'underperforming' },
      { id: 'sc-9', rank: 9, thumbnail: 'https://images.unsplash.com/photo-1497911174120-042e5c0886e2?w=200&h=108&fit=crop', platform: 'snapchat', title: 'Quick Snap', artist: 'Casual Post', dateUploaded: '26 Jun, 2025', score: 156, status: 'underperforming' },
      { id: 'sc-10', rank: 10, thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=108&fit=crop', platform: 'snapchat', title: 'Reposted Content', artist: 'Shared Snap', dateUploaded: '20 Jun, 2025', score: 112, status: 'underperforming' },
    ],
  },
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
  const { goBack, goToPlatformOutcome } = useAppNavigation()
  const platformIcon = PLATFORM_ICONS[platform.id]
  const scoreData = PLATFORM_SCORE_DATA[platform.id]
  const industryData = PLATFORM_INDUSTRY_DATA[platform.id]
  const statsData = PLATFORM_STATS_DATA[platform.id]
  const growthData = PLATFORM_GROWTH_DATA[platform.id]
  const genderData = PLATFORM_GENDER_DATA[platform.id]
  const ageData = PLATFORM_AGE_DATA[platform.id]
  const locationData = PLATFORM_LOCATION_DATA[platform.id]
  const businessOutcomes = PLATFORM_BUSINESS_OUTCOMES[platform.id]
  const otherOutcomes = PLATFORM_OTHER_OUTCOMES[platform.id]
  const aiTips = PLATFORM_AI_TIPS[platform.id]
  const contentData = PLATFORM_CONTENT_DATA[platform.id]

  // Build other outcomes data for OtherBusinessOutcomesSection
  const otherOutcomesData: BusinessOutcome[] = [
    {
      id: 'audience-satisfaction',
      icon: Repeat,
      title: 'Audience Satisfaction',
      subtitle: 'Overall viewer sentiment and feedback',
      score: otherOutcomes.audienceSatisfaction.score,
      status: otherOutcomes.audienceSatisfaction.status,
      growth: otherOutcomes.audienceSatisfaction.growth,
      growthDirection: otherOutcomes.audienceSatisfaction.growthDirection,
    },
    {
      id: 'audience-loyalty',
      icon: CircleDollarSign,
      title: 'Audience Loyalty',
      subtitle: 'Repeat viewers and subscriber retention',
      score: otherOutcomes.audienceLoyalty.score,
      status: otherOutcomes.audienceLoyalty.status,
      growth: otherOutcomes.audienceLoyalty.growth,
      growthDirection: otherOutcomes.audienceLoyalty.growthDirection,
    },
  ]

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
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch">
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
            className="flex-1"
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

      {/* Growth Chart, Gender Breakdown, and Age Group Breakdown */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <ContentImpactGrowthChart
          title={growthData.title}
          description={growthData.description}
          data={growthData.data}
          showHeaderMetrics={false}
          showYAxis={true}
          showSeparator={true}
          simpleTooltip={true}
          className="lg:flex-1"
        />
        <GenderBreakdownCard
          variant="pie"
          title={genderData.title}
          subtitle={genderData.subtitle}
          data={genderData.data}
          className="lg:w-auto lg:min-w-[300px]"
        />
        <AgeGroupBreakdownCard
          variant="percentage"
          title={ageData.title}
          subtitle={ageData.subtitle}
          data={ageData.data}
          className="lg:w-auto lg:min-w-[380px]"
        />
      </div>

      {/* Location Breakdown */}
      <div className="mt-6">
        <LocationBreakdownCard
          variant="views"
          title={locationData.title}
          subtitle={locationData.subtitle}
          data={locationData.data}
          metricLabel={locationData.metricLabel}
          alerts={locationData.alerts}
        />
      </div>

      {/* Selected Business Outcomes Section */}
      <div className="mt-10">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground">Selected Business Outcomes</h2>
          <p className="text-sm text-muted-foreground">
            How {platform.name} is performing across your chosen areas
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <MetricsCardReusable
            icon={Radio}
            title="Brand Awareness"
            subtitle="Reach, visibility & impressions"
            score={businessOutcomes.brandAwareness.score}
            statusLabel={businessOutcomes.brandAwareness.statusLabel}
            changeValue={businessOutcomes.brandAwareness.changeValue}
            changeDirection={businessOutcomes.brandAwareness.changeDirection}
            stats={[
              { icon: Zap, label: 'Efficiency', value: businessOutcomes.brandAwareness.stats.efficiency.value, unit: businessOutcomes.brandAwareness.stats.efficiency.unit },
              { icon: TrendingUp, label: 'Growth', value: businessOutcomes.brandAwareness.stats.growth.value },
            ]}
            onMoreDetail={() => goToPlatformOutcome(platform.id, 'brand-awareness')}
            className="lg:flex-1"
          />
          <MetricsCardReusable
            icon={Sparkles}
            title="Engagement"
            subtitle="Likes, comments & interactions"
            score={businessOutcomes.engagement.score}
            statusLabel={businessOutcomes.engagement.statusLabel}
            changeValue={businessOutcomes.engagement.changeValue}
            changeDirection={businessOutcomes.engagement.changeDirection}
            stats={[
              { icon: Zap, label: 'Efficiency', value: businessOutcomes.engagement.stats.efficiency.value, unit: businessOutcomes.engagement.stats.efficiency.unit },
              { icon: TrendingUp, label: 'Growth', value: businessOutcomes.engagement.stats.growth.value },
            ]}
            onMoreDetail={() => goToPlatformOutcome(platform.id, 'engagement')}
            className="lg:flex-1"
          />
          <MetricsCardReusable
            icon={Target}
            title="Targeting"
            subtitle="Audience alignment"
            score={businessOutcomes.targeting.score}
            statusLabel={businessOutcomes.targeting.statusLabel}
            changeValue={businessOutcomes.targeting.changeValue}
            changeDirection={businessOutcomes.targeting.changeDirection}
            stats={[
              { icon: Zap, label: 'Efficiency', value: businessOutcomes.targeting.stats.efficiency.value, unit: businessOutcomes.targeting.stats.efficiency.unit },
              { icon: TrendingUp, label: 'Growth', value: businessOutcomes.targeting.stats.growth.value },
            ]}
            onMoreDetail={() => goToPlatformOutcome(platform.id, 'targeting')}
            className="lg:flex-1"
          />
        </div>
      </div>

      {/* Other Business Outcomes and AI Hot Tips Row */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <OtherBusinessOutcomesSection
          title="Other Business Outcomes"
          subtitle={`How ${platform.name} is performing in non-focus areas`}
          outcomes={otherOutcomesData}
          onMoreDetail={(outcomeId) => goToPlatformOutcome(platform.id, outcomeId as 'audience-satisfaction' | 'audience-loyalty')}
          className="lg:w-2/3"
        />
        <AIHotTipsSection
          tips={aiTips}
          className="lg:w-1/3"
        />
      </div>

      {/* Top and Worst Performing Content */}
      <div className="mt-10">
        <SectionHeader
          title="Content Performance"
          subtitle={`Your best and worst performing ${platform.name} Content`}
          className="mb-4"
        />
        <ContentPerformanceSection
          topItems={contentData.topItems}
          worstItems={contentData.worstItems}
        />
      </div>
    </DashboardLayout>
  )
}
