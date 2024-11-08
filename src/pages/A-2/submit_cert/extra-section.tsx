import { ChangeEvent, Fragment, useState } from 'react'
import { useSubmitCertState } from '.'
import Plus from '@/assets/plus_inner.svg?react'
import { FormattedDiv } from '@/components/formatted-div'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import X from '@/assets/x.svg?react'
import XOuter from '@/assets/x_outer.svg?react'
import { cn } from '@/lib/utils'
import { SubmitAgreeModal } from '../submit_entrance/submit_agree_modal'
const TITLE = '피해 자료를 더 제출해주셔도 돼요'
const SUBTITLE =
  '입/통원확인서, 초진기록지, 기타 의료기록 (MRI, CT 등),\n차량 파손사진, 휴업손해자료 등'
const MODAL_TEXT =
  '동승자가 있는 경우,\n동승자 진단서도 업로드하거나 별도로 신청해주세요.'

const MAX_FILES = 10
const MAX_SIZE_MB = 50

type FilePreview = {
  type: 'image' | 'pdf'
  url: string
}
const NEXT_PAGE_INDEX = 2
export const ExtraSection = () => {
  const { extras, setExtras, navigate } = useSubmitCertState()

  const [previews, setPreviews] = useState<FilePreview[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])

    if (selectedFiles.length + extras.length > MAX_FILES)
      return setErrorMessage(`최대 ${MAX_FILES}개의 파일만 업로드 가능합니다.`)

    const totalSizeMB = [...extras, ...selectedFiles].reduce(
      (acc, file) => acc + file.size / (1024 * 1024),
      0
    )

    if (totalSizeMB > MAX_SIZE_MB)
      return setErrorMessage(
        `파일 총 용량은 최대 ${MAX_SIZE_MB}MB를 초과할 수 없습니다.`
      )

    setErrorMessage('')

    setExtras((prevFiles) => [...prevFiles, ...selectedFiles])

    const updatedPreviews = selectedFiles.reduce<FilePreview[]>(
      (acc, cur) => [
        ...acc,
        {
          url: URL.createObjectURL(cur),
          type: cur.type.startsWith('image/') ? 'image' : 'pdf',
        },
      ],
      []
    )
    setPreviews((prevPreviews) => [...prevPreviews, ...updatedPreviews])
  }
  const handleRemoveFile = (index: number) => {
    setExtras((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    setPreviews((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }
  const handleNavigate = () => navigate(NEXT_PAGE_INDEX)
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>
          {TITLE}
          <FormattedDiv className='typo-c1m pt-1 text-primary-500'>
            {SUBTITLE}
          </FormattedDiv>
        </div>
        <div className='typo-c1m ml-auto py-1 text-gray-400'>
          {extras.length}/{MAX_FILES}
        </div>
        <div className='flex flex-wrap gap-3.5 self-start'>
          <label
            htmlFor='file-upload'
            className={cn(
              extras.length === MAX_FILES ? 'bg-primary-200' : 'bg-primary-700',
              'flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl'
            )}
          >
            <Plus className='h-6 w-6' />
            사진 올리기
          </label>
          <input
            type='file'
            id='file-upload'
            onChange={handleFileChange}
            className='hidden'
            accept='image/*,application/pdf'
          />
          {previews.map((preview, index) => (
            <div key={index} className='relative overflow-hidden rounded-2xl'>
              <XOuter
                width={24}
                height={24}
                onClick={() => handleRemoveFile(index)}
                className='absolute right-1.5 top-1.5'
              />

              {preview.type === 'image' ? (
                <img
                  src={preview.url}
                  alt='미리보기'
                  className='h-[100px] w-[100px]'
                />
              ) : (
                <iframe
                  src={preview.url}
                  title='PDF 미리보기'
                  className='pointer-events-none h-[100px] w-[100px] scale-110 overflow-hidden border-0'
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <SubmitAgreeModal
          onAgreeChange={handleNavigate}
          disabled={extras.length === 0}
          triggerStyle={extras.length === 0 ? 'bg-gray-400' : 'bg-primary-500'}
        />
      </BottomSheet>
    </>
  )
}
