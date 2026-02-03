import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Dashboard } from '@/pages/Dashboard'
import { FinancialOverview } from '@/pages/FinancialOverview'
import { Onboarding } from '@/pages/Onboarding'
import {
  InstagramPage,
  TikTokPage,
  YouTubePage,
  XPage,
  FacebookPage,
  SnapchatPage,
  LinkedInPage,
} from '@/pages/platforms'
import {
  BrandAwarenessPage,
  EngagementPage,
  TargetingPage,
  AudienceSatisfactionPage,
  AudienceLoyaltyPage,
} from '@/pages/outcomes'
import {
  PlatformBrandAwarenessPage,
  PlatformEngagementPage,
  PlatformTargetingPage,
  PlatformAudienceSatisfactionPage,
  PlatformAudienceLoyaltyPage,
} from '@/pages/platforms/outcomes'
import { GaugePreview } from '@/pages/GaugePreview'
import { ROUTES } from '@/routes/routes'
import { isOnboardingCompleted } from '@/lib/onboarding-storage'

function AppRoutes() {
  const onboardingCompleted = isOnboardingCompleted()

  // If onboarding is not completed, redirect all routes to onboarding
  // except the onboarding route itself
  if (!onboardingCompleted) {
    return (
      <Routes>
        <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
        <Route path="*" element={<Navigate to={ROUTES.ONBOARDING} replace />} />
      </Routes>
    )
  }

  // Normal routing when onboarding is completed
  return (
    <Routes>
      {/* Onboarding - always accessible for users who want to redo it */}
      <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />

      {/* Dashboard */}
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

      {/* Legacy redirect */}
      <Route path="/performance" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Financial Overview */}
      <Route path={ROUTES.FINANCIAL} element={<FinancialOverview />} />

      {/* Platform Pages */}
      <Route path={ROUTES.PLATFORMS.INSTAGRAM} element={<InstagramPage />} />
      <Route path={ROUTES.PLATFORMS.TIKTOK} element={<TikTokPage />} />
      <Route path={ROUTES.PLATFORMS.YOUTUBE} element={<YouTubePage />} />
      <Route path={ROUTES.PLATFORMS.X} element={<XPage />} />
      <Route path={ROUTES.PLATFORMS.FACEBOOK} element={<FacebookPage />} />
      <Route path={ROUTES.PLATFORMS.SNAPCHAT} element={<SnapchatPage />} />
      <Route path={ROUTES.PLATFORMS.LINKEDIN} element={<LinkedInPage />} />

      {/* Outcome Pages */}
      <Route path={ROUTES.OUTCOMES.BRAND_AWARENESS} element={<BrandAwarenessPage />} />
      <Route path={ROUTES.OUTCOMES.ENGAGEMENT} element={<EngagementPage />} />
      <Route path={ROUTES.OUTCOMES.TARGETING} element={<TargetingPage />} />
      <Route path={ROUTES.OUTCOMES.AUDIENCE_SATISFACTION} element={<AudienceSatisfactionPage />} />
      <Route path={ROUTES.OUTCOMES.AUDIENCE_LOYALTY} element={<AudienceLoyaltyPage />} />

      {/* Platform-specific Outcome Pages */}
      <Route path={ROUTES.PLATFORM_OUTCOMES.BRAND_AWARENESS} element={<PlatformBrandAwarenessPage />} />
      <Route path={ROUTES.PLATFORM_OUTCOMES.ENGAGEMENT} element={<PlatformEngagementPage />} />
      <Route path={ROUTES.PLATFORM_OUTCOMES.TARGETING} element={<PlatformTargetingPage />} />
      <Route path={ROUTES.PLATFORM_OUTCOMES.AUDIENCE_SATISFACTION} element={<PlatformAudienceSatisfactionPage />} />
      <Route path={ROUTES.PLATFORM_OUTCOMES.AUDIENCE_LOYALTY} element={<PlatformAudienceLoyaltyPage />} />

      {/* Dev/Debug Pages */}
      <Route path="/dev/gauges" element={<GaugePreview />} />

      {/* Catch-all redirect to dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
