import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { useNavigate } from 'react-router-dom'
const TITLE = '입력이 완료되었어요!\n퇴원 예정일에 이어서 안내해드릴게요'
export default function SubmitSuccessEntrance() {
  const navigate = useNavigate()
  return (
    <Layout className={Layout.styles.bg.gradient01}>
      <Layout.Header fixed></Layout.Header>

      <Layout.Body className={`${Layout.styles.body.center} items-center px-4`}>
        <FormattedDiv className='typo-t1b py-6 text-center text-primary-900'>
          {TITLE}
        </FormattedDiv>
        <div className='flex h-40 items-center justify-center'>
          <img
            src={'/src/assets/check_board.svg'}
            alt='check_board'
            width={217}
            height={217}
          />
        </div>
        <Button
          className='mt-10 h-[53px] w-40 rounded-full bg-primary-800 text-white'
          onClick={() => navigate('/home')}
        >
          홈으로
        </Button>
      </Layout.Body>
    </Layout>
  )
}
