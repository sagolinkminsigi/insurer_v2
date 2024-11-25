import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useEffect } from 'react'
import { useIdentificationState } from '.'
import Protect from '@/assets/protect.svg?react'
import { cn } from '@/lib/utils'
const ENTRANCE_TITLE = '손해사정서 확인을 위해\n본인인증을 진행할게요'
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
      <Layout.Body
        className={cn(
          Layout.styles.body.center,
          Layout.styles.body.maxwidth,
          'px-4'
        )}
      >
        <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
          {ENTRANCE_TITLE}
        </FormattedDiv>
        <div className='typo-c1m mx-4 flex w-full gap-2 bg-positive-100 p-3 text-left text-positive-300'>
          <Protect width={24} height={24} />
          <span>
            안심하세요! 개인정보는 손해사정서 열람을 위해서만
            <br />
            사용되며, 인증을 마치면 바로 파기해요.
          </span>
        </div>
      </Layout.Body>
    </Layout>
  )
}
