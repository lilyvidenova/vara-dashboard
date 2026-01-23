# VARA Metrics Dashboard - Implementation Plan

## Design Analysis Summary

Based on the Figma design inspection, the dashboard has the following structure:

### Layout Dimensions
- **Desktop width:** 1440px (reference design)
- **Header height:** 64px (desktop), 56px (mobile)
- **Content padding:** 92px horizontal / 64px vertical (desktop), 16px horizontal / 24px vertical (mobile)

### Responsive Strategy: Mobile-First
The implementation follows a **mobile-first approach** with progressive enhancement for larger screens.

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| `xs` (default) | 0-639px | Mobile phones |
| `sm` | 640px+ | Large phones, small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Small laptops |
| `xl` | 1280px+ | Desktops |
| `2xl` | 1440px+ | Large desktops (matches Figma)

### Color Palette (Design Tokens)
| Token | Value | Usage |
|-------|-------|-------|
| `--base-background` | `#fafafa` | Page background |
| `--base-border` | `#d4d4d8` | Border colors |
| `--base-primary` | `#0164a3` | Primary brand blue |
| `--base-foreground` | `#18181b` | Primary text |
| `--base-popover-foreground` | `#09090b` | Headings |
| `--base-muted-foreground` | `#52525b` | Muted/placeholder text |
| `--base-input` | `#e4e4e7` | Input borders |
| `--base-card` | `#ffffff` | Card backgrounds |
| `--base-primary-foreground` | `#fafafa` | Text on primary buttons |

### Spacing Scale
| Token | Value |
|-------|-------|
| `--spacing-1` | 4px |
| `--spacing-2` | 8px |
| `--spacing-3` | 12px |
| `--spacing-4` | 16px |
| `--spacing-6` | 24px |
| `--spacing-16` | 64px |

### Border Radius
| Token | Value |
|-------|-------|
| `--border-radius-md` | 6px |
| `--border-radius-full` | 9999px |

### Typography
- **Font family:** "Moderat" (with fallback to system sans-serif)
- **Weights:** Bold (700), Regular (400)
- **Sizes:**
  - Base: 16px
  - Small: 14px (line-height: 20px)
  - 4x-large: 36px (line-height: 40px)

---

## Component Breakdown

### 1. Header Component (`Header.tsx`)

**Desktop Structure (lg+):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ VARA METRICS │ Overall Performance          [Search...]  [Avatar]  │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile Structure (< lg):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ VARA METRICS                                    [Search] [Avatar]  │
└─────────────────────────────────────────────────────────────────────┘
```

**Responsive Behavior:**
| Element | Mobile (< lg) | Desktop (lg+) |
|---------|---------------|---------------|
| Logo | "VARA METRICS" visible | Full logo + divider |
| Page title | Hidden (shown in PageHeader) | Visible in header |
| Search | Icon-only button, expands on tap | Full 336px input |
| Avatar | 36px | 40px |
| Height | 56px | 64px |
| Padding | 16px horizontal | 24px horizontal |

**Props:**
```typescript
interface HeaderProps {
  currentPage: string;
  onSearch?: (query: string) => void;
  userAvatar?: string;
  userName?: string;
}
```

### 2. PageHeader Component (`PageHeader.tsx`)

**Desktop Structure (md+):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Icon] Metric Report                    [Generate Report] [Last Year]│
│        Overall Performance                                           │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile Structure (< md):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Icon] Metric Report                                                │
│        Overall Performance                                          │
├─────────────────────────────────────────────────────────────────────┤
│ [Generate Report]              [Last Year ▼]                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Responsive Behavior:**
| Element | Mobile (< md) | Tablet (md-lg) | Desktop (lg+) |
|---------|---------------|----------------|---------------|
| Layout | Stacked (column) | Single row | Single row |
| Icon | 32px | 40px | 40px |
| Title size | 24px | 30px | 36px |
| Actions | Full width, stacked | Inline | Inline |
| Button text | "Report" (shortened) | "Generate Report" | "Generate Report" |
| Gap | 16px | 16px | 24px |

**Props:**
```typescript
interface PageHeaderProps {
  icon?: React.ReactNode;
  label: string;
  title: string;
  primaryAction?: {
    label: string;
    shortLabel?: string;  // For mobile
    icon?: React.ReactNode;
    onClick: () => void;
  };
  dateFilter?: {
    value: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
  };
}
```

### 3. Layout Component (`DashboardLayout.tsx`)

**Desktop Structure:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                           Header                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │                    Page Content                          │     │
│     │                                                          │     │
│     └─────────────────────────────────────────────────────────┘     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Responsive Specs:**
| Property | Mobile | Tablet (md) | Desktop (lg) | Large (2xl) |
|----------|--------|-------------|--------------|-------------|
| Content padding-x | 16px | 24px | 48px | 92px |
| Content padding-y | 24px | 32px | 48px | 64px |
| Max content width | 100% | 100% | 100% | 1256px (centered) |
| Background | `#fafafa` | `#fafafa` | `#fafafa` | `#fafafa` |

