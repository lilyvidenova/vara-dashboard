import {
  OnboardingState,
  STORAGE_KEY,
  DEFAULT_ONBOARDING_STATE,
} from '@/types/onboarding'

export function getOnboardingState(): OnboardingState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as OnboardingState
    // Validate the parsed data has required fields
    if (
      typeof parsed.currentStep !== 'number' ||
      !parsed.data ||
      typeof parsed.isCompleted !== 'boolean'
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveOnboardingState(state: OnboardingState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save onboarding state:', error)
  }
}

export function clearOnboardingState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear onboarding state:', error)
  }
}

export function isOnboardingCompleted(): boolean {
  const state = getOnboardingState()
  return state?.isCompleted ?? false
}

export function getInitialOnboardingState(): OnboardingState {
  return getOnboardingState() ?? DEFAULT_ONBOARDING_STATE
}
