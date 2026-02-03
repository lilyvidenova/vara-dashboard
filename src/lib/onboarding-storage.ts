import {
  OnboardingState,
  OnboardingData,
  STORAGE_KEY,
  DEFAULT_ONBOARDING_STATE,
  DEFAULT_ONBOARDING_DATA,
} from '@/types/onboarding'

// Old data format for migration
interface LegacyTargetAudience {
  ageGroups?: string[]
  genders?: string[]
  primaryMarket?: string | null
  secondaryMarket?: string | null
  primaryMarkets?: string[]
  secondaryMarkets?: string[]
}

interface LegacyOnboardingData {
  platforms?: string[]
  businessType?: string | null
  goals?: string[]
  targetAudience?: LegacyTargetAudience
  roi?: OnboardingData['roi']
}

interface LegacyOnboardingState {
  currentStep?: number
  data?: LegacyOnboardingData
  isCompleted?: boolean
}

/**
 * Migrate old data format to new format
 * - Converts primaryMarket (string) to primaryMarkets (array)
 * - Converts secondaryMarket (string) to secondaryMarkets (array)
 */
function migrateOnboardingData(legacy: LegacyOnboardingData): OnboardingData {
  const targetAudience = legacy.targetAudience ?? {}

  // Migrate primaryMarket -> primaryMarkets
  let primaryMarkets: string[] = []
  if (Array.isArray(targetAudience.primaryMarkets)) {
    primaryMarkets = targetAudience.primaryMarkets
  } else if (typeof targetAudience.primaryMarket === 'string' && targetAudience.primaryMarket) {
    primaryMarkets = [targetAudience.primaryMarket]
  }

  // Migrate secondaryMarket -> secondaryMarkets
  let secondaryMarkets: string[] = []
  if (Array.isArray(targetAudience.secondaryMarkets)) {
    secondaryMarkets = targetAudience.secondaryMarkets
  } else if (typeof targetAudience.secondaryMarket === 'string' && targetAudience.secondaryMarket) {
    secondaryMarkets = [targetAudience.secondaryMarket]
  }

  return {
    platforms: Array.isArray(legacy.platforms) ? legacy.platforms : [],
    businessType: legacy.businessType ?? null,
    goals: Array.isArray(legacy.goals) ? legacy.goals : [],
    targetAudience: {
      ageGroups: Array.isArray(targetAudience.ageGroups) ? targetAudience.ageGroups : [],
      genders: Array.isArray(targetAudience.genders) ? targetAudience.genders : [],
      primaryMarkets,
      secondaryMarkets,
    },
    roi: legacy.roi ?? DEFAULT_ONBOARDING_DATA.roi,
  }
}

export function getOnboardingState(): OnboardingState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored) as LegacyOnboardingState

    // Basic validation
    if (
      typeof parsed.currentStep !== 'number' ||
      !parsed.data ||
      typeof parsed.isCompleted !== 'boolean'
    ) {
      return null
    }

    // Validate step is in range
    const step = parsed.currentStep
    if (step < 1 || step > 5) {
      return null
    }

    // Migrate data to current format
    const migratedData = migrateOnboardingData(parsed.data)

    return {
      currentStep: step as 1 | 2 | 3 | 4 | 5,
      data: migratedData,
      isCompleted: parsed.isCompleted,
    }
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
