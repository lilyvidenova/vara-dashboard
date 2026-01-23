import { OutcomeDetailPage } from './OutcomeDetailPage'
import { getOutcomeById } from '@/types/outcomes'

export function EngagementPage() {
  const outcome = getOutcomeById('engagement')!
  return <OutcomeDetailPage outcome={outcome} />
}
