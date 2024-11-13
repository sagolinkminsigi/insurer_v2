import { Layout } from '@/components/custom/layout'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FormattedDiv } from '@/components/formatted-div'
import XOuter from '@/assets/x_outer.svg?react'
import { useRef, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/custom/button'
import { useIdentificationState } from '.'
import { format, inputFormatType } from '@/lib/format'
const NEXT_PAGE_INDEX = 2
export default function PhoneSection() {
  const { navigate } = useIdentificationState()
  const [phone, setPhone] = useState('')
  const [sensitiveInfo, setSensitiveInfo] = useState(false)
  const [personal, setPersonal] = useState(false)
  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header
        fixed
        className='flex h-[60px] justify-between px-3 py-[14px]'
      >
        <ChevronLeft width={24} height={24} className='text-gray-700' />
      </Layout.Header>
      <Layout.Body
        className={cn('mt-[60px] px-4', Layout.styles.body.maxwidth)}
      >
        <div className='typo-t2b py-6 text-gray-900'>
          <FormattedDiv>
            {'휴대폰번호를 입력하고\n약관에 동의해주세요'}
          </FormattedDiv>
          <FormattedDiv className='typo-c1m mt-1 text-primary-500'>
            입력하신 정보는 손해사정서 조회에만 사용됩니다
          </FormattedDiv>
        </div>
        <LabelInput
          label='휴대폰번호'
          value={phone}
          onChange={setPhone}
          type='phone'
        />
        <div className='mt-5 flex flex-col gap-1 '>
          <Checkbox
            isChecked={sensitiveInfo}
            onChangeCheck={setSensitiveInfo}
            title='[필수] 개인민감정보 처리 동의'
            className='typo-c1m items-center justify-between text-gray-300'
            dir='row'
          >
            <ChevronRight width={24} height={24} />
          </Checkbox>

          <Checkbox
            isChecked={personal}
            onChangeCheck={setPersonal}
            title='[필수] 개인정보 수집 ･ 이용 및 제 3자 제공 동의'
            className='typo-c1m items-center justify-between text-gray-300'
            dir='row'
          >
            <ChevronRight width={24} height={24} />
          </Checkbox>
        </div>
        <BottomSheet className={cn(BottomSheet.styles.center)}>
          <Button
            disabled={phone.length < 13}
            className={cn(
              'h-[53px] w-full',
              phone.length < 13 ? 'bg-gray-400' : 'bg-primary-500'
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
    <div className={cn(props.className || '', 'relative')}>
      <div className='typo-c1m text-gray-300'>{props.label}</div>
      <input
        className={cn(
          'typo-st1sb w-full border-b border-b-primary-400 bg-transparent text-gray-800 outline-none'
        )}
        ref={inputRef}
        value={value}
        onChange={handleChange}
      />
      {value.length > 0 && (
        <XOuter
          width={24}
          height={24}
          onClick={() => setValue('')}
          className={cn('absolute bottom-0.5 right-0.5 text-gray-300')}
        />
      )}
    </div>
  )
}
