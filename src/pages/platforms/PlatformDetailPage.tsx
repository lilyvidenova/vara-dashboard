import { ArrowLeft, FileText, CalendarClock } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import { BaseCard } from '@/components/cards'
import { useAppNavigation } from '@/hooks/useAppNavigation'
import type { PlatformConfig } from '@/types/platforms'

export interface PlatformDetailPageProps {
  platform: PlatformConfig
}

export function PlatformDetailPage({ platform }: PlatformDetailPageProps) {
  const { goBack } = useAppNavigation()

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
        icon={<div className="h-full w-full" />}
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

      {/* Placeholder content - to be replaced with actual designs */}
      <div className="mt-8">
        <BaseCard variant="bordered" padding="lg">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-xl font-bold text-foreground">{platform.name} Details</h2>
            <p className="mt-2 text-muted-foreground">
              Detailed analytics and insights for {platform.name} will be displayed here.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Content sections will be added when designs are provided.
            </p>
          </div>
        </BaseCard>
      </div>
    </DashboardLayout>
  )
}
