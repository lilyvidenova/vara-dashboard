import * as React from 'react'
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  type LucideIcon,
} from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { PLATFORMS } from '@/types/onboarding'

// Custom icons for platforms not in Lucide
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

interface PlatformConfig {
  id: string
  label: string
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const platformIcons: Record<string, LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  instagram: Instagram,
  tiktok: TikTokIcon,
  youtube: Youtube,
  x: XIcon,
  facebook: Facebook,
  linkedin: Linkedin,
  pinterest: PinterestIcon,
}

const platformsWithIcons: PlatformConfig[] = PLATFORMS.map((p) => ({
  ...p,
  icon: platformIcons[p.id],
}))

interface PlatformStepProps {
  selectedPlatforms: string[]
  onPlatformsChange: (platforms: string[]) => void
}

export function PlatformStep({
  selectedPlatforms,
  onPlatformsChange,
}: PlatformStepProps) {
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformsChange(selectedPlatforms.filter((id) => id !== platformId))
    } else {
      onPlatformsChange([...selectedPlatforms, platformId])
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Which platforms do you use?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select all the social media platforms where you create content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {platformsWithIcons.map((platform) => {
          const Icon = platform.icon
          const isSelected = selectedPlatforms.includes(platform.id)

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              className={cn(
                'flex flex-col items-center gap-3 rounded-lg border p-4 transition-colors',
                'hover:border-primary hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isSelected && 'border-primary bg-primary/5'
              )}
            >
              <Icon className="h-8 w-8 text-foreground" />
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => togglePlatform(platform.id)}
                  className="pointer-events-none"
                  aria-hidden="true"
                />
                <Label className="cursor-pointer text-sm font-medium">
                  {platform.label}
                </Label>
              </div>
            </button>
          )
        })}
      </div>

      {selectedPlatforms.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Please select at least one platform to continue.
        </p>
      )}
    </div>
  )
}
