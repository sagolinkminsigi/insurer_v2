import { Layout } from '@/components/custom/layout'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AgreementPage() {
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
          손해사정을 언제 다시 시작할까요?
          <div className='typo-c1m mt-1 text-primary-500'>
            *최대 7일까지 미룰 수 있어요
          </div>
        </div>
        <div className='rounded-xl bg-white p-4'>
          <div className='typo-b1sb text-gray-900'>
            김사고님 손해사정서 요약
          </div>
          <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
            피해자 정보
          </div>
          <div className='flex flex-col gap-1'>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>접수번호</div>
              <div className='text-gray-500'>93204847390-2947</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>성명</div>
              <div className='text-gray-500'>김사고</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>생년월일</div>
              <div className='text-gray-500'>1980년 5월 15일</div>
            </div>
          </div>
          <div className='typo-b2sb pb-2 pt-4 text-primary-800'>사고 내용</div>1{' '}
          <div className='mb-4 flex flex-col gap-1'>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>일자</div>
              <div className='text-gray-500'>2024년 8월 15일</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>유형</div>
              <div className='text-gray-500'>교통사고</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>원인</div>
              <div className='text-gray-500'>차량 신호 위반</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>결정과실</div>
              <div className='text-gray-500'>0%</div>
            </div>
          </div>
          <div className='w-full  gap-1 gap-1 border-t-[1px] border-dashed border-gray-600 pt-4'>
            <div className='typo-b1sb flex justify-between'>
              <div className='text-primary-500'>총 손해사정 금액</div>
              <div className='text-primary-500'>2,800,000원</div>
            </div>
          </div>
        </div>
        <BottomSheet className={BottomSheet.styles.center}>
          <BottomSheet.Button onClick={() => navigator('/congrat')}>
            네, 손해사정에 동의해요
          </BottomSheet.Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
