import { ButtonWrapper } from '@/components/button-wrapper'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

const history = ['2024년 10월 20일 _ 보정 요청']
const TEMPLATE = [
  {
    name: '위자료',
    price: 300000,
    reason: '보정 요청 시 작성했던 내용이 들어갑니다.',
    updatePrice: '200000',
  },
  {
    name: '휴업손해액',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
  {
    name: '기타손해배상금',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
  {
    name: '향후치료비',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
  {
    name: '치료 비상계',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
]
export const FailBlock = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-4'>
      <div className='flex items-center justify-between gap-[19px]'>
        <div>
          <div className='typo-b1sb mb-1 text-negative-200'>
            손해사정서 확인 불가
          </div>
          <div className='typo-c1m mb-2 text-gray-900'>
            손해사정서가 접수된 지 10일이 지나 손해사정서 확인이 불가능해요.
            자세한 내용은 담당 손해사정사에게 문의해주세요.
          </div>
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
        <div className='rounded-[12px] bg-gray-200 p-4'>
          <div className='typo-b2sb text-gray-300'>사고링크 손해사정</div>
          <div className='typo-b1sb flex w-full justify-between'>
            <div className='text-gray-400'>최종 손해사정 금액</div>
            <div className='text-gray-400'>1,303,000원</div>
          </div>
        </div>
      )}
    </div>
  )
}
