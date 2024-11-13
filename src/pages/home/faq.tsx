import { ChevronDown } from 'lucide-react'
import { ReactNode, useState } from 'react'
import CheckIcon from '@/assets/check.svg?react'
import { cn } from '@/lib/utils'
import { FormattedDiv } from '@/components/formatted-div'

interface ContractDropdownProps {
  // isOpen: boolean
  // onClick: () => void
  children: ReactNode
  title: string
  // isChecked: boolean
  // onCheckChange: () => void
}
export const FAQDropdown = (props: ContractDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div
      className={'typo-b2sb w-full rounded-xl bg-white '}
      onClick={handleClick}
    >
      <div className='items center flex w-full justify-between px-[20px] py-6 text-gray-900'>
        {props.title}
        <ChevronDown className={cn(isOpen ? 'rotate-180' : '')} />
      </div>
      {isOpen && (
        <FormattedDiv
          className={cn(
            isOpen ? 'h-fit' : '',
            'overflow-scroll border-t border-t-gray-200 bg-primary-50 px-[20px] pb-[20px] pt-[10px] text-gray-600'
          )}
        >
          {props.children}
        </FormattedDiv>
      )}
    </div>
  )
}
