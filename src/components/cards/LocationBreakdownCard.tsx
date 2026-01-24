import { Info, Sparkles, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'

export type LocationStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

/**
 * Data structure for the 'score' variant (original behavior)
 */
export interface LocationData {
  rank: number
  country: string
  countryCode: string
  subscribers: string
  score: number
  status: LocationStatus
  isTarget?: boolean
}

/**
 * Data structure for the 'views' variant
 */
export interface ViewsLocationData {
  rank: number
  country: string
  countryCode: string
  value: number
  isTarget?: boolean
  hasWarning?: boolean
}

/**
 * Alert configuration for the 'views' variant
 */
export interface LocationAlert {
  type: 'error' | 'info'
  message: string
  highlightedText?: string
}

/**
 * Props for the 'score' variant (original behavior)
 */
interface ScoreVariantProps {
  variant?: 'score'
  data: LocationData[]
  insightText: string
  metricLabel?: never
  alerts?: never
}

/**
 * Props for the 'views' variant
 */
interface ViewsVariantProps {
  variant: 'views'
  data: ViewsLocationData[]
  metricLabel: string
  alerts?: LocationAlert[]
  insightText?: never
}

/**
 * Common props shared by both variants
 */
interface CommonProps {
  title: string
  subtitle: string
  className?: string
}

export type LocationBreakdownCardProps = CommonProps & (ScoreVariantProps | ViewsVariantProps)

// Status configuration for score variant
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
  es: '🇪🇸',
  it: '🇮🇹',
  nl: '🇳🇱',
  se: '🇸🇪',
  no: '🇳🇴',
  dk: '🇩🇰',
  fi: '🇫🇮',
  pl: '🇵🇱',
  ru: '🇷🇺',
  za: '🇿🇦',
  sg: '🇸🇬',
  hk: '🇭🇰',
  tw: '🇹🇼',
  th: '🇹🇭',
  id: '🇮🇩',
  my: '🇲🇾',
  ph: '🇵🇭',
  vn: '🇻🇳',
  ae: '🇦🇪',
  sa: '🇸🇦',
  eg: '🇪🇬',
  ng: '🇳🇬',
  ar: '🇦🇷',
  cl: '🇨🇱',
  co: '🇨🇴',
  pe: '🇵🇪',
  nz: '🇳🇿',
}

