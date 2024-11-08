import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/custom/button'
import { Footer } from '@/components/footer'
import { FormattedDiv } from '@/components/formatted-div'
import { TabBar } from '@/components/tab-bar'
import { BottomSheet } from '@/components/bottom-sheet'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const HEADER_TITLE = '약관 및 정책'
const FOOTER_TEXT =
  '※예상 보상금은 데이터를 활용한 추정치일 뿐, 공식적인 손해사정 금액이 아닙니다.\n※수임 계약 후 보험업법 및 관련법을 철저히 준수하며 손해사정 서비스를 제공합니다.\n※사고링크는 대한민국 손해사정 시장의 정보비대칭과 불법브로커 문제를 해결하고 국민들에게 합리적이고 공정한 손해사정 서비스를 제공하기 위해 노력합니다.'

export default function Policy() {
  const navigate = useNavigate()
  return (
    <Layout className={Layout.styles.bg.gray100}>
      <Layout.Header fixed className='justify-center bg-white'>
        <div className='typo-t1b flex items-center text-gray-900'>
          <ChevronLeft
            className='absolute left-4'
            onClick={() => navigate('/mypage')}
          />
          {HEADER_TITLE}
        </div>
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.start,
          Layout.styles.body.pb,
          Layout.styles.body.pt,
          Layout.styles.body.maxwidth,
          'relative h-full overflow-auto bg-gray-100'
        )}
      >
        <div className='flex-1 bg-white px-4 pt-2'>
          <div className='flex w-full justify-between py-[17px] text-gray-900'>
            개인민감정보 처리 방침 <ChevronRight />
          </div>
          <div className='flex w-full justify-between py-[17px] text-gray-900'>
            개인정보 처리 방침 <ChevronRight />
          </div>
          <div className='flex w-full justify-between py-[17px] text-gray-900'>
            서비스 이용 약관 <ChevronRight />
          </div>
        </div>
        <Footer className='typo-c1m bg-gray-100 px-4 pb-[37px] pt-5'>
          <FormattedDiv className='text-gray-400'>{FOOTER_TEXT}</FormattedDiv>
        </Footer>
        <BottomSheet>
          <TabBar />
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
