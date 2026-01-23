# Financial Overview Section - Implementation Plan

## Overview

A financial metrics section displaying investment, revenue, and ROI data with a connected card layout.

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Financial Overview                                                       │
│ The effect of your content on your bottom line                          │
├─────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────┬───────────────────┬───────────────────┐            │
│ │ £ Total Invest ⓘ │ ⊕ Attrib Rev  ⓘ  │ 📈 ROI        ⓘ  │            │
│ │                  │                   │                   │            │
│ │ £131.5k          │ £79.5             │ +13%              │            │
│ │                  │                   │                   │            │
│ │ Content (£100k)  │ Direct (18%)      │ Financial Return  │            │
│ │ + Boosting(£31k) │ Indirect (72%)    │ (£66k)            │            │
│ └──────────────────┴───────────────────┴───────────────────┘            │
│                                              [ More Detail → ]          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Section Header

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 24px | Bold | `#09090b` |
| Subtitle | 14px | Regular | `#52525b` (muted) |
| Gap | 4px between title/subtitle | | |

### Finance Cards Container

- **Layout:** 3 cards in a row, equal width (`flex-1`)
- **Cards share borders** (connected appearance)
- **Gap:** 0 (cards touch each other)

### Individual Card Styling

| Card | Left Border | Right Border | Rounded Corners |
|------|-------------|--------------|-----------------|
| Card 1 (Total Investment) | Yes | No | Left only (6px) |
| Card 2 (Attributed Revenue) | Yes | No | None |
| Card 3 (ROI) | Yes | Yes | Right only (6px) |

### Card Internal Structure

| Element | Specification |
|---------|---------------|
| Background | White (`#ffffff`) |
| Border | 1px `#d4d4d8` |
| Padding | 20px |
| Internal gap | 20px between sections |

### Card Header Row

| Element | Size | Color |
|---------|------|-------|
| Category icon | 16px | `#09090b` (foreground) |
| Title | 16px bold | `#18181b` |
| Info icon | 24px | `#0164a3` (primary) |
| Gap between icon & title | 4px |

### Card Value

| Property | Value |
|----------|-------|
| Font size | 36px |
| Font weight | Bold |
| Line height | 40px |
| Color | `#09090b` |
| Gap from header | 16px |

### Card Breakdown Row

| Element | Size | Color |
|---------|------|-------|
| Label text | 14px regular | `#52525b` (muted) |
| Badge | 12px bold | `#0164a3` (primary) |
| Gap between items | 6-12px |
| Gap from value | 20px |

### Value Badge (Pill)

| Property | Value |
|----------|-------|
| Background | `#fafafa` |
| Border | 1px solid `#0164a3` |
| Border radius | 9999px (full) |
| Padding | 10px horizontal, 0-2px vertical |
| Text | 12px bold, `#0164a3` |

### More Detail Button

| Property | Value |
|----------|-------|
| Background | White |
| Border | 1px solid `#0164a3` |
| Border radius | 6px |
| Height | 32px |
| Padding | 12px horizontal, 8px vertical |
| Text | 14px regular, `#0164a3` |
| Icon | CircleArrowRight, 16px, `#0164a3` |
| Gap | 8px between text and icon |
| Position | Right-aligned |

---

## Icons Used

| Card | Icon | Lucide Name |
|------|------|-------------|
| Total Investment | £ | `PoundSterling` |
| Attributed Revenue | Target/Crosshair | `Crosshair` or `Target` |
| ROI | Line Chart | `LineChart` |
| Info | ⓘ | `Info` |
| Plus separator | + | `Plus` |
| Button arrow | → | `CircleArrowRight` |

---

## Component Structure

```
FinancialOverviewSection
├── SectionHeader
│   ├── Title
│   └── Subtitle
├── FinanceCardsRow
│   ├── FinanceCard (Total Investment)
│   │   ├── CardHeader (icon + title + info)
│   │   ├── CardValue
│   │   └── CardBreakdown
│   ├── FinanceCard (Attributed Revenue)
│   │   └── ...
│   └── FinanceCard (ROI)
│       └── ...
└── MoreDetailButton
```

---

## Props Interfaces

### FinancialOverviewSection
```typescript
interface FinancialOverviewSectionProps {
  title?: string
  subtitle?: string
  totalInvestment: {
    value: string
    breakdown: Array<{ label: string; value: string }>
  }
  attributedRevenue: {
    value: string
    breakdown: Array<{ label: string; value: string }>
  }
  roi: {
    value: string
    breakdown: Array<{ label: string; value: string }>
  }
  onMoreDetail?: () => void
  className?: string
}
```

### FinanceCard (Internal)
```typescript
interface FinanceCardProps {
  icon: React.ReactNode
  title: string
  value: string
  breakdown: Array<{ label: string; value: string }>
  position: 'first' | 'middle' | 'last'
  onInfoClick?: () => void
}
```

### ValueBadge (Reusable)
```typescript
interface ValueBadgeProps {
  value: string
  className?: string
}
```

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/cards/ValueBadge.tsx` | Pill badge with primary border |
| `src/components/cards/FinanceCard.tsx` | Individual finance metric card |
| `src/components/sections/FinancialOverviewSection.tsx` | Complete section component |
| `src/components/sections/index.ts` | Section exports |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/index.ts` | Add ValueBadge export |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Stack cards vertically, full width each |
| Tablet (≥768px) | 3 cards in row |
| Desktop (≥1024px) | 3 cards in row, more spacing |

### Mobile Adjustments
- Cards stack vertically
- Each card has full border and rounded corners
- Value font size: 30px (instead of 36px)
- Padding: 16px (instead of 20px)

---

## Implementation Steps

1. **Create ValueBadge component** - Pill with primary border
2. **Create FinanceCard component** - Single metric card with position-based borders
3. **Create FinancialOverviewSection** - Complete section with header, cards, button
4. **Create sections directory and index**
5. **Update exports**
6. **Add to page for testing**

---

## Example Usage

```tsx
<FinancialOverviewSection
  totalInvestment={{
    value: '£131.5k',
    breakdown: [
      { label: 'Content', value: '£100k' },
      { label: 'Boosting', value: '£31k' },
    ],
  }}
  attributedRevenue={{
    value: '£79.5',
    breakdown: [
      { label: 'Direct Platform Revenue', value: '18%' },
      { label: 'Indirect Revenue', value: '72%' },
    ],
  }}
  roi={{
    value: '+13%',
    breakdown: [{ label: 'Financial Return', value: '£66k' }],
  }}
  onMoreDetail={() => console.log('More detail clicked')}
/>
```
