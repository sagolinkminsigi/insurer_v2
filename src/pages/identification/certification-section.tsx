import { FormattedDiv } from '@/components/formatted-div'
import { useEffect, useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useIdentificationState } from '.'
import { Layout } from '@/components/custom/layout'
import { apiIdentification, IdentificationMessage } from '@/apis/identification'
import { Button } from '@/components/custom/button'
import { format } from '@/lib/format'
import { cn } from '@/lib/utils'
import { BottomSheet } from '@/components/bottom-sheet'
import { supabase } from '@/supabase'
import { useToast } from '@/components/ui/use-toast'
const TITLE = '문자로 전송된\n인증번호 6자리를 입력해주세요'

const TIME_LIMIT = 7 * 60 * 1000
const TIME_LIMIT_UPDATE_PERIOD = 500
const NEXT_PAGE_INDEX = 3

export const CertificationSection = () => {
  const [value, setValue] = useState('')
  const { toast } = useToast()
  const {
    navigate,
    indentificatedTime,
    resetIndentificatedTime,
    phone,
    otpId,
    setOtpId,
  } = useIdentificationState()
  const [remainingTime, setRemainingTime] = useState(TIME_LIMIT)
  const handleChange = async (value: string) => {
    try {
      setValue(value)
      if (value.length !== 6) return
      await apiIdentification.confirmOtp({
        phone: phone,
        otp_id: otpId,
        otp_code: value,
      })
      await otplogin()
      navigate(NEXT_PAGE_INDEX)
    } catch (e) {
      toast({
        duration: 1000,
        description: (
          <div className='typo-c1m flex items-center gap-2 rounded-[10px] bg-gray-700 p-2'>
            <div className='text-white'>{`${e}`}</div>
          </div>
        ),
        bottom: 70,
      })
    }
  }

  const handleIntervalTime = () => {
    const currentRemainingTime = Math.max(
      indentificatedTime + TIME_LIMIT - new Date().getTime(),
      0
    )

    setRemainingTime(currentRemainingTime)
  }
  const resend = async () => {
    const { otp_id } = await apiIdentification.sendOtp({
      phone: format.onlyGetNumber(phone),
    })
    resetIndentificatedTime()
    setOtpId(otp_id)
  }
  useEffect(() => {
    resetIndentificatedTime()
    const time = setInterval(handleIntervalTime, TIME_LIMIT_UPDATE_PERIOD)

    return () => clearInterval(time)
  }, [indentificatedTime])

  const otplogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously()
      const { data: updateUserData, error: updateUserError } =
        await supabase.auth.updateUser({
          data: {
            user_metadata: {
              otp_id: otpId,
              phone: format.onlyGetNumber(phone),
            },
          },
        })
      if (error) throw new Error(error.message)
    } catch (err) {
      console.log(err)
    }
  }
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
          <Button
            className='typo-c1m w-fit self-center rounded-[10px] bg-gray-600 px-1.5 py-[6.5px] text-white'
            onClick={resend}
          >
            인증문자 다시 받기
          </Button>
        </div>
        <BottomSheet className={cn(BottomSheet.styles.center)}></BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
