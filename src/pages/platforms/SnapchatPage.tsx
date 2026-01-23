import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function SnapchatPage() {
  const platform = getPlatformById('snapchat')!
  return <PlatformDetailPage platform={platform} />
}
