# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**VARA Metrics Dashboard** - A responsive metrics and analytics dashboard application built with React, TypeScript, and Tailwind CSS. The design follows a mobile-first approach with progressive enhancement for larger screens.

## Technology Stack

- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library

## Project Structure

```
vara-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                    # Base UI components (shadcn/ui style)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── dialog.tsx
│   │   ├── cards/                 # Card components
│   │   │   ├── BaseCard.tsx       # Base card wrapper
│   │   │   ├── StatusBadge.tsx    # Pill badge component
│   │   │   ├── ChangeIndicator.tsx # Up/down percentage
│   │   │   ├── GaugeVisualization.tsx # SVG gauge arc
│   │   │   ├── MetricItem.tsx     # Icon + label + value
│   │   │   ├── MoreDetailButton.tsx # Action button
│   │   │   ├── MetricsCard.tsx    # Main composite card
│   │   │   └── index.ts
│   │   └── layout/                # Layout components
│   │       ├── Header.tsx
│   │       ├── PageHeader.tsx
│   │       ├── DashboardLayout.tsx
│   │       ├── MobileSearchModal.tsx
│   │       └── index.ts
│   ├── pages/
│   │   └── OverallPerformance.tsx
│   ├── hooks/
│   │   ├── useMediaQuery.ts       # Responsive breakpoint hook
│   │   └── useScrollLock.ts       # Modal scroll lock
│   ├── lib/
│   │   ├── utils.ts               # cn() utility for Tailwind
│   │   └── breakpoints.ts         # Breakpoint constants
│   ├── styles/
│   │   └── globals.css            # Tailwind + CSS variables
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Design System

### Color Tokens

All colors are defined as CSS variables in `src/styles/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--base-background` | `#fafafa` | Page background |
| `--base-foreground` | `#18181b` | Primary text |
| `--base-primary` | `#0164a3` | Primary brand blue |
| `--base-primary-foreground` | `#fafafa` | Text on primary buttons |
| `--base-muted-foreground` | `#52525b` | Muted/secondary text |
| `--base-border` | `#d4d4d8` | Border colors |
| `--base-input` | `#e4e4e7` | Input borders |
| `--base-card` | `#ffffff` | Card backgrounds |
| `--status-success` | `#2FAF8F` | Success/strong status |
| `--status-warning` | `#F59E0B` | Warning/healthy status |
| `--status-error` | `#DC2626` | Error/underperforming status |
| `--gauge-underperforming` | `#DC2626` | Gauge segment (left) |
| `--gauge-healthy` | `#F59E0B` | Gauge segment (middle) |
| `--gauge-strong` | `#0164A3` | Gauge segment (right) |

### Responsive Breakpoints

Mobile-first breakpoints defined in `tailwind.config.ts`:

| Breakpoint | Width | Target |
|------------|-------|--------|
| Default | 0-639px | Mobile phones |
| `sm` | 640px+ | Large phones |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Small laptops |
| `xl` | 1280px+ | Desktops |
| `2xl` | 1440px+ | Large desktops |

### Responsive Spacing

Content padding scales automatically via CSS variables:

| Breakpoint | Horizontal Padding | Vertical Padding |
|------------|-------------------|------------------|
| Mobile | 16px | 24px |
| Tablet (md) | 24px | 32px |
| Desktop (lg) | 48px | 48px |
| Large (2xl) | 92px | 64px |

### Touch Targets

All interactive elements have minimum 44x44px touch targets on mobile for accessibility:

```tsx
// Button sizes automatically adjust
<Button size="sm" /> // 44px on mobile, 32px on desktop
```

## Component Patterns

### Layout Components

**DashboardLayout** - Main layout wrapper with header and content area:
```tsx
<DashboardLayout currentPage="Page Title" onSearch={handleSearch}>
  {children}
</DashboardLayout>
```

**PageHeader** - Page title section with optional actions:
```tsx
<PageHeader
  icon={<Gauge />}
  label="Report Type"
  title="Page Title"
  primaryAction={{ label: 'Action', onClick: handleClick }}
  dateFilter={{ value: 'Last Year', options: [...], onChange: handleChange }}
/>
```

### Card Components

