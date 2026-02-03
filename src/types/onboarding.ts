// Platform options
export const PLATFORMS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'x', label: 'X (Twitter)' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'pinterest', label: 'Pinterest' },
] as const

export const BUSINESS_TYPES = [
  { id: 'product-or-service', label: 'Product or Service' },
  { id: 'content-creator', label: 'Content Creator' },
  { id: 'other', label: 'Other' },
] as const

export const GOALS = [
  { id: 'increase-brand-awareness', label: 'Increase brand awareness' },
  { id: 'grow-audience', label: 'Grow my audience' },
  { id: 'boost-engagement', label: 'Boost engagement' },
  { id: 'reach-right-people', label: 'Reach the right people' },
  { id: 'build-loyalty', label: 'Build audience loyalty' },
  { id: 'improve-content-quality', label: 'Improve content quality' },
  { id: 'drive-revenue-roi', label: 'Drive revenue & ROI' },
  { id: 'work-efficiently', label: 'Work more efficiently' },
] as const

export const AGE_GROUPS = [
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
] as const

export const GENDERS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'non-binary', label: 'Non-binary' },
  { id: 'all', label: 'All genders' },
] as const

// Main data interface
export interface OnboardingData {
  platforms: string[]
  businessType: string | null
  goals: string[]
  targetAudience: {
    ageGroups: string[]
    genders: string[]
    primaryMarkets: string[]
    secondaryMarkets: string[]
  }
  roi: {
    monthlyContentSpend: number | null
    monthlyMediaSpend: number | null
    hasDirectPlatformRevenue: boolean
    monthlyDirectRevenue: number | null
    hasOffPlatformRevenue: boolean
    monthlyOffPlatformRevenue: number | null
  }
}

export interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4 | 5
  data: OnboardingData
  isCompleted: boolean
}

export const STORAGE_KEY = 'vara_onboarding'

export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  platforms: [],
  businessType: null,
  goals: [],
  targetAudience: {
    ageGroups: [],
    genders: [],
    primaryMarkets: [],
    secondaryMarkets: [],
  },
  roi: {
    monthlyContentSpend: null,
    monthlyMediaSpend: null,
    hasDirectPlatformRevenue: false,
    monthlyDirectRevenue: null,
    hasOffPlatformRevenue: false,
    monthlyOffPlatformRevenue: null,
  },
}

export const DEFAULT_ONBOARDING_STATE: OnboardingState = {
  currentStep: 1,
  data: DEFAULT_ONBOARDING_DATA,
  isCompleted: false,
}

export type PlatformId = (typeof PLATFORMS)[number]['id']
export type BusinessTypeId = (typeof BUSINESS_TYPES)[number]['id']
export type GoalId = (typeof GOALS)[number]['id']
export type AgeGroup = (typeof AGE_GROUPS)[number]
export type GenderId = (typeof GENDERS)[number]['id']
