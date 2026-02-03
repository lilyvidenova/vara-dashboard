import * as React from 'react'
import { Package, Video, Layers } from 'lucide-react'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { BUSINESS_TYPES } from '@/types/onboarding'

const businessTypeIcons: Record<string, React.ReactNode> = {
  'product-or-service': <Package className="h-8 w-8" />,
  'content-creator': <Video className="h-8 w-8" />,
  both: <Layers className="h-8 w-8" />,
}

const businessTypeDescriptions: Record<string, string> = {
  'product-or-service': 'You sell products or services to customers',
  'content-creator': 'You create content and build an audience',
  both: 'You sell products/services and create content',
}

interface BusinessTypeStepProps {
  selectedType: string | null
  onTypeChange: (type: string) => void
}

export function BusinessTypeStep({
  selectedType,
  onTypeChange,
}: BusinessTypeStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          What type of business are you?
        </h1>
        <p className="mt-2 text-muted-foreground">
          This helps us tailor your metrics and insights.
        </p>
      </div>

      <RadioGroup
        value={selectedType ?? undefined}
        onValueChange={onTypeChange}
        className="grid gap-3"
      >
        {BUSINESS_TYPES.map((type) => {
          const isSelected = selectedType === type.id

          return (
            <Label
              key={type.id}
              htmlFor={type.id}
              className={cn(
                'flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors',
                'hover:border-primary hover:bg-primary/5',
                '[&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-primary [&:has(:focus-visible)]:ring-offset-2',
                isSelected && 'border-primary bg-primary/5'
              )}
            >
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className="sr-only"
              />
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg bg-muted',
                  isSelected && 'bg-primary/10 text-primary'
                )}
              >
                {businessTypeIcons[type.id]}
              </div>
              <div className="flex-1">
                <p className="font-medium">{type.label}</p>
                <p className="text-sm text-muted-foreground">
                  {businessTypeDescriptions[type.id]}
                </p>
              </div>
              <div
                className={cn(
                  'h-5 w-5 rounded-full border-2',
                  isSelected
                    ? 'border-primary bg-primary'
                    : 'border-input bg-background'
                )}
              >
                {isSelected && (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                )}
              </div>
            </Label>
          )
        })}
      </RadioGroup>

      {!selectedType && (
        <p className="text-center text-sm text-muted-foreground">
          Please select a business type to continue.
        </p>
      )}
    </div>
  )
}
