import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function TikTokPage() {
  const platform = getPlatformById('tiktok')!
  return <PlatformDetailPage platform={platform} />
}
