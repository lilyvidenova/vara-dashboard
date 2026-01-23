import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BaseCard } from '../cards/BaseCard'

export type ContentPlatform = 'instagram' | 'youtube' | 'facebook' | 'tiktok' | 'x' | 'snapchat' | 'linkedin'
export type ContentStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'
export type ContentSectionVariant = 'top' | 'worst'

export interface ContentItem {
  id: string
  rank: number
  thumbnail: string
  platform: ContentPlatform
  title: string
  artist?: string
  dateUploaded: string
  score: number
  status: ContentStatus
}

const PLATFORM_NAMES: Record<ContentPlatform, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  x: 'X',
  snapchat: 'Snapchat',
  linkedin: 'LinkedIn',
}

export interface TopPerformingContentSectionProps {
  title?: string
  variant?: ContentSectionVariant
  items: ContentItem[]
  onTitleClick?: () => void
  className?: string
}

function getStatusLabel(status: ContentStatus): string {
  switch (status) {
    case 'exceptional': return 'Exceptional'
    case 'strong': return 'Strong'
    case 'healthy': return 'Healthy'
    case 'at-risk': return 'At Risk'
    case 'underperforming': return 'Underperforming'
  }
}

function getStatusColor(status: ContentStatus): string {
  switch (status) {
    case 'exceptional':
    case 'strong':
      return '#2FAF8F'
    case 'healthy':
      return '#EAB04C'
    case 'at-risk':
    case 'underperforming':
      return '#F1666A'
  }
}

// Small platform icons (24px)
function InstagramIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <defs>
        <linearGradient id="ig-gradient-small" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#ig-gradient-small)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="15.5" cy="8.5" r="1" fill="white" />
    </svg>
  )
}

function YouTubeIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="11.5" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <path
        d="M17.7 9.3c-.2-.7-.7-1.3-1.4-1.4-1-.3-5.3-.3-5.3-.3s-4.3 0-5.3.3c-.7.2-1.2.7-1.4 1.4-.3 1-.3 3.2-.3 3.2s0 2.2.3 3.2c.2.7.7 1.3 1.4 1.4 1 .3 5.3.3 5.3.3s4.3 0 5.3-.3c.7-.2 1.2-.7 1.4-1.4.3-1 .3-3.2.3-3.2s0-2.2-.3-3.2z"
        fill="#FF0000"
      />
      <path d="M10.5 14.6V9.9l3.6 2.3-3.6 2.4z" fill="white" />
    </svg>
  )
}

function FacebookIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.5 12.5h-2.5v7h-3v-7h-2v-3h2v-1.5c0-2 1-3.5 3.5-3.5h2v3h-1.5c-.8 0-1 .3-1 1v1h2.5l-.5 3z"
        fill="white"
      />
    </svg>
  )
}

function TikTokIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        d="M16.5 10c-.9 0-1.7-.4-2.3-.9v4.5c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6c.2 0 .4 0 .5.1v1.8c-.2-.1-.4-.1-.5-.1-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8V6h1.8c.2 1.3 1.2 2.4 2.6 2.5V10h-.3z"
        fill="white"
      />
    </svg>
  )
}

function XIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        d="M14 7h2l-4.5 5 5.3 7h-4.2l-3.2-4.3-3.7 4.3H4l4.8-5.5L4.5 7h4.3l2.9 3.9L14 7zm-.7 10.8l-6.4-8.4h1.4l6.4 8.4h-1.4z"
        fill="white"
      />
    </svg>
  )
}

function SnapchatIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="12" fill="#FFFC00" />
      <path
        d="M12 6c1.8 0 3 .9 3.3 2.7.1.6-.1 1.8-.2 2.7h.5c.6 0 .9.3.9.6s-.3.6-.9.6h-.3c-.3 1.5-1.8 2.4-3.3 2.4s-3-1-3.3-2.4h-.3c-.6 0-.9-.3-.9-.6s.3-.6.9-.6h.5c-.1-.9-.3-2.1-.2-2.7C9 6.9 10.2 6 12 6z"
        fill="white"
        stroke="black"
        strokeWidth="0.3"
      />
    </svg>
  )
}

function LinkedInIconSmall() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <circle cx="12" cy="12" r="11.5" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <path
        d="M8.5 10h-2v7h2v-7zm-1-3.5c-.7 0-1.2.5-1.2 1.2s.5 1.1 1.2 1.1 1.2-.5 1.2-1.1c0-.7-.5-1.2-1.2-1.2zM17 17h-2v-3.5c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.7V17h-2v-7h1.9v1c.3-.5.9-1 1.8-1 1.9 0 2.2 1.2 2.2 2.8V17h.5z"
        fill="#0A66C2"
      />
    </svg>
  )
}

