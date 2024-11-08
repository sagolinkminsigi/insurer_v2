import { BottomSheet } from '@/components/bottom-sheet'
import { useSubmitCertState } from '.'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { LabelInput } from '@/components/ui/label-input'

const TITLE = '담당자 이름을 알려주세요'
const NEXT_PAGE_INDEX = 5
export const ManagerSection = () => {
  const { manager, setManager, navigate } = useSubmitCertState()
  const handleClick = () => navigate(NEXT_PAGE_INDEX)
  const buttonDisabled = manager.length === 0
  const handleKeyDown = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && !buttonDisabled && navigate(NEXT_PAGE_INDEX)
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</div>
        <LabelInput
          value={manager}
          onChange={setManager}
          label='담당자 이름'
          inputStyle='w-full'
          className='w-full'
          deletable={true}
          autoFocus={true}
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
