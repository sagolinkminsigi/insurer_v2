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
      className={'typo-b1m w-full rounded-xl bg-white p-4 text-gray-800'}
      onClick={handleClick}
    >
      <div className='items center typo-[#212121] typo-b2sb flex w-full justify-between'>
        {props.title}
        <ChevronDown className={cn(isOpen ? 'rotate-180' : '')} />
      </div>
      {isOpen && (
        <FormattedDiv
          className={cn(
            isOpen ? 'h-fit' : '',
            'mt-3 overflow-scroll border-t border-t-gray-200 pt-3 text-[#676A71]'
          )}
        >
          {props.children}
        </FormattedDiv>
      )}
    </div>
  )
}