**MetricsCard** - Complete metrics card with gauge visualization:
```tsx
import { MetricsCard } from '@/components/cards'

<MetricsCard
  icon={<Star className="h-5 w-5" />}
  title="Audience Satisfaction"
  subtitle="Overall viewer sentiment"
  score={564}                    // 0-1000 scale
  badgeText="Healthy"            // Status label
  changeDirection="up"           // 'up' | 'down'
  changeValue="+12.5%"
  efficiency={{ value: '234', suffix: '/post' }}
  growth={{ value: '+54%' }}
  onMoreDetail={() => handleClick()}
/>
```

**GaugeVisualization** - SVG semicircle gauge with three segments:
```tsx
import { GaugeVisualization } from '@/components/cards'

<GaugeVisualization
  score={564}           // Current value
  maxScore={1000}       // Maximum value (default: 1000)
  status="healthy"      // Optional: 'underperforming' | 'healthy' | 'strong'
/>
```

Score thresholds for auto-calculated status:
- `underperforming`: 0-333 (≤33%)
- `healthy`: 334-750 (34-75%)
- `strong`: 751-1000 (>75%)

**BaseCard** - Base card wrapper with variants:
```tsx
import { BaseCard } from '@/components/cards'

<BaseCard
  variant="default"     // 'default' | 'bordered' | 'elevated'
  padding="md"          // 'none' | 'sm' | 'md' | 'lg'
>
  {children}
</BaseCard>
```

**StatusBadge** - Pill-shaped status indicator:
```tsx
import { StatusBadge } from '@/components/cards'

<StatusBadge
  label="Healthy"
  variant="warning"     // 'default' | 'success' | 'warning' | 'error'
/>
```

**ChangeIndicator** - Percentage change with arrow:
```tsx
import { ChangeIndicator } from '@/components/cards'

<ChangeIndicator
  value="+12.5%"
  direction="up"        // 'up' | 'down'
  suffix="vs last period"
/>
```

**MetricItem** - Icon + label + value display:
```tsx
import { MetricItem } from '@/components/cards'

<MetricItem
  icon={<Zap className="h-4 w-4 text-primary" />}
  label="Efficiency"
  value="234"
  suffix="/post"
/>
```

### Responsive Hooks

```tsx
import { useIsMobile, useIsDesktop } from '@/hooks/useMediaQuery'

function Component() {
  const isMobile = useIsMobile()  // true when < 768px
  const isDesktop = useIsDesktop() // true when >= 1024px
}
```

### Mobile-First CSS Classes

```tsx
// Layout changes at breakpoints
className="flex flex-col md:flex-row"

// Typography scaling
className="text-2xl md:text-3xl lg:text-4xl"

// Show/hide elements
className="hidden md:flex"  // Hidden on mobile
className="flex md:hidden"  // Visible only on mobile

// Full-width on mobile, auto on desktop
className="w-full sm:w-auto"
```

## Code Standards

### Component Props

Use `interface` for component props:
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}
```

### File Organization

- Component files: PascalCase (`Button.tsx`)
- Utility files: camelCase (`utils.ts`)
- One component per file
- Index files for barrel exports

### Styling Approach

1. Use Tailwind utility classes
2. Use `cn()` utility for conditional classes
3. CSS variables for design tokens
4. `class-variance-authority` for component variants

### Import Order

```tsx
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Third-party imports
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

// 3. Local imports
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// 4. Types
import type { ButtonProps } from './types'
```

## Accessibility

- All interactive elements have minimum 44x44px touch targets on mobile
- Focus states are visible and use ring styling
- ARIA labels on icon-only buttons
- Keyboard navigation support via Radix UI primitives
- Screen reader support with semantic HTML

## Adding New Pages

1. Create page component in `src/pages/`
2. Use `DashboardLayout` as wrapper
3. Add route in `src/App.tsx`

Example:
```tsx
// src/pages/NewPage.tsx
import { DashboardLayout } from '@/components/layout'

export function NewPage() {
  return (
    <DashboardLayout currentPage="New Page">
      {/* Page content */}
    </DashboardLayout>
  )
}

// src/App.tsx
<Route path="/new-page" element={<NewPage />} />
```

## Adding New Components

1. Create component in appropriate directory
2. Follow existing patterns for props and styling
3. Export from index file if in a subdirectory
4. Include responsive considerations (mobile-first)

## Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Notes

- **Mobile-first**: Always start with mobile styles, then add breakpoint overrides
- **Touch targets**: Ensure 44px minimum for interactive elements on mobile
- **CSS Variables**: Use design tokens for colors and spacing
- **No unused code**: Remove unused imports and variables
- **Type safety**: Use TypeScript strictly, avoid `any`
