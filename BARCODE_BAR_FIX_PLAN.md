# BarcodeBar Component Fix Plan

## Current Implementation vs Figma Design

### Current Implementation (INCORRECT)
```
Each column has 4 stacked colors:
┌─────┐ ┌─────┐ ┌─────┐
│ c1  │ │ c1  │ │ c1  │
│ c2  │ │ c2  │ │ c2  │
│ c3  │ │ c3  │ │ c3  │
│ c4  │ │ c4  │ │ c4  │
└─────┘ └─────┘ └─────┘
```
- Each column: 5px wide × 4 stripes stacked vertically
- Colors stacked: gray-200/gray-300 OR blue-200/blue-300/blue-600/blue-700
- Result: Short bar with complex pattern per column

### Figma Design (CORRECT)
```
Each stripe is a single color:
┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐
│g1││g2││g1││g2││g1││g2││b1││b2││b3││b4││b1││b2││b3││b4│...
└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘└──┘
```
- Each stripe: ~5px wide × ~24px tall (full height of bar)
- Each stripe is ONE solid color
- Pattern: alternating grays first, then repeating blue sequence

---

## Figma Specifications

### Container
| Property | Value |
|----------|-------|
| Width | ~456px (flexible) |
| Height | ~25px |
| Border | 1.2px solid `#d4d4d8` |
| Border Radius | 7px |
| Overflow | Hidden |

### Stripes
| Property | Value |
|----------|-------|
| Width | ~5px each |
| Height | 100% (full bar height) |
| Gap | ~1.2px between stripes |

### Color Pattern
**Gray Zone (first ~12 stripes):**
```
Alternating: gray-200 (#e5e7eb) → gray-300 (#d1d5db) → repeat
```

**Blue Zone (remaining stripes):**
```
Repeating sequence of 4:
1. blue-200 (#b9e4fe)
2. blue-300 (#7ccffd)
3. blue-600 (#0077be)
4. blue-700 (#0164a3)
```

### Stripe Count
- Total stripes: ~76 (based on 456px width ÷ 6px per stripe including gap)
- Gray stripes: ~12 (first ~15% of bar)
- Blue stripes: ~64 (remaining ~85% of bar)

---

## Implementation Changes

### Before (Current Code)
```tsx
// Each column has 4 stacked colors
for (let i = 0; i < TOTAL_COLUMNS; i++) {
  const colors = isGrayZone ? GRAY_COLORS : BLUE_COLORS
  columns.push(
    <div key={i} className="flex flex-col gap-[1px]">
      {colors.map((color, j) => (
        <div
          key={j}
          className="h-[5px] w-[5px]"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
```

### After (Fixed Code)
```tsx
// Each stripe is a single solid color
for (let i = 0; i < TOTAL_STRIPES; i++) {
  let color: string

  if (i < GRAY_STRIPES) {
    // Alternating gray pattern
    color = i % 2 === 0 ? GRAY_200 : GRAY_300
  } else {
    // Repeating blue sequence
    const blueIndex = (i - GRAY_STRIPES) % 4
    color = BLUE_COLORS[blueIndex]
  }

  stripes.push(
    <div
      key={i}
      className="h-full w-[5px]"
      style={{ backgroundColor: color }}
    />
  )
}
```

---

## Visual Comparison

### Current (Wrong)
- Bar appears as a grid of small squares
- Each "column" shows multiple colors stacked
- Height is too short (~20px with 4×5px squares)

### Target (Correct)
- Bar appears as vertical stripes
- Each stripe is ONE solid color
- Height is ~24-25px
- Stripes appear to have varying visual "weight" due to color contrast

---

## Updated Component Structure

```tsx
interface BarcodeBarProps {
  className?: string
}

const GRAY_200 = '#e5e7eb'
const GRAY_300 = '#d1d5db'
const BLUE_COLORS = ['#b9e4fe', '#7ccffd', '#0077be', '#0164a3']

const TOTAL_STRIPES = 76
const GRAY_STRIPES = 12

export function BarcodeBar({ className }: BarcodeBarProps) {
  const stripes = []

  for (let i = 0; i < TOTAL_STRIPES; i++) {
    let color: string

    if (i < GRAY_STRIPES) {
      color = i % 2 === 0 ? GRAY_200 : GRAY_300
    } else {
      const blueIndex = (i - GRAY_STRIPES) % 4
      color = BLUE_COLORS[blueIndex]
    }

    stripes.push(
      <div
        key={i}
        className="h-full w-[5px] shrink-0"
        style={{ backgroundColor: color }}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex h-6 gap-[1px] overflow-hidden rounded-md border border-border',
        className
      )}
    >
      {stripes}
    </div>
  )
}
```

---

## Key Fixes Summary

| Aspect | Before | After |
|--------|--------|-------|
| Stripe structure | 4 colors stacked per column | 1 color per stripe |
| Stripe height | 4×5px = 20px | 24px (full height) |
| Stripe width | 5px | 5px |
| Color pattern | All 4 colors in each column | Single color, alternating pattern |
| Gray pattern | gray-200/gray-300 stacked | Alternating stripes |
| Blue pattern | All 4 blues stacked | Sequential: 200→300→600→700 repeat |

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/BarcodeBar.tsx` | Rewrite stripe generation logic |
