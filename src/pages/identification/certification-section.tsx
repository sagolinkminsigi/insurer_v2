import { FormattedDiv } from '@/components/formatted-div'
import { useEffect, useRef, useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useIdentificationState } from '.'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { apiIdentification, IdentificationMessage } from '@/apis/identification'
import { Button } from '@/components/custom/button'
import { format } from '@/lib/format'
// import { Alert } from '../accidents/accident-alert'
import { cn } from '@/lib/utils'
import { IdentityVerificationMethod } from '@/types/identification'
import { BottomSheet } from '@/components/bottom-sheet'
const TITLE = '문자로 전송된\n인증번호 6자리를 입력해주세요'

const TIME_LIMIT = 7 * 60 * 1000
const TIME_LIMIT_UPDATE_PERIOD = 500
const NEXT_PAGE_INDEX = 3
export const CertificationSection = () => {
  const [value, setValue] = useState('')
  const { navigate, indentificatedTime } = useIdentificationState()
  const [remainingTime, setRemainingTime] = useState(TIME_LIMIT)
  const [error, setError] = useState('')
  const handleChange = async (value: string) => {
    if (remainingTime === 0) return
    try {
      setValue(value)
      if (value.length !== 6) return

      // navigate(NEXT_PAGE_INDEX)
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else console.error(e)
    }
  }

  const handleIntervalTime = () => {
    const currentRemainingTime = Math.max(
      indentificatedTime + TIME_LIMIT - new Date().getTime(),
      0
    )

    setRemainingTime(currentRemainingTime)
    if (currentRemainingTime === 0) setError(IdentificationMessage.TimeOut)
  }

  useEffect(() => {
    const time = setInterval(handleIntervalTime, TIME_LIMIT_UPDATE_PERIOD)

    return () => clearInterval(time)
  }, [indentificatedTime, status])

  return (
    <Layout className={Layout.styles.bg.white}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body className={cn('mt-5', Layout.styles.body.start)}>
        <div className='flex w-full flex-col bg-white pt-5 text-gray-900'>
          <FormattedDiv className='typo-t1b py-6 text-center'>
            {TITLE}
          </FormattedDiv>
          <div className='typo-b1sb text-center text-pink-500'>
            남은 시간 {format.timeMSS(remainingTime)}
          </div>
          <div className='flex justify-center py-5'>
            <InputOTP maxLength={6} value={value} onChange={handleChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={4} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className='typo-c1m w-fit self-center rounded-[10px] bg-gray-600 px-1.5 py-[6.5px] text-white'>
            인증문자 다시 받기
          </Button>
        </div>
        <BottomSheet className={cn(BottomSheet.styles.center)}>
          <Button
            disabled={value.length < 5}
            className={cn(
              'h-[53px] w-full',
              value.length < 5 ? 'bg-gray-400' : 'bg-primary-500'
            )}
            onClick={() => navigate(NEXT_PAGE_INDEX)}
          >
            인증번호 받기
          </Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
