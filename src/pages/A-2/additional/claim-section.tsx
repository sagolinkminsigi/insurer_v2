import { FormattedDiv } from '@/components/formatted-div'
import { useAdditionalState } from '.'
import { TextArea } from '@/components/ui/textarea'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { ButtonWrapper } from '@/components/button-wrapper'
import { Layout } from '@/components/custom/layout'
const MAIN_TITLE = '보험사 직원에게\n아쉬웠던 부분이 있나요?'
const MAX_LENGTH = 1000
const PLACE_HODLER =
  '보험사 직원에게 구체적으로 어떤 아쉬움이 있었는지 알려주세요'
export const ClaimSection = () => {
  const { claim, setClaim } = useAdditionalState()
  const navigate = useNavigate()
  const handleClick = () => navigate('/additional_success')
  return (
    <>
      <FormattedDiv className='typo-t1b py-6 text-center text-gray-900'>
        {MAIN_TITLE}
      </FormattedDiv>
      <div className='flex w-full gap-3 text-gray-900'>
        <TextArea
          size={'l'}
          value={claim}
          max={MAX_LENGTH}
          placeholder={PLACE_HODLER}
          onChange={setClaim}
        />
      </div>
      <BottomSheet className='mb-8 flex justify-center px-4'>
        <div
          className={cn(
            BottomSheet.styles.center,
            Layout.styles.body.maxwidth,
            'flex w-full flex-row gap-4'
          )}
        >
          <ButtonWrapper
            onClick={handleClick}
            className='h-[53px] w-[35%] text-nowrap rounded-[50px] bg-gray-900 px-2.5 py-2.5 text-white'
          >
            따로 없어요
          </ButtonWrapper>
          <ButtonWrapper
            onClick={handleClick}
            disabled={claim.length === 0}
            className='h-[53px] w-[64%] rounded-[50px] py-2.5 text-white'
          >
            작성 완료
          </ButtonWrapper>
        </div>
      </BottomSheet>
    </>
  )
}
