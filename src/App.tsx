import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { FinancialOverview } from '@/pages/FinancialOverview'
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
import { ROUTES } from '@/routes/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
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

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
