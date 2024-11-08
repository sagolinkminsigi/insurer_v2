import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'
import CheckIcon from '@/assets/check.svg?react'
import { cn } from '@/lib/utils'

interface ContractDropdownProps {
  isOpen: boolean
  onClick: () => void
  children: ReactNode
  title: string
  isChecked: boolean
  onCheckChange: () => void
}
export const ContractDropdown = (props: ContractDropdownProps) => {
  return (
    <div className={'typo-b1m w-full rounded-xl bg-white p-4 text-gray-800'}>
      <div className='items center flex w-full justify-between'>
        <div className='flex items-center gap-1' onClick={props.onCheckChange}>
          <CheckIcon
            className={cn(
              'h-6 w-6',
              props.isChecked ? 'text-primary-500' : 'text-gray-300'
            )}
          />
          {props.title}
        </div>
        <ChevronDown
          onClick={props.onClick}
          className={cn(props.isOpen ? 'rotate-180' : '')}
        />
      </div>
      {props.isOpen && (
        <div
          className={cn(
            props.isOpen ? 'h-[calc(100dvh-490px)]' : '',
            'mt-3 overflow-scroll border-t border-t-gray-200 pt-3'
          )}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}
