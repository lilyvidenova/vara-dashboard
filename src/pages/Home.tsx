import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/routes/routes'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        {/* Logo */}
        <div className="mb-8 text-2xl font-bold text-primary">VARA</div>

        {/* Welcome message */}
        <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Welcome to VARA METRICS
        </h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          Make faster, more confident decisions about content investment.
        </p>

        {/* CTAs */}
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Button asChild size="lg" className="w-full gap-2">
            <Link to={ROUTES.ONBOARDING}>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full gap-2">
            <Link to={ROUTES.DASHBOARD}>
              <BarChart3 className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Helper text */}
        <p className="mt-6 text-sm text-muted-foreground">
          New here? We recommend starting with onboarding to personalize your
          experience.
        </p>
      </div>
    </div>
  )
}
