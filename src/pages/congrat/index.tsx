import { Layout } from '@/components/custom/layout'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { FormattedDiv } from '@/components/formatted-div'
import { useNavigate } from 'react-router-dom'

export default function CongratPage() {
  const navigator = useNavigate()
  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header
        fixed
        className='flex h-[60px] justify-between px-3 py-[14px]'
      >
        <ChevronLeft width={24} height={24} className='text-gray-700' />
      </Layout.Header>
      <Layout.Body
        className={cn('mt-[60px] px-4', Layout.styles.body.maxwidth)}
      >
        <div className='typo-t2b py-6 text-gray-900'>
          <FormattedDiv>
            {'고생 많으셨습니다 :)\n피해자와 연락하여 종결 처리해주세요'}
          </FormattedDiv>
          <FormattedDiv className='typo-c1m mt-1 text-primary-500'>
            {
              '*사고링크에서 피해자 김사고(접수번호 18362)님에게\n최종 손해사정 금액 및 손해사정 종료를 안내드렸어요'
            }
          </FormattedDiv>
        </div>

        <div className='flex flex-col gap-4 rounded-xl bg-primary-100 p-4'>
          <div className='typo-b1sb flex justify-between'>
            <div className='text-gray-600'>피해자 희망 손해사정 금액</div>
            <div className='text-gray-600'>2,000,000원</div>
          </div>
          <div className='typo-b1sb flex justify-between'>
            <div className='text-primary-500'>총 손해사정 금액</div>
            <div className='text-primary-500'>2,800,000원</div>
          </div>
        </div>
        <BottomSheet className={BottomSheet.styles.center}>
          <BottomSheet.Button onClick={() => navigator('/home')}>
            확인
          </BottomSheet.Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
