import { ArrowLeft, Radio, FileText, CalendarClock } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { DashboardLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout/PageHeader'
import { BaseCard } from '@/components/cards'
import { useAppNavigation } from '@/hooks/useAppNavigation'
import { PLATFORMS } from '@/types/platforms'

export function PlatformBrandAwarenessPage() {
  const { platformId } = useParams<{ platformId: string }>()
  const { goBack } = useAppNavigation()

  const platform = PLATFORMS.find((p) => p.id === platformId)
  const platformName = platform?.name ?? 'Platform'

  return (
    <DashboardLayout
      currentPage={`${platformName} - Brand Awareness`}
      onSearch={(query) => console.log('Search:', query)}
      userName="John Doe"
    >
      {/* Back Button */}
      <button
        onClick={goBack}
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {platformName}
      </button>

      <PageHeader
        icon={<Radio className="h-full w-full text-primary" />}
        label="Business Outcome"
        title="Brand Awareness"
        primaryAction={{
          label: 'Generate Report',
          shortLabel: 'Report',
          icon: <FileText className="h-4 w-4" />,
          onClick: () => console.log('Generate report'),
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

      {/* Placeholder Content */}
      <div className="mt-8">
        <BaseCard variant="bordered" padding="lg" className="text-center">
          <Radio className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="text-xl font-bold text-foreground">
            Brand Awareness Analytics for {platformName}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Detailed Brand Awareness analytics coming soon.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Track reach, visibility, and impressions across your {platformName} content.
          </p>
        </BaseCard>
      </div>
    </DashboardLayout>
  )
}
