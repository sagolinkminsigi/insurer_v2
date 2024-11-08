import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useNavigate } from 'react-router-dom'
import { RedoModal } from '../accidents/redo-modal'
import useInputEvent from '@/hooks/use-input-event'
import { toast, useToast } from '@/components/ui/use-toast'

// TODO: 이후 카카오에서 받아 오도록 수정
const NAME = '김사고'

const TITLE = `${NAME}님이 원하시는\n피해 보상 금액이 있나요?`
const NEXT_PAGE = '/calculating'

export default function CompensationDesired() {
  const [value, setValue] = useState('')
  const inputRef = useInputEvent({ autoFocus: true, autoBlur: true })
  const navigate = useNavigate()
  const goNext = () => navigate(NEXT_PAGE)
  const handleClick = () => {
    setValue('')
    goNext()
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    goNext()
  }

  return (
    <Layout className={Layout.styles.bg.primary900}>
      <Layout.Header fixed>
        <RedoModal />
      </Layout.Header>

      <Layout.Body className={`${Layout.styles.body.center} items-center`}>
        <FormattedDiv className='typo-t1b py-6 text-center text-white'>
          {TITLE}
        </FormattedDiv>
        <div className='my-[47px] flex gap-2'>
          <input
            ref={inputRef}
            type='number'
            onKeyDown={handleKeyDown}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='typo-st1sb w-16 border-b border-b-gray-300 bg-transparent text-end text-white outline-none'
          />
          <span className='typo-st1sb'>만원</span>
        </div>
        <Button
          className='typo-c1m w-fit rounded-[10px] bg-gray-600 px-1.5 py-[6.5px] text-white'
          onClick={handleClick}
        >
          잘 모르겠어요
        </Button>
      </Layout.Body>
    </Layout>
  )
}
