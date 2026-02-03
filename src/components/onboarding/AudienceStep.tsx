import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox'
import { cn } from '@/lib/utils'
import { AGE_GROUPS, GENDERS } from '@/types/onboarding'
import { MARKETS } from '@/data/markets'

// Convert markets to options format
const marketOptions = MARKETS.map((market) => ({
  value: market.code,
  label: market.name,
}))

interface AudienceStepProps {
  ageGroups: string[]
  genders: string[]
  primaryMarkets: string[]
  secondaryMarkets: string[]
  onAgeGroupsChange: (ageGroups: string[]) => void
  onGendersChange: (genders: string[]) => void
  onPrimaryMarketsChange: (markets: string[]) => void
  onSecondaryMarketsChange: (markets: string[]) => void
}

export function AudienceStep({
  ageGroups,
  genders,
  primaryMarkets,
  secondaryMarkets,
  onAgeGroupsChange,
  onGendersChange,
  onPrimaryMarketsChange,
  onSecondaryMarketsChange,
}: AudienceStepProps) {
  const toggleAgeGroup = (age: string) => {
    if (ageGroups.includes(age)) {
      onAgeGroupsChange(ageGroups.filter((a) => a !== age))
    } else {
      onAgeGroupsChange([...ageGroups, age])
    }
  }

  const toggleGender = (genderId: string) => {
    if (genders.includes(genderId)) {
      onGendersChange(genders.filter((g) => g !== genderId))
    } else {
      onGendersChange([...genders, genderId])
    }
  }

  const isValid =
    ageGroups.length > 0 && genders.length > 0 && primaryMarkets.length > 0

  // Filter out selected primary markets from secondary options and vice versa
  const primaryMarketOptions = marketOptions.filter(
    (opt) => !secondaryMarkets.includes(opt.value)
  )
  const secondaryMarketOptions = marketOptions.filter(
    (opt) => !primaryMarkets.includes(opt.value)
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Who is your target audience?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tell us about the people you want to reach.
        </p>
      </div>

      {/* Age Groups */}
      <div className="flex flex-col gap-3">
        <Label className="text-base font-medium">Age groups</Label>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((age) => {
            const isSelected = ageGroups.includes(age)
            return (
              <button
                key={age}
                type="button"
                onClick={() => toggleAgeGroup(age)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
                  'hover:border-primary hover:bg-primary/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isSelected && 'border-primary bg-primary/5'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleAgeGroup(age)}
                  className="pointer-events-none h-4 w-4"
                  aria-hidden="true"
                />
                {age}
              </button>
            )
          })}
        </div>
        {ageGroups.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Select at least one age group
          </p>
        )}
      </div>

      {/* Genders */}
      <div className="flex flex-col gap-3">
        <Label className="text-base font-medium">Genders</Label>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((gender) => {
            const isSelected = genders.includes(gender.id)
            return (
              <button
                key={gender.id}
                type="button"
                onClick={() => toggleGender(gender.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
                  'hover:border-primary hover:bg-primary/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isSelected && 'border-primary bg-primary/5'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleGender(gender.id)}
                  className="pointer-events-none h-4 w-4"
                  aria-hidden="true"
                />
                {gender.label}
              </button>
            )
          })}
        </div>
        {genders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Select at least one gender
          </p>
        )}
      </div>

      {/* Markets */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-base font-medium">
            Primary markets <span className="text-status-error">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            The main countries or regions you want to reach
          </p>
          <MultiSelectCombobox
            options={primaryMarketOptions}
            selected={primaryMarkets}
            onChange={onPrimaryMarketsChange}
            placeholder="Select countries or regions..."
            searchPlaceholder="Type to search..."
            emptyMessage="No countries found."
          />
          {primaryMarkets.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Select at least one primary market
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base font-medium">
            Secondary markets{' '}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Additional countries or regions you may expand to
          </p>
          <MultiSelectCombobox
            options={secondaryMarketOptions}
            selected={secondaryMarkets}
            onChange={onSecondaryMarketsChange}
            placeholder="Select countries or regions..."
            searchPlaceholder="Type to search..."
            emptyMessage="No countries found."
          />
        </div>
      </div>

      {!isValid && (
        <p className="text-center text-sm text-muted-foreground">
          Please complete all required fields to continue.
        </p>
      )}
    </div>
  )
}
