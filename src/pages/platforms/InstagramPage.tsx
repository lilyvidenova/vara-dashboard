import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function InstagramPage() {
  const platform = getPlatformById('instagram')!
  return <PlatformDetailPage platform={platform} />
}
