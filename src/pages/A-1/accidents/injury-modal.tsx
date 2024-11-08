'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { HTMLAttributes } from 'react'
import Plus from '@/assets/plus.svg?react'
import { cn } from '@/lib/utils'
interface InjuryModalProps extends HTMLAttributes<HTMLDialogElement> {
  details: string[]
  name: string
  toggleInjuries: (injury: string) => void
  selectedInjuries: string[]
}
export const InjuryModal = ({
  details,
  name,
  className,
  toggleInjuries,
  selectedInjuries,
}: InjuryModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={`absolute text-primary-800 ${className ? className : ''}`}
      >
        <Plus className='h-[var(--assets-size)] w-[var(--assets-size)]' />
      </DialogTrigger>
      <DialogContent type='bottom'>
        <DialogHeader>
          <DialogTitle className='py-6'>
            <h2 className='typo-st1sb text-center text-gray-900'>
              <span className='text-primary-600'>{name}</span>의 진단명을
              알려주세요!
            </h2>
          </DialogTitle>
          <DialogDescription>
            <div className='grid grid-cols-2 gap-2'>
              {details.map((detail) => (
                <div
                  className={cn(
                    selectedInjuries.includes(`${name}:${detail}`)
                      ? 'border-primary-500 bg-primary-100 text-primary-500'
                      : 'border-gray-200',
                    'h-10 w-auto content-center rounded-xl border text-center'
                  )}
                  key={detail}
                  onClick={() => toggleInjuries(`${name}:${detail}`)}
                >
                  {detail}
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
