import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import CheckIcon from '@/assets/check.svg?react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    isChecked: boolean
    onChangeCheck: React.Dispatch<React.SetStateAction<boolean>>
    iconStyle?: string
  }
>(({ className, iconStyle, isChecked, onChangeCheck, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'text-gray-300 data-[state=checked]:text-primary-600',
      'peer flex items-center gap-1',
      className
    )}
    data-state={isChecked ? 'checked' : 'unchecked'}
    onClick={() => onChangeCheck(!isChecked)}
    {...props}
  >
    <CheckIcon className={cn('h-4 w-4', iconStyle || '')} />
    <span
      className={cn('typo-c1m', isChecked ? 'text-gray-600' : 'text-gray-500')}
    >
      {props.children}
    </span>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName
export { Checkbox }
