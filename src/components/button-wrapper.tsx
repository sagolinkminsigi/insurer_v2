import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

interface ButtonPropsBase
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false
        loading?: boolean
        leftSection?: JSX.Element
        rightSection?: JSX.Element
      }
  )

const ButtonWrapper = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    if (props.asChild) {
      return (
        <Slot className={className} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    const {
      loading = false,
      leftSection,
      rightSection,
      disabled,
      ...otherProps
    } = props

    return (
      <button
        className={cn(disabled ? 'bg-gray-400' : 'bg-primary-500', className)}
        disabled={loading || disabled}
        ref={ref}
        {...otherProps}
      >
        {children}
      </button>
    )
  }
)
ButtonWrapper.displayName = 'ButtonWrapper'

export { ButtonWrapper }
