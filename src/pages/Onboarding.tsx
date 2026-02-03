import * as React from 'react'
import { RotateCcw } from 'lucide-react'

import {
  OnboardingLayout,
  ProgressIndicator,
  StepNavigation,
  PlatformStep,
  BusinessTypeStep,
  GoalsStep,
  AudienceStep,
  ROIStep,
} from '@/components/onboarding'
import { Button } from '@/components/ui/button'
import { useOnboarding } from '@/hooks/useOnboarding'
import { cn } from '@/lib/utils'

export function Onboarding() {
  const {
    currentStep,
    data,
    isStepValid,
    goNext,
    goBack,
    updateData,
    updateTargetAudience,
    updateRoi,
    completeOnboarding,
    resetOnboarding,
  } = useOnboarding()

  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [displayStep, setDisplayStep] = React.useState(currentStep)

  // Handle step transitions with animation
  React.useEffect(() => {
    if (currentStep !== displayStep) {
      setIsTransitioning(true)
      const timeout = setTimeout(() => {
        setDisplayStep(currentStep)
        setIsTransitioning(false)
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [currentStep, displayStep])

  const renderStep = () => {
    switch (displayStep) {
      case 1:
        return (
          <PlatformStep
            selectedPlatforms={data.platforms}
            onPlatformsChange={(platforms) => updateData({ platforms })}
          />
        )
      case 2:
        return (
          <BusinessTypeStep
            selectedType={data.businessType}
            onTypeChange={(businessType) => updateData({ businessType })}
          />
        )
      case 3:
        return (
          <GoalsStep
            selectedGoals={data.goals}
            onGoalsChange={(goals) => updateData({ goals })}
          />
        )
      case 4:
        return (
          <AudienceStep
            ageGroups={data.targetAudience.ageGroups}
            genders={data.targetAudience.genders}
            primaryMarkets={data.targetAudience.primaryMarkets}
            secondaryMarkets={data.targetAudience.secondaryMarkets}
            onAgeGroupsChange={(ageGroups) =>
              updateTargetAudience({ ageGroups })
            }
            onGendersChange={(genders) => updateTargetAudience({ genders })}
            onPrimaryMarketsChange={(primaryMarkets) =>
              updateTargetAudience({ primaryMarkets })
            }
            onSecondaryMarketsChange={(secondaryMarkets) =>
              updateTargetAudience({ secondaryMarkets })
            }
          />
        )
      case 5:
        return (
          <ROIStep
            monthlyContentSpend={data.roi.monthlyContentSpend}
            monthlyMediaSpend={data.roi.monthlyMediaSpend}
            hasDirectPlatformRevenue={data.roi.hasDirectPlatformRevenue}
            monthlyDirectRevenue={data.roi.monthlyDirectRevenue}
            hasOffPlatformRevenue={data.roi.hasOffPlatformRevenue}
            monthlyOffPlatformRevenue={data.roi.monthlyOffPlatformRevenue}
            onUpdate={updateRoi}
          />
        )
      default:
        return null
    }
  }

  return (
    <OnboardingLayout>
      {/* Header with progress */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between">
          <div className="text-xl font-semibold text-primary">VARA</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetOnboarding}
            className="gap-2 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
        <ProgressIndicator currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="flex-1 py-8">
        <div
          className={cn(
            'transition-opacity duration-150',
            isTransitioning ? 'opacity-0' : 'opacity-100'
          )}
        >
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <StepNavigation
        currentStep={currentStep}
        isNextDisabled={!isStepValid}
        onBack={goBack}
        onNext={currentStep === 5 ? completeOnboarding : goNext}
        showSkip={currentStep === 5}
        onSkip={completeOnboarding}
      />
    </OnboardingLayout>
  )
}
