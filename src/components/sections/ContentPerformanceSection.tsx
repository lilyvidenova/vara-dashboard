import { cn } from '@/lib/utils'
import {
  TopPerformingContentSection,
  type ContentItem,
} from './TopPerformingContentSection'

export interface ContentPerformanceSectionProps {
  /** Items for the "Top Performing Content" card */
  topItems: ContentItem[]
  /** Items for the "Worst Performing Content" card */
  worstItems: ContentItem[]
  /** Custom title for top performing card */
  topTitle?: string
  /** Custom title for worst performing card */
  worstTitle?: string
  /** Callback when top card title is clicked */
  onTopTitleClick?: () => void
  /** Callback when worst card title is clicked */
  onWorstTitleClick?: () => void
  /** Additional class names for the wrapper */
  className?: string
}

/**
 * ContentPerformanceSection - A wrapper component that displays both
 * "Top Performing Content" and "Worst Performing Content" cards side-by-side
 * on desktop and stacked on mobile.
 *
 * @example
 * ```tsx
 * <ContentPerformanceSection
 *   topItems={[
 *     {
 *       id: '1',
 *       rank: 1,
 *       thumbnail: '/images/video1.jpg',
 *       platform: 'tiktok',
 *       title: 'A BUGS LIFE',
 *       artist: 'Sudan Archives',
 *       dateUploaded: '21 Jul, 2025',
 *       score: 848,
 *       status: 'exceptional',
 *     },
 *     // ... more items
 *   ]}
 *   worstItems={[
 *     {
 *       id: '8',
 *       rank: 8,
 *       thumbnail: '/images/video8.jpg',
 *       platform: 'tiktok',
 *       title: 'viscus',
 *       artist: 'Oklu & FKA Twigs',
 *       dateUploaded: '18 Aug, 2025',
 *       score: 567,
 *       status: 'healthy',
 *     },
 *     // ... more items
 *   ]}
 * />
 * ```
 */
export function ContentPerformanceSection({
  topItems,
  worstItems,
  topTitle,
  worstTitle,
  onTopTitleClick,
  onWorstTitleClick,
  className,
}: ContentPerformanceSectionProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-2', className)}>
      <TopPerformingContentSection
        variant="top"
        title={topTitle}
        items={topItems}
        onTitleClick={onTopTitleClick}
      />
      <TopPerformingContentSection
        variant="worst"
        title={worstTitle}
        items={worstItems}
        onTitleClick={onWorstTitleClick}
      />
    </div>
  )
}
