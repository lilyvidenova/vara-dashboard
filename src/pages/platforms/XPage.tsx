import { PlatformDetailPage } from './PlatformDetailPage'
import { getPlatformById } from '@/types/platforms'

export function XPage() {
  const platform = getPlatformById('x')!
  return <PlatformDetailPage platform={platform} />
}