### 4. Mobile Navigation Component (`MobileSearchModal.tsx`)

For mobile search experience:
```
┌─────────────────────────────────────────────────────────────────────┐
│ ← [Full-width search input.........................]    [Cancel]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Recent searches...                                                 │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  recentSearches?: string[];
}
```

---

## Project Structure

```
vara-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── icons/                    # SVG icons
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dialog.tsx            # For mobile modals
│   │   │   └── sheet.tsx             # For mobile slide-out panels
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.mobile.tsx     # Mobile-specific header logic
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── MobileSearchModal.tsx # Full-screen mobile search
│   │   └── icons/
│   │       ├── GaugeIcon.tsx
│   │       ├── SearchIcon.tsx
│   │       ├── FileTextIcon.tsx
│   │       ├── CalendarClockIcon.tsx
│   │       └── ChevronDownIcon.tsx
│   ├── pages/
│   │   └── OverallPerformance.tsx
│   ├── hooks/
│   │   ├── useSearch.ts
│   │   ├── useMediaQuery.ts          # Responsive breakpoint hook
│   │   └── useScrollLock.ts          # For mobile modals
│   ├── types/
│   │   └── index.ts
│   ├── lib/
│   │   ├── utils.ts                  # cn() utility for Tailwind
│   │   └── breakpoints.ts            # Breakpoint constants
│   ├── styles/
│   │   └── globals.css               # Tailwind imports + CSS variables
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── components.json                    # shadcn/ui config
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
└── index.html
```

---

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Vite + React + TypeScript project
2. Install and configure Tailwind CSS
3. Set up shadcn/ui with custom theme
4. Configure CSS variables for design tokens
5. Set up project structure and folders
6. Configure viewport meta tags for mobile

### Phase 2: Design Token Configuration
1. Define CSS custom properties in `globals.css`
2. Extend Tailwind config with design tokens and breakpoints
3. Set up font imports (or system font fallback)
4. Add safe-area-inset CSS variables for notched devices

### Phase 3: Responsive Utilities & Hooks
1. Create `useMediaQuery` hook for responsive logic
2. Create `useScrollLock` hook for mobile modals
3. Create breakpoint constants file
4. Set up responsive container utilities

### Phase 4: Base Components (Mobile-First)
1. Install/create shadcn/ui base components:
   - Button (primary and secondary/outline variants with touch-friendly mobile sizing)
   - Input (with icon support, larger touch targets on mobile)
   - Dropdown Menu (with mobile-optimized positioning)
   - Avatar (responsive sizing)
   - Dialog/Sheet (for mobile modals)
2. Create custom icon components with responsive sizing

### Phase 5: Layout Components (Mobile-First)
1. Create `DashboardLayout.tsx` with responsive padding
2. Create `Header.tsx` with mobile/desktop variants
3. Create `MobileSearchModal.tsx` for full-screen mobile search
4. Create `PageHeader.tsx` with stacked mobile layout

### Phase 6: Page Assembly
1. Create `OverallPerformance.tsx` page
2. Wire up routing (React Router)
3. Connect components together
4. Test responsive behavior at all breakpoints

### Phase 7: Mobile Polish
1. Add touch feedback states (active states on tap)
2. Implement pull-to-refresh if needed
3. Test on real mobile devices
4. Optimize for mobile performance (lazy loading, etc.)
5. Add loading skeletons for mobile
6. Test landscape orientation

