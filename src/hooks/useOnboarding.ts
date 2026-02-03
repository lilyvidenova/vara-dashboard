import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  OnboardingState,
  OnboardingData,
  DEFAULT_ONBOARDING_STATE,
} from '@/types/onboarding'
import {
  getInitialOnboardingState,
  saveOnboardingState,
  clearOnboardingState,
} from '@/lib/onboarding-storage'
import { ROUTES } from '@/routes/routes'

type StepNumber = 1 | 2 | 3 | 4 | 5

interface UseOnboardingReturn {
  currentStep: StepNumber
  data: OnboardingData
  isStepValid: boolean
  isCompleted: boolean
  goNext: () => void
  goBack: () => void
  goToStep: (step: StepNumber) => void
  updateData: (partial: Partial<OnboardingData>) => void
  updateTargetAudience: (partial: Partial<OnboardingData['targetAudience']>) => void
  updateRoi: (partial: Partial<OnboardingData['roi']>) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
}

function validateStep(step: StepNumber, data: OnboardingData): boolean {
  switch (step) {
    case 1:
      return data.platforms.length > 0
    case 2:
      return data.businessType !== null
    case 3:
      return data.goals.length > 0
    case 4:
      return (
        data.targetAudience.ageGroups.length > 0 &&
        data.targetAudience.genders.length > 0 &&
        data.targetAudience.primaryMarkets.length > 0
      )
    case 5:
      // ROI step is entirely optional
      return true
    default:
      return false
  }
}

export function useOnboarding(): UseOnboardingReturn {
  const navigate = useNavigate()
  const [state, setState] = useState<OnboardingState>(getInitialOnboardingState)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced save to localStorage
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveOnboardingState(state)
    }, 300)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [state])

  const isStepValid = validateStep(state.currentStep, state.data)

  const goNext = useCallback(() => {
    if (!isStepValid) return

    if (state.currentStep === 5) {
      // Complete onboarding - save synchronously before navigating
      const completedState: OnboardingState = { ...state, isCompleted: true }
      saveOnboardingState(completedState)
      setState(completedState)
      navigate(ROUTES.DASHBOARD)
    } else {
      setState((prev) => ({
        ...prev,
        currentStep: (prev.currentStep + 1) as StepNumber,
      }))
    }
  }, [isStepValid, state, navigate])

  const goBack = useCallback(() => {
    if (state.currentStep === 1) return
    setState((prev) => ({
      ...prev,
      currentStep: (prev.currentStep - 1) as StepNumber,
    }))
  }, [state.currentStep])

  const goToStep = useCallback((step: StepNumber) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  const updateData = useCallback((partial: Partial<OnboardingData>) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, ...partial },
    }))
  }, [])

  const updateTargetAudience = useCallback(
    (partial: Partial<OnboardingData['targetAudience']>) => {
      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          targetAudience: { ...prev.data.targetAudience, ...partial },
        },
      }))
    },
    []
  )

  const updateRoi = useCallback((partial: Partial<OnboardingData['roi']>) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        roi: { ...prev.data.roi, ...partial },
      },
    }))
  }, [])

  const completeOnboarding = useCallback(() => {
    const completedState: OnboardingState = { ...state, isCompleted: true }
    // Save synchronously before navigating to avoid race condition
    saveOnboardingState(completedState)
    setState(completedState)
    navigate(ROUTES.DASHBOARD)
  }, [state, navigate])

  const resetOnboarding = useCallback(() => {
    clearOnboardingState()
    setState(DEFAULT_ONBOARDING_STATE)
  }, [])

  return {
    currentStep: state.currentStep,
    data: state.data,
    isStepValid,
    isCompleted: state.isCompleted,
    goNext,
    goBack,
    goToStep,
    updateData,
    updateTargetAudience,
    updateRoi,
    completeOnboarding,
    resetOnboarding,
  }
}
