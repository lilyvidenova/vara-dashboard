# Small Gauge Fix - Implementation Plan

## Problem

The current `SmallGauge` implementation does NOT match the Figma design.

### Current Implementation (WRONG)
```
        ╭── amber ──╮
      ╱              ╲
    red              green
   ╱                    ╲
  ─                      ─
```
- **3 separate colored segments** (red, amber, green)
- Segments with gaps between them
- Like a traffic light/zone gauge

### Figma Design (CORRECT)
```
        ╭───────────╮
      ╱               ╲
    ╱                   ╲
   │                     │

```
- **Single solid color arc** (teal/blue `#0164a3`)
- Continuous semicircular arc
- Rounded end caps (strokeLinecap: round)
- Arc spans from ~225° to ~315° (not full 180° semicircle)
- Small gaps at ends before reaching horizontal

---

## Visual Comparison

| Aspect | Current | Figma Design |
|--------|---------|--------------|
| Segments | 3 (red, amber, green) | 1 (solid teal/blue) |
| Color | Multi-color | Single color `#0164a3` |
| Arc span | 180° to 360° with gaps | ~225° to ~315° |
| End caps | Round | Round |
| Purpose | Status indicator | Simple progress arc |

---

## Design Specifications (from Figma)

### Arc Properties

| Property | Value |
|----------|-------|
| Color | `#0164a3` (primary) or `#2b6e8f` |
| Stroke width | ~12-14px |
| Stroke linecap | Round |
| Arc start | ~225° (from 3 o'clock, counterclockwise) |
| Arc end | ~315° |
| Total arc span | ~90° (quarter circle on each side) |

### Dimensions

| Property | Value |
|----------|-------|
| Container width | ~142px |
| Container height | ~76px |
| Arc radius | ~56-64px |

---

## Implementation Changes

### Before (Current Code)
```tsx
// 3 colored segments
<path d={createArc(180, 235)} stroke={COLORS.underperforming} />
<path d={createArc(245, 295)} stroke={COLORS.healthy} />
<path d={createArc(305, 360)} stroke={COLORS.strong} />
```

### After (Correct Code)
```tsx
// Single solid arc
<path
  d={createArc(225, 315)}
  stroke="#0164a3"
  strokeWidth={12}
  strokeLinecap="round"
  fill="none"
/>
```

---

## Updated SmallGauge Component

```tsx
import { cn } from '@/lib/utils'

export interface SmallGaugeProps {
  className?: string
}

export function SmallGauge({ className }: SmallGaugeProps) {
  const width = 142
  const height = 76
  const centerX = width / 2
  const centerY = height
  const radius = 56
  const strokeWidth = 12

  // Create arc path
  const createArc = (startAngle: number, endAngle: number): string => {
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = centerX + radius * Math.cos(startRad)
    const y1 = centerY + radius * Math.sin(startRad)
    const x2 = centerX + radius * Math.cos(endRad)
    const y2 = centerY + radius * Math.sin(endRad)

    const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  }

  return (
    <div className={cn('relative', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-[120px] h-[64px] sm:w-[142px] sm:h-[76px]"
      >
        {/* Single solid arc - primary color */}
        <path
          d={createArc(210, 330)}
          fill="none"
          stroke="#0164a3"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
```

---

## Key Changes

1. **Remove multi-color segments** - Delete the 3 separate colored paths
2. **Add single arc** - One path with primary color `#0164a3`
3. **Adjust arc angles** - From ~210° to ~330° (leaving gaps at horizontal)
4. **Adjust radius** - Slightly smaller to fit the design
5. **Keep rounded caps** - strokeLinecap: round

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/SmallGauge.tsx` | Replace tri-color with single solid arc |

---

## Implementation Steps

1. Update SmallGauge to use single solid color arc
2. Adjust arc angles to match Figma (with gaps at ends)
3. Use primary color `#0164a3`
4. Verify visually against Figma design
5. Run build to confirm no errors
