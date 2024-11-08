'use client'

import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownProps<T> {
  options: T[]
  defaultValue?: T
  onChange?: (value: T) => void
  value: T
  buttonStyle?: string
  wrapperStyle?: string
}

interface DropdownButtonProps {
  children?: React.ReactNode
}

export function Dropdown<T>(props: DropdownProps<T>) {
  const $selectedRef = React.useRef<HTMLDivElement>(null)
  const handleValueChange = (updatedValue: T) => {
    props.onChange && props.onChange(updatedValue)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownButton className={props?.buttonStyle || ''}>
          {`${props.value}`}
        </DropdownButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='flex h-44 w-[var(--radix-popper-anchor-width)] flex-col gap-3 overflow-y-scroll bg-white p-3'>
        <DropdownMenuRadioGroup
          value={`${props.value}`}
          onValueChange={handleValueChange as (value: string) => void}
        >
          {props.options.map((option) => (
            <DropdownMenuRadioItem
              ref={props.value === option ? $selectedRef : null}
              value={`${option}`}
              key={`${option}`}
              className='typo-st1sb text-gray-400 aria-checked:text-primary-400'
            >
              {`${option}`}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {}

export const DropdownButton = React.forwardRef<
  HTMLDivElement,
  DropdownButtonProps
>(({ className = '', ...props }, ref) => {
  return (
    <div
      className={cn(
        `typo-st1sb group flex items-center justify-between gap-3 rounded-xl border border-primary-100 bg-white px-3 py-[7.5px]`,
        className
      )}
      ref={ref}
      {...props}
    >
      <div className='overflow-hidden whitespace-nowrap'>{props.children}</div>
      <ChevronDown className="h-6 w-6 text-primary-200 group-data-[state='open']:rotate-180" />
      {/* <Arrow dir={"down"} className="group-data-[state='open']:rotate-180" /> */}
    </div>
  )
})
