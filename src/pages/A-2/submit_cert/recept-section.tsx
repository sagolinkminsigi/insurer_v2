import { BottomSheet } from '@/components/bottom-sheet'
import { useSubmitCertState } from '.'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { LabelInput } from '@/components/ui/label-input'

const TITLE = '보험 접수 번호를 알려주세요'
const NEXT_PAGE_INDEX = 4
export const ReceptSection = () => {
  const { recept, setRecept, navigate } = useSubmitCertState()
  const buttonDisabled = recept.length === 0
  const handleClick = () => navigate(NEXT_PAGE_INDEX)
  const handleKeyDown = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && !buttonDisabled && navigate(NEXT_PAGE_INDEX)
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</div>
        <LabelInput
          value={recept}
          onChange={setRecept}
          label='보험 접수번호'
          inputStyle='w-full'
          className='w-full'
          deletable={true}
          autoFocus={true}
          autoBlur={true}
          onKeydown={handleKeyDown}
        />
      </div>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.SquareButton
          onClick={handleClick}
          disabled={buttonDisabled}
        >
          다음
        </BottomSheet.SquareButton>
      </BottomSheet>
    </>
  )
}
