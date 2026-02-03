import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Home } from '@/pages/Home'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Welcome page with choice */}
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* Onboarding */}
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

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
