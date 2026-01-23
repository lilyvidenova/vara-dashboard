# VARA Dashboard

A modern, responsive metrics dashboard built with React, TypeScript, and Tailwind CSS. Features animated charts, reusable components, and a comprehensive design system.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icon library
- **React Router** - Client-side routing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** or **pnpm**

To check your versions:

```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vara-dashboard
   ```

2. **Install dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

   Using pnpm:
   ```bash
   pnpm install
   ```

## Running the Project

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

This will:
1. Run TypeScript type checking
2. Bundle the application with Vite
3. Output files to the `dist/` directory

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
vara-dashboard/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ui/             # Base UI components (button, input, etc.)
│   │   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   │   ├── cards/          # Card components (MetricsCard, etc.)
│   │   ├── sections/       # Page sections (PlatformPerformance, etc.)
│   │   └── charts/         # Chart components (with Recharts)
│   ├── lib/                # Utilities (cn helper, etc.)
│   ├── pages/              # Page components
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & Tailwind
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Components Overview

### Layout Components
- `DashboardLayout` - Main dashboard wrapper
- `Header` - Top navigation with search
- `PageHeader` - Page title with actions

### Card Components
- `ContentImpactCard` - Main impact score with gauge
- `IndustryComparisonCard` - Comparison visualization
- `MetricsCardReusable` - Reusable metrics card
- `FinanceCard` - Financial metrics display

### Section Components
- `FinancialOverviewSection` - Financial metrics row
- `PlatformPerformanceSection` - Platform performance table
- `OtherBusinessOutcomesSection` - Business outcomes table
- `AIHotTipsSection` - AI tips with risk badges
- `TopPerformingContentSection` - Ranked content list

### Chart Components
- `ContentImpactGrowthChart` - Area chart with animation
- `ContentImpactEfficiencyChart` - Bar chart with gradient
- `ChartTooltip` - Reusable glass-effect tooltip

## Dependencies

### Production Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| react | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | React DOM renderer |
| react-router-dom | ^6.22.0 | Routing |
| recharts | ^3.7.0 | Charting library |
| lucide-react | ^0.460.0 | Icon library |
| @radix-ui/react-avatar | ^1.1.1 | Avatar component |
| @radix-ui/react-dialog | ^1.1.2 | Dialog component |
| @radix-ui/react-dropdown-menu | ^2.1.2 | Dropdown menu |
| @radix-ui/react-slot | ^1.1.0 | Slot utility |
| class-variance-authority | ^0.7.0 | Variant styling |
| clsx | ^2.1.1 | Class name utility |
| tailwind-merge | ^2.5.4 | Tailwind class merging |

### Development Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| typescript | ~5.6.2 | TypeScript compiler |
| vite | ^5.4.10 | Build tool |
| @vitejs/plugin-react | ^4.3.3 | Vite React plugin |
| tailwindcss | ^3.4.14 | CSS framework |
| tailwindcss-animate | ^1.0.7 | Animation utilities |
| autoprefixer | ^10.4.20 | CSS autoprefixer |
| postcss | ^8.4.47 | CSS processor |
| eslint | ^9.13.0 | Linter |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved.
