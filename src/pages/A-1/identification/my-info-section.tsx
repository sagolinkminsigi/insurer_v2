import { Dropdown } from '@/components/ui/dropdown'
import { ChangeEvent, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { OperatorMap, useIdentificationState } from '.'
import { Switch } from '@/components/ui/switch'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import { AgreementModal } from './agreement-modal'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { Gender, IdentityVerificationMethod } from '@/types/identification'
import { format, inputFormatType } from '@/lib/format'

import { cn } from '@/lib/utils'
// TODO: 이후 카카오에서 받아 오도록 수정
const NAME = '백남헌'
const ALERT_MESSAGE = '본인 정보를 올바르게 수정해주세요'
const ERROR_TIME = 3000
export const MyInfoSection = () => {
  const {
    mobileCarrier,
    setMobileCarrier,
    phoneNumber,
    setPhoneNumber,
    name,
    setName,
    birth,
    setBirth,
    setIsDomestic,
    gender,
    setGender,
  } = useIdentificationState()
  const TITLE = `${NAME}님의 정보가 맞나요?`
  const [error, setError] = useState('')

  useEffect(() => {
    if (error.length === 0) return
    const timeStamp = setTimeout(() => setError(''), ERROR_TIME)
    return () => clearTimeout(timeStamp)
  }, [error])

  useEffect(() => {
    setError('')
  }, [mobileCarrier, phoneNumber, name, birth, gender])

  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body
        className={cn(Layout.styles.body.maxwidth, Layout.styles.body.start)}
      >
        <div className='h-full w-full text-primary-900'>
          <div className='typo-t1b mb-3 bg-white py-6 text-center text-gray-900'>
            {TITLE}
          </div>
          <div className='mb-3 flex flex-col gap-10 bg-white px-4 py-6'>
            <div className='flex justify-between gap-[30px] overflow-hidden'>
              <Switch
                className='min-w-[140px] max-w-[140px]'
                options={Object.values(Gender)}
                onChange={setGender}
              />
              <LabelInput value={name} onChange={setName} label='이름' />
            </div>
            <div className='flex justify-between gap-[30px] overflow-hidden'>
              <Switch
                className='min-w-[140px] max-w-[140px]'
                options={['내국인', '외국인']}
                onChange={setIsDomestic}
              />
              <LabelInput
                value={birth}
                onChange={setBirth}
                label='생년월일'
                type='resident'
              />
            </div>
          </div>
          <div className='flex justify-between gap-[30px] bg-white px-4 py-6'>
            <Dropdown
              options={Object.keys(OperatorMap) as (keyof typeof OperatorMap)[]}
              defaultValue={mobileCarrier}
              onChange={setMobileCarrier}
              value={mobileCarrier || ''}
              buttonStyle='box-border max-w-[140px] min-w-[140px]'
            />
            <LabelInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              label='휴대폰번호'
              className='overflow-hidden'
              type='phone'
            />
          </div>
        </div>
        <BottomSheet>
          {error.length > 0 && (
            <BottomSheet.Alert>{ALERT_MESSAGE}</BottomSheet.Alert>
          )}
          <AgreementModal onStateChange={(err: string) => setError(err)} />
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}

interface LabelInputProps {
  label: string
  value: string
  onChange?: Function
  className?: string
  type?: inputFormatType
}
const LabelInput = (props: LabelInputProps) => {
  const [value, setValue] = useState(props.value || '')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = format.input(e.target.value, props?.type)
    const cursorPosition = e.target.selectionStart

    setValue(formattedValue)
    props.onChange && props.onChange(formattedValue)

    if (cursorPosition === e.target.value.length) return
    requestAnimationFrame(() => {
      if (inputRef.current === null) return

      inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
    })
  }
  return (
    <div className={props.className || ''}>
      <div className='typo-c1m text-gray-300'>{props.label}</div>
      <input
        ref={inputRef}
        className='typo-st1sb border-b border-b-primary-400 bg-transparent text-gray-800 outline-none'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
