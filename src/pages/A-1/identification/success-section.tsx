import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TITLE = '본인인증이 완료되었어요!'
const NEXT_PAGE = '/contract'
const TIME_LAPSE = 1000
export const SuccessSection = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => navigate(NEXT_PAGE), TIME_LAPSE)
  }, [])
  return (
    <Layout className={Layout.styles.bg.gradient01}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body className={Layout.styles.body.center}>
        <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
          {TITLE}
        </FormattedDiv>
        <div className='h-[84px] w-[84px] rounded-[20px] bg-red-100' />
      </Layout.Body>
    </Layout>
  )
}
