import { Sparkles, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'

export type LocationStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

export interface LocationData {
  rank: number
  country: string
  countryCode: string
  subscribers: string
  score: number
  status: LocationStatus
  isTarget?: boolean
}

export interface LocationBreakdownCardProps {
  title: string
  subtitle: string
  data: LocationData[]
  insightText: string
  className?: string
}

// Status configuration
const STATUS_CONFIG: Record<LocationStatus, { color: string; label: string; showWarning?: boolean }> = {
  exceptional: { color: '#2FAF8F', label: 'Exceptional' },
  strong: { color: '#2FAF8F', label: 'Strong' },
  healthy: { color: '#EAB04C', label: 'Healthy' },
  'at-risk': { color: '#F1666A', label: 'At Risk', showWarning: true },
  underperforming: { color: '#F1666A', label: 'Underperforming' },
}

// Country flag emojis mapping
const COUNTRY_FLAGS: Record<string, string> = {
  us: '🇺🇸',
  de: '🇩🇪',
  jp: '🇯🇵',
  gb: '🇬🇧',
  in: '🇮🇳',
  au: '🇦🇺',
  br: '🇧🇷',
  ca: '🇨🇦',
  fr: '🇫🇷',
  mx: '🇲🇽',
  cn: '🇨🇳',
  kr: '🇰🇷',
}

interface CountryFlagProps {
  countryCode: string
  className?: string
}

function CountryFlag({ countryCode, className }: CountryFlagProps) {
  const flag = COUNTRY_FLAGS[countryCode.toLowerCase()] || '🏳️'

  return (
    <div
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-muted text-2xl',
        className
      )}
    >
      {flag}
    </div>
  )
}

interface StatusIndicatorProps {
  score: number
  status: LocationStatus
}

function StatusIndicator({ score, status }: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status]

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold text-foreground">{score}</span>
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{config.label}</span>
        {config.showWarning && (
          <TriangleAlert className="h-4 w-4 text-red-600" />
        )}
      </div>
    </div>
  )
}

interface CountryRankingRowProps {
  data: LocationData
}

function CountryRankingRow({ data }: CountryRankingRowProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Left side: rank, flag, country info */}
      <div className="flex items-center gap-3">
        <span className="w-4 text-sm font-bold text-foreground">{data.rank}.</span>
        <CountryFlag countryCode={data.countryCode} />
        <div className="flex w-28 flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base text-foreground">{data.country}</span>
            {data.isTarget && (
              <StatusBadge label="Target" variant="outline" />
            )}
          </div>
          <span className="text-sm text-muted-foreground">{data.subscribers} Subscribers</span>
        </div>
      </div>

      {/* Right side: score and status */}
      <StatusIndicator score={data.score} status={data.status} />
    </div>
  )
}

interface InsightBoxProps {
  text: string
}

function InsightBox({ text }: InsightBoxProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-muted/50 px-3 py-4">
      <Sparkles className="h-6 w-6 flex-shrink-0 text-primary" />
      <p className="text-sm text-foreground">{text}</p>
    </div>
  )
}

export function LocationBreakdownCard({
  title,
  subtitle,
  data,
  insightText,
  className,
}: LocationBreakdownCardProps) {
  return (
    <BaseCard
      variant="bordered"
      padding="none"
      className={cn('p-10', className)}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        {/* Left Column - Country Rankings */}
        <div className="flex flex-col justify-between lg:w-[340px]">
          <div className="flex flex-col gap-3">
            {data.map((item, index) => (
              <div key={item.countryCode}>
                <CountryRankingRow data={item} />
                {index < data.length - 1 && (
                  <div className="mt-3 h-px w-full bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Separator before insight */}
          <div className="my-4 h-px w-full bg-border" />

          {/* AI Insight */}
          <InsightBox text={insightText} />
        </div>

        {/* Right Column - World Map */}
        <div className="relative flex-1 overflow-hidden rounded-lg border border-border">
          <svg
            viewBox="0 0 1000 500"
            className="h-full w-full"
            style={{ minHeight: '300px' }}
          >
            {/* Simplified world map path */}
            <path
              d="M150,100 Q200,80 250,100 L300,90 Q350,100 400,95 L450,100 Q500,90 550,100 L600,95 Q650,85 700,100 L750,90 Q800,100 850,95
                 M100,150 Q150,140 200,160 L250,150 Q300,170 350,150 L400,160 Q450,140 500,150
                 M550,130 Q600,120 650,140 L700,130 Q750,150 800,140 L850,130 Q900,120 950,140
                 M80,200 Q130,180 180,210 L230,190 Q280,220 330,200 L380,210 Q430,190 480,200
                 M520,180 Q570,160 620,190 L670,170 Q720,200 770,180 L820,190 Q870,170 920,180
                 M100,250 Q150,230 200,260 L250,240 Q300,270 350,250 L400,260
                 M450,220 Q500,200 550,230 L600,210 Q650,240 700,220 L750,230 Q800,210 850,220 L900,230
                 M150,300 Q200,280 250,310 L300,290 Q350,320 400,300
                 M500,260 Q550,240 600,270 L650,250 Q700,280 750,260 L800,270 Q850,250 900,260
                 M200,350 Q250,330 300,360 L350,340 Q400,370 450,350
                 M550,300 Q600,280 650,310 L700,290 Q750,320 800,300 L850,310
                 M250,400 Q300,380 350,400 L400,390
                 M700,350 Q750,330 800,360 L850,340 Q900,370 950,350"
              fill="none"
              stroke="#0077BE"
              strokeWidth="60"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />

            {/* Location pins */}
            {/* USA */}
            <circle cx="220" cy="180" r="12" fill="#36B7FA" stroke="#0077BE" strokeWidth="2" />
            {/* Germany */}
            <circle cx="520" cy="150" r="10" fill="#36B7FA" stroke="#0077BE" strokeWidth="2" />
            {/* Japan */}
            <circle cx="850" cy="190" r="10" fill="#36B7FA" stroke="#0077BE" strokeWidth="2" />
            {/* UK */}
            <circle cx="480" cy="140" r="8" fill="#36B7FA" stroke="#0077BE" strokeWidth="2" />
            {/* India */}
            <circle cx="700" cy="230" r="14" fill="#36B7FA" stroke="#0077BE" strokeWidth="2" />
            {/* Australia */}
            <circle cx="820" cy="380" r="8" fill="#36B7FA" stroke="#0077BE" strokeWidth="2" />
            {/* Brazil */}
            <circle cx="320" cy="340" r="8" fill="#F1666A" stroke="#18181B" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </BaseCard>
  )
}
