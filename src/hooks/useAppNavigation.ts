import { useNavigate } from 'react-router-dom'
import { ROUTES, getPlatformUrl, getOutcomeUrl, getPlatformOutcomeUrl, type PlatformOutcomeType } from '@/routes/routes'
import type { PlatformId } from '@/types/platforms'
import type { OutcomeId } from '@/types/outcomes'

export function useAppNavigation() {
  const navigate = useNavigate()

  return {
    goToDashboard: () => navigate(ROUTES.DASHBOARD),
    goToFinancial: () => navigate(ROUTES.FINANCIAL),
    goToPlatform: (platformId: PlatformId) => navigate(getPlatformUrl(platformId)),
    goToOutcome: (outcomeId: OutcomeId) => navigate(getOutcomeUrl(outcomeId)),
    goToPlatformOutcome: (platformId: PlatformId, outcomeType: PlatformOutcomeType) =>
      navigate(getPlatformOutcomeUrl(platformId, outcomeType)),
    goBack: () => navigate(-1),
  }
}
