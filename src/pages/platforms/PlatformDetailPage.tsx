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
  GenderBreakdownCard,
  AgeGroupBreakdownCard,
  LocationBreakdownCard,
  type OutcomeStatus,
  type PieSegmentData,
  type PercentageAgeGroupData,
  type ViewsLocationData,
  type LocationAlert,
} from '@/components/cards'
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
  const growthData = PLATFORM_GROWTH_DATA[platform.id]
  const genderData = PLATFORM_GENDER_DATA[platform.id]
  const ageData = PLATFORM_AGE_DATA[platform.id]
  const locationData = PLATFORM_LOCATION_DATA[platform.id]

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
    </DashboardLayout>
  )
}
