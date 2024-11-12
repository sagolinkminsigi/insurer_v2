import { ButtonWrapper } from '@/components/button-wrapper'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const history = ['2024년 10월 25일 _ 손해사정서 접수']

export const EndBlock = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-4'>
      <div className='flex items-center justify-between gap-[19px]'>
        <div>
          <div className='typo-b1sb mb-1 text-gray-900'>손해사정 종결</div>

          <div>
            {history.map((v) => (
              <div key={v} className='typo-c1m text-gray-500'>
                {v}
              </div>
            ))}
          </div>
        </div>
        <ChevronDown
          className={cn(
            'min-h-6 min-w-6 text-gray-500',
            isOpen ? 'rotate-180' : ''
          )}
          width={24}
          height={24}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className='flex flex-col gap-4'>
          <div className='rounded-[12px] bg-primary-100 p-4'>
            <div className='typo-b2sb text-primary-300'>사고링크 손해사정</div>
            <div className='typo-b1sb mb-4 flex w-full justify-between'>
              <div className='text-primary-700'>최종 손해사정 금액</div>
              <div className='text-primary-700'>1,303,000원</div>
            </div>
            <ButtonWrapper className='typo-b2sb h-[42px] w-full rounded-[14px] bg-primary-500 text-white'>
              손해사정서 확인하기
            </ButtonWrapper>
          </div>
        </div>
      )}
    </div>
  )
}
