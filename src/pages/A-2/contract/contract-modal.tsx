import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ContractCanvas } from './contract-canvas'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'
// TODO: 나중에 삭제
const NAME = '김사고'

interface ContractModalProps {
  disabled?: boolean
}
export const ContractModal = (props: ContractModalProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(Layout.styles.body.maxwidth, 'w-full px-4 pb-8')}
        disabled={props.disabled}
      >
        <div
          className={cn(
            props.disabled ? 'bg-gray-300' : 'bg-primary-500',
            'typo-b1sb h-[53px] w-full content-center rounded-[50px] text-white'
          )}
        >
          동의했어요
        </div>
      </DialogTrigger>
      <DialogContent type='bottom'>
        <h2 className='typo-st1sb text-left text-gray-900'>
          {NAME}님 동의서에 서명해주세요
        </h2>
        <ContractCanvas />
      </DialogContent>
    </Dialog>
  )
}
