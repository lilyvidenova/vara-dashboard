# Metrics Card Implementation Plan

Based on careful inspection of the Figma design, this document outlines the implementation plan for the MetricsCard component optimized for mobile-first responsive design.

---

## Design Analysis

### Card Overview

The MetricsCard is a comprehensive metrics display component featuring:
- Header with icon and title/subtitle
- Gauge visualization with score
- Status badge
- Change indicator (up/down percentage)
- Efficiency and Growth metrics
- "More Detail" action button

### Visual Specifications

#### Card Container
| Property | Value |
|----------|-------|
| Background | `#ffffff` (white) |
| Border | 1px solid `#d4d4d8` |
| Border radius | 8px |
| Padding | 16px (mobile), 24px (desktop) |

#### Typography
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Title | 20px | Bold | `#09090b` |
| Subtitle | 14px | Regular | `#52525b` |
| Score | 36px | Bold | `#000000` |
| Badge | 12px | Bold | `#18181b` |
| Metric labels | 14px | Regular | `#52525b` |
| Metric values | 16px | Bold | `#18181b` |

#### Gauge Visualization
- Three states: Underperforming, Healthy, Strong
- Score ranges: 0-333 (Underperforming), 334-750 (Healthy), 751+ (Strong)
- Gauge arc colors:
  - Red/Orange arc: Underperforming zone
  - Yellow arc: Healthy zone
  - Blue/Green arc: Strong zone

#### Status Badge
| Property | Value |
|----------|-------|
| Background | `#fafafa` |
| Border | 1px solid `#d4d4d8` |
| Border radius | 9999px (pill) |
| Padding | 0 10px 2px 10px |

#### Change Indicator
| Direction | Color | Icon |
|-----------|-------|------|
| Up | `#2FAF8F` (green) | ArrowUpRight |
| Down | `#DC2626` (red) | ArrowDownRight |

---

## Component Structure

### 1. MetricsCard Component

```
┌─────────────────────────────────────────┐
│ [Icon] Title                            │
│        Subtitle                         │
├─────────────────────────────────────────┤
│                                         │
│         ┌─────────────────┐             │
│         │   Gauge Arc     │             │
│         │                 │             │
│         │      564        │             │
│         └─────────────────┘             │
│                                         │
│           [ Healthy ]                   │
│                                         │
│         ↑ +12.5% vs last period         │
│                                         │
├─────────────────────────────────────────┤
│  ⚡ Efficiency  234/post   📈 Growth +54% │
├─────────────────────────────────────────┤
│         [ More Detail → ]               │
└─────────────────────────────────────────┘
```

### 2. File Structure

```
src/components/cards/
├── index.ts                 # Barrel exports
├── BaseCard.tsx             # Base card wrapper
├── CardHeader.tsx           # Reusable header component
├── MetricsCard.tsx          # Main metrics card
├── GaugeVisualization.tsx   # SVG gauge component
├── StatusBadge.tsx          # Pill badge component
├── ChangeIndicator.tsx      # Up/down percentage
├── MetricItem.tsx           # Efficiency/Growth items
└── MoreDetailButton.tsx     # Action button
```

---

## Responsive Behavior

### Mobile (< 768px)

| Element | Mobile Behavior |
|---------|-----------------|
| Card padding | 16px |
| Title size | 18px |
| Score size | 32px |
| Gauge width | 120px |
| Metrics layout | Stacked vertically |
| Button | Full width, 44px min-height |

### Tablet (768px - 1023px)

| Element | Tablet Behavior |
|---------|-----------------|
| Card padding | 20px |
| Title size | 20px |
| Score size | 36px |
| Gauge width | 140px |
| Metrics layout | Horizontal, wrapped |

### Desktop (1024px+)

| Element | Desktop Behavior |
|---------|-----------------|
| Card padding | 24px |
| Title size | 20px |
| Score size | 36px |
| Gauge width | 142px |
| Metrics layout | Horizontal inline |

