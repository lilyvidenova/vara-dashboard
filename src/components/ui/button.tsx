import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80',
        outline:
          'border border-primary bg-card text-primary hover:bg-primary/5 active:bg-primary/10',
        secondary:
          'bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70',
        ghost:
          'hover:bg-muted hover:text-foreground active:bg-muted/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2 min-h-touch md:h-9 md:min-h-0',
        sm: 'h-11 px-4 py-2 min-h-touch md:h-8 md:px-3 md:min-h-0',
        lg: 'h-12 px-6 py-3 min-h-touch md:h-11 md:min-h-0',
        icon: 'h-11 w-11 min-h-touch min-w-touch md:h-9 md:w-9 md:min-h-0 md:min-w-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
