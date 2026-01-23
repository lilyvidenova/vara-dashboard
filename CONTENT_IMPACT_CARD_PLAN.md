# Vara Content Impact Score Card - Implementation Plan

## Overview

A focused card component displaying a content impact score with a semicircular gauge visualization.

## Visual Reference

The card contains:
- Title: "Vara Content Impact Score" (bold, 30px)
- Subtitle: "Overall Performance Across Platforms & Content" (gray, 14px)
- Semicircular gauge with 3 colored segments
- Large score number centered in gauge (48px, bold)
- Status badge with border ("Exceptional")
- Change indicator with arrow icon

## Design Specifications

### Container
| Property | Value |
|----------|-------|
| Background | `var(--base-card)` / `#ffffff` |
| Border | 1px solid `var(--base-border)` / `#d4d4d8` |
| Border Radius | 8px |
| Padding | 40px horizontal, 24px vertical |
| Padding (mobile) | 24px horizontal, 20px vertical |

### Typography
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 30px (mobile: 24px) | Bold | `#18181b` |
| Subtitle | 14px | Regular | `#6b7280` |
| Score | 48px (mobile: 36px) | Bold | `#18181b` |
| Badge | 12px | Bold | `#18181b` |
| Change % | 14px | Regular | `#2faf8f` (green) |
| Change suffix | 14px | Regular | `#52525b` |

### Gauge Colors
| Segment | Color | Position |
|---------|-------|----------|
| Underperforming | `#F87171` (red/coral) | Left arc |
| Healthy | `#FBBF24` (amber) | Middle arc |
| Strong | `#2FAF8F` (teal/green) | Right arc |

### Badge
| Property | Value |
|----------|-------|
| Background | `var(--base-background)` / `#fafafa` |
| Border | 1px solid `var(--base-border)` |
| Border Radius | 9999px (full) |
| Padding | 10px horizontal, 0-2px vertical |
| Font | 12px bold |

### Spacing
| Between | Gap |
|---------|-----|
| Title ↔ Subtitle | 8px |
| Title section ↔ Gauge | 24px |
| Score ↔ Badge | 12px |
| Badge ↔ Change indicator | 12px |

## Component Structure

```
ContentImpactCard
├── Title Section
│   ├── Title (h2)
│   └── Subtitle (p)
├── Gauge Section
│   ├── ImpactGauge (SVG)
│   │   ├── Left arc (underperforming)
│   │   ├── Middle arc (healthy)
│   │   └── Right arc (strong)
│   ├── Score (centered in gauge)
│   ├── StatusBadge (outline variant)
│   └── ChangeIndicator
```

## Props Interface

```typescript
interface ContentImpactCardProps {
  title?: string           // Default: "Vara Content Impact Score"
  subtitle?: string        // Default: "Overall Performance Across Platforms & Content"
  score: number            // The score value (e.g., 865)
  maxScore?: number        // Default: 1000
  statusLabel: string      // Badge text (e.g., "Exceptional")
  changeValue: string      // e.g., "64%"
  changeDirection: 'up' | 'down'
  className?: string
}
```

## Implementation Steps

1. **Create ImpactGauge component**
   - SVG-based semicircular gauge
   - Three arc segments with fixed colors
   - Responsive sizing

2. **Create OutlineBadge component** (or update existing StatusBadge)
   - Outline variant with border
   - Background color `#fafafa`

3. **Create ContentImpactCard component**
   - Compose gauge, badge, and change indicator
   - Responsive typography scaling
   - Centered layout

4. **Update OverallPerformance page**
   - Replace existing MetricsCard usage with ContentImpactCard

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/cards/ImpactGauge.tsx` | Create |
| `src/components/cards/ContentImpactCard.tsx` | Create |
| `src/components/cards/StatusBadge.tsx` | Add outline variant |
| `src/components/cards/index.ts` | Update exports |
| `src/pages/OverallPerformance.tsx` | Update to use new card |

## Responsive Behavior

| Breakpoint | Title | Score | Padding |
|------------|-------|-------|---------|
| Mobile (<768px) | 24px | 36px | 24px / 20px |
| Desktop (≥768px) | 30px | 48px | 40px / 24px |
