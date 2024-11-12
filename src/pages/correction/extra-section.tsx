import { ChangeEvent, Fragment, useState } from 'react'
import { useCorrectionContext } from '.'
import Plus from '@/assets/plus_inner.svg?react'
import { FormattedDiv } from '@/components/formatted-div'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import X from '@/assets/x.svg?react'
import XOuter from '@/assets/x_outer.svg?react'
import { cn } from '@/lib/utils'
import { UploadPreview } from '@/components/ui/upload-preview'
import { TextArea } from '@/components/ui/textarea'
const TITLE = '손해사정에 추가 의견이 있나요?'
const MAX_LENGTH = 1000
const PLACE_HODLER =
  '손해사정에 대한 추가 의견이 있다면 입력해주세요. 입력한 내용은 담당 손해사정사에게 전달됩니다.'
const NEXT_PAGE_INDEX = 2
export const ExtraSection = () => {
  const { extras, setExtras, navigate } = useCorrectionContext()
  const handleNavigate = () => navigate(NEXT_PAGE_INDEX)
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</div>
        <TextArea
          size={'l'}
          value={extras}
          max={MAX_LENGTH}
          placeholder={PLACE_HODLER}
          onChange={setExtras}
          textareaStyle='text-gray-900 h-[266px]'
          maxStyle='text-gray-400'
        />
      </div>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.Button onClick={handleNavigate}>다음</BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
