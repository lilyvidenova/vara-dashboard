import * as React from 'react'
import { PoundSterling } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface ROIStepProps {
  monthlyContentSpend: number | null
  monthlyMediaSpend: number | null
  hasDirectPlatformRevenue: boolean
  monthlyDirectRevenue: number | null
  hasOffPlatformRevenue: boolean
  monthlyOffPlatformRevenue: number | null
  onUpdate: (data: {
    monthlyContentSpend?: number | null
    monthlyMediaSpend?: number | null
    hasDirectPlatformRevenue?: boolean
    monthlyDirectRevenue?: number | null
    hasOffPlatformRevenue?: boolean
    monthlyOffPlatformRevenue?: number | null
  }) => void
}

function CurrencyInput({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
}: {
  id: string
  label: string
  value: number | null
  onChange: (value: number | null) => void
  placeholder?: string
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '')
    if (rawValue === '') {
      onChange(null)
    } else {
      onChange(parseInt(rawValue, 10))
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <PoundSterling className="h-4 w-4" />
        </div>
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          value={value !== null ? value.toLocaleString() : ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>
    </div>
  )
}

export function ROIStep({
  monthlyContentSpend,
  monthlyMediaSpend,
  hasDirectPlatformRevenue,
  monthlyDirectRevenue,
  hasOffPlatformRevenue,
  monthlyOffPlatformRevenue,
  onUpdate,
}: ROIStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Tell us about your ROI
        </h1>
        <p className="mt-2 text-muted-foreground">
          This helps us calculate your return on investment.{' '}
          <span className="font-medium">All fields are optional.</span>
        </p>
      </div>

      {/* Spend Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Monthly spend</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <CurrencyInput
            id="content-spend"
            label="Content creation spend"
            value={monthlyContentSpend}
            onChange={(value) => onUpdate({ monthlyContentSpend: value })}
            placeholder="e.g. 5,000"
          />
          <CurrencyInput
            id="media-spend"
            label="Media/advertising spend"
            value={monthlyMediaSpend}
            onChange={(value) => onUpdate({ monthlyMediaSpend: value })}
            placeholder="e.g. 10,000"
          />
        </div>
      </div>

      {/* Direct Platform Revenue */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="direct-revenue-switch" className="text-base font-medium">
              Do you earn revenue directly on platforms?
            </Label>
            <p className="text-sm text-muted-foreground">
              e.g. YouTube ad revenue, TikTok Creator Fund, sponsorships
            </p>
          </div>
          <Switch
            id="direct-revenue-switch"
            checked={hasDirectPlatformRevenue}
            onCheckedChange={(checked) =>
              onUpdate({
                hasDirectPlatformRevenue: checked,
                monthlyDirectRevenue: checked ? monthlyDirectRevenue : null,
              })
            }
          />
        </div>
        <div
          className={cn(
            'grid transition-all duration-200',
            hasDirectPlatformRevenue
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <CurrencyInput
              id="direct-revenue"
              label="Monthly direct platform revenue"
              value={monthlyDirectRevenue}
              onChange={(value) => onUpdate({ monthlyDirectRevenue: value })}
              placeholder="e.g. 2,000"
            />
          </div>
        </div>
      </div>

      {/* Off-Platform Revenue */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="off-platform-switch" className="text-base font-medium">
              Do you earn revenue off-platform?
            </Label>
            <p className="text-sm text-muted-foreground">
              e.g. Product sales, services, merchandise driven by social media
            </p>
          </div>
          <Switch
            id="off-platform-switch"
            checked={hasOffPlatformRevenue}
            onCheckedChange={(checked) =>
              onUpdate({
                hasOffPlatformRevenue: checked,
                monthlyOffPlatformRevenue: checked
                  ? monthlyOffPlatformRevenue
                  : null,
              })
            }
          />
        </div>
        <div
          className={cn(
            'grid transition-all duration-200',
            hasOffPlatformRevenue
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <CurrencyInput
              id="off-platform-revenue"
              label="Monthly off-platform revenue"
              value={monthlyOffPlatformRevenue}
              onChange={(value) =>
                onUpdate({ monthlyOffPlatformRevenue: value })
              }
              placeholder="e.g. 15,000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
