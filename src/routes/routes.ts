export const ROUTES = {
  ONBOARDING: '/onboarding',
  DASHBOARD: '/',
  FINANCIAL: '/financial',
  PLATFORMS: {
    ROOT: '/platforms',
    INSTAGRAM: '/platforms/instagram',
    TIKTOK: '/platforms/tiktok',
    YOUTUBE: '/platforms/youtube',
    X: '/platforms/x',
    FACEBOOK: '/platforms/facebook',
    SNAPCHAT: '/platforms/snapchat',
    LINKEDIN: '/platforms/linkedin',
  },
  OUTCOMES: {
    ROOT: '/outcomes',
    BRAND_AWARENESS: '/outcomes/brand-awareness',
    ENGAGEMENT: '/outcomes/engagement',
    TARGETING: '/outcomes/targeting',
    AUDIENCE_SATISFACTION: '/outcomes/audience-satisfaction',
    AUDIENCE_LOYALTY: '/outcomes/audience-loyalty',
  },
  PLATFORM_OUTCOMES: {
    BRAND_AWARENESS: '/platforms/:platformId/brand-awareness',
    ENGAGEMENT: '/platforms/:platformId/engagement',
    TARGETING: '/platforms/:platformId/targeting',
    AUDIENCE_SATISFACTION: '/platforms/:platformId/audience-satisfaction',
    AUDIENCE_LOYALTY: '/platforms/:platformId/audience-loyalty',
  },
} as const

// Helper to generate platform URLs
export const getPlatformUrl = (platformId: string): string =>
  `${ROUTES.PLATFORMS.ROOT}/${platformId}`

// Helper to generate outcome URLs
export const getOutcomeUrl = (outcomeId: string): string =>
  `${ROUTES.OUTCOMES.ROOT}/${outcomeId}`

// Helper to generate platform-specific outcome URLs
export type PlatformOutcomeType =
  | 'brand-awareness'
  | 'engagement'
  | 'targeting'
  | 'audience-satisfaction'
  | 'audience-loyalty'

export const getPlatformOutcomeUrl = (platformId: string, outcomeType: PlatformOutcomeType): string =>
  `${ROUTES.PLATFORMS.ROOT}/${platformId}/${outcomeType}`
