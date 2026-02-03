import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StepNavigationProps {
  currentStep: 1 | 2 | 3 | 4 | 5
  isNextDisabled: boolean
  onBack: () => void
  onNext: () => void
  onSkip?: () => void
  showSkip?: boolean
  className?: string
}

export function StepNavigation({
  currentStep,
  isNextDisabled,
  onBack,
  onNext,
  onSkip,
  showSkip = false,
  className,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === 5

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Back button */}
      <div className="flex-1">
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>

      {/* Skip/Next buttons */}
      <div className="flex items-center gap-3">
        {showSkip && onSkip && (
          <Button variant="ghost" onClick={onSkip}>
            Skip this step
          </Button>
        )}
        <Button onClick={onNext} disabled={isNextDisabled} className="gap-2">
          {isLastStep ? 'Complete' : 'Next'}
          {!isLastStep && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
