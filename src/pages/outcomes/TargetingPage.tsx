import { OutcomeDetailPage } from './OutcomeDetailPage'
import { getOutcomeById } from '@/types/outcomes'

export function TargetingPage() {
  const outcome = getOutcomeById('targeting')!
  return <OutcomeDetailPage outcome={outcome} />
}
