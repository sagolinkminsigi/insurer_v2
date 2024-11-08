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
const TITLE = '로그아웃 하시겠습니까'
export const LogoutModal = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className='typo-b2sb text-gray-400'>로그아웃</div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className='mb-4 flex flex-col gap-3 text-center text-gray-900'>
          <Exclamation width={56} height={56} className='m-auto' />
          {TITLE}
        </DialogTitle>
        <DialogDescription className='flex w-full gap-2'>
          <Button
            className='w-full bg-gray-300 text-gray-900'
            onClick={handleClose}
          >
            이전으로
          </Button>
          <Button className='w-full bg-gray-900 text-white'>로그아웃</Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
