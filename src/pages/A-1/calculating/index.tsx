import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ENTRANCE_TITLE = '사고링크 AI가 보상금을 계산하고 있어요'
const END_TITLE = '김사고님의 예상 보상금 계산을 완료했어요!'
const TRANSITION_START_DELAY = 1000
const NEXT_PAGE = '/expected_amount'

export default function Calculating() {
  const navigate = useNavigate()
  const [isCalculating, setIsCalculating] = useState(false)
  const goNext = () => navigate(NEXT_PAGE)
  useEffect(() => {
    setTimeout(() => setIsCalculating(true), TRANSITION_START_DELAY)
  }, [])
  useEffect(() => {
    if (isCalculating) setTimeout(() => goNext(), TRANSITION_START_DELAY)
  }, [isCalculating])
  return (
    <Layout className={Layout.styles.bg.gradient01}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body className={Layout.styles.body.center}>
        <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
          {isCalculating ? ENTRANCE_TITLE : END_TITLE}
        </FormattedDiv>
        <div className='h-[84px] w-[84px] rounded-[20px] bg-red-100' />
      </Layout.Body>
    </Layout>
  )
}
