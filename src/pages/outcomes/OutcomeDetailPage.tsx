import {
  ArrowLeft,
  FileText,
  CalendarClock,
  Hourglass,
  Clock,
  Users,
  UserCheck,
  Eye,
  Newspaper,
  DollarSign,
  Youtube,
  Instagram,
  Music2,
  Facebook,
  Twitter,
  Linkedin,
  Ghost,
} from 'lucide-react'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  OutcomeScoreCard,
  OutcomeDescriptionCard,
  IndustryComparisonCard,
  AgeGroupBreakdownCard,
  GenderBreakdownCard,
  LocationBreakdownCard,
  PlatformScoreCard,
  AIHotTipsCard,
  MetricsExplainedCard,
  DEFAULT_AI_TIPS,
  type OutcomeStatus,
  type AgeGroupData,
  type GenderScoreData,
  type LocationData,
  type PlatformMetric,
  type MetricIndicator,
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

// Location breakdown data for each outcome
const LOCATION_DATA: Record<OutcomeId, {
  data: LocationData[]
  insightText: string
}> = {
  'brand-awareness': {
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', subscribers: '360K', score: 848, status: 'exceptional' },
      { rank: 2, country: 'Germany', countryCode: 'de', subscribers: '26K', score: 812, status: 'exceptional' },
      { rank: 3, country: 'Japan', countryCode: 'jp', subscribers: '50k', score: 764, status: 'strong' },
      { rank: 4, country: 'United Kingdom', countryCode: 'gb', subscribers: '15k', score: 524, status: 'healthy' },
      { rank: 5, country: 'India', countryCode: 'in', subscribers: '135k', score: 325, status: 'at-risk', isTarget: true },
      { rank: 6, country: 'Australia', countryCode: 'au', subscribers: '5k', score: 263, status: 'underperforming' },
      { rank: 7, country: 'Brazil', countryCode: 'br', subscribers: '2k', score: 263, status: 'underperforming' },
    ],
    insightText: 'Brand Awareness remains strongest in mature markets, highlighting significant growth potential across developing regions.',
  },
  'engagement': {
    data: [
      { rank: 1, country: 'Japan', countryCode: 'jp', subscribers: '50k', score: 312, status: 'underperforming' },
      { rank: 2, country: 'USA', countryCode: 'us', subscribers: '360K', score: 287, status: 'underperforming' },
      { rank: 3, country: 'Germany', countryCode: 'de', subscribers: '26K', score: 245, status: 'underperforming' },
      { rank: 4, country: 'United Kingdom', countryCode: 'gb', subscribers: '15k', score: 198, status: 'underperforming' },
      { rank: 5, country: 'India', countryCode: 'in', subscribers: '135k', score: 156, status: 'underperforming', isTarget: true },
      { rank: 6, country: 'Australia', countryCode: 'au', subscribers: '5k', score: 134, status: 'underperforming' },
      { rank: 7, country: 'Brazil', countryCode: 'br', subscribers: '2k', score: 98, status: 'underperforming' },
    ],
    insightText: 'Engagement scores are consistently low across all regions, indicating a need for content strategy improvements globally.',
  },
  'targeting': {
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', subscribers: '360K', score: 756, status: 'strong' },
      { rank: 2, country: 'Germany', countryCode: 'de', subscribers: '26K', score: 712, status: 'strong' },
      { rank: 3, country: 'United Kingdom', countryCode: 'gb', subscribers: '15k', score: 678, status: 'healthy' },
      { rank: 4, country: 'Japan', countryCode: 'jp', subscribers: '50k', score: 645, status: 'healthy' },
      { rank: 5, country: 'India', countryCode: 'in', subscribers: '135k', score: 534, status: 'healthy', isTarget: true },
      { rank: 6, country: 'Australia', countryCode: 'au', subscribers: '5k', score: 456, status: 'healthy' },
      { rank: 7, country: 'Brazil', countryCode: 'br', subscribers: '2k', score: 389, status: 'at-risk' },
    ],
    insightText: 'Targeting accuracy is strong in Western markets but shows room for improvement in emerging regions.',
  },
  'audience-satisfaction': {
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', subscribers: '360K', score: 848, status: 'exceptional' },
      { rank: 2, country: 'Germany', countryCode: 'de', subscribers: '26K', score: 812, status: 'exceptional' },
      { rank: 3, country: 'Japan', countryCode: 'jp', subscribers: '50k', score: 764, status: 'strong' },
      { rank: 4, country: 'United Kingdom', countryCode: 'gb', subscribers: '15k', score: 524, status: 'healthy' },
      { rank: 5, country: 'India', countryCode: 'in', subscribers: '135k', score: 325, status: 'at-risk', isTarget: true },
      { rank: 6, country: 'Australia', countryCode: 'au', subscribers: '5k', score: 263, status: 'underperforming' },
      { rank: 7, country: 'Brazil', countryCode: 'br', subscribers: '2k', score: 263, status: 'underperforming' },
    ],
    insightText: 'Audience Satisfaction remains strongest in mature markets, highlighting significant growth potential across developing regions.',
  },
  'audience-loyalty': {
    data: [
      { rank: 1, country: 'USA', countryCode: 'us', subscribers: '360K', score: 678, status: 'healthy' },
      { rank: 2, country: 'Japan', countryCode: 'jp', subscribers: '50k', score: 623, status: 'healthy' },
      { rank: 3, country: 'Germany', countryCode: 'de', subscribers: '26K', score: 589, status: 'healthy' },
      { rank: 4, country: 'United Kingdom', countryCode: 'gb', subscribers: '15k', score: 512, status: 'healthy' },
      { rank: 5, country: 'India', countryCode: 'in', subscribers: '135k', score: 423, status: 'healthy', isTarget: true },
      { rank: 6, country: 'Australia', countryCode: 'au', subscribers: '5k', score: 356, status: 'at-risk' },
      { rank: 7, country: 'Brazil', countryCode: 'br', subscribers: '2k', score: 298, status: 'underperforming' },
    ],
    insightText: 'Audience Loyalty shows consistent performance across regions with opportunities to strengthen retention in APAC and LATAM.',
  },
}

