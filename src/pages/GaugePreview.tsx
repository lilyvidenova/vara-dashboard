/**
 * GaugePreview - Debug page for visually comparing OutcomeGauge sizes
 *
 * This page displays OutcomeGauge component variants side-by-side for visual
 * comparison and debugging purposes. Not intended for production use.
 */

import { DashboardLayout } from '@/components/layout'
import { BaseCard } from '@/components/cards/BaseCard'
import { OutcomeGauge } from '@/components/cards/OutcomeGauge'

interface GaugeShowcaseProps {
  title: string
  description: string
  usedIn: string[]
  children: React.ReactNode
}

function GaugeShowcase({ title, description, usedIn, children }: GaugeShowcaseProps) {
  return (
    <BaseCard variant="bordered" padding="md" className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center justify-center rounded-lg bg-muted/30 p-6">
        {children}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Used in:</p>
        <ul className="mt-1 list-inside list-disc text-sm text-foreground">
          {usedIn.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
      </div>
    </BaseCard>
  )
}

export function GaugePreview() {
  return (
    <DashboardLayout currentPage="Gauge Preview" userName="Developer">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">OutcomeGauge Component Preview</h1>
        <p className="mt-1 text-muted-foreground">
          Visual comparison of OutcomeGauge size variants
        </p>
      </div>

      {/* Small Gauge Section */}
      <h2 className="mb-4 text-xl font-bold text-foreground">Small Size (142×76px)</h2>
      <div className="mb-8">
        <GaugeShowcase
          title="OutcomeGauge (small)"
          description="Small status-based gauge using primary blue only. Segments fill progressively based on status. Uses brand color instead of tri-color."
          usedIn={['MetricsCard', 'MetricsCardReusable', 'PlatformScoreCard']}
        >
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Underperforming</span>
              <div className="relative">
                <OutcomeGauge status="underperforming" size="small" />
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="text-2xl font-bold">132</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">At Risk</span>
              <div className="relative">
                <OutcomeGauge status="at-risk" size="small" />
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="text-2xl font-bold">350</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Healthy</span>
              <div className="relative">
                <OutcomeGauge status="healthy" size="small" />
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="text-2xl font-bold">564</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Strong</span>
              <div className="relative">
                <OutcomeGauge status="strong" size="small" />
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="text-2xl font-bold">720</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Exceptional</span>
              <div className="relative">
                <OutcomeGauge status="exceptional" size="small" />
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <span className="text-2xl font-bold">884</span>
                </div>
              </div>
            </div>
          </div>
        </GaugeShowcase>
      </div>

      {/* Large Gauge Section */}
      <h2 className="mb-4 text-xl font-bold text-foreground">Default Size (268×142px)</h2>
      <div className="mb-8">
        <GaugeShowcase
          title="OutcomeGauge (default)"
          description="Large gauge with tri-color scheme based on status. Inactive segments turn gray. Red for underperforming/at-risk, yellow for healthy, green for strong/exceptional."
          usedIn={['ScoreCard (Outcome Detail Pages, Platform Detail Pages)', 'ContentImpactCard (Dashboard)']}
        >
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Underperforming</span>
              <div className="relative">
                <OutcomeGauge status="underperforming" />
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <span className="text-3xl font-bold">132</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">At Risk</span>
              <div className="relative">
                <OutcomeGauge status="at-risk" />
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <span className="text-3xl font-bold">350</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Healthy</span>
              <div className="relative">
                <OutcomeGauge status="healthy" />
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <span className="text-3xl font-bold">564</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Strong</span>
              <div className="relative">
                <OutcomeGauge status="strong" />
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <span className="text-3xl font-bold">720</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">Exceptional</span>
              <div className="relative">
                <OutcomeGauge status="exceptional" />
                <div className="absolute inset-0 flex items-center justify-center pt-4">
                  <span className="text-3xl font-bold">884</span>
                </div>
              </div>
            </div>
          </div>
        </GaugeShowcase>
      </div>

      {/* Feature Comparison */}
      <h2 className="mb-4 text-xl font-bold text-foreground">Size Comparison</h2>
      <BaseCard variant="bordered" padding="md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-center font-semibold">Small (142×76)</th>
                <th className="py-2 text-center font-semibold">Default (268×142)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2">Stroke Width</td>
                <td className="py-2 text-center">8px</td>
                <td className="py-2 text-center">14px</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Colors</td>
                <td className="py-2 text-center">Primary blue</td>
                <td className="py-2 text-center">Tri-color (red/yellow/green)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Input Type</td>
                <td className="py-2 text-center">Status (string)</td>
                <td className="py-2 text-center">Status (string)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Segment Gaps</td>
                <td className="py-2 text-center">Yes (10°)</td>
                <td className="py-2 text-center">Yes (10°)</td>
              </tr>
              <tr>
                <td className="py-2">Gray Inactive</td>
                <td className="py-2 text-center">Yes</td>
                <td className="py-2 text-center">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>
    </DashboardLayout>
  )
}
