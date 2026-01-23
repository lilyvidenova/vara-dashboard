import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function YouTubePage() {
  const platform = getPlatformById('youtube')!
  return <PlatformDetailPage platform={platform} />
}
