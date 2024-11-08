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
import { useIdentificationState } from '.'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'

// TODO: 이름 확정시 제거
const NAME = '김사고'
const NEXT_PAGE_INDEX = 3

interface AgreementModalProps {
  onStateChange: (v: string) => void
}

export const AgreementModal = ({ onStateChange }: AgreementModalProps) => {
  const { handleSendOtp } = useIdentificationState()
  const [total, setTotal] = useState(false)
  const [personal, setPersonal] = useState(false)
  const [unique, setUnique] = useState(false)
  const [third, setThird] = useState(false)
  const [service, setService] = useState(false)
  const [carrier, setCarrier] = useState(false)
  const [open, setOpen] = useState(false)
  const { navigate } = useIdentificationState()
  const [isClicked, setIsClicked] = useState(false)
  useEffect(() => {
    setPersonal(total)
    setUnique(total)
    setThird(total)
    setService(total)
    setCarrier(total)
  }, [total])
  const allConcent = personal && unique && third && service && carrier

  const handleClick = async () => {
    if (isClicked) return
    setIsClicked(true)
    try {
      await handleSendOtp()
      navigate(NEXT_PAGE_INDEX)
    } catch (e) {
      setOpen(false)
      if (!(e instanceof Error)) return console.error(e)
      onStateChange(e.message)
      setIsClicked(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-full'>
        <BottomSheet.ModalButton>네, 맞아요</BottomSheet.ModalButton>
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
            isChecked={personal}
            onChangeCheck={setPersonal}
          >
            [필수] 개인정보 수집 및 이용 동의
          </Checkbox>

          <Checkbox
            id='agreement-unique-id-info'
            isChecked={unique}
            onChangeCheck={setUnique}
          >
            [필수] 고유식별정보 처리 동의
          </Checkbox>

          <Checkbox
            id='agreement-third-party-info'
            isChecked={third}
            onChangeCheck={setThird}
          >
            [필수] 제3자 정보제공 동의
          </Checkbox>

          <Checkbox
            id='agreement-terms-of-service'
            isChecked={service}
            onChangeCheck={setService}
          >
            [필수] 서비스 이용약관
          </Checkbox>
          <Checkbox
            id='agreement-carrier-terms'
            isChecked={carrier}
            onChangeCheck={setCarrier}
          >
            [필수] 통신사 이용약관
          </Checkbox>
        </div>

        <Button
          onClick={handleClick}
          disabled={!allConcent}
          className={cn(
            !allConcent ? 'bg-gray-400' : 'bg-primary-500',
            'typo-b1sb h-[48px] w-full content-center rounded-[14px] text-center text-white'
          )}
        >
          인증번호 받기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
