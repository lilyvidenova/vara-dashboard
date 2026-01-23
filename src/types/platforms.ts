export type PlatformId =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'x'
  | 'facebook'
  | 'snapchat'
  | 'linkedin'

export interface PlatformConfig {
  id: PlatformId
  name: string
  slug: string
}

export const PLATFORMS: PlatformConfig[] = [
  { id: 'instagram', name: 'Instagram', slug: 'instagram' },
  { id: 'tiktok', name: 'TikTok', slug: 'tiktok' },
  { id: 'youtube', name: 'YouTube', slug: 'youtube' },
  { id: 'x', name: 'X', slug: 'x' },
  { id: 'facebook', name: 'Facebook', slug: 'facebook' },
  { id: 'snapchat', name: 'Snapchat', slug: 'snapchat' },
  { id: 'linkedin', name: 'LinkedIn', slug: 'linkedin' },
]

export const getPlatformById = (id: PlatformId): PlatformConfig | undefined =>
  PLATFORMS.find((p) => p.id === id)

export const getPlatformBySlug = (slug: string): PlatformConfig | undefined =>
  PLATFORMS.find((p) => p.slug === slug)
