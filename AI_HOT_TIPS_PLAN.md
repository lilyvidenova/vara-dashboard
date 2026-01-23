# AI Hot Tips Section - Implementation Plan

## Overview

A card section displaying AI-generated tips/recommendations with risk level badges and bullet-point details.

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ ✨ AI Hot Tips                                                   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Optimize Your Opening Hook                    [ Low Risk ]  │ │
│ │ • Your video loses 42% of viewers within 10 seconds.        │ │
│ │ • Start with a punchy question to improve retention.        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Shorter Intros Improve Watch Time             [ High Risk ] │ │
│ │ • Quickly jumping to value retains 22% more viewers.        │ │
│ │ • Cut filler/branding elements in the first 20 seconds.     │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Container Card

| Property | Value |
|----------|-------|
| Background | White (`#ffffff`) |
| Border | 1px solid `#d4d4d8` |
| Border radius | 8px |
| Padding | 16px horizontal, 24px vertical |
| Gap | 16px |

### Header

| Element | Specification |
|---------|---------------|
| Icon | Sparkles, 24px, `#0164a3` (primary) |
| Title | 20px bold, `#09090b` |
| Icon-title gap | 10px |

### Tip Card

| Property | Value |
|----------|-------|
| Background | `#f0f8ff` (light blue) |
| Border | 1px solid `#d4d4d8` |
| Border radius | 6px |
| Padding | 12px |
| Internal gap | 12px (between title row and bullets) |

### Title Row

| Element | Specification |
|---------|---------------|
| Title | 14px bold, `#18181b` |
| Layout | Space-between (title left, badge right) |

### Risk Badge - Low Risk

| Property | Value |
|----------|-------|
| Background | `#fafafa` |
| Border | 1px solid `#0164a3` (primary) |
| Border radius | 9999px (full) |
| Padding | 10px horizontal, 0-2px vertical |
| Text | 12px bold, `#0164a3` |

### Risk Badge - High Risk

| Property | Value |
|----------|-------|
| Background | White |
| Border | 1px solid `#f87171` (red-400) |
| Border radius | 9999px (full) |
| Padding | 10px horizontal, 0-2px vertical |
| Text | 12px bold, `#dc2626` (destructive) |

### Bullet Points

| Element | Specification |
|---------|---------------|
| Dot | 6px circle, `#0164a3` (primary) |
| Dot-text gap | 8px |
| Text | 14px regular |
| Text color | Alternates: muted (`#52525b`) / foreground (`#18181b`) |
| Bullet gap | 10px between bullets |

---

## Data Structure

```typescript
type RiskLevel = 'low' | 'high'

interface TipBullet {
  text: string
  variant?: 'muted' | 'default'  // text color variant
}

interface AITip {
  id: string
  title: string
  riskLevel: RiskLevel
  bullets: TipBullet[]
}

interface AIHotTipsSectionProps {
  title?: string
  tips: AITip[]
  className?: string
}
```

---

## Component Structure

```
AIHotTipsSection
├── Header
│   ├── SparklesIcon
│   └── Title
└── TipsList
    └── TipCard (×n)
        ├── TitleRow
        │   ├── TipTitle
        │   └── RiskBadge
        └── BulletList
            └── BulletItem (×n)
                ├── Dot
                └── Text
```

---

## Sub-Components

### RiskBadge
Badge showing risk level with appropriate styling.

```typescript
interface RiskBadgeProps {
  level: RiskLevel
  className?: string
}
```

### TipCard
Individual tip card with title, badge, and bullets.

```typescript
interface TipCardProps {
  tip: AITip
}
```

### BulletItem
Single bullet point with dot and text.

```typescript
interface BulletItemProps {
  text: string
  variant?: 'muted' | 'default'
}
```

---

## Sample Data

```typescript
const SAMPLE_TIPS: AITip[] = [
  {
    id: 'opening-hook',
    title: 'Optimize Your Opening Hook',
    riskLevel: 'low',
    bullets: [
      { text: 'Your video loses 42% of viewers within 10 seconds.', variant: 'muted' },
      { text: 'Start with a punchy question to improve retention.', variant: 'default' },
    ],
  },
  {
    id: 'shorter-intros',
    title: 'Shorter Intros Improve Watch Time',
    riskLevel: 'high',
    bullets: [
      { text: 'Quickly jumping to value retains 22% more viewers.', variant: 'muted' },
      { text: 'Cut filler/branding elements in the first 20 seconds.', variant: 'default' },
    ],
  },
]
```

---

## Color Reference

| Element | Color | CSS Variable |
|---------|-------|--------------|
| Primary (icon, low risk, dots) | `#0164a3` | `--primary` |
| Destructive (high risk text) | `#dc2626` | `--destructive` |
| High risk border | `#f87171` | red-400 |
| Tip card background | `#f0f8ff` | custom blue-50 |
| Muted text | `#52525b` | `--muted-foreground` |
| Foreground text | `#18181b` | `--foreground` |

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/sections/AIHotTipsSection.tsx` | Main section component |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/index.ts` | Add new export |
| `src/pages/OverallPerformance.tsx` | Add section to page |

---

## Implementation Steps

1. **Create AIHotTipsSection** - Main component with header and tip cards
2. **Create RiskBadge sub-component** - Inline or separate
3. **Create TipCard sub-component** - Card with title, badge, bullets
4. **Update sections index** - Export new component
5. **Add to OverallPerformance page** - With sample data
6. **Verify build**

---

## Example Usage

```tsx
import { Sparkles } from 'lucide-react'

<AIHotTipsSection
  tips={[
    {
      id: 'opening-hook',
      title: 'Optimize Your Opening Hook',
      riskLevel: 'low',
      bullets: [
        { text: 'Your video loses 42% of viewers within 10 seconds.', variant: 'muted' },
        { text: 'Start with a punchy question to improve retention.', variant: 'default' },
      ],
    },
    {
      id: 'shorter-intros',
      title: 'Shorter Intros Improve Watch Time',
      riskLevel: 'high',
      bullets: [
        { text: 'Quickly jumping to value retains 22% more viewers.', variant: 'muted' },
        { text: 'Cut filler/branding elements in the first 20 seconds.', variant: 'default' },
      ],
    },
  ]}
/>
```

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Full width, reduced padding |
| Tablet+ (≥640px) | Full layout as designed |

### Mobile Adjustments
- Padding reduced to 12px
- Badge may wrap below title on very narrow screens