// Country coordinates for map pins (percentage-based for absolute positioning over image)
const COUNTRY_COORDINATES: Record<string, { x: number; y: number }> = {
  us: { x: 20, y: 40 },
  ca: { x: 22, y: 28 },
  mx: { x: 18, y: 48 },
  br: { x: 32, y: 68 },
  ar: { x: 29, y: 80 },
  cl: { x: 27, y: 78 },
  co: { x: 26, y: 56 },
  pe: { x: 25, y: 62 },
  gb: { x: 47, y: 30 },
  de: { x: 51, y: 34 },
  fr: { x: 48, y: 36 },
  es: { x: 46, y: 40 },
  it: { x: 51, y: 38 },
  nl: { x: 49, y: 32 },
  se: { x: 52, y: 24 },
  no: { x: 51, y: 22 },
  dk: { x: 50, y: 30 },
  fi: { x: 54, y: 22 },
  pl: { x: 53, y: 34 },
  ru: { x: 65, y: 28 },
  in: { x: 70, y: 48 },
  cn: { x: 78, y: 40 },
  jp: { x: 86, y: 38 },
  kr: { x: 83, y: 40 },
  au: { x: 85, y: 78 },
  nz: { x: 92, y: 84 },
  za: { x: 54, y: 74 },
  eg: { x: 54, y: 46 },
  ng: { x: 50, y: 54 },
  ae: { x: 61, y: 48 },
  sa: { x: 59, y: 48 },
  sg: { x: 76, y: 58 },
  hk: { x: 79, y: 46 },
  tw: { x: 82, y: 46 },
  th: { x: 75, y: 52 },
  id: { x: 78, y: 60 },
  my: { x: 76, y: 56 },
  ph: { x: 81, y: 52 },
  vn: { x: 77, y: 50 },
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

interface ViewsRankingRowProps {
  data: ViewsLocationData
  metricLabel: string
}

/**
 * Ranking row for the views variant - shows value count instead of score/status
 */
function ViewsRankingRow({ data, metricLabel }: ViewsRankingRowProps) {
  const formattedValue = data.value.toLocaleString()

  return (
    <div className="flex items-center justify-between">
      {/* Left side: rank, flag, country info */}
      <div className="flex items-center gap-3">
        <span className="w-4 text-sm font-bold text-foreground">{data.rank}.</span>
        <CountryFlag countryCode={data.countryCode} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base text-foreground">{data.country}</span>
            {data.isTarget && (
              <StatusBadge label="Target" variant="outline" className="border-primary text-primary" />
            )}
            {data.hasWarning && (
              <TriangleAlert className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>
      </div>

      {/* Right side: value and metric label */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-foreground">{formattedValue}</span>
        <span className="text-xs text-muted-foreground">{metricLabel}</span>
      </div>
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

interface AlertBoxProps {
  alert: LocationAlert
}

/**
 * Alert box for the views variant - shows warnings or info messages
 */
function AlertBox({ alert }: AlertBoxProps) {
  const isError = alert.type === 'error'

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-3 py-3',
        isError
          ? 'border-red-600 bg-background'
          : 'border-foreground/20 bg-background'
      )}
    >
      {isError ? (
        <TriangleAlert className="h-6 w-6 flex-shrink-0 text-red-600" />
      ) : (
        <Info className="h-6 w-6 flex-shrink-0 text-foreground" />
      )}
      <p
        className={cn(
          'text-sm',
          isError ? 'text-red-800' : 'text-foreground'
        )}
      >
        {alert.message}
        {alert.highlightedText && (
          <span className="font-bold"> {alert.highlightedText}</span>
        )}
      </p>
    </div>
  )
}

interface MapPinProps {
  x: number
  y: number
  size: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Map pin component - teardrop marker with inner circle
 * Positioned absolutely over the map image using percentage coordinates
 */
function MapPin({ x, y, size }: MapPinProps) {
  const sizeMap = {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  }
  const pinSize = sizeMap[size]

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: pinSize,
        height: pinSize,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <svg
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-sm"
      >
        {/* Teardrop shape */}
        <path
          d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
          fill="#36B7FA"
          stroke="#0077BE"
          strokeWidth="1.5"
        />
        {/* Inner circle */}
        <circle cx="12" cy="12" r="4" fill="#0077BE" />
      </svg>
    </div>
  )
}

/**
 * Calculate pin size based on relative value ranking
 */
function getPinSize(rank: number, total: number): 'sm' | 'md' | 'lg' | 'xl' {
  const ratio = rank / total
  if (ratio <= 0.17) return 'xl' // Top ~17% (rank 1)
  if (ratio <= 0.33) return 'lg' // Top ~33% (rank 2)
  if (ratio <= 0.5) return 'md' // Top ~50% (ranks 3-4)
  return 'sm' // Bottom 50%
}

/**
 * World map image with dynamically positioned pins overlay
 */
interface WorldMapProps {
  countryCodes: string[]
  ranks: number[]
}

function WorldMap({ countryCodes, ranks }: WorldMapProps) {
  const totalCountries = countryCodes.length

  return (
    <div className="relative h-full w-full" style={{ minHeight: '300px' }}>
      {/* Base map image */}
      <img
        src="/images/world-map.png"
        alt="World map showing viewer distribution"
        className="h-full w-full rounded-lg object-cover"
      />

      {/* Dynamic map pins overlay */}
      {countryCodes.map((code, index) => {
        const coords = COUNTRY_COORDINATES[code.toLowerCase()]
        if (!coords) return null
        const size = getPinSize(ranks[index], totalCountries)
        return (
          <MapPin
            key={code}
            x={coords.x}
            y={coords.y}
            size={size}
          />
        )
      })}
    </div>
  )
}

/**
 * LocationBreakdownCard - Displays location/country breakdown with rankings and a world map
 *
 * @variant 'score' - Original variant showing subscriber counts with score/status indicators
 * @variant 'views' - Platform-specific variant showing metric values with alerts
 *
 * @example
 * // Score variant (original)
 * <LocationBreakdownCard
 *   title="Subscriber Location"
 *   subtitle="Where your subscribers are located"
 *   data={scoreData}
 *   insightText="Your audience is growing in Europe"
 * />
 *
 * @example
 * // Views variant (for platform pages)
 * <LocationBreakdownCard
 *   variant="views"
 *   title="TikTok Views By Location"
 *   subtitle="TikTok viewers distributed throughout the globe"
 *   data={viewsData}
 *   metricLabel="Views"
 *   alerts={[
 *     { type: 'error', message: 'India not in the top 3 -', highlightedText: 'review strategy' },
 *     { type: 'info', message: '65% from the US -', highlightedText: 'highly concentrated' }
 *   ]}
 * />
 */
export function LocationBreakdownCard(props: LocationBreakdownCardProps) {
  const { title, subtitle, className } = props
  const isViewsVariant = props.variant === 'views'

  // Extract country codes and ranks for the map
  const countryCodes = props.data.map((item) => item.countryCode)
  const ranks = props.data.map((item) => item.rank)

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
        <div className="flex flex-col lg:w-[340px]">
          <div className="flex flex-col gap-3">
            {isViewsVariant
              ? (props.data as ViewsLocationData[]).map((item, index) => (
                  <div key={item.countryCode}>
                    <ViewsRankingRow data={item} metricLabel={props.metricLabel} />
                    {index < props.data.length - 1 && (
                      <div className="mt-3 h-px w-full bg-border" />
                    )}
                  </div>
                ))
              : (props.data as LocationData[]).map((item, index) => (
                  <div key={item.countryCode}>
                    <CountryRankingRow data={item} />
                    {index < props.data.length - 1 && (
                      <div className="mt-3 h-px w-full bg-border" />
                    )}
                  </div>
                ))}
          </div>

          {/* Bottom Section - Alerts or Insight */}
          {isViewsVariant && props.alerts && props.alerts.length > 0 ? (
            <div className="mt-6 flex flex-col gap-3">
              {props.alerts.map((alert, index) => (
                <AlertBox key={index} alert={alert} />
              ))}
            </div>
          ) : !isViewsVariant && props.insightText ? (
            <>
              <div className="my-4 h-px w-full bg-border" />
              <InsightBox text={props.insightText} />
            </>
          ) : null}
        </div>

        {/* Right Column - World Map */}
        <div className="relative flex-1 overflow-hidden rounded-lg border border-border">
          <WorldMap countryCodes={countryCodes} ranks={ranks} />
        </div>
      </div>
    </BaseCard>
  )
}
