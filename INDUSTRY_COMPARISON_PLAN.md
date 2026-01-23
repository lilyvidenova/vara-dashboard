# Industry Comparison Card - Implementation Plan

## Overview

A comparison card showing user score vs industry leader with a unique barcode-style visualization.

## Visual Reference

The card contains:
- Header: Icon + "Industry Comparison" title
- Large percentage: "+16%" with arrow and "vs Industry Leader"
- Description text
- Barcode-style bar chart (0-1000 scale)
- Two tooltip markers: "Your Score" and "Industry Leader"

---

## Design Specifications

### Container
| Property | Value |
|----------|-------|
| Background | `#ffffff` (white) |
| Border | 1px solid `#d4d4d8` |
| Border Radius | 8px |
| Padding | 32px horizontal, 24px vertical |
| Padding (mobile) | 20px horizontal, 20px vertical |

### Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 16px | Bold | `#18181b` |
| Percentage | 30px (mobile: 24px) | Bold | `#18181b` |
| "vs Industry Leader" | 12px | Regular | `#52525b` |
| Description | 14px | Regular | `#52525b` |
| Scale numbers (0, 1000) | 12px | Bold | `#52525b` |
| Tooltip text | 14px | Regular/Bold | `#09090b` |

### Colors

**Bar Gradient (left to right):**
| Range | Colors |
|-------|--------|
| 0-30% (gray zone) | `#e5e7eb`, `#d1d5db` alternating |
| 30-100% (blue zone) | `#b9e4fe`, `#7ccffd`, `#0077be`, `#0164a3` repeating |

**Tooltips:**
| Element | Background | Border | Text |
|---------|------------|--------|------|
| Your Score | `rgba(185, 228, 254, 0.25)` | none | `#09090b` |
| Industry Leader | `#fafafa` | 1px `#d4d4d8` | `#52525b` / `#09090b` |

### Icons
| Icon | Color | Size |
|------|-------|------|
| PieChart (header) | `#0164a3` (primary) | 16px |
| ArrowUpRight | `#16a34a` (green) | 16px |

---

## Component Structure

```
IndustryComparisonCard
├── Header
│   ├── Icon (PieChart)
│   └── Title "Industry Comparison"
├── Stats Row
│   ├── Percentage "+16%"
│   ├── Arrow Icon
│   └── "vs Industry Leader"
├── Description
│   └── "Slightly outperforming..."
└── BarChart Section
    ├── YourScoreTooltip (positioned above bar)
    ├── Scale Row
    │   ├── "0" + vertical line
    │   ├── BarcodeBar (visualization)
    │   └── vertical line + "1000"
    └── IndustryLeaderTooltip (positioned below bar)
```

---

## Props Interface

```typescript
interface IndustryComparisonCardProps {
  // Scores
  userScore: number              // e.g., 865
  industryLeaderScore: number    // e.g., 758
  maxScore?: number              // Default: 1000

  // Comparison
  percentageDiff: string         // e.g., "+16%"
  comparisonDirection: 'up' | 'down'
  comparisonLabel?: string       // Default: "vs Industry Leader"

  // Description
  description: string            // e.g., "Slightly outperforming..."

  className?: string
}
```

---

## Sub-Components

### 1. BarcodeBar
A horizontal bar visualization with vertical stripes.

```typescript
interface BarcodeBarProps {
  userScore: number
  industryLeaderScore: number
  maxScore: number
  className?: string
}
```

**Implementation approach:**
- Create ~75-80 vertical bars
- Each bar has 4 horizontal stripes (different shades)
- First ~30% of bars are gray (no score data)
- Remaining bars use blue gradient
- Rounded corners on container
- Border around entire bar

### 2. ScoreTooltip
Tooltip with arrow pointer.

```typescript
interface ScoreTooltipProps {
  label: string        // "Your Score" or "Industry Leader"
  score: number
  variant: 'primary' | 'secondary'  // primary = blue bg, secondary = gray border
  position: 'above' | 'below'
  className?: string
}
```

**Styling:**
- `primary`: Light blue background, no border, pointer down
- `secondary`: Gray background, gray border, pointer up
- Shadow on both
- Rounded corners (6px)

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/cards/BarcodeBar.tsx` | Barcode-style visualization |
| `src/components/cards/ScoreTooltip.tsx` | Tooltip with arrow pointer |
| `src/components/cards/IndustryComparisonCard.tsx` | Main card component |

## Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/index.ts` | Add new exports |
| `src/styles/globals.css` | Add blue color scale variables |

---

## CSS Variables to Add

```css
/* Blue color scale for bar chart */
--blue-200: #b9e4fe;
--blue-300: #7ccffd;
--blue-600: #0077be;
--blue-700: #0164a3;

/* Gray scale */
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
```

---

## Implementation Steps

1. **Add CSS variables** to globals.css
2. **Create ScoreTooltip** component with two variants
3. **Create BarcodeBar** component with stripe rendering
4. **Create IndustryComparisonCard** combining all elements
5. **Update exports** in index.ts
6. **Test** with sample data

---

## Responsive Behavior

| Breakpoint | Percentage | Bar Width | Padding |
|------------|------------|-----------|---------|
| Mobile (<768px) | 24px | 100% (scrollable) | 20px |
| Desktop (≥768px) | 30px | ~456px | 32px |

---

## Accessibility

- Tooltips have sufficient color contrast
- Bar chart has aria-label describing the comparison
- Score values are readable by screen readers

---

## Example Usage

```tsx
<IndustryComparisonCard
  userScore={865}
  industryLeaderScore={758}
  percentageDiff="+16%"
  comparisonDirection="up"
  description="Slightly outperforming the Industry leader"
/>
```
