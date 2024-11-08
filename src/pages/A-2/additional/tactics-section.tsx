import { Button } from '@/components/custom/button'
import { FormattedDiv } from '@/components/formatted-div'
import { useAdditionalState } from '.'
import { cn } from '@/lib/utils'
import { OXSelector } from '@/components/ui/ox-selector'
import { BottomSheet } from '@/components/bottom-sheet'
import Talk from '@/assets/talk.svg?react'
import App from '@/assets/app.svg?react'
const MAIN_TITLE = '보험 담당자와 소통은\n어떤 게 편하신가요?'

const NEXT_PAGE_INDEX = 3

export const TaticsSection = () => {
  const { tactics, setTactics, navigate } = useAdditionalState()
  // const selectedIndex = options.findIndex(
  //   (currentOption) => currentOption === tactics
  // )
  // const handleTactics = (v: string) => {
  //   if (v === tactics) navigate(NEXT_PAGE_INDEX)
  //   setTactics(v)
  // }
  return (
    <>
      <FormattedDiv className='typo-t1b py-6 text-center text-white'>
        {MAIN_TITLE}
      </FormattedDiv>
      <div className='flex w-full gap-3'>
        <OXSelector value={tactics} onSelectChange={setTactics}>
          <OXSelector.ButtonWrapper
            option='no'
            pending='bg-primary-800 text-white'
            selected='bg-primary-600 text-white'
            excluded='bg-gray-200 text-gray-300'
          >
            <OXSelector.Div
              pending='bg-white mb-5 rounded-2xl p-2.5 text-gray-500'
              selected='mb-5 rounded-2xl p-2.5'
              excluded='mb-5 p-2.5'
            >
              <Talk width={50} height={50} />
            </OXSelector.Div>
            <FormattedDiv className='typo-t1b'>
              {'직접\n소통할래요'}
            </FormattedDiv>
          </OXSelector.ButtonWrapper>
          <OXSelector.ButtonWrapper
            option='yes'
            pending='bg-primary-400 text-white'
            selected='bg-primary-600 text-white'
            excluded='bg-gray-200 text-gray-300'
          >
            <OXSelector.Div
              pending='rounded-2xl p-2.5 bg-white text-positive-200 mb-5'
              selected='text-positive-300 mb-5 p-2.5 [filter:brightness(0)_invert(1)]'
              excluded='text-gray-300 mb-5 p-2.5 [filter:brightness(0)_invert(0.9)]'
            >
              <App width={50} height={50} />
            </OXSelector.Div>
            <FormattedDiv className='typo-t1b'>
              {'알아서\n해결해주세요'}
            </FormattedDiv>
          </OXSelector.ButtonWrapper>
        </OXSelector>
      </div>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.Button
          disabled={tactics === undefined}
          onClick={() => navigate(NEXT_PAGE_INDEX)}
        >
          선택완료
        </BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
