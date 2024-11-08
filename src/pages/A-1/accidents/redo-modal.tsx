import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import Exclamation from '@/assets/exclamation.svg?react'
import { useState } from 'react'
import X from '@/assets/x.svg?react'
import { useNavigate } from 'react-router-dom'
const TITLE = '예상 보상금 조회를 그만두시겠어요?'
export const RedoModal = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='mr-auto text-gray-600'>
        <X width={24} height={24} />
      </DialogTrigger>
      <DialogContent className='w-[300px]'>
        <DialogTitle className='mb-4 flex flex-col gap-3 text-center text-gray-900'>
          <Exclamation width={56} height={56} className='m-auto' />
          {TITLE}
        </DialogTitle>
        <DialogDescription className='flex w-full gap-2'>
          <Button
            className='w-full bg-gray-300 text-gray-900'
            onClick={handleClose}
          >
            계속 입력하기
          </Button>
          <Button
            className='w-full bg-gray-900 text-white'
            onClick={() => navigate('/home')}
          >
            나가기
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
