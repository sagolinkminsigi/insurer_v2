import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import { FormattedDiv } from '@/components/formatted-div'
import { cn } from '@/lib/utils'

interface IconModalProps {
  title: string
  subtitle?: string
  disabled?: boolean
  className?: string
  children: ReactNode
  footer: ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  icon: ReactNode
}
const IconModal = ({ disabled, ...props }: IconModalProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger className={cn(props.className)} disabled={disabled}>
        {props.children}
      </DialogTrigger>
      <DialogContent className='w-[300px]'>
        <DialogTitle className='flex flex-col gap-3 text-center text-gray-900'>
          {props.icon}
          {props.title}
        </DialogTitle>
        {props.subtitle && (
          <DialogDescription className='typo-b2sb mt-2 text-center text-gray-600'>
            <FormattedDiv>{props.subtitle}</FormattedDiv>
          </DialogDescription>
        )}
        {props.footer && <div className='mt-4'>{props.footer}</div>}
      </DialogContent>
    </Dialog>
  )
}
interface ButtonWrapperProps {
  children: ReactNode
  className?: string
}
const BottomWrapper = ({ children, className }: ButtonWrapperProps) => {
  return <div className={cn('flex gap-2', className)}>{children}</div>
}

const CloseButton = ({ children, className }: ButtonWrapperProps) => {
  return <DialogClose className={className}>{children}</DialogClose>
}
IconModal.BottomWrapper = BottomWrapper
IconModal.CloseButton = CloseButton

export { IconModal }
