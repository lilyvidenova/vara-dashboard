# Top Performing Content Section - Implementation Plan

## Overview

A reusable card section displaying a ranked list of top performing content items with thumbnails, platform icons, upload dates, and performance scores.

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Top Performing Content  ↗                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ [#1] [thumbnail] [IG] Sudan Archives - A BUGS LIFE          848 ●           │
│                       📅 Date uploaded  21 Jul, 2025        Exceptional     │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [#2] [thumbnail] [YT] Rosalia - La Rumba del Perdón         813 ●           │
│                       📅 Date uploaded  5 Nov, 2025         Exceptional     │
│ ─────────────────────────────────────────────────────────────────────────── │
│ [#3] [thumbnail] [FB] Cameron Winter - Nausicaä (Lo...      731 ●           │
│                       📅 Date uploaded  24 Jun, 2025        Strong          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Container Card

| Property | Value |
|----------|-------|
| Background | White (`#ffffff`) |
| Border | 1px solid `#d4d4d8` |
| Border radius | 8px |
| Padding | 24px |
| Gap | 24px |

### Header

| Element | Specification |
|---------|---------------|
| Title | 20px bold, `#09090b` |
| Arrow icon | ArrowUpRight, rotated, green `#16a34a` |
| Layout | Row with gap 2px |

### Content List

| Property | Value |
|----------|-------|
| Gap between rows | 12px |
| Separator | 1px solid `#d4d4d8` |

### Content Row

| Element | Specification |
|---------|---------------|
| Row gap | 12px |
| Alignment | Items start |

### Rank Badge

| Property | Value |
|----------|-------|
| Width | 36px |
| Background | `#fafafa` |
| Border | 1px solid `#d4d4d8` |
| Border radius | 9999px (full) |
| Text | 12px bold, `#18181b` |
| Format | "# 1", "# 2", etc. |

### Thumbnail

| Property | Value |
|----------|-------|
| Width | 100px |
| Height | 54px |
| Border radius | 2px |
| Object fit | Cover |

### Content Info (Middle Section)

| Element | Specification |
|---------|---------------|
| Platform icon | 24px round (use existing platform icons) |
| Title | 16px regular, `#09090b`, text-ellipsis, overflow hidden |
| Icon-title gap | 8px |
| Title row - date row gap | 12px |

### Date Section

| Element | Specification |
|---------|---------------|
| Calendar icon | 12px, `#0164a3` (primary) |
| "Date uploaded" | 12px regular, `#52525b` (muted) |
| Date value | 12px regular, `#18181b` |
| Gap between elements | 4px |

### Score Section (Right Side)

| Element | Specification |
|---------|---------------|
| Score | 14px bold, `#09090b` |
| Status dot | 6px circle, `#2FAF8F` (green) |
| Score-dot gap | 8px |
| Status label | 12px regular, `#52525b` |
| Alignment | Right-aligned, stacked vertically |
| Gap | 6px |

---

## Data Structure

```typescript
type ContentPlatform = 'instagram' | 'youtube' | 'facebook' | 'tiktok' | 'x' | 'snapchat' | 'linkedin'
type ContentStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

interface ContentItem {
  id: string
  rank: number
  thumbnail: string           // Image URL
  platform: ContentPlatform
  title: string
  dateUploaded: string        // Formatted date, e.g., "21 Jul, 2025"
  score: number
  status: ContentStatus
}

interface TopPerformingContentSectionProps {
  title?: string
  items: ContentItem[]
  onTitleClick?: () => void   // For the arrow navigation
  className?: string
}
```

---

## Component Structure

```
TopPerformingContentSection
├── Header
│   ├── Title
│   └── ArrowIcon (link indicator)
└── ContentList
    └── ContentRow (×n)
        ├── RankBadge
        ├── Thumbnail
        ├── ContentInfo
        │   ├── TitleRow
        │   │   ├── PlatformIcon
        │   │   └── Title
        │   └── DateRow
        │       ├── CalendarIcon
        │       ├── "Date uploaded"
        │       └── DateValue
        └── ScoreSection
            ├── Score + StatusDot
            └── StatusLabel
        └── Separator (except last)
```

---

## Sub-Components

### RankBadge
Displays the rank number in a pill badge.

```typescript
interface RankBadgeProps {
  rank: number
  className?: string
}
```

### ContentRow
Single content item row with all elements.

```typescript
interface ContentRowProps {
  item: ContentItem
  showSeparator?: boolean
}
```

---

## Sample Data

```typescript
const SAMPLE_CONTENT: ContentItem[] = [
  {
    id: '1',
    rank: 1,
    thumbnail: '/images/sudan-archives.jpg',
    platform: 'instagram',
    title: 'Sudan Archives - A BUGS LIFE',
    dateUploaded: '21 Jul, 2025',
    score: 848,
    status: 'exceptional',
  },
  {
    id: '2',
    rank: 2,
    thumbnail: '/images/rosalia.jpg',
    platform: 'youtube',
    title: 'Rosalia - La Rumba del Perdón',
    dateUploaded: '5 Nov, 2025',
    score: 813,
    status: 'exceptional',
  },
  {
    id: '3',
    rank: 3,
    thumbnail: '/images/cameron-winter.jpg',
    platform: 'facebook',
    title: 'Cameron Winter - Nausicaä (Love Will Be Revealed)',
    dateUploaded: '24 Jun, 2025',
    score: 731,
    status: 'strong',
  },
]
```

---

## Platform Icons

Reuse the existing platform icon system from `PlatformPerformanceSection`:
- Instagram: Gradient logo (24px round)
- YouTube: White bg, gray border, red play button
- Facebook: Blue circle with white f
- TikTok: Black circle with white logo
- X: Black circle with white X
- Snapchat: Yellow circle with ghost
- LinkedIn: White bg, gray border, blue "in"

---

## Status Colors

| Status | Dot Color |
|--------|-----------|
| Exceptional | `#2FAF8F` (green) |
| Strong | `#2FAF8F` (green) |
| Healthy | `#EAB04C` (amber) |
| At Risk | `#F1666A` (red) |
| Underperforming | `#F1666A` (red) |

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/sections/TopPerformingContentSection.tsx` | Main section component |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/index.ts` | Add new export |
| `src/pages/OverallPerformance.tsx` | Add section to page |

---

## Implementation Steps

1. **Create TopPerformingContentSection** - Main component with header and content list
2. **Create RankBadge sub-component** - Inline rank display
3. **Create ContentRow sub-component** - Individual content item row
4. **Reuse platform icons** - From PlatformPerformanceSection
5. **Update sections index** - Export new component
6. **Add to OverallPerformance page** - With sample data
7. **Verify build**

---

## Example Usage

```tsx
<TopPerformingContentSection
  title="Top Performing Content"
  items={[
    {
      id: '1',
      rank: 1,
      thumbnail: '/images/content1.jpg',
      platform: 'instagram',
      title: 'Sudan Archives - A BUGS LIFE',
      dateUploaded: '21 Jul, 2025',
      score: 848,
      status: 'exceptional',
    },
    // ...more items
  ]}
  onTitleClick={() => console.log('Navigate to full list')}
/>
```

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Stack vertically, hide thumbnail or make smaller |
| Tablet (≥640px) | Full row layout |
| Desktop (≥1024px) | Full layout as designed |

### Mobile Adjustments
- Thumbnail: 80x45px or hidden
- Title: Truncate more aggressively
- Score section: May stack below content info
- Reduced padding (16px)
