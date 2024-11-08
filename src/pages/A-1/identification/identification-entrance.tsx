import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useEffect } from 'react'
import { useIdentificationState } from '.'

const ENTRANCE_TITLE = '서비스 이용을 위해\n본인인증을 진행할게요!'
const NEXT_PAGE_INDEX = 1
const PAGE_MOVE_DELAY = 1000
export default function IdentificationEntrance() {
  const { navigate } = useIdentificationState()

  useEffect(() => {
    setTimeout(() => navigate(NEXT_PAGE_INDEX), PAGE_MOVE_DELAY)
  }, [])
  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body className={Layout.styles.body.center}>
        <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
          {ENTRANCE_TITLE}
        </FormattedDiv>
      </Layout.Body>
    </Layout>
  )
}
