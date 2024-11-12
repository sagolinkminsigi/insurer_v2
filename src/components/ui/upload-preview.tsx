import { cn } from '@/lib/utils'
import X from '@/assets/x.svg?react'
import XOuter from '@/assets/x_outer.svg?react'
import Plus from '@/assets/plus_inner.svg?react'
import { ChangeEvent, Dispatch, useState } from 'react'
type FilePreview = {
  type: 'image' | 'pdf'
  url: string
}

interface UploadPreviewProps {
  file: File[]
  setFile: Dispatch<React.SetStateAction<File[]>>
  maxFile?: number
  totalFileSize?: number
}
export const UploadPreview = ({
  file,
  setFile,
  maxFile = 20,
  totalFileSize = 50,
}: UploadPreviewProps) => {
  const [previews, setPreviews] = useState<FilePreview[]>([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])

    if (selectedFiles.length + file.length > maxFile) return
    const totalSizeMB = [...file, ...selectedFiles].reduce(
      (acc, file) => acc + file.size / (1024 * 1024),
      0
    )

    if (totalSizeMB > totalFileSize) return
    //    setErrorMessage(
    //     `파일 총 용량은 최대 ${MAX_SIZE_MB}MB를 초과할 수 없습니다.`
    //   )

    setFile((prevFiles) => [...prevFiles, ...selectedFiles])

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
    setFile((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    setPreviews((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }
  return (
    <div className='w-full'>
      <div className='typo-c1m py-1 text-right text-gray-400'>{`${previews.length}/${maxFile}`}</div>
      <div className='flex flex-wrap gap-3.5 self-start'>
        <label
          htmlFor='file-upload'
          className={cn(
            file.length === maxFile ? 'bg-primary-200' : 'bg-primary-700',
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
              className='absolute right-1.5 top-1.5 text-gray-700'
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
  )
}
