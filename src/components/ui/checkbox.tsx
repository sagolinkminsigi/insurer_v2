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
    title?: string
    titleStyle?: string
  }
>(({ className, iconStyle, isChecked, onChangeCheck, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'text-gray-300 data-[state=checked]:text-primary-600',
      'peer flex flex-col',
      className
    )}
    data-state={isChecked ? 'checked' : 'unchecked'}
    onClick={() => onChangeCheck(!isChecked)}
    {...props}
  >
    <div className={cn('flex items-center gap-1', props.titleStyle)}>
      <CheckIcon className={cn('h-4 w-4', iconStyle || '')} />
      <span className={cn(isChecked ? 'text-gray-600' : 'text-gray-500')}>
        {props.title}
      </span>
    </div>
    {props.children}
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName
export { Checkbox }
