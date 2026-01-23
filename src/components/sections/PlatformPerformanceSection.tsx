import { cn } from '@/lib/utils'
import { BaseCard } from '../cards/BaseCard'
import { PlatformRow, type PlatformData, type PlatformStatus } from './PlatformRow'
import { AIInsightBox } from './AIInsightBox'

export interface PlatformPerformanceSectionProps {
  platforms: PlatformData[]
  aiInsight?: string
  onMoreDetail?: (platformId: string) => void
  className?: string
}

export function getStatusFromScore(score: number): PlatformStatus {
  if (score >= 800) return 'exceptional'
  if (score >= 700) return 'strong'
  if (score >= 500) return 'healthy'
  if (score >= 300) return 'at-risk'
  return 'underperforming'
}

// Platform icon components
function InstagramIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#instagram-gradient)" />
      <rect
        x="11"
        y="11"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <circle cx="20" cy="20" r="4.5" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="26" cy="14" r="1.5" fill="white" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="20" fill="#000000" />
      <path
        d="M27.5 16.5c-1.5 0-2.8-.6-3.8-1.5v7.5c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v3c-.3-.1-.6-.1-.9-.1-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V10h3c.3 2.2 2 4 4.3 4.2v2.3h-.5z"
        fill="white"
      />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="19" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <path
        d="M29.5 15.5c-.3-1.2-1.2-2.1-2.4-2.4C25.4 12.6 20 12.6 20 12.6s-5.4 0-7.1.5c-1.2.3-2.1 1.2-2.4 2.4-.5 1.7-.5 5.3-.5 5.3s0 3.6.5 5.3c.3 1.2 1.2 2.1 2.4 2.4 1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5c1.2-.3 2.1-1.2 2.4-2.4.5-1.7.5-5.3.5-5.3s0-3.6-.5-5.3z"
        fill="#FF0000"
      />
      <path d="M17.5 24.3V16.6l6 3.9-6 3.8z" fill="white" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="20" fill="#000000" />
      <path
        d="M23.5 12h3.5l-7.5 8.5 8.8 11.5h-6.9l-5.4-7.1-6.2 7.1H6.3l8-9.1L5.7 12h7.1l4.9 6.5L23.5 12zm-1.2 18l-10.6-14h2.4l10.6 14h-2.4z"
        fill="white"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="20" fill="#1877F2" />
      <path
        d="M26 20.5h-4v12h-5v-12h-3V16h3v-2.5c0-3.5 1.5-5.5 5.5-5.5h3.5v5h-2c-1.5 0-2 .5-2 2V16h4l-1 4.5z"
        fill="white"
      />
    </svg>
  )
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="20" fill="#FFFC00" />
      <path
        d="M20 10c3 0 5 1.5 5.5 4.5.2 1-.1 3-.3 4.5h.8c1 0 1.5.5 1.5 1s-.5 1-1.5 1h-.5c-.5 2.5-3 4-5.5 4s-5-1.5-5.5-4H14c-1 0-1.5-.5-1.5-1s.5-1 1.5-1h.8c-.2-1.5-.5-3.5-.3-4.5.5-3 2.5-4.5 5.5-4.5z"
        fill="white"
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="20" cy="20" r="19" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <path
        d="M14 17h-3v11h3V17zm-1.5-5c-1 0-1.8.8-1.8 1.8s.8 1.7 1.8 1.7 1.8-.8 1.8-1.7c0-1-.8-1.8-1.8-1.8zM28 28h-3v-5.5c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9V28h-3V17h2.9v1.5c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V28h.5z"
        fill="#0A66C2"
      />
    </svg>
  )
}

// Map platform IDs to their icon components
const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon />,
  tiktok: <TikTokIcon />,
  youtube: <YouTubeIcon />,
  x: <XIcon />,
  twitter: <XIcon />,
  facebook: <FacebookIcon />,
  snapchat: <SnapchatIcon />,
  linkedin: <LinkedInIcon />,
}

export function getPlatformIcon(platformId: string): React.ReactNode {
  return PLATFORM_ICONS[platformId.toLowerCase()] || null
}

export function PlatformPerformanceSection({
  platforms,
  aiInsight,
  onMoreDetail,
  className,
}: PlatformPerformanceSectionProps) {
  return (
    <BaseCard variant="bordered" padding="md" className={cn('flex flex-col gap-6', className)}>
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground">Platform Performance</h2>
        <p className="text-sm text-muted-foreground">Content Impact Score by platform</p>
      </div>

      {/* Platform list */}
      <div className="flex flex-col">
        {platforms.map((platform, index) => (
          <PlatformRow
            key={platform.id}
            platform={{
              ...platform,
              icon: platform.icon || getPlatformIcon(platform.id),
            }}
            onMoreDetail={() => onMoreDetail?.(platform.id)}
            showSeparator={index < platforms.length - 1}
          />
        ))}
      </div>

      {/* AI Insight box */}
      {aiInsight && <AIInsightBox insight={aiInsight} />}
    </BaseCard>
  )
}

export type { PlatformData, PlatformStatus }
