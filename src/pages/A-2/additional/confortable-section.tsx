import { Button } from '@/components/custom/button'
import { FormattedDiv } from '@/components/formatted-div'
import X from '@/assets/thick_x.svg'
import O from '@/assets/o.svg'
import { useAdditionalState } from '.'
import Timer from '@/assets/timer.svg?react'
import Coin from '@/assets/coin.svg?react'
import { OXSelector } from '@/components/ui/ox-selector'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
const MAIN_TITLE = '\n더욱 원하는 결과를 알려주세요'
const NEXT_PAGE_INDEX = 4

const options = [
  '오래 걸리더라도\n제대로 받을래요',
  '금액이 크지 않아도\n빨리 받을래요',
]

export const ComfortableSection = () => {
  const { comfortable, setComfortable, navigate } = useAdditionalState()

  return (
    <>
      <FormattedDiv className='typo-t1b py-6 text-center text-white'>
        {MAIN_TITLE}
      </FormattedDiv>
      <OXSelector value={comfortable} onSelectChange={setComfortable}>
        <OXSelector.ButtonWrapper
          option='no'
          pending='bg-primary-800 text-white'
          selected='bg-primary-600 text-white'
          excluded='bg-gray-200 text-gray-300'
        >
          <OXSelector.Div
            pending='mb-5 p-2.5 text-gray-500'
            selected='mb-5 p-2.5'
            excluded='mb-5 p-2.5 [filter:grayscale(1)_brightness(0.8)]'
          >
            <Coin width={50} height={50} />
          </OXSelector.Div>
          <FormattedDiv className='typo-t1b'>{'직접\n소통할래요'}</FormattedDiv>
          <OXSelector.Div
            pending='typo-b2sb text-primary-500'
            excluded='typo-b2sb text-gray-300'
            selected='typo-b2sb text-primary-300'
          >
            오래 걸려도 돼요
          </OXSelector.Div>
        </OXSelector.ButtonWrapper>
        <OXSelector.ButtonWrapper
          option='yes'
          pending='bg-primary-800 text-white'
          selected='bg-primary-600 text-white'
          excluded='bg-gray-200 text-gray-300'
        >
          <OXSelector.Div
            pending='rounded-2xl p-2.5 text-positive-200 mb-5'
            selected='text-positive-300 mb-5 p-2.5'
            excluded='text-gray-300 mb-5 p-2.5 [filter:grayscale(1)]'
          >
            <Timer width={50} height={50} />
          </OXSelector.Div>
          <FormattedDiv className='typo-t1b'>
            {'알아서\n해결해주세요'}
          </FormattedDiv>
          <OXSelector.Div
            pending='typo-b2sb text-primary-500'
            excluded='typo-b2sb text-gray-300'
            selected='typo-b2sb text-primary-300'
          >
            금액이 크지 않아도 돼요
          </OXSelector.Div>
        </OXSelector.ButtonWrapper>
      </OXSelector>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.Button
          disabled={comfortable === undefined}
          onClick={() => navigate(NEXT_PAGE_INDEX)}
        >
          선택완료
        </BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
