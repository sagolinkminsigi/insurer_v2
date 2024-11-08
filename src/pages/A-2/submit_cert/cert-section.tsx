import { ChangeEvent, Fragment, useState } from 'react'
import { useSubmitCertState } from '.'
import Plus from '@/assets/plus_inner.svg?react'
import { FormattedDiv } from '@/components/formatted-div'
import { BottomSheet } from '@/components/bottom-sheet'
import X from '@/assets/x.svg?react'
import XOuter from '@/assets/x_outer.svg?react'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import { ButtonWrapper } from '@/components/button-wrapper'
const TITLE = '가장 최근 진단서를 제출해주세요'
const SUBTITLE = '*진단서 발급 영수증은 보관 후 보험사에 청구해주세요!'
const MODAL_TEXT =
  '동승자가 있는 경우,\n동승자 진단서도 업로드하거나 별도로 신청해주세요.'

const MAX_FILES = 20
const MAX_SIZE_MB = 50

type FilePreview = {
  type: 'image' | 'pdf'
  url: string
}
const NEXT_PAGE_INDEX = 1
export const CertSection = () => {
  const { certs, setCerts, navigate } = useSubmitCertState()
  const [isOpen, setIsOpen] = useState(true)

  const [previews, setPreviews] = useState<FilePreview[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])

    if (selectedFiles.length + certs.length > MAX_FILES)
      return setErrorMessage(`최대 ${MAX_FILES}개의 파일만 업로드 가능합니다.`)

    const totalSizeMB = [...certs, ...selectedFiles].reduce(
      (acc, file) => acc + file.size / (1024 * 1024),
      0
    )

    if (totalSizeMB > MAX_SIZE_MB)
      return setErrorMessage(
        `파일 총 용량은 최대 ${MAX_SIZE_MB}MB를 초과할 수 없습니다.`
      )

    setErrorMessage('')

    setCerts((prevFiles) => [...prevFiles, ...selectedFiles])

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
    setCerts((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    setPreviews((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }
  const handleNavigate = () => navigate(NEXT_PAGE_INDEX)

  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>
          {TITLE}
          <div className='typo-c1m pt-1 text-primary-500'>{SUBTITLE}</div>
        </div>
        <div className='typo-c1m ml-auto py-1 text-gray-400'>
          {certs.length}/{MAX_FILES}
        </div>
        <div className='flex flex-wrap gap-3.5 self-start'>
          <label
            htmlFor='file-upload'
            className={cn(
              certs.length === MAX_FILES ? 'bg-primary-200' : 'bg-primary-700',
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
        {isOpen && (
          <BottomSheet.Alert className='text-700 typo-c1m mb-3 flex place-content-between items-center rounded-[10px] bg-gray-700 text-white'>
            <FormattedDiv>{MODAL_TEXT}</FormattedDiv>
            <X width={24} height={24} onClick={() => setIsOpen(false)} />
          </BottomSheet.Alert>
        )}
        <BottomSheet.Button
          disabled={certs.length === 0}
          onClick={handleNavigate}
        >
          다음
        </BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
