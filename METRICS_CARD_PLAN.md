# Metrics Card (Reusable) - Implementation Plan

## Overview

A reusable metrics card displaying a configurable metric with gauge visualization, status badge, change indicator, efficiency/growth stats, and a "More Detail" button. This component can be used for different metric types (Brand Awareness, Engagement, etc.) by configuring the icon, title, and values.

---

## Visual Structure

```
┌─────────────────────────────────────────────────────┐
│        (●)) Brand Awareness                         │
│        Reach, visibility & impressions              │
│                                                     │
│              ╭─────────────╮                        │
│            ╱               ╲                        │
│          ╱                   ╲                      │
│         ╱       763           ╲                     │
│                                                     │
│              [ Strong ]                             │
│           ↗ 64% vs last period                      │
│ ─────────────────────────────────────────────────── │
│    ⚡ Efficiency  78/post    📈 Growth  + 54%       │
│ ─────────────────────────────────────────────────── │
│          [ More Detail  ⊙→ ]                        │
└─────────────────────────────────────────────────────┘
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
| Gap between sections | 24px |

### Header Section

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Icon | 24px | - | `#0164a3` (primary) |
| Title | 20px | Bold | `#09090b` |
| Subtitle | 14px | Regular | `#52525b` |
| Icon-title gap | 6px |
| Title-subtitle gap | 4px |

### Gauge Section

| Property | Value |
|----------|-------|
| Gauge width | ~142px (smaller than ContentImpactCard) |
| Score font | 36px bold, black |
| Score-badge gap | 8px |
| Badge-change gap | 8px |

**Note:** Uses a smaller version of the existing gauge or a separate small gauge component.

### Status Badge

| Property | Value |
|----------|-------|
| Background | `#fafafa` |
| Border | 1px solid `#d4d4d8` |
| Border radius | 9999px (full) |
| Padding | 10px horizontal, 0-2px vertical |
| Text | 12px bold, `#18181b` |

### Change Indicator

| Element | Specification |
|---------|---------------|
| Arrow icon | 16px, `#2FAF8F` (green for up) |
| Percentage | 14px regular, `#2FAF8F` |
| "vs last period" | 14px regular, `#52525b` |
| Gap | 4px |

### Separator

| Property | Value |
|----------|-------|
| Height | 1px |
| Color | `#d4d4d8` |
| Full width |

### Stats Section

| Element | Specification |
|---------|---------------|
| Container gap | 24px between stats |
| Icon | 16px, `#0164a3` (primary) |
| Label | 14px regular, `#52525b` |
| Value | 16px bold, `#18181b` |
| Unit (e.g., "/post") | 12px regular, `#18181b` |
| Icon-label gap | 4px |
| Label-value gap | 8px |

### More Detail Button

| Property | Value |
|----------|-------|
| Background | White |
| Border | 1px solid `#0164a3` (primary) |
| Border radius | 6px |
| Height | 32px |
| Padding | 12px horizontal, 8px vertical |
| Text | 14px regular, `#0164a3` |
| Icon | CircleArrowRight, 16px, `#0164a3` |
| Gap | 8px |
| Width | 100% (full width) |

---

## Data Structure

```typescript
import { LucideIcon } from 'lucide-react'

interface MetricStat {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string  // e.g., "/post"
}

interface MetricsCardProps {
  // Header
  icon: LucideIcon
  title: string
  subtitle: string

  // Gauge & Score
  score: number
  statusLabel: string

  // Change indicator
  changeValue: string
  changeDirection: 'up' | 'down'

  // Stats (optional)
  stats?: MetricStat[]

  // Action
  onMoreDetail?: () => void

  className?: string
}
```

---

## Component Structure

```
MetricsCard (Reusable)
├── CardHeader
│   ├── Icon (configurable Lucide icon)
│   ├── Title
│   └── Subtitle
├── GaugeSection
│   ├── SmallGauge (or scaled ImpactGauge)
│   ├── ScoreDisplay
│   ├── StatusBadge
│   └── ChangeIndicator
├── Separator
├── StatsSection (optional)
│   └── MetricStat (×n)
│       ├── Icon
│       ├── Label
│       └── Value + Unit
├── Separator (if stats present)
└── MoreDetailButton
```

---

## Sub-Components

### SmallGauge (New)
A smaller version of the gauge for use in this card.

```typescript
interface SmallGaugeProps {
  className?: string
}
```

**Dimensions:**
- Width: ~142px
- Height: ~76px
- Stroke width: proportionally smaller

### MetricStat (New)
Individual stat display with icon, label, and value.

```typescript
interface MetricStatProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  className?: string
}
```

### OutlineButton (Reuse/Create)
Primary outline button for "More Detail" action.

```typescript
interface OutlineButtonProps {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}
```

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/cards/SmallGauge.tsx` | Smaller gauge visualization |
| `src/components/cards/MetricStat.tsx` | Individual stat with icon/label/value |
| `src/components/cards/OutlineButton.tsx` | Primary outline button |
| `src/components/cards/MetricsCardReusable.tsx` | Main reusable metrics card |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/index.ts` | Add new exports |
| `src/pages/OverallPerformance.tsx` | Add example usage (optional) |

---

## Existing Components to Reuse

| Component | Usage |
|-----------|-------|
| `BaseCard` | Card container |
| `StatusBadge` | Status display (outline variant) |
| `ChangeIndicator` | Percentage change display |

---

## Implementation Steps

1. **Create SmallGauge** - Scaled-down version of ImpactGauge
2. **Create MetricStat** - Icon + label + value display
3. **Create OutlineButton** - Primary outline button with icon
4. **Create MetricsCardReusable** - Main component combining all parts
5. **Update cards index** - Export new components
6. **Verify build**

---

## Example Usage

```tsx
import { Radio, Zap, TrendingUp } from 'lucide-react'

<MetricsCardReusable
  icon={Radio}
  title="Brand Awareness"
  subtitle="Reach, visibility & impressions"
  score={763}
  statusLabel="Strong"
  changeValue="64%"
  changeDirection="up"
  stats={[
    { icon: Zap, label: 'Efficiency', value: 78, unit: '/post' },
    { icon: TrendingUp, label: 'Growth', value: '+ 54%' },
  ]}
  onMoreDetail={() => console.log('More detail clicked')}
/>
```

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Stats stack vertically, reduced padding |
| Tablet (≥640px) | Stats side-by-side |
| Desktop (≥1024px) | Full layout as designed |

### Mobile Adjustments
- Padding: 16px
- Stats: Stack vertically with full width
- Score font: 30px
- Gauge: Slightly smaller

---

## Variants/Configurations

This component supports different metric types through configuration:

| Metric Type | Icon | Example Stats |
|-------------|------|---------------|
| Brand Awareness | Radio | Efficiency, Growth |
| Engagement | Heart | Likes/post, Comments |
| Reach | Users | Impressions, Views |
| Conversions | Target | CTR, Revenue |

The component is flexible enough to display 0-4 stats in the stats section.

---

## Color Reference

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#0164a3` | Icons, button border/text |
| `foreground` | `#18181b` | Primary text |
| `muted-foreground` | `#52525b` | Secondary text |
| `border` | `#d4d4d8` | Card/separator borders |
| `gauge-green` | `#2FAF8F` | Positive change indicator |
| `gauge-red` | `#F1666A` | Negative change indicator |
