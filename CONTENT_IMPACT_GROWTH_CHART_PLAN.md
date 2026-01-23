# Content Impact Growth Chart - Implementation Plan

## Overview

An animated area/line chart showing monthly content impact score trends with gradient fill and interactive data points.

**Library:** Recharts (React charting library with built-in animations)

---

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ ↗ Content Impact Growth                                         │
│                                                                 │
│ +64%  ↗ vs Last Period                                    ●     │
│                                                        ●        │
│ Periodic change in your Content Impact Score        ●           │
│                                                  ●     ●        │
│                                            ●  ●                 │
│                                      ●                          │
│                               ●                                 │
│                    ●  ●                                         │
│              ●                                                  │
│ ────────────────────────────────────────────────────────────── │
│ Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Container

| Property | Value |
|----------|-------|
| Background | White (`#ffffff`) |
| Border | 1px solid `#d4d4d8` |
| Border radius | 8px |
| Padding | 24px |

### Header Section

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Icon (TrendingUp) | 16px | - | `#18181b` |
| Title | 16px | Bold | `#18181b` |
| Value | 36px | Bold | `#18181b` |
| Arrow icon | 16px | - | `#16a34a` (green) |
| "vs Last Period" | 12px | Regular | `#52525b` |
| Description | 14px | Regular | `#52525b` |

### Chart Dimensions

| Property | Value |
|----------|-------|
| Chart width | ~460px (flexible) |
| Chart height | ~240px |
| Point diameter | 14px |
| Line stroke width | 2px |

### Colors

| Element | Color |
|---------|-------|
| Line stroke | `#2b6e8f` (teal blue) |
| Point stroke | `#2b6e8f` |
| Point fill | White |
| Area gradient top | `rgba(43, 110, 143, 0.1)` |
| Area gradient bottom | `rgba(43, 110, 143, 0.4)` |
| X-axis line | `#d4d4d8` |
| X-axis labels | `#52525b` |

### X-Axis Labels

- 12 months: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- Font: 12px bold
- Color: Muted foreground
- Layout: Space-between (justify)

---

## Data Structure

```typescript
interface ChartDataPoint {
  month: string      // "Jan", "Feb", etc.
  value: number      // 0-100 normalized value
}

interface ContentImpactGrowthChartProps {
  data: ChartDataPoint[]
  title?: string
  percentageChange: string   // "+64%"
  changeDirection: 'up' | 'down'
  description?: string

  // Animation controls (for future use)
  animated?: boolean
  animationDuration?: number
  animationDelay?: number

  className?: string
}
```

### Sample Data

```typescript
const sampleData: ChartDataPoint[] = [
  { month: 'Jan', value: 5 },
  { month: 'Feb', value: 17 },
  { month: 'Mar', value: 15 },
  { month: 'Apr', value: 20 },
  { month: 'May', value: 40 },
  { month: 'Jun', value: 50 },
  { month: 'Jul', value: 46 },
  { month: 'Aug', value: 46 },
  { month: 'Sep', value: 55 },
  { month: 'Oct', value: 76 },
  { month: 'Nov', value: 85 },
  { month: 'Dec', value: 95 },
]
```

---

## Recharts Implementation

### Component Structure
```tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

<ResponsiveContainer width="100%" height={240}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2b6e8f" stopOpacity={0.4} />
        <stop offset="100%" stopColor="#2b6e8f" stopOpacity={0.05} />
      </linearGradient>
    </defs>

    <XAxis
      dataKey="month"
      axisLine={{ stroke: '#d4d4d8' }}
      tickLine={false}
      tick={{ fill: '#52525b', fontSize: 12, fontWeight: 'bold' }}
    />

    <YAxis hide domain={[0, 100]} />

    <Tooltip />

    <Area
      type="monotone"
      dataKey="value"
      stroke="#2b6e8f"
      strokeWidth={2}
      fill="url(#colorValue)"
      dot={<CustomDot />}
      isAnimationActive={animated}
      animationDuration={1500}
      animationEasing="ease-out"
    />
  </AreaChart>
</ResponsiveContainer>
```

### Custom Dot Component
```tsx
function CustomDot({ cx, cy, payload }: any) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill="white"
      stroke="#2b6e8f"
      strokeWidth={2}
    />
  )
}
```

---

## Animation (Built-in Recharts)

Recharts provides built-in animation props:

```tsx
<Area
  isAnimationActive={true}          // Enable/disable
  animationBegin={0}                // Delay in ms
  animationDuration={1500}          // Duration in ms
  animationEasing="ease-out"        // Easing function
/>
```

**Available easing options:**
- `'ease'`
- `'ease-in'`
- `'ease-out'`
- `'ease-in-out'`
- `'linear'`

**Animation behavior:**
- Area fills from left to right
- Line draws progressively
- Dots appear as line reaches them

---

## Component Structure

```
ContentImpactGrowthChart
├── ChartHeader
│   ├── Icon (TrendingUp)
│   ├── Title
│   ├── StatsRow
│   │   ├── Value (+64%)
│   │   ├── Arrow
│   │   └── "vs Last Period"
│   └── Description
├── ChartSVG
│   ├── <defs> (gradients, clips)
│   ├── AreaPath
│   ├── LinePath
│   └── DataPoints (circles)
└── XAxisLabels
    └── Month labels (Jan-Dec)
```

---

## Files to Create

| File | Description |
|------|-------------|
| `src/components/charts/ContentImpactGrowthChart.tsx` | Main chart component using Recharts |
| `src/components/charts/index.ts` | Charts exports |

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add recharts dependency |
| `src/pages/OverallPerformance.tsx` | Add chart to page |

---

## Dependencies

### Install Recharts
```bash
npm install recharts
```

Recharts handles all path generation, coordinate mapping, and animations internally.

---

## Responsive Behavior

| Breakpoint | Chart Width | Header Position |
|------------|-------------|-----------------|
| Mobile (<640px) | 100% | Above chart |
| Tablet (≥640px) | 100% | Overlaid on chart |
| Desktop (≥1024px) | ~460px | Overlaid on chart |

### Mobile Adjustments
- Header stacks above chart (not overlaid)
- Value font size: 30px (instead of 36px)
- Chart takes full width
- Reduced padding

---

## Accessibility

- SVG has `role="img"` and `aria-label`
- Data points have tooltips (title elements or aria-labels)
- Sufficient color contrast for line and points
- Screen reader description of trend

---

## Implementation Steps

1. **Install Recharts** - `npm install recharts`
2. **Create charts directory**
3. **Create ContentImpactGrowthChart** - Main component with Recharts
4. **Create charts index.ts** - Exports
5. **Add to OverallPerformance page**
6. **Verify build and appearance**

---

## Example Usage

```tsx
<ContentImpactGrowthChart
  data={[
    { month: 'Jan', value: 5 },
    { month: 'Feb', value: 17 },
    { month: 'Mar', value: 15 },
    // ... more data
  ]}
  percentageChange="+64%"
  changeDirection="up"
  description="Periodic change in your Content Impact Score"
  animated={true}
/>
```

---

## Animation Props

```typescript
interface AnimationProps {
  animated?: boolean           // Enable/disable animations (default: true)
  animationDuration?: number   // Animation time in ms (default: 1500)
  animationDelay?: number      // Delay before starting in ms (default: 0)
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
}
```

These props map directly to Recharts' built-in animation system.
