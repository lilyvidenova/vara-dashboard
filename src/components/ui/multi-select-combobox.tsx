import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { X, Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface Option {
  value: string
  label: string
}

interface MultiSelectComboboxProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  className,
  disabled = false,
}: MultiSelectComboboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '' && selected.length > 0) {
          onChange(selected.slice(0, -1))
        }
      }
      if (e.key === 'Escape') {
        input.blur()
        setOpen(false)
      }
    }
  }

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value))
    } else {
      onChange([...selected, value])
    }
    setInputValue('')
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOptions = options.filter((opt) => selected.includes(opt.value))

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <CommandPrimitive
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        {/* Trigger */}
        <div
          className={cn(
            'group flex min-h-12 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
            'md:min-h-10 md:text-sm',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => {
            if (!disabled) {
              inputRef.current?.focus()
              setOpen(true)
            }
          }}
        >
          {/* Selected tags */}
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-sm"
            >
              {option.label}
              <button
                type="button"
                className="rounded-full p-0.5 hover:bg-foreground/10 focus:outline-none focus:ring-1 focus:ring-primary"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleUnselect(option.value)
                }}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {option.label}</span>
              </button>
            </span>
          ))}

          {/* Input */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : searchPlaceholder}
            disabled={disabled}
            className={cn(
              'flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
              'min-w-[120px]',
              disabled && 'cursor-not-allowed'
            )}
          />

          {/* Chevron */}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
            <CommandPrimitive.List className="max-h-60 overflow-auto p-1">
              <CommandPrimitive.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </CommandPrimitive.Empty>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandPrimitive.Item
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                      'data-[selected=true]:bg-muted data-[selected=true]:text-foreground',
                      'hover:bg-muted'
                    )}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input'
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    {option.label}
                  </CommandPrimitive.Item>
                )
              })}
            </CommandPrimitive.List>
          </div>
        )}
      </CommandPrimitive>
    </div>
  )
}
