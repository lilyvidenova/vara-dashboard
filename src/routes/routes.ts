export const ROUTES = {
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
} as const

// Helper to generate platform URLs
export const getPlatformUrl = (platformId: string): string =>
  `${ROUTES.PLATFORMS.ROOT}/${platformId}`

// Helper to generate outcome URLs
export const getOutcomeUrl = (outcomeId: string): string =>
  `${ROUTES.OUTCOMES.ROOT}/${outcomeId}`