// Tiny platform icons (12px) for mobile
function InstagramIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <defs>
        <linearGradient id="ig-gradient-tiny" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#ig-gradient-tiny)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="15.5" cy="8.5" r="1" fill="white" />
    </svg>
  )
}

function YouTubeIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <circle cx="12" cy="12" r="11.5" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <path
        d="M17.7 9.3c-.2-.7-.7-1.3-1.4-1.4-1-.3-5.3-.3-5.3-.3s-4.3 0-5.3.3c-.7.2-1.2.7-1.4 1.4-.3 1-.3 3.2-.3 3.2s0 2.2.3 3.2c.2.7.7 1.3 1.4 1.4 1 .3 5.3.3 5.3.3s4.3 0 5.3-.3c.7-.2 1.2-.7 1.4-1.4.3-1 .3-3.2.3-3.2s0-2.2-.3-3.2z"
        fill="#FF0000"
      />
      <path d="M10.5 14.6V9.9l3.6 2.3-3.6 2.4z" fill="white" />
    </svg>
  )
}

function FacebookIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.5 12.5h-2.5v7h-3v-7h-2v-3h2v-1.5c0-2 1-3.5 3.5-3.5h2v3h-1.5c-.8 0-1 .3-1 1v1h2.5l-.5 3z"
        fill="white"
      />
    </svg>
  )
}

function TikTokIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        d="M16.5 10c-.9 0-1.7-.4-2.3-.9v4.5c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6c.2 0 .4 0 .5.1v1.8c-.2-.1-.4-.1-.5-.1-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8V6h1.8c.2 1.3 1.2 2.4 2.6 2.5V10h-.3z"
        fill="white"
      />
    </svg>
  )
}

function XIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        d="M14 7h2l-4.5 5 5.3 7h-4.2l-3.2-4.3-3.7 4.3H4l4.8-5.5L4.5 7h4.3l2.9 3.9L14 7zm-.7 10.8l-6.4-8.4h1.4l6.4 8.4h-1.4z"
        fill="white"
      />
    </svg>
  )
}

function SnapchatIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <circle cx="12" cy="12" r="12" fill="#FFFC00" />
      <path
        d="M12 6c1.8 0 3 .9 3.3 2.7.1.6-.1 1.8-.2 2.7h.5c.6 0 .9.3.9.6s-.3.6-.9.6h-.3c-.3 1.5-1.8 2.4-3.3 2.4s-3-1-3.3-2.4h-.3c-.6 0-.9-.3-.9-.6s.3-.6.9-.6h.5c-.1-.9-.3-2.1-.2-2.7C9 6.9 10.2 6 12 6z"
        fill="white"
        stroke="black"
        strokeWidth="0.3"
      />
    </svg>
  )
}

function LinkedInIconTiny() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3">
      <circle cx="12" cy="12" r="11.5" fill="white" stroke="#d4d4d8" strokeWidth="1" />
      <path
        d="M8.5 10h-2v7h2v-7zm-1-3.5c-.7 0-1.2.5-1.2 1.2s.5 1.1 1.2 1.1 1.2-.5 1.2-1.1c0-.7-.5-1.2-1.2-1.2zM17 17h-2v-3.5c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.7V17h-2v-7h1.9v1c.3-.5.9-1 1.8-1 1.9 0 2.2 1.2 2.2 2.8V17h.5z"
        fill="#0A66C2"
      />
    </svg>
  )
}

const PLATFORM_ICONS_TINY: Record<ContentPlatform, React.ReactNode> = {
  instagram: <InstagramIconTiny />,
  youtube: <YouTubeIconTiny />,
  facebook: <FacebookIconTiny />,
  tiktok: <TikTokIconTiny />,
  x: <XIconTiny />,
  snapchat: <SnapchatIconTiny />,
  linkedin: <LinkedInIconTiny />,
}

const PLATFORM_ICONS: Record<ContentPlatform, React.ReactNode> = {
  instagram: <InstagramIconSmall />,
  youtube: <YouTubeIconSmall />,
  facebook: <FacebookIconSmall />,
  tiktok: <TikTokIconSmall />,
  x: <XIconSmall />,
  snapchat: <SnapchatIconSmall />,
  linkedin: <LinkedInIconSmall />,
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <div className="flex w-9 shrink-0 items-center justify-center self-stretch">
      <span className="inline-flex items-center justify-center rounded-full border border-border bg-muted/50 px-2.5 pb-0.5 text-xs font-bold text-foreground">
        # {rank}
      </span>
    </div>
  )
}

