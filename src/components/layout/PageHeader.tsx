import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/useMediaQuery'

interface PageHeaderProps {
  icon?: React.ReactNode
  label: string
  title: string
  primaryAction?: {
    label: string
    shortLabel?: string
    icon?: React.ReactNode
    onClick: () => void
  }
  dateFilter?: {
    value: string
    icon?: React.ReactNode
    options: { label: string; value: string }[]
    onChange: (value: string) => void
  }
}

export function PageHeader({
  icon,
  label,
  title,
  primaryAction,
  dateFilter,
}: PageHeaderProps) {
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      {/* Title Section */}
      <div className="flex items-start gap-2.5 md:gap-3">
        {icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary md:h-10 md:w-10">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-1 md:gap-2">
          <span className="text-sm font-bold text-foreground md:text-base">
            {label}
          </span>
          <h1 className="text-2xl font-bold text-popover-foreground md:text-3xl lg:text-4xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Actions - Stack on mobile, inline on desktop */}
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 md:mt-0">
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            className="w-full sm:w-auto"
            size="sm"
          >
            {primaryAction.icon}
            <span className="md:hidden">
              {primaryAction.shortLabel || primaryAction.label}
            </span>
            <span className="hidden md:inline">{primaryAction.label}</span>
          </Button>
        )}

        {dateFilter && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between sm:w-auto"
                size="sm"
              >
                <span className="flex items-center gap-2">
                  {dateFilter.icon}
                  {dateFilter.value}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isMobile ? 'center' : 'end'} className="w-[200px]">
              {dateFilter.options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => dateFilter.onChange(option.value)}
                  className={
                    dateFilter.value === option.label
                      ? 'bg-muted font-medium'
                      : ''
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}
