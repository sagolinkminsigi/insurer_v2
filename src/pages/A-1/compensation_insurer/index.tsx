import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Protect from '@/assets/protect.svg?react'
import { RedoModal } from '../accidents/redo-modal'
import useInputEvent from '@/hooks/use-input-event'
import { useToast } from '@/components/ui/use-toast'
import { useAddEventListener } from '@/hooks/use-add-eventlistener'

const TITLE = '보험 담당자가 제시한\n피해 보상 금액이 있나요?'
const NEXT_PAGE = '/compensation_desired'

export default function CompensationInsurer() {
  const [value, setValue] = useState('')
  const inputRef = useInputEvent({ autoFocus: true, autoBlur: true })
  const navigate = useNavigate()
  const { toast } = useToast()

  const goNext = () => navigate(NEXT_PAGE)
  const handleClick = () => {
    setValue('')
    goNext()
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    goNext()
  }
  useEffect(() => {
    toast({
      description: (
        <div className='typo-c1m flex items-center gap-2 rounded-[10px] bg-positive-100 p-2'>
          <Protect width={24} height={24} className='text-positive-300' />
          <div className='text-gray-900'>
            고객 동의 없이는 정보를 유출하지 않아요
          </div>
        </div>
      ),
    })
  }, [])

  return (
    <Layout className={Layout.styles.bg.primary900}>
      <Layout.Header fixed>
        <RedoModal />
      </Layout.Header>

      <Layout.Body className={`${Layout.styles.body.center}`}>
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
          아직 제시받지 못했어요
        </Button>
      </Layout.Body>
    </Layout>
  )
}