// Desktop content row (hidden on mobile)
function ContentRow({
  item,
  showSeparator = true,
}: {
  item: ContentItem
  showSeparator?: boolean
}) {
  const { rank, thumbnail, platform, title, artist, dateUploaded, score, status } = item
  // Combine title and artist for desktop display
  const displayTitle = artist ? `${artist} - ${title}` : title

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex items-start gap-3">
        {/* Rank Badge */}
        <RankBadge rank={rank} />

        {/* Thumbnail */}
        <div className="h-[54px] w-[100px] shrink-0 overflow-hidden rounded-sm">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Info */}
        <div className="flex min-w-0 flex-1 items-start justify-between">
          <div className="flex flex-col gap-3">
            {/* Platform + Title */}
            <div className="flex items-center gap-2">
              <div className="shrink-0">{PLATFORM_ICONS[platform]}</div>
              <span className="truncate text-base text-foreground">{displayTitle}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-primary" />
              <span className="pb-0.5 text-xs text-muted-foreground">Date uploaded</span>
              <span className="pb-0.5 text-xs text-foreground">{dateUploaded}</span>
            </div>
          </div>

          {/* Score Section */}
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">{score}</span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: getStatusColor(status) }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{getStatusLabel(status)}</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      {showSeparator && <div className="mt-3 h-px w-full bg-border" />}
    </div>
  )
}

// Mobile content card (shown only on mobile)
function MobileContentCard({
  item,
  showSeparator = true,
}: {
  item: ContentItem
  showSeparator?: boolean
}) {
  const { rank, thumbnail, platform, title, artist, dateUploaded, score, status } = item

  return (
    <div className="flex flex-col gap-1 md:hidden">
      <div className="flex gap-3 items-center">
        {/* Thumbnail with overlay badge */}
        <div className="relative h-24 w-[177px] shrink-0 overflow-hidden rounded-sm">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Rank Badge Overlay */}
          <span className="absolute left-1 top-1 inline-flex items-center justify-center rounded-full border border-border bg-muted/90 px-2.5 pb-0.5 text-xs font-bold text-foreground">
            # {rank}
          </span>
        </div>

        {/* Content Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
          {/* Title and Artist */}
          <div className="flex flex-col gap-1.5">
            <span className="truncate text-base leading-none text-foreground">{title}</span>
            {artist && (
              <span className="truncate text-sm leading-none text-foreground">{artist}</span>
            )}
          </div>

          {/* Score Section */}
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: getStatusColor(status) }}
            />
            <span className="text-sm font-bold text-foreground">{score}</span>
            <span className="pt-0.5 text-xs text-muted-foreground">{getStatusLabel(status)}</span>
          </div>

          {/* Platform + Date Row */}
          <div className="flex items-center gap-1.5">
            {/* Platform */}
            <div className="flex items-center gap-1">
              <div className="shrink-0">{PLATFORM_ICONS_TINY[platform]}</div>
              <span className="pb-0.5 text-xs text-muted-foreground">{PLATFORM_NAMES[platform]}</span>
            </div>
            {/* Dot separator */}
            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-primary" />
              <span className="pb-0.5 text-xs text-muted-foreground">{dateUploaded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      {showSeparator && <div className="mt-4 h-px w-full bg-border" />}
    </div>
  )
}

export function TopPerformingContentSection({
  title,
  variant = 'top',
  items,
  onTitleClick,
  className,
}: TopPerformingContentSectionProps) {
  const isWorst = variant === 'worst'
  const defaultTitle = isWorst ? 'Worst Performing Content' : 'Top Performing Content'
  const displayTitle = title ?? defaultTitle
  const ArrowIcon = isWorst ? ArrowDownRight : ArrowUpRight
  const arrowColor = isWorst ? 'text-red-600' : 'text-green-600'

  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('flex flex-col gap-6 px-4 py-6 md:p-6', className)}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-0.5',
          onTitleClick && 'cursor-pointer'
        )}
        onClick={onTitleClick}
      >
        <h2 className="text-xl font-bold leading-none text-foreground">{displayTitle}</h2>
        <ArrowIcon className={cn('h-5 w-5', arrowColor)} />
      </div>

      {/* Content List */}
      <div className="flex flex-col gap-4 md:gap-3">
        {items.map((item, index) => (
          <div key={item.id}>
            {/* Mobile layout */}
            <MobileContentCard
              item={item}
              showSeparator={index < items.length - 1}
            />
            {/* Desktop layout */}
            <ContentRow
              item={item}
              showSeparator={index < items.length - 1}
            />
          </div>
        ))}
      </div>
    </BaseCard>
  )
}
