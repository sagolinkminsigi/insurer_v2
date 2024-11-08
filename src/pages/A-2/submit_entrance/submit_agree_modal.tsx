'use client'
import { Button } from '@/components/custom/button'
import { FormattedDiv } from '@/components/formatted-div'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'
import { BottomSheet } from '@/components/bottom-sheet'

// TODO: 이름 확정시 제거
const NAME = '김사고'
const NEXT_PAGE_INDEX = 3

interface SubmitAgreeModalProps {
  onAgreeChange: () => void
  disabled?: boolean
  triggerStyle?: string
}

export const SubmitAgreeModal = ({
  onAgreeChange,
  disabled,
  triggerStyle = '',
}: SubmitAgreeModalProps) => {
  const [total, setTotal] = useState(false)
  const [open, setOpen] = useState(false)
  const [sensitiveInfo, setSensitiveInfo] = useState(false)
  const [personal, setPersonal] = useState(false)
  useEffect(() => {
    setPersonal(total)
    setSensitiveInfo(total)
  }, [total])
  const allConcent = personal && sensitiveInfo
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-full '>
        <BottomSheet.ModalButton>다음</BottomSheet.ModalButton>
      </DialogTrigger>

      <DialogContent type='bottom'>
        <FormattedDiv className='typo-st1sb mb-6 text-left text-gray-900'>
          {`예상 보상금 조회를 위해\n${NAME}님의 동의가 필요해요`}
        </FormattedDiv>
        <Checkbox
          id='agreement-personal-info'
          isChecked={total}
          onChangeCheck={setTotal}
          iconStyle='w-6 h-6'
        >
          <div className='typo-b1m'>필수 약관에 모두 동의합니다.</div>
        </Checkbox>
        <div className='my-3 h-[1px] w-full bg-primary-50' />
        <div className='mb-11 flex flex-col gap-1'>
          <Checkbox
            id='agreement-personal-info'
            isChecked={sensitiveInfo}
            onChangeCheck={setSensitiveInfo}
          >
            [필수] 개인민감정보 처리 동의
          </Checkbox>
          <Checkbox
            id='agreement-personal-info'
            isChecked={personal}
            onChangeCheck={setPersonal}
          >
            [필수] 개인정보 수집 ･ 이용 및 제 3자 제공 동의
          </Checkbox>
        </div>

        <Button
          onClick={onAgreeChange}
          disabled={!allConcent}
          className={cn(
            allConcent ? 'bg-primary-500' : 'bg-gray-400',
            'typo-b1sb h-[53px] w-full content-center rounded-[14px] text-center text-white'
          )}
        >
          동의하기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
