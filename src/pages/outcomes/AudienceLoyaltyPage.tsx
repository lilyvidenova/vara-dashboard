import { OutcomeDetailPage } from './OutcomeDetailPage'
import { getOutcomeById } from '@/types/outcomes'

export function AudienceLoyaltyPage() {
  const outcome = getOutcomeById('audience-loyalty')!
  return <OutcomeDetailPage outcome={outcome} />
}
