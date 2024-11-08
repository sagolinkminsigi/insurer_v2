import { FormattedDiv } from '@/components/formatted-div'
import { useAdditionalState } from '.'
import { TextArea } from '@/components/ui/textarea'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { ButtonWrapper } from '@/components/button-wrapper'
import { Layout } from '@/components/custom/layout'
const MAIN_TITLE = '보상금액과 관련하여\n고려되었으면 하는 내용이 있나요?'
const MAX_LENGTH = 1000
const PLACE_HODLER =
  '일 못한 손해, 앞으로 치료받을 내용 등 사고로 인한 피해 정보를 구체적으로 알려주세요'
const NEXT_PAGE_INDEX = 5
export const ExtraSection = () => {
  const { extra, setExtra, navigate } = useAdditionalState()
  const handleClick = () => navigate(NEXT_PAGE_INDEX)
  return (
    <>
      <FormattedDiv className='typo-t1b py-6 text-center text-gray-900'>
        {MAIN_TITLE}
      </FormattedDiv>
      <div className='flex w-full gap-3 text-gray-900'>
        <TextArea
          size={'l'}
          value={extra}
          max={MAX_LENGTH}
          placeholder={PLACE_HODLER}
          onChange={setExtra}
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
            disabled={extra.length === 0}
            className='h-[53px] w-[64%] rounded-[50px] py-2.5 text-white'
          >
            작성 완료
          </ButtonWrapper>
        </div>
      </BottomSheet>
    </>
  )
}