// Metrics explained data for each outcome
const METRICS_EXPLAINED_DATA: Record<OutcomeId, {
  subtitle: string
  methodologyDescription: string
  indicators: MetricIndicator[]
}> = {
  'brand-awareness': {
    subtitle: 'How we measure Brand Awareness',
    methodologyDescription: 'The Brand Awareness Score provides a single, consolidated view of how well your brand is recognized across platforms. It is based on a structured framework of reach and visibility indicators drawn from platform-level and owned-channel data sources.',
    indicators: [
      { icon: Users, label: 'Estimated Reach', description: 'Estimated breadth of audience exposure across platforms' },
      { icon: UserCheck, label: 'Reach', description: 'Actual unique audience exposure' },
      { icon: Eye, label: 'Impressions', description: 'Frequency of content visibility' },
      { icon: Newspaper, label: 'Post Views', description: 'Consumption of individual content items' },
      { icon: FileText, label: 'Page Views', description: 'Engagement with owned web properties' },
      { icon: Youtube, label: 'YouTube Impressions', description: 'Visibility of video content on YouTube' },
      { icon: Music2, label: 'TikTok Impressions', description: 'Visibility of content on TikTok' },
    ],
  },
  'engagement': {
    subtitle: 'How we measure Engagement',
    methodologyDescription: 'The Engagement Score measures how actively your audience interacts with your content. It combines likes, comments, shares, saves, and time spent metrics to provide a comprehensive view of audience interaction quality.',
    indicators: [
      { icon: Users, label: 'Total Interactions', description: 'Sum of all engagement actions across platforms' },
      { icon: UserCheck, label: 'Active Engagers', description: 'Unique users who interacted with content' },
      { icon: Eye, label: 'Watch Time', description: 'Total time spent viewing video content' },
      { icon: Newspaper, label: 'Comments', description: 'User-generated responses to content' },
      { icon: FileText, label: 'Shares', description: 'Content amplification by audience' },
      { icon: Youtube, label: 'YouTube Engagement', description: 'Likes, comments, and shares on YouTube' },
      { icon: Music2, label: 'TikTok Engagement', description: 'Interactions on TikTok content' },
    ],
  },
  'targeting': {
    subtitle: 'How we measure Targeting',
    methodologyDescription: 'The Targeting Score evaluates how effectively your content reaches the intended audience segments. It analyzes demographic alignment, geographic distribution, and audience quality metrics to assess targeting precision.',
    indicators: [
      { icon: Users, label: 'Audience Match', description: 'Alignment with target demographic profiles' },
      { icon: UserCheck, label: 'Quality Score', description: 'Relevance of reached audience to brand goals' },
      { icon: Eye, label: 'Geographic Reach', description: 'Distribution across target regions' },
      { icon: Newspaper, label: 'Age Alignment', description: 'Match with target age demographics' },
      { icon: FileText, label: 'Interest Match', description: 'Alignment with audience interests' },
      { icon: Youtube, label: 'YouTube Targeting', description: 'Precision of YouTube audience reach' },
      { icon: Music2, label: 'TikTok Targeting', description: 'Accuracy of TikTok audience targeting' },
    ],
  },
  'audience-satisfaction': {
    subtitle: 'How we measure Audience Satisfaction',
    methodologyDescription: 'The Audience Satisfaction Score provides a single, consolidated view of how audiences are responding to a brand\'s content over time. It is based on a structured framework of engagement and visibility indicators drawn from platform-level and owned-channel data sources.',
    indicators: [
      { icon: Users, label: 'Estimated Reach', description: 'Estimated breadth of audience exposure across platforms' },
      { icon: UserCheck, label: 'Reach', description: 'Actual unique audience exposure' },
      { icon: Eye, label: 'Impressions', description: 'Frequency of content visibility' },
      { icon: Newspaper, label: 'Post Views', description: 'Consumption of individual content items' },
      { icon: FileText, label: 'Page Views', description: 'Engagement with owned web properties' },
      { icon: Youtube, label: 'YouTube Impressions', description: 'Visibility of video content on YouTube' },
      { icon: Music2, label: 'TikTok Impressions', description: 'Visibility of content on TikTok' },
    ],
  },
  'audience-loyalty': {
    subtitle: 'How we measure Audience Loyalty',
    methodologyDescription: 'The Audience Loyalty Score measures the strength of repeat engagement and long-term audience retention. It tracks returning visitors, subscription rates, and sustained interaction patterns across all channels.',
    indicators: [
      { icon: Users, label: 'Return Visitors', description: 'Users who return to engage with content' },
      { icon: UserCheck, label: 'Subscriber Growth', description: 'Net increase in subscribed audience' },
      { icon: Eye, label: 'Repeat Views', description: 'Content viewed multiple times by same users' },
      { icon: Newspaper, label: 'Loyalty Rate', description: 'Percentage of engaged returning audience' },
      { icon: FileText, label: 'Session Frequency', description: 'How often users return to engage' },
      { icon: Youtube, label: 'YouTube Subscribers', description: 'Channel subscription metrics' },
      { icon: Music2, label: 'TikTok Followers', description: 'TikTok following and retention' },
    ],
  },
}