---

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    // Mobile-first breakpoints (min-width)
    screens: {
      'sm': '640px',   // Large phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Small laptops
      'xl': '1280px',  // Desktops
      '2xl': '1440px', // Large desktops (matches Figma)
    },
    extend: {
      colors: {
        background: 'var(--base-background)',
        foreground: 'var(--base-foreground)',
        primary: {
          DEFAULT: 'var(--base-primary)',
          foreground: 'var(--base-primary-foreground)',
        },
        muted: {
          foreground: 'var(--base-muted-foreground)',
        },
        border: 'var(--base-border)',
        input: 'var(--base-input)',
        card: 'var(--base-card)',
        popover: {
          foreground: 'var(--base-popover-foreground)',
        },
      },
      borderRadius: {
        md: 'var(--border-radius-md)',
        full: 'var(--border-radius-full)',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '23': '92px',  // Custom for desktop content padding
      },
      fontFamily: {
        sans: ['Moderat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      // Safe area insets for mobile devices with notches
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Minimum touch target sizes for accessibility
      minWidth: {
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

---

## CSS Variables

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --base-background: #fafafa;
    --base-foreground: #18181b;
    --base-primary: #0164a3;
    --base-primary-foreground: #fafafa;
    --base-muted-foreground: #52525b;
    --base-border: #d4d4d8;
    --base-input: #e4e4e7;
    --base-card: #ffffff;
    --base-popover-foreground: #09090b;

    /* Border Radius */
    --border-radius-md: 6px;
    --border-radius-full: 9999px;

    /* Responsive Spacing (mobile defaults) */
    --content-padding-x: 16px;
    --content-padding-y: 24px;
    --header-height: 56px;

    /* Touch targets */
    --min-touch-target: 44px;

    /* Safe areas for notched devices */
    --safe-area-top: env(safe-area-inset-top, 0px);
    --safe-area-bottom: env(safe-area-inset-bottom, 0px);
    --safe-area-left: env(safe-area-inset-left, 0px);
    --safe-area-right: env(safe-area-inset-right, 0px);
  }

  /* Tablet breakpoint (md: 768px+) */
  @media (min-width: 768px) {
    :root {
      --content-padding-x: 24px;
      --content-padding-y: 32px;
      --header-height: 64px;
    }
  }

  /* Desktop breakpoint (lg: 1024px+) */
  @media (min-width: 1024px) {
    :root {
      --content-padding-x: 48px;
      --content-padding-y: 48px;
    }
  }

  /* Large desktop breakpoint (2xl: 1440px+) */
  @media (min-width: 1440px) {
    :root {
      --content-padding-x: 92px;
      --content-padding-y: 64px;
    }
  }

  /* Base styles */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100dvh; /* Dynamic viewport height for mobile */
    overscroll-behavior: none;
  }

  /* Ensure touch targets are accessible */
  button, a, [role="button"] {
    touch-action: manipulation;
  }
}

@layer utilities {
  /* Safe area utilities */
  .pt-safe {
    padding-top: var(--safe-area-top);
  }
  .pb-safe {
    padding-bottom: var(--safe-area-bottom);
  }
  .pl-safe {
    padding-left: var(--safe-area-left);
  }
  .pr-safe {
    padding-right: var(--safe-area-right);
  }

  /* Content container with responsive padding */
  .content-container {
    padding-left: var(--content-padding-x);
    padding-right: var(--content-padding-x);
    padding-top: var(--content-padding-y);
    padding-bottom: var(--content-padding-y);
  }

  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

---

## Key Component Specifications

### Button - Primary Variant
| Property | Mobile | Desktop |
|----------|--------|---------|
| Height | 44px (touch-friendly) | 32px |
| Padding | 12px 16px | 8px 12px |
| Background | Linear gradient `#0164a3` | Linear gradient `#0164a3` |
| Border radius | 6px | 6px |
| Text | 14px, white | 14px, white |
| Icons | 18×18px | 16×16px |
| Min width | 44px | auto |

### Button - Secondary/Outline Variant
| Property | Mobile | Desktop |
|----------|--------|---------|
| Height | 44px (touch-friendly) | 32px |
| Padding | 12px 16px | 8px 12px |
| Background | White | White |
| Border | 1px solid `#0164a3` | 1px solid `#0164a3` |
| Border radius | 6px | 6px |
| Text | 14px, `#0164a3` | 14px, `#0164a3` |
| Icons | 18×18px, `#0164a3` | 16×16px, `#0164a3` |

### Input - Search
| Property | Mobile | Desktop |
|----------|--------|---------|
| Width | 100% (full-screen modal) | 336px |
| Height | 48px | 40px |
| Padding | 12px 16px | 8px 12px |
| Background | `#ffffff` | `#fafafa` |
| Border | 1px solid `#e4e4e7` | 1px solid `#e4e4e7` |
| Border radius | 8px | 6px |
| Icon | 20×20px, `#52525b` | 16×16px, `#52525b` |
| Placeholder | 16px, `#52525b` | 14px, `#52525b` |

### Avatar
| Property | Mobile | Desktop |
|----------|--------|---------|
| Size | 36×36px | 40×40px |
| Border radius | Full (circle) | Full (circle) |
| Object-fit | Cover | Cover |

### Touch Target Guidelines
- **Minimum size:** 44×44px for all interactive elements on mobile
- **Spacing:** Minimum 8px between adjacent touch targets
- **Feedback:** Visual feedback (opacity change, scale) on touch

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.4.0",
    "vite": "^5.1.0"
  }
}
```

---

---

## Responsive Implementation Guidelines

### useMediaQuery Hook

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Convenience hooks
export const useIsMobile = () => !useMediaQuery(`(min-width: ${breakpoints.md})`);
export const useIsTablet = () => useMediaQuery(`(min-width: ${breakpoints.md})`) && !useMediaQuery(`(min-width: ${breakpoints.lg})`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${breakpoints.lg})`);
```

### Responsive Component Pattern

```tsx
// Example: Responsive PageHeader
export function PageHeader({ title, label, primaryAction, dateFilter }: PageHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      {/* Title Section */}
      <div className="flex items-start gap-2.5 md:gap-3">
        <GaugeIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        <div className="flex flex-col gap-1 md:gap-2">
          <span className="text-sm md:text-base font-bold text-foreground">{label}</span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-popover-foreground">
            {title}
          </h1>
        </div>
      </div>

      {/* Actions - Stack on mobile, inline on desktop */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 md:mt-0">
        <Button className="w-full sm:w-auto min-h-touch md:min-h-0 md:h-8">
          {primaryAction?.icon}
          <span className="md:hidden">{primaryAction?.shortLabel}</span>
          <span className="hidden md:inline">{primaryAction?.label}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto min-h-touch md:min-h-0 md:h-8">
              <CalendarClockIcon className="h-4 w-4 md:h-4 md:w-4" />
              {dateFilter?.value}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* ... dropdown content */}
        </DropdownMenu>
      </div>
    </div>
  );
}
```

### Mobile-First CSS Classes Reference

```tsx
// Layout padding (mobile-first, increases with breakpoints)
className="px-4 md:px-6 lg:px-12 2xl:px-23"
className="py-6 md:py-8 lg:py-12 2xl:py-16"

