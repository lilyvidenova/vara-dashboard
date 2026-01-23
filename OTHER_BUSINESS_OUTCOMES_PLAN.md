# Other Business Outcomes Section - Implementation Plan

## Overview

A card section displaying a table of business outcome metrics with scores, growth indicators, and action buttons.

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Other Business Outcomes                                                      │
│ How you are performing in non focus areas                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ Metric                    │ Score          │ Growth         │               │
│                           │                │ vs last period │               │
├───────────────────────────┼────────────────┼────────────────┼───────────────┤
│ (↻) Audience Satisfaction │ 884            │ + 54%          │ [More Detail] │
│     Reach, visibility...  │ Exceptional    │                │               │
├───────────────────────────┼────────────────┼────────────────┼───────────────┤
│ ($) Audience Loyalty      │ 486            │ + 21%          │ [More Detail] │
│     Platform-generated... │ At Risk        │                │               │
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
| Shadow | `0px 1px 2px rgba(0,0,0,0.05)` |

### Header

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 20px | Bold | `#09090b` |
| Subtitle | 14px | Regular | `#52525b` |
| Title-subtitle gap | 4px |

### Table Structure

| Property | Value |
|----------|-------|
| Min width | 356px |
| Header row height | 48px |
| Data row height | 52px |
| Cell padding | 16px |
| Row border | 1px solid `#d4d4d8` (bottom) |

### Column Headers

| Property | Value |
|----------|-------|
| Font size | 14px |
| Font weight | Regular |
| Color | `#52525b` (muted) |
| Min width | 85px |

### Metric Column (Column 1)

| Element | Specification |
|---------|---------------|
| Icon container | 40×40px, rounded-full |
| Icon container bg | `#fafafa` |
| Icon container border | 1px solid `#d4d4d8` |
| Icon | 24×24px, color `#0164a3` |
| Icon-text gap | 8px |
| Metric title | 16px regular, `#18181b` |
| Metric subtitle | 14px regular, `#52525b` |

### Score Column (Column 2)

| Element | Specification |
|---------|---------------|
| Score value | 14px bold, `#18181b` |
| Status label | 14px regular, `#52525b` |
| Stacked vertically |

### Growth Column (Column 3)

| Element | Specification |
|---------|---------------|
| Header | "Growth" + "vs last period" (2 lines) |
| Value | 14px regular |
| Positive color | `#2FAF8F` (green) |
| Negative color | `#F1666A` (red) |

### Action Column (Column 4)

| Element | Specification |
|---------|---------------|
| No header text |
| Button bg | `#fafafa` |
| Button border | 1px solid `#e4e4e7` |
| Button height | 32px |
| Button padding | 12px horizontal, 8px vertical |
| Button radius | 6px |
| Button text | 14px regular, `#18181b` |
| Button icon | CircleArrowRight, 16px |
| Button gap | 8px |

---

## Data Structure

```typescript
import { LucideIcon } from 'lucide-react'

type OutcomeStatus = 'exceptional' | 'strong' | 'healthy' | 'at-risk' | 'underperforming'

interface BusinessOutcome {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  score: number
  status: OutcomeStatus
  growth: string          // e.g., "+ 54%", "- 12%"
  growthDirection: 'up' | 'down'
}

interface OtherBusinessOutcomesSectionProps {
  title?: string
  subtitle?: string
  outcomes: BusinessOutcome[]
  onMoreDetail?: (outcomeId: string) => void
  className?: string
}
```

---

## Component Structure

```
OtherBusinessOutcomesSection
├── CardHeader
│   ├── Title
│   └── Subtitle
└── OutcomesTable
    ├── TableHeader
    │   ├── MetricHeader ("Metric")
    │   ├── ScoreHeader ("Score")
    │   ├── GrowthHeader ("Growth" / "vs last period")
    │   └── ActionHeader (empty)
    └── TableBody
        └── OutcomeRow (×n)
            ├── MetricCell
            │   ├── IconAvatar
            │   ├── Title
            │   └── Subtitle
            ├── ScoreCell
            │   ├── Score
            │   └── StatusLabel
            ├── GrowthCell
            │   └── GrowthValue (colored)
            └── ActionCell
                └── MoreDetailButton
```

---

## Sub-Components

### IconAvatar
Circular container with icon inside.

```typescript
interface IconAvatarProps {
  icon: LucideIcon
  className?: string
}
```

### OutcomeRow
Single row in the outcomes table.

```typescript
interface OutcomeRowProps {
  outcome: BusinessOutcome
  onMoreDetail?: () => void
}
```

---

## Sample Data

```typescript
const SAMPLE_OUTCOMES: BusinessOutcome[] = [
  {
    id: 'audience-satisfaction',
    icon: Repeat,
    title: 'Audience Satisfaction',
    subtitle: 'Reach, visibility & Impressions',
    score: 884,
    status: 'exceptional',
    growth: '+ 54%',
    growthDirection: 'up',
  },
  {
    id: 'audience-loyalty',
    icon: CircleDollarSign,
    title: 'Audience Loyalty',
    subtitle: 'Platform-generated revenue',
    score: 486,
    status: 'at-risk',
    growth: '+ 21%',
    growthDirection: 'up',
  },
]
```

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/sections/OtherBusinessOutcomesSection.tsx` | Main section component |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/index.ts` | Add new export |
| `src/pages/OverallPerformance.tsx` | Add section to page |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Horizontal scroll on table, or stack rows |
| Tablet (≥640px) | Full table layout |
| Desktop (≥1024px) | Full table layout |

### Mobile Adjustments
- Table may need horizontal scroll wrapper
- Or consider card-based layout for each row on mobile
- Reduced padding

---

## Status Label Mapping

```typescript
function getStatusLabel(status: OutcomeStatus): string {
  switch (status) {
    case 'exceptional': return 'Exceptional'
    case 'strong': return 'Strong'
    case 'healthy': return 'Healthy'
    case 'at-risk': return 'At Risk'
    case 'underperforming': return 'Underperforming'
  }
}
```

---

## Implementation Steps

1. **Create OtherBusinessOutcomesSection** - Main component with table structure
2. **Create IconAvatar sub-component** - Circular icon container (inline or separate)
3. **Update sections index** - Export new component
4. **Add to OverallPerformance page** - With sample data
5. **Verify build**

---

## Example Usage

```tsx
import { Repeat, CircleDollarSign } from 'lucide-react'

<OtherBusinessOutcomesSection
  title="Other Business Outcomes"
  subtitle="How you are performing in non focus areas"
  outcomes={[
    {
      id: 'audience-satisfaction',
      icon: Repeat,
      title: 'Audience Satisfaction',
      subtitle: 'Reach, visibility & Impressions',
      score: 884,
      status: 'exceptional',
      growth: '+ 54%',
      growthDirection: 'up',
    },
    {
      id: 'audience-loyalty',
      icon: CircleDollarSign,
      title: 'Audience Loyalty',
      subtitle: 'Platform-generated revenue',
      score: 486,
      status: 'at-risk',
      growth: '+ 21%',
      growthDirection: 'up',
    },
  ]}
  onMoreDetail={(id) => console.log('More detail for', id)}
/>
```

---

## Reusable Components

This section can potentially reuse:
- `BaseCard` - Card container
- Existing button styles from `MoreDetailButton` pattern

New elements specific to this component:
- Table structure with headers
- IconAvatar (40px circular icon container)
- Two-line score cell (value + status)
