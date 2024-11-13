import { ButtonWrapper } from '@/components/button-wrapper'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

const history = [
  '2024년 10월 20일 _ 보정 요청',
  '2024년 10월 17일 _ 손해사정서 접수',
]
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
export const RequestBlock = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='flex flex-col gap-4 rounded-xl bg-white p-4'>
      <div className='flex items-center justify-between gap-[19px]'>
        <div>
          <div className='typo-b1sb mb-1 text-gray-800'>보정 요청</div>
          <div className='typo-c1m mb-2 text-gray-900'>
            내용을 검토중이에요. 확인 후 상황에 따라 손해사정서를 다시 보내드릴
            수도 있어요.
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
        <div className='flex flex-col gap-4'>
          <div className='rounded-[12px] bg-gray-200 p-4'>
            <div className='typo-b2sb text-gray-300'>사고링크 손해사정</div>
            <div className='typo-b1sb flex w-full justify-between'>
              <div className='text-gray-400'>최종 손해사정 금액</div>
              <div className='text-gray-400'>1,303,000원</div>
            </div>
          </div>
          <div>
            <div className='typo-b1sb flex w-full justify-between'>
              <div className='text-primary-700'>보정요청 손해사정 금액</div>
              <div className='text-primary-700'>1,300,000원</div>
            </div>
            <div className='typo-c1m flex w-full items-center justify-between'>
              <div className='text-gray-500'>2024년 10월 20일 _ 보정 요청</div>
              <ButtonWrapper className='typo-c1m h-8 rounded-[10px] border border-gray-600 bg-gray-100 px-1.5 text-gray-900'>
                자세히 보기
              </ButtonWrapper>
            </div>
          </div>
          {TEMPLATE.map((v, index) => (
            <Fragment key={index}>
              {index !== 0 && <hr className='border-t-1 border-gray-200' />}
              <div className='flex flex-col gap-1'>
                <div className='typo-b2sb flex justify-between'>
                  <div className='text-primary-900'>{v.name}</div>
                  <div className='text-primary-900'>
                    {v.price.toLocaleString()}원
                  </div>
                </div>
                <div className='typo-b2sb flex justify-between'>
                  <div
                    className={
                      v.updatePrice.length > 0
                        ? 'text-pink-300'
                        : 'text-gray-400'
                    }
                  >
                    보정요청
                  </div>
                  <div
                    className={
                      v.updatePrice.length > 0
                        ? 'text-pink-300'
                        : 'text-gray-400'
                    }
                  >
                    {v.updatePrice.length === 0
                      ? '없음'
                      : Number(v.updatePrice).toLocaleString() + '원'}
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