// Typography scaling
className="text-2xl md:text-3xl lg:text-4xl"

// Flexbox direction changes
className="flex flex-col md:flex-row"

// Show/hide elements
className="hidden md:flex"  // Hidden on mobile, flex on md+
className="flex md:hidden"  // Visible on mobile, hidden on md+

// Touch-friendly sizing on mobile
className="min-h-touch md:min-h-0 h-auto md:h-8"

// Full-width on mobile, auto on desktop
className="w-full sm:w-auto"
```

### Mobile Search Implementation

```tsx
// src/components/layout/MobileSearchModal.tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function MobileSearchModal({ isOpen, onClose, onSearch }: MobileSearchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 p-0 max-w-none h-full rounded-none">
        <div className="flex items-center gap-3 p-4 border-b">
          <button onClick={onClose} className="min-w-touch min-h-touch flex items-center justify-center">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            className="flex-1 h-12 text-base bg-transparent outline-none"
          />
          <button onClick={onClose} className="text-sm text-primary font-medium min-h-touch">
            Cancel
          </button>
        </div>
        {/* Recent searches, suggestions, etc. */}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Viewport and Meta Tags

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#fafafa" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

---

## Performance Considerations for Mobile

1. **Lazy loading:** Use React.lazy() for route-based code splitting
2. **Image optimization:** Use responsive images with srcset
3. **Touch events:** Use `touch-action: manipulation` to remove 300ms tap delay
4. **Scroll performance:** Use `will-change: transform` sparingly for animated elements
5. **Font loading:** Use `font-display: swap` for custom fonts

---

## Notes

1. **Font:** The design uses "Moderat" font. If not available, use system fonts as fallback for better mobile performance.
2. **Icons:** Use Lucide React icons which match the shadcn/ui style. Consider using sprite sheets for mobile performance.
3. **Responsive:** Mobile-first implementation with progressive enhancement for larger screens.
4. **Accessibility:**
   - Minimum 44×44px touch targets on mobile
   - Proper ARIA labels on all interactive elements
   - Focus states visible and keyboard navigable
   - Support for screen readers
5. **Safe Areas:** Account for device notches and home indicators using `env(safe-area-inset-*)`.
6. **Orientation:** Design works in both portrait and landscape orientations.
7. **Testing:** Test on real devices, not just browser DevTools, for accurate touch and performance behavior.