---

## Implementation Steps

### Phase 1: Base Components

#### 1.1 BaseCard Component
```tsx
// src/components/cards/BaseCard.tsx
interface BaseCardProps {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  radius?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}
```

**Responsive padding:**
- `sm`: `p-3` (12px)
- `md`: `p-4 md:p-6` (16px mobile, 24px desktop)
- `lg`: `p-5 md:p-8` (20px mobile, 32px desktop)

#### 1.2 StatusBadge Component
```tsx
// src/components/cards/StatusBadge.tsx
interface StatusBadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'error'
}
```

#### 1.3 ChangeIndicator Component
```tsx
// src/components/cards/ChangeIndicator.tsx
interface ChangeIndicatorProps {
  value: string
  direction: 'up' | 'down'
  suffix?: string // "vs last period"
}
```

### Phase 2: Gauge Visualization

#### 2.1 GaugeVisualization Component
```tsx
// src/components/cards/GaugeVisualization.tsx
interface GaugeVisualizationProps {
  score: number
  maxScore?: number
  status: 'underperforming' | 'healthy' | 'strong'
}
```

**Implementation approach:**
- SVG-based arc rendering
- Three colored segments
- Animated needle/indicator (optional)
- Score displayed in center

**Responsive sizing:**
```tsx
className="w-[120px] h-[68px] md:w-[142px] md:h-[76px]"
```

### Phase 3: MetricItem Component

#### 3.1 MetricItem Component
```tsx
// src/components/cards/MetricItem.tsx
interface MetricItemProps {
  icon: React.ReactNode
  label: string
  value: string | number
  suffix?: string // "/post", "%", etc.
}
```

**Layout:**
- Mobile: Stack vertically with full width
- Desktop: Inline with gap

### Phase 4: Main MetricsCard

#### 4.1 MetricsCard Component
```tsx
// src/components/cards/MetricsCard.tsx
interface MetricsCardProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  score: number
  scoreStatus: 'underperforming' | 'healthy' | 'strong'
  badgeText: string
  changeDirection: 'up' | 'down'
  changeValue: string
  efficiency: {
    value: string | number
    suffix?: string
  }
  growth: {
    value: string | number
    suffix?: string
  }
  onMoreDetail?: () => void
}
```

### Phase 5: MoreDetailButton

#### 5.1 MoreDetailButton Component
```tsx
// src/components/cards/MoreDetailButton.tsx
interface MoreDetailButtonProps {
  onClick?: () => void
  label?: string
}
```

**Mobile optimization:**
- Min-height: 44px for touch target
- Full-width on mobile
- Visual feedback on tap

---

## CSS Variables Integration

Update `globals.css` with card-specific variables:

```css
:root {
  /* Existing variables... */

  /* Status colors */
  --status-success: #2FAF8F;
  --status-warning: #F59E0B;
  --status-error: #DC2626;

  /* Gauge colors */
  --gauge-underperforming: #DC2626;
  --gauge-healthy: #F59E0B;
  --gauge-strong: #0164A3;
}
```

---

## Component Code Examples

### BaseCard Implementation

```tsx
import { cn } from '@/lib/utils'

interface BaseCardProps {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-6',
  lg: 'p-5 md:p-8',
}

const variantClasses = {
  default: 'bg-card border border-border',
  bordered: 'bg-card border-2 border-border',
  elevated: 'bg-card border border-border shadow-md',
}

export function BaseCard({
  variant = 'default',
  padding = 'md',
  className,
  children,
}: BaseCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
```

### MetricsCard Implementation

