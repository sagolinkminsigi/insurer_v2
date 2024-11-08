import { Button, ButtonProps } from '@/components/ui/button'

import { BottomSheet } from '@/components/bottom-sheet'
import { AccidentsWrapper } from './accident-wrapper'
import Minus from '@/assets/minus_inner.svg?react'
import Plus from '@/assets/plus_inner.svg?react'
import { useState } from 'react'
import { useAccidentsState } from '.'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'
import {
  PeriodCarousel,
  PeriodCarouselContent,
  PeriodCarouselItem,
} from './period-carousel'
import Outpatient from '@/assets/outpatient.svg'
import InPatient from '@/assets/inpatient.svg'

import { RadioCheckbox } from '@/components/ui/radio-checkbox'
const TITLE = '치료받은 기간을 알려주세요'
const NEXT_PAGE = '/compensation_entrance'
const MAXIMUM_PERIOD = 91
const INPATIENT_DEFAULT_INDEX = 1
export default function PeriodSection() {
  const { period, setPeriod } = useAccidentsState()
  const navigate = useNavigate()
  const [inPatient, setInPatient] = useState(period?.[0] || 0)
  const [outPatient, setOutPatient] = useState(period?.[1] || 0)

  const handleClick = () => {
    setPeriod([inPatient, outPatient])
    navigate(NEXT_PAGE)
  }

  /**
   *
   */
  const [isHospitalized, setIsHospitalized] = useState(false)

  return (
    <>
      <h2 className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</h2>
      <AccidentsWrapper className='relative flex flex-col place-content-center bg-white'>
        <div className='relative flex flex-1 flex-col'>
          <div className='relative flex flex-1 items-center'>
            <div className='absolute left-1/2 top-1/2 h-[140px] w-[100px] -translate-x-1/2 -translate-y-1/2 justify-items-center rounded-2xl bg-yellow-200 py-[20.5px]'>
              <img src={Outpatient} width={24} height={24} />
              <div className='typo-st1sb text-yellow-700'>통원 치료</div>
            </div>
            <PeriodCarousel
              className='w-full'
              onPageChange={(v) => setOutPatient(v)}
              startIndex={INPATIENT_DEFAULT_INDEX}
            >
              <PeriodCarouselContent>
                {Array.from({ length: MAXIMUM_PERIOD }, (_, index) => (
                  <PeriodCarouselItem
                    className={cn(
                      index === 0 ? 'ml-[calc(50%-50px)]' : '',
                      MAXIMUM_PERIOD - 1 === index ? 'mr-[calc(50%-50px)]' : ''
                    )}
                    index={index}
                    key={index}
                    base={
                      <div className='typo-st1sb h-[140px] content-end pb-[20.5px] text-center text-gray-400'>
                        {index} 일
                      </div>
                    }
                    selected={
                      <div className='typo-t2b h-[140px] content-end pb-[20.5px] text-center text-primary-900'>
                        {index} 일
                      </div>
                    }
                  ></PeriodCarouselItem>
                ))}
              </PeriodCarouselContent>
            </PeriodCarousel>
          </div>
          <div className='relative flex flex-1 items-center rounded-b-[40px] bg-primary-50'>
            <div className='absolute left-1/2 top-1/2 h-[140px] w-[100px] -translate-x-1/2 -translate-y-1/2 justify-items-center rounded-2xl bg-primary-100 py-[20.5px]'>
              <img src={InPatient} width={24} height={24} />
              <div className='typo-st1sb text-primary-500'>입원 치료</div>
            </div>
            <PeriodCarousel
              onPageChange={(v) => setInPatient(v)}
              className='w-full'
            >
              <PeriodCarouselContent>
                {Array.from({ length: MAXIMUM_PERIOD }, (_, index) => (
                  <PeriodCarouselItem
                    className={cn(
                      index === 0 ? 'ml-[calc(50%-50px)]' : '',
                      MAXIMUM_PERIOD - 1 === index ? 'mr-[calc(50%-50px)]' : ''
                    )}
                    index={index}
                    key={index}
                    base={
                      <div className='typo-st1sb h-[140px] content-end pb-[20.5px] text-center text-gray-400'>
                        {index} 일
                      </div>
                    }
                    selected={
                      <div className='typo-t2b h-[140px] content-end pb-[20.5px] text-center text-primary-900'>
                        {index} 일
                      </div>
                    }
                  ></PeriodCarouselItem>
                ))}
              </PeriodCarouselContent>
            </PeriodCarousel>
          </div>
          <span className='typo-h2b absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 [writing-mode:vertical-lr]'>
            +
          </span>
        </div>

        <div className='h-[52px] content-center self-center'>
          <RadioCheckbox
            className={cn(
              isHospitalized ? 'text-primary-500' : 'text-gray-300'
            )}
            onClick={() => setIsHospitalized(!isHospitalized)}
          >
            <div className={isHospitalized ? '' : 'text-gray-500'}>
              현재 입원중
            </div>
          </RadioCheckbox>
        </div>
      </AccidentsWrapper>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.Button onClick={handleClick}>
          예상 보상금 확인하기
        </BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