// Platform score data for each outcome
interface PlatformData {
  platformName: string
  platformIcon: React.ReactNode
  contentCount: number
  score: number
  statusLabel: string
  changeValue: string
  changeDirection: 'up' | 'down'
  metrics: PlatformMetric[]
}

const createPlatformData = (outcomeId: OutcomeId): PlatformData[] => {
  const baseMetrics = {
    youtube: [
      { icon: Hourglass, label: 'Views to Completion', value: '18,938' },
      { icon: Clock, label: 'Hours Watched', value: '3.456' },
      { icon: Users, label: 'Subscribers', value: '1,365' },
      { icon: DollarSign, label: 'Revenue', value: '£14,039' },
    ],
    tiktok: [
      { icon: Hourglass, label: 'Watch Time', value: '45,234' },
      { icon: Clock, label: 'Avg View Duration', value: '0:42' },
      { icon: Users, label: 'Followers', value: '8,921' },
      { icon: DollarSign, label: 'Revenue', value: '£3,456' },
    ],
    instagram: [
      { icon: Hourglass, label: 'Reach', value: '125,678' },
      { icon: Clock, label: 'Engagement Rate', value: '4.2%' },
      { icon: Users, label: 'Followers', value: '23,456' },
      { icon: DollarSign, label: 'Revenue', value: '£8,234' },
    ],
    facebook: [
      { icon: Hourglass, label: 'Reach', value: '89,432' },
      { icon: Clock, label: 'Engagement Rate', value: '3.1%' },
      { icon: Users, label: 'Followers', value: '45,678' },
      { icon: DollarSign, label: 'Revenue', value: '£5,678' },
    ],
    twitter: [
      { icon: Hourglass, label: 'Impressions', value: '234,567' },
      { icon: Clock, label: 'Engagement Rate', value: '2.8%' },
      { icon: Users, label: 'Followers', value: '12,345' },
      { icon: DollarSign, label: 'Revenue', value: '£2,345' },
    ],
    linkedin: [
      { icon: Hourglass, label: 'Impressions', value: '56,789' },
      { icon: Clock, label: 'Engagement Rate', value: '5.2%' },
      { icon: Users, label: 'Connections', value: '8,765' },
      { icon: DollarSign, label: 'Revenue', value: '£4,567' },
    ],
    snapchat: [
      { icon: Hourglass, label: 'Story Views', value: '67,890' },
      { icon: Clock, label: 'Avg View Time', value: '0:18' },
      { icon: Users, label: 'Subscribers', value: '15,432' },
      { icon: DollarSign, label: 'Revenue', value: '£1,234' },
    ],
  }

  const scoresByOutcome: Record<OutcomeId, {
    youtube: number
    tiktok: number
    instagram: number
    facebook: number
    twitter: number
    linkedin: number
    snapchat: number
  }> = {
    'brand-awareness': { youtube: 881, tiktok: 756, instagram: 823, facebook: 712, twitter: 645, linkedin: 534, snapchat: 478 },
    'engagement': { youtube: 234, tiktok: 312, instagram: 187, facebook: 256, twitter: 198, linkedin: 167, snapchat: 289 },
    'targeting': { youtube: 745, tiktok: 678, instagram: 712, facebook: 656, twitter: 589, linkedin: 623, snapchat: 512 },
    'audience-satisfaction': { youtube: 881, tiktok: 645, instagram: 756, facebook: 698, twitter: 534, linkedin: 612, snapchat: 467 },
    'audience-loyalty': { youtube: 623, tiktok: 534, instagram: 589, facebook: 512, twitter: 445, linkedin: 478, snapchat: 398 },
  }

  const scores = scoresByOutcome[outcomeId]

  const getStatus = (score: number): string => {
    if (score >= 800) return 'Exceptional'
    if (score >= 650) return 'Strong'
    if (score >= 450) return 'Healthy'
    if (score >= 300) return 'At Risk'
    return 'Underperforming'
  }

  return [
    {
      platformName: 'YouTube',
      platformIcon: <Youtube className="h-5 w-5 text-red-600" />,
      contentCount: 37,
      score: scores.youtube,
      statusLabel: getStatus(scores.youtube),
      changeValue: '32%',
      changeDirection: 'up',
      metrics: baseMetrics.youtube,
    },
    {
      platformName: 'TikTok',
      platformIcon: <Music2 className="h-5 w-5 text-foreground" />,
      contentCount: 89,
      score: scores.tiktok,
      statusLabel: getStatus(scores.tiktok),
      changeValue: '18%',
      changeDirection: 'up',
      metrics: baseMetrics.tiktok,
    },
    {
      platformName: 'Instagram',
      platformIcon: <Instagram className="h-5 w-5 text-pink-600" />,
      contentCount: 156,
      score: scores.instagram,
      statusLabel: getStatus(scores.instagram),
      changeValue: '12%',
      changeDirection: 'down',
      metrics: baseMetrics.instagram,
    },
    {
      platformName: 'Facebook',
      platformIcon: <Facebook className="h-5 w-5 text-blue-600" />,
      contentCount: 78,
      score: scores.facebook,
      statusLabel: getStatus(scores.facebook),
      changeValue: '8%',
      changeDirection: 'up',
      metrics: baseMetrics.facebook,
    },
    {
      platformName: 'X (Twitter)',
      platformIcon: <Twitter className="h-5 w-5 text-foreground" />,
      contentCount: 234,
      score: scores.twitter,
      statusLabel: getStatus(scores.twitter),
      changeValue: '5%',
      changeDirection: 'down',
      metrics: baseMetrics.twitter,
    },
    {
      platformName: 'LinkedIn',
      platformIcon: <Linkedin className="h-5 w-5 text-blue-700" />,
      contentCount: 45,
      score: scores.linkedin,
      statusLabel: getStatus(scores.linkedin),
      changeValue: '15%',
      changeDirection: 'up',
      metrics: baseMetrics.linkedin,
    },
    {
      platformName: 'Snapchat',
      platformIcon: <Ghost className="h-5 w-5 text-yellow-400" />,
      contentCount: 112,
      score: scores.snapchat,
      statusLabel: getStatus(scores.snapchat),
      changeValue: '22%',
      changeDirection: 'up',
      metrics: baseMetrics.snapchat,
    },
  ]
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

      {/* Location Breakdown Card */}
      <div className="mt-6">
        <LocationBreakdownCard
          title={`${outcome.name} Score By Location`}
          subtitle={`${outcome.name} scores distributed throughout the globe`}
          data={LOCATION_DATA[outcome.id].data}
          insightText={LOCATION_DATA[outcome.id].insightText}
        />
      </div>

      {/* Platform Score Cards */}
      <div className="mt-6">
        <h3 className="mb-4 text-lg font-bold text-foreground">
          {outcome.name} Score by Platform
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {createPlatformData(outcome.id).map((platform) => (
            <PlatformScoreCard
              key={platform.platformName}
              platformName={platform.platformName}
              platformIcon={platform.platformIcon}
              contentCount={platform.contentCount}
              score={platform.score}
              statusLabel={platform.statusLabel}
              changeValue={platform.changeValue}
              changeDirection={platform.changeDirection}
              metrics={platform.metrics}
              onMoreDetail={() => console.log(`View ${platform.platformName} details`)}
            />
          ))}
          {/* AI Hot Tips Card as the 8th card */}
          <AIHotTipsCard tips={DEFAULT_AI_TIPS} />
        </div>
      </div>

      {/* Metrics Explained Card */}
      <div className="mt-6">
        <MetricsExplainedCard
          subtitle={METRICS_EXPLAINED_DATA[outcome.id].subtitle}
          methodologyDescription={METRICS_EXPLAINED_DATA[outcome.id].methodologyDescription}
          indicators={METRICS_EXPLAINED_DATA[outcome.id].indicators}
        />
      </div>
    </DashboardLayout>
  )
}
