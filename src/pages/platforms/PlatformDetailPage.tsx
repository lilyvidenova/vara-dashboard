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
} from 'lucide-react'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import { ScoreCard, IndustryComparisonCard, type OutcomeStatus } from '@/components/cards'
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
      <div className="mt-8 flex flex-col gap-6">
        {/* Score Card and Industry Comparison - centered with max width */}
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
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

        {/* Placeholder for additional content sections */}
        {/* TODO: Add more platform-specific cards and metrics as designs are provided */}
      </div>
    </DashboardLayout>
  )
}