```tsx
import { BaseCard } from './BaseCard'
import { StatusBadge } from './StatusBadge'
import { ChangeIndicator } from './ChangeIndicator'
import { GaugeVisualization } from './GaugeVisualization'
import { MetricItem } from './MetricItem'
import { MoreDetailButton } from './MoreDetailButton'
import { Zap, TrendingUp } from 'lucide-react'

export function MetricsCard({
  icon,
  title,
  subtitle,
  score,
  scoreStatus,
  badgeText,
  changeDirection,
  changeValue,
  efficiency,
  growth,
  onMoreDetail,
}: MetricsCardProps) {
  return (
    <BaseCard padding="md" className="w-full">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center">
          <div className="flex items-center gap-1.5">
            {icon}
            <h3 className="text-lg md:text-xl font-bold text-card-foreground">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Gauge and Score */}
        <div className="flex flex-col items-center gap-2">
          <GaugeVisualization score={score} status={scoreStatus} />
          <p className="text-3xl md:text-4xl font-bold text-card-foreground">
            {score}
          </p>
          <StatusBadge label={badgeText} />
          <ChangeIndicator
            value={changeValue}
            direction={changeDirection}
            suffix="vs last period"
          />
        </div>

        {/* Separator */}
        <div className="h-px bg-border" />

        {/* Metrics */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <MetricItem
            icon={<Zap className="h-4 w-4 text-primary" />}
            label="Efficiency"
            value={efficiency.value}
            suffix={efficiency.suffix}
          />
          <MetricItem
            icon={<TrendingUp className="h-4 w-4 text-primary" />}
            label="Growth"
            value={growth.value}
            suffix={growth.suffix}
          />
        </div>

        {/* Separator */}
        <div className="h-px bg-border" />

        {/* Action Button */}
        <MoreDetailButton onClick={onMoreDetail} />
      </div>
    </BaseCard>
  )
}
```

---

## Mobile Optimization Checklist

- [ ] Touch targets minimum 44x44px
- [ ] Readable text sizes (min 14px for body)
- [ ] Adequate spacing between interactive elements
- [ ] Proper contrast ratios (WCAG AA)
- [ ] Responsive padding scaling
- [ ] Flexible gauge sizing
- [ ] Stacked metrics on narrow screens
- [ ] Full-width button on mobile
- [ ] Focus states for accessibility
- [ ] Tap feedback (active states)

---

## Testing Considerations

1. **Breakpoint testing**: Verify layout at 320px, 375px, 768px, 1024px, 1440px
2. **Touch testing**: Verify all interactive elements on real mobile devices
3. **Score variations**: Test all three gauge states
4. **Direction variations**: Test up and down indicators
5. **Long text**: Test with varying title/subtitle lengths
6. **Accessibility**: Screen reader testing, keyboard navigation

---

## Files to Create

1. `src/components/cards/index.ts` - Barrel exports
2. `src/components/cards/BaseCard.tsx` - Base wrapper
3. `src/components/cards/StatusBadge.tsx` - Pill badge
4. `src/components/cards/ChangeIndicator.tsx` - Up/down indicator
5. `src/components/cards/GaugeVisualization.tsx` - SVG gauge
6. `src/components/cards/MetricItem.tsx` - Metric display
7. `src/components/cards/MoreDetailButton.tsx` - Action button
8. `src/components/cards/MetricsCard.tsx` - Main composite component

---

## Integration Example

```tsx
// In OverallPerformance.tsx
import { MetricsCard } from '@/components/cards'
import { Star } from 'lucide-react'

function OverallPerformance() {
  return (
    <DashboardLayout currentPage="Overall Performance">
      {/* ... existing content ... */}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricsCard
          icon={<Star className="h-5 w-5 text-primary" />}
          title="Audience Satisfaction"
          subtitle="Overall viewer sentiment"
          score={564}
          scoreStatus="healthy"
          badgeText="Healthy"
          changeDirection="up"
          changeValue="+12.5%"
          efficiency={{ value: "234", suffix: "/post" }}
          growth={{ value: "+54%", suffix: "" }}
          onMoreDetail={() => console.log('View details')}
        />
      </div>
    </DashboardLayout>
  )
}
```
