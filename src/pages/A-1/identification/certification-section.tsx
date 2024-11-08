import { FormattedDiv } from '@/components/formatted-div'
import { useEffect, useRef, useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { OperatorMap, useIdentificationState } from '.'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { apiIdentification, IdentificationMessage } from '@/apis/identification'
import { Button } from '@/components/custom/button'
import { format } from '@/lib/format'
import { Alert } from '../accidents/accident-alert'
import { cn } from '@/lib/utils'
import { IdentityVerificationMethod } from '@/types/identification'
const TITLE = '문자로 전송된\n인증번호 6자리를 입력해주세요'
const NEXT_PAGE_INDEX = 4
const PREV_PAGE_INDEX = 2
const TIME_LIMIT = 7 * 60 * 1000
const TIME_LIMIT_UPDATE_PERIOD = 500
const ERROR_STATUS = 400
const TIME_OUT_STATUS = 406

export const CertificationSection = () => {
  const [value, setValue] = useState('')
  const {
    navigate,
    indentificatedTime,
    resetIndentificatedTime,
    name,
    phoneNumber,
    birth,
    gender,
    mobileCarrier,
  } = useIdentificationState()
  const [remainingTime, setRemainingTime] = useState(TIME_LIMIT)
  const [error, setError] = useState('')
  const handleChange = async (value: string) => {
    if (remainingTime === 0) return
    try {
      setValue(value)
      if (value.length !== 6) return
      await apiIdentification.confirmOtp({
        otp: value,
      })

      navigate(NEXT_PAGE_INDEX)
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

  const handleClick = async () => {
    try {
      await apiIdentification.sendOtp({
        name: name,
        phoneNumber: format.onlyGetNumber(phoneNumber),
        identityNumber: format.residentRegisterNumber(birth, gender),
        operator: OperatorMap[mobileCarrier],
        method: IdentityVerificationMethod.SMS,
      })
      resetIndentificatedTime()
      setError('')
    } catch (e) {
      if (!(e instanceof Error)) return
      setError(e.message)
    }
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
          <Button
            onClick={handleClick}
            className='typo-c1m w-fit self-center rounded-[10px] bg-gray-600 px-1.5 py-[6.5px] text-white'
          >
            인증문자 다시 받기
          </Button>
        </div>
        {error.length > 0 && <CertificationAlert message={error} />}
      </Layout.Body>
    </Layout>
  )
}

interface CertificationAlertProps {
  message: string
}

const CertificationAlert = ({ message }: CertificationAlertProps) => {
  const { navigate } = useIdentificationState()
  /**
   * 코드에 따른 것들은 수정이 필요, 500번이 암호가 틀렸다는 것이 맞나 확인이 필요
   */
  switch (message) {
    case IdentificationMessage.TimeOut:
      return (
        <Alert
          className='bottom-5'
          button={
            <Button
              className='h-8 rounded-[10px] bg-white px-1.5 py-0 text-gray-900'
              onClick={() => navigate(PREV_PAGE_INDEX)}
            >
              다시 인증하기
            </Button>
          }
        >
          {message}
        </Alert>
      )
    case IdentificationMessage.FailAuth:
      return (
        <Alert
          className='bottom-5 h-12'
          button={
            <Button
              className='h-8 rounded-[10px] bg-white px-1.5 py-0 text-gray-900'
              onClick={() => navigate(PREV_PAGE_INDEX)}
            >
              다시 인증하기
            </Button>
          }
        >
          {message}
        </Alert>
      )
    case IdentificationMessage.OTPFail:
      return <Alert className='bottom-5'>{message}</Alert>
    default:
      return <Alert className='bottom-5'>{message}</Alert>
  }
}
