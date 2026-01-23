import { OutcomeDetailPage } from './OutcomeDetailPage'
import { getOutcomeById } from '@/types/outcomes'

export function AudienceSatisfactionPage() {
  const outcome = getOutcomeById('audience-satisfaction')!
  return <OutcomeDetailPage outcome={outcome} />
}
