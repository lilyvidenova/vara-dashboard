import { OutcomeDetailPage } from './OutcomeDetailPage'
import { getOutcomeById } from '@/types/outcomes'

export function BrandAwarenessPage() {
  const outcome = getOutcomeById('brand-awareness')!
  return <OutcomeDetailPage outcome={outcome} />
}
