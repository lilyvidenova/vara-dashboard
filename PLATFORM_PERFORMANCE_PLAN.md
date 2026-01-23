# Platform Performance Section - Implementation Plan

## Overview

A card displaying platform-by-platform content impact scores with status indicators and an AI insight box.

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Platform Performance                                                     │
│ Content Impact Score by platform                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ [Icon] Instagram          848 ● Exceptional     [ More Detail → ]       │
│        356 Pieces of Content                                            │
│ ─────────────────────────────────────────────────────────────────────── │
│ [Icon] TikTok             751 ● Strong          [ More Detail → ]       │
│        36 Pieces of Content                                             │
│ ─────────────────────────────────────────────────────────────────────── │
│ ... (more platforms)                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ ✨ Instagram shows both high performance and high scale...              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Container Card

| Property | Value |
|----------|-------|
| Background | White |
| Border | 1px solid `#d4d4d8` |
| Border radius | 8px |
| Padding | 24px |
| Gap | 24px |

### Header

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 20px | Bold | `#09090b` |
| Subtitle | 14px | Regular | `#52525b` |
| Gap | 4px |

### Platform Row

| Element | Specification |
|---------|---------------|
| Row gap | 12px between rows |
| Left section width | 192px |
| Icon size | 40px (round) |
| Icon-to-text gap | 12px |
| Platform name | 14px regular, `#09090b` |
| Content count | 12px regular, `#52525b` |
| Name-count gap | 4px |

### Score Section (Right side)

| Element | Specification |
|---------|---------------|
| Score | 14px bold, `#09090b` |
| Status dot | 6px circle |
| Score-dot gap | 8px |
| Status label | 12px regular, `#52525b` |
| Score-label gap | 6px |
| Section-button gap | 40px |

### Status Colors

| Status | Dot Color | Score Range |
|--------|-----------|-------------|
| Exceptional | `#2FAF8F` (green) | 800+ |
| Strong | `#2FAF8F` (green) | 700-799 |
| Healthy | `#EAB04C` (amber) | 500-699 |
| At Risk | `#F1666A` (red) | 300-499 |
| Underperforming | `#F1666A` (red) | <300 |

### More Detail Button

| Property | Value |
|----------|-------|
| Background | `#fafafa` |
| Border | 1px solid `#e4e4e7` |
| Border radius | 6px |
| Height | 32px |
| Padding | 12px horizontal, 8px vertical |
| Text | 14px regular, `#18181b` |
| Icon | CircleArrowRight, 16px |
| Gap | 8px |

### Separator

| Property | Value |
|----------|-------|
| Height | 1px |
| Color | `#d4d4d8` |
| Full width |

### AI Insight Box

| Property | Value |
|----------|-------|
| Background | `#fafafa` |
| Border | 1px solid `#d4d4d8` |
| Border radius | 8px |
| Padding | 12px horizontal, 16px vertical |
| Icon | Sparkles, 24px, `#0164a3` |
| Text | 14px regular, black |
| Icon-text gap | 12px |

---

## Platform Icons

| Platform | Icon Style |
|----------|------------|
| Instagram | Gradient logo (40px round) |
| TikTok | Black circle with white logo |
| YouTube | White bg, gray border, red play button |
| X | Black circle with white X |
| Facebook | Blue circle with white f |
| SnapChat | Yellow circle with ghost |
| LinkedIn | White bg, gray border, blue "in" |

**Note:** Use actual platform logo images or Lucide icons as fallback.

---

## Data Structure

```typescript
type PlatformStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

interface PlatformData {
  id: string
  name: string
  icon: React.ReactNode | string  // Component or image URL
  contentCount: number
  score: number
  status: PlatformStatus
}

interface PlatformPerformanceSectionProps {
  platforms: PlatformData[]
  aiInsight?: string
  onMoreDetail?: (platformId: string) => void
  className?: string
}
```

---

## Component Structure

```
PlatformPerformanceSection
├── SectionHeader
│   ├── Title
│   └── Subtitle
├── PlatformList
│   └── PlatformRow (×7)
│       ├── PlatformInfo
│       │   ├── PlatformIcon
│       │   ├── Name
│       │   └── ContentCount
│       ├── ScoreDisplay
│       │   ├── Score
│       │   ├── StatusDot
│       │   └── StatusLabel
│       └── MoreDetailButton
│       └── Separator (except last)
└── AIInsightBox (optional)
    ├── SparklesIcon
    └── InsightText
```

---

## Sub-Components

### PlatformIcon
```typescript
interface PlatformIconProps {
  platform: string  // 'instagram' | 'tiktok' | etc.
  src?: string      // Custom image URL
  className?: string
}
```

### StatusDot
```typescript
interface StatusDotProps {
  status: PlatformStatus
  className?: string
}
```

### PlatformRow
```typescript
interface PlatformRowProps {
  platform: PlatformData
  onMoreDetail?: () => void
  showSeparator?: boolean
}
```

### AIInsightBox
```typescript
interface AIInsightBoxProps {
  insight: string
  className?: string
}
```

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/sections/PlatformPerformanceSection.tsx` | Main section |
| `src/components/sections/PlatformRow.tsx` | Individual platform row |
| `src/components/sections/AIInsightBox.tsx` | AI insight component |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/index.ts` | Add new exports |
| `src/pages/OverallPerformance.tsx` | Add section to page |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Stack score below platform info |
| Tablet (≥640px) | Side-by-side layout |
| Desktop (≥1024px) | Full row layout as designed |

### Mobile Adjustments
- Platform info and score stack vertically
- Button moves below score
- Reduced padding (16px)
- Icon size: 32px

---

## Implementation Steps

1. **Create AIInsightBox** - Simple insight display
2. **Create StatusDot** - Colored status indicator
3. **Create PlatformRow** - Individual row with all elements
4. **Create PlatformPerformanceSection** - Complete section
5. **Update sections index**
6. **Add to page with sample data**
7. **Verify build**

---

## Example Usage

```tsx
<PlatformPerformanceSection
  platforms={[
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <InstagramIcon />,
      contentCount: 356,
      score: 848,
      status: 'exceptional',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <TikTokIcon />,
      contentCount: 36,
      score: 751,
      status: 'strong',
    },
    // ... more platforms
  ]}
  aiInsight="Instagram shows both high performance and high scale..."
  onMoreDetail={(id) => console.log('View details for', id)}
/>
```

---

## Status Calculation Helper

```typescript
function getStatusFromScore(score: number): PlatformStatus {
  if (score >= 800) return 'exceptional'
  if (score >= 700) return 'strong'
  if (score >= 500) return 'healthy'
  if (score >= 300) return 'at-risk'
  return 'underperforming'
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
```
