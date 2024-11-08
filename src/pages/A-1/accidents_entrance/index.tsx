import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useEffect, useState } from 'react'
import Protect from '@/assets/protect.svg?react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
const ENTRANCE_TITLE = '예상 보상금 조회를 위해\n꼭 필요한 정보 5개만 받을게요'
const ENTRANCE_SUBTITLE =
  '안심하고 입력하세요!\n사고링크는 개인정보를 안전하게 보호합니다.'
const BOX_COUNT = 5
const TRANSITION_START_DELAY = 300
const NEXT_PAGE = '/accidents'

/**
 * A-1-a : accidents_entrance page
 */
export default function Entrance() {
  const navigate = useNavigate()
  const [isInitial, setIsInitial] = useState(false)

  const handleTransitionEnd = () => navigate(NEXT_PAGE)

  useEffect(() => {
    setTimeout(() => setIsInitial(true), TRANSITION_START_DELAY)
  }, [])

  return (
    <Layout className={Layout.styles.bg.gradient01}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body
        className={cn(
          Layout.styles.body.center,
          Layout.styles.body.maxwidth,
          '[mask-image:linear-gradient(to_left,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_10px,rgba(0,0,0,1)_calc(100%_-_20px),rgba(0,0,0,0))]'
        )}
      >
        <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
          {ENTRANCE_TITLE}
        </FormattedDiv>
        <div
          className={cn(
            'flex w-fit transform gap-3 px-16 duration-1000',
            isInitial ? '-translate-x-24' : ''
          )}
          onTransitionEnd={handleTransitionEnd}
        >
          {Array.from({ length: BOX_COUNT }).map((_, index) => (
            <div
              className='h-[84px] w-[84px] rounded-[20px] bg-red-100'
              key={index}
            />
          ))}
        </div>
        <div className='flex flex-col items-center gap-1 py-6'>
          <Protect width={24} height={24} className='text-positive-100' />
          <FormattedDiv className='typo-c1m text-center text-primary-900'>
            {ENTRANCE_SUBTITLE}
          </FormattedDiv>
        </div>
      </Layout.Body>
    </Layout>
  )
}
