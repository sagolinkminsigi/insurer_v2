import { BottomSheet } from '@/components/bottom-sheet'
import { useSubmitCertState } from '.'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { LabelInput } from '@/components/ui/label-input'

const TITLE = '담당자 연락처를 알려주세요'
export const PhoneSection = () => {
  const { phone, setPhone } = useSubmitCertState()
  const navigate = useNavigate()
  const buttonDisabled = phone.length === 0
  const handleClick = () => navigate('/additional')
  const handleKeyDown = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && !buttonDisabled && navigate('/additional')
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</div>
        <LabelInput
          value={phone}
          onChange={setPhone}
          label='담당자 연락처'
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
          사고링크에 맡기기
        </BottomSheet.SquareButton>
      </BottomSheet>
    </>
  )
}

// q
