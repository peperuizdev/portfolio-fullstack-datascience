import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles 
          'text-sm font-medium transition-colors duration-200 focus:outline-none',
          
          // Variants
          {
            'text-black hover:text-primary-600': variant === 'default',
            'text-primary-500 hover:text-black': variant === 'ghost',
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'