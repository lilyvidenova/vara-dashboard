import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3 | 4 | 5
  totalSteps?: number
}

export function ProgressIndicator({
  currentStep,
  totalSteps = 5,
}: ProgressIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1
          const isCompleted = step < currentStep
          const isCurrent = step === currentStep

          return (
            <React.Fragment key={step}>
              {/* Step circle */}
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isCurrent && 'bg-primary text-primary-foreground',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  step
                )}
              </div>

              {/* Connecting line */}
              {step < totalSteps && (
                <div
                  className={cn(
                    'h-0.5 w-6 transition-colors md:w-10',
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  )
}
