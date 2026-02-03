import * as React from 'react'

import { cn } from '@/lib/utils'

interface OnboardingLayoutProps {
  children: React.ReactNode
  className?: string
}

export function OnboardingLayout({
  children,
  className,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          'mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-6 md:px-6 md:py-8 lg:py-12',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
