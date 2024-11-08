import { Button } from '@/components/custom/button'
import { FormattedDiv } from '@/components/formatted-div'
import X from '@/assets/thick_x.svg?react'
import O from '@/assets/o.svg?react'
import { useAdditionalState } from '.'
import { OXSelector } from '@/components/ui/ox-selector'
import { useState } from 'react'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
const MAIN_TITLE = '\n경찰에 접수했나요?'
const NEXT_PAGE_INDEX = 2
export const PoliceSection = () => {
  const { police, setPolice, navigate } = useAdditionalState()
  return (
    <>
      <FormattedDiv className='typo-t1b py-6 text-center text-white'>
        {MAIN_TITLE}
      </FormattedDiv>
      <OXSelector value={police} onSelectChange={setPolice}>
        <OXSelector.ButtonWrapper
          option='no'
          pending='bg-negative-100 text-negative-300'
          selected='bg-negative-200 text-negative-300'
          excluded='bg-gray-200 text-gray-300'
        >
          <OXSelector.Div
            pending='text-negative-200 mb-10'
            selected='text-negative-300 mb-10'
            excluded='text-gray-300 mb-10'
          >
            <X width={70} height={70} />
          </OXSelector.Div>
          <div className='typo-t1b'>아니오</div>
        </OXSelector.ButtonWrapper>
        <OXSelector.ButtonWrapper
          option='yes'
          pending='bg-positive-100 text-positive-300 '
          selected='bg-positive-200 text-positive-300'
          excluded='bg-gray-200 text-gray-300'
        >
          <OXSelector.Div
            pending='text-positive-200 mb-10'
            selected='text-positive-300 mb-10'
            excluded='text-gray-300 mb-10'
          >
            <O width={70} height={70} />
          </OXSelector.Div>
          <div className='typo-t1b'>네</div>
        </OXSelector.ButtonWrapper>
      </OXSelector>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.Button
          disabled={police === undefined}
          onClick={() => navigate(NEXT_PAGE_INDEX)}
        >
          선택완료
        </BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
