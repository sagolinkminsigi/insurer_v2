import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { useNavigate } from 'react-router-dom'
const TITLE = '사고링크에 성공적으로 맡겼어요!\n담당자 확인 후 알려드릴게요'
export default function AdditionalSuccess() {
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
            src={'/src/assets/congrat.svg'}
            alt='check_board'
            width={360}
            height={160}
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
