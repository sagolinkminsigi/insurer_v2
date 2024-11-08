import { FormattedDiv } from '@/components/formatted-div'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useSubmitCertState } from '.'
const insurances = [
  {
    name: '삼성화재',
    src: '/src/assets/samsung.svg',
  },
  {
    name: '현대해상',
    src: '/src/assets/hyundai.svg',
  },
  {
    name: 'DB손해보험',
    src: '/src/assets/db.svg',
  },
  {
    name: 'KB손해보험',
    src: '/src/assets/kb.svg',
  },
  {
    name: '메리츠화재',
    src: '/src/assets/meritz.svg',
  },
  {
    name: 'AXA손해보험',
    src: '/src/assets/axa.svg',
  },
  {
    name: '한화손해보험',
    src: '/src/assets/hanwha.svg',
  },
  {
    name: '롯데손해보험',
    src: '/src/assets/lotte.svg',
  },
  {
    name: '흥국화재',
    src: '/src/assets/heunggook.svg',
  },
  {
    name: '하나손해보험',
    src: '/src/assets/hana.svg',
  },
  {
    name: '캐롯손해보험',
    src: '/src/assets/carrot.svg',
  },
  {
    name: 'MG손해보험',
    src: '/src/assets/mg.svg',
  },
  {
    name: '전국택시\n공제조합',
    src: '/src/assets/kotma.svg',
  },
  {
    name: '전국버스\n공제조합',
    src: '/src/assets/co_bus.svg',
  },
  {
    name: '전국화물\n공제조합',
    src: '/src/assets/co_truck.svg',
  },
  {
    name: '전국개인택시\n공제조합',
    src: '/src/assets/co_taxi.svg',
  },
  {
    name: '전국렌터카\n공제조합',
    src: '/src/assets/co_rent_car.svg',
  },
  {
    name: '전국전세버스\n공제조합',
    src: '/src/assets/co_rent_bus.svg',
  },
  {
    name: '기타',
    src: '/src/assets/kt.svg',
  },
]

const TITLE = '상대 보험사를 선택해주세요'
const NEXT_PAGE_INDEX = 3
const NAVIGATION_DELAY = 500
export const InsuranceSection = () => {
  const { insurance, setInsurance, navigate } = useSubmitCertState()
  const selectedInsurance = insurances.findIndex(
    ({ name }) => name === insurance
  )
  const handleInsurance = (updatedInsurance: string) => {
    setInsurance(updatedInsurance)
    setTimeout(() => navigate(NEXT_PAGE_INDEX), NAVIGATION_DELAY)
  }
  return (
    <div className='flex select-none flex-col items-center'>
      <div className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</div>
      <div className='flex flex-wrap'>
        {insurances.map((insurance, index) => (
          <div
            className='flex basis-1/3 flex-col items-center gap-1 pb-[14px] mw:basis-1/4'
            key={insurance.name}
            onClick={() => handleInsurance(insurance.name)}
          >
            <div
              className={cn(
                selectedInsurance === index
                  ? 'bg-primary100 border border-primary-800'
                  : 'bg-white',
                'flex h-[100px] w-[100px] items-center justify-center rounded-[20px]'
              )}
            >
              <img src={insurance.src} className='object-contain' />
            </div>
            <FormattedDiv className='text-center text-gray-900'>
              {insurance.name}
            </FormattedDiv>
          </div>
        ))}
      </div>
    </div>
  )
}
