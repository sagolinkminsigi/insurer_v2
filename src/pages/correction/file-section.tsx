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
import { IconModal } from '@/components/ui/icon-modal'
import Check from '@/assets/check.svg?react'
import { useNavigate } from 'react-router-dom'
const TITLE = '손해사정에 필요한\n자료가 있다면 올려주세요'

export const FileSection = () => {
  const { files, setFiles } = useCorrectionContext()
  const navigate = useNavigate()
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <FormattedDiv className='typo-t1b py-5 text-center text-gray-900'>
          {TITLE}
        </FormattedDiv>

        <UploadPreview
          file={files}
          setFile={setFiles}
          maxFile={10}
          previewStyle='bg-primary-100 text-primary-200'
        />
      </div>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <IconModal
          icon={
            <Check width={56} height={56} className='m-auto text-primary-200' />
          }
          title='손해사정서에 이의 제기를 완료했어요'
          subtitle='내용을 검토한 후 연락드릴게요'
          className='w-full'
          footer={
            <Button
              className='w-full rounded-xl bg-primary-800 text-white'
              onClick={() => navigate('/home')}
            >
              확인
            </Button>
          }
        >
          <BottomSheet.ModalButton>보정서 작성 완료</BottomSheet.ModalButton>
        </IconModal>
      </BottomSheet>
    </>
  )
}
