import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function FacebookPage() {
  const platform = getPlatformById('facebook')!
  return <PlatformDetailPage platform={platform} />
}
