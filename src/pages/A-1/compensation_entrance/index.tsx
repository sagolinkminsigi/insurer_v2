import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useEffect, useState } from 'react'
import Protect from '@/assets/protect.svg'
import { useNavigate } from 'react-router-dom'
const ENTRANCE_TITLE = '예상 보상금 조회를 위한\n정보 입력이 모두 끝났어요!'

const NEXT_PAGE = '/compensation_insurer'
const TRANSITION_START_DELAY = 1000
export default function CompensationEntrance() {
  const navigate = useNavigate()

  const goNext = () => navigate(NEXT_PAGE)

  useEffect(() => {
    setTimeout(() => goNext(), TRANSITION_START_DELAY)
  }, [])

  return (
    <Layout className={Layout.styles.bg.gradient01}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body className={Layout.styles.body.center}>
        <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
          {ENTRANCE_TITLE}
        </FormattedDiv>
      </Layout.Body>
    </Layout>
  )
}
