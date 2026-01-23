import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function LinkedInPage() {
  const platform = getPlatformById('linkedin')!
  return <PlatformDetailPage platform={platform} />
}
