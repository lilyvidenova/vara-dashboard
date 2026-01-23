import { CircleArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PlatformStatus =
  | 'exceptional'
  | 'strong'
  | 'healthy'
  | 'at-risk'
  | 'underperforming'

export interface PlatformData {
  id: string
  name: string
  icon: React.ReactNode | string
  contentCount: number
  score: number
  status: PlatformStatus
}

export interface PlatformRowProps {
  platform: PlatformData
  onMoreDetail?: () => void
  showSeparator?: boolean
}

function getStatusColor(status: PlatformStatus): string {
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

function getStatusLabel(status: PlatformStatus): string {
  switch (status) {
    case 'exceptional':
      return 'Exceptional'
    case 'strong':
      return 'Strong'
    case 'healthy':
      return 'Healthy'
    case 'at-risk':
      return 'At Risk'
    case 'underperforming':
      return 'Underperforming'
  }
}

function StatusDot({ status }: { status: PlatformStatus }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: getStatusColor(status) }}
    />
  )
}

function PlatformIcon({ icon, name }: { icon: React.ReactNode | string; name: string }) {
  if (typeof icon === 'string') {
    return (
      <img
        src={icon}
        alt={`${name} icon`}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
    )
  }

  return <div className="h-10 w-10 shrink-0">{icon}</div>
}

export function PlatformRow({ platform, onMoreDetail, showSeparator = true }: PlatformRowProps) {
  const { name, icon, contentCount, score, status } = platform

  return (
    <div className="flex flex-col">
      {/* Row content */}
      <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left section: Icon + Platform info */}
        <div className="flex items-center gap-3">
          <PlatformIcon icon={icon} name={name} />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-normal text-foreground">{name}</span>
            <span className="text-xs text-muted-foreground">
              {contentCount} Pieces of Content
            </span>
          </div>
        </div>

        {/* Right section: Score + Status + Button */}
        <div className="flex items-center gap-4 pl-[52px] sm:gap-10 sm:pl-0">
          {/* Score and status */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">{score}</span>
            <StatusDot status={status} />
            <span className="text-xs text-muted-foreground">{getStatusLabel(status)}</span>
          </div>

          {/* More Detail button */}
          <button
            onClick={onMoreDetail}
            className={cn(
              'flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2',
              'text-sm font-normal text-foreground',
              'transition-colors hover:bg-muted'
            )}
          >
            <span>More Detail</span>
            <CircleArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Separator */}
      {showSeparator && <div className="h-px w-full bg-border" />}
    </div>
  )
}
