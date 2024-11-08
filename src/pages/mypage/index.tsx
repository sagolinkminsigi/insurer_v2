import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { ProcessGraph } from './process-graph'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/custom/button'
import { LogoutModal } from './logout-modal'
import { SignoutModal } from './signout-modal'
import { Footer } from '@/components/footer'
import { FormattedDiv } from '@/components/formatted-div'
import { cn } from '@/lib/utils'
import { TabBar } from '@/components/tab-bar'
import { BottomSheet } from '@/components/bottom-sheet'
import { ButtonWrapper } from '@/components/button-wrapper'
import { useNavigate } from 'react-router-dom'

const HEADER_TITLE = '내 정보'

const FOOTER_TEXT =
  '※예상 보상금은 데이터를 활용한 추정치일 뿐, 공식적인 손해사정 금액이 아닙니다.\n※수임 계약 후 보험업법 및 관련법을 철저히 준수하며 손해사정 서비스를 제공합니다.\n※사고링크는 대한민국 손해사정 시장의 정보비대칭과 불법브로커 문제를 해결하고 국민들에게 합리적이고 공정한 손해사정 서비스를 제공하기 위해 노력합니다.'

export default function Notice() {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const timeStamp = setTimeout(() => setIsLogin(true), 1000)
    return () => clearTimeout(timeStamp)
  }, [])
  return (
    <Layout className={Layout.styles.bg.gray100}>
      <Layout.Header fixed className='bg-white' main>
        <div>{HEADER_TITLE}</div>
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.pb,
          Layout.styles.body.pt,
          Layout.styles.body.start,
          Layout.styles.body.maxwidth,
          'relative h-full bg-gray-100'
        )}
      >
        <div className='flex items-center gap-3 border-t border-t-gray-100 bg-white px-4 py-3'>
          <img
            src={'/src/assets/no_profile.svg'}
            alt='kt'
            width={60}
            height={60}
          />
          {isLogin ? (
            <div>
              <div className='typo-st1sb text-gray-900'>김사고님</div>
              <div className='typo-b1m text-gray-500'>010-3232-1231</div>
            </div>
          ) : (
            <Button className='ml-auto rounded-[14px] bg-primary-900 text-white'>
              로그인하기
            </Button>
          )}
        </div>
        <div className='flex bg-white py-4'>
          <div className='flex basis-1/3 flex-col items-center'>
            <img
              src={'/src/assets/kit.svg'}
              alt='질병'
              width={24}
              height={24}
              className='pb-2 pt-1'
            />
            <div className='b1m text-gray-900'>질병</div>
            <div className='b1sb text-gray-500'>0</div>
          </div>
          <div className='h-full w-[1px] bg-gray-200' />
          <div className='flex basis-1/3 flex-col items-center'>
            <img
              src={'/src/assets/car.svg'}
              alt='교통'
              width={24}
              height={24}
              className='pb-2 pt-1'
            />
            <div className='b1m text-gray-900'>교통</div>
            <div className='b1sb text-gray-500'>0</div>
          </div>
          <div className='h-full w-[1px] bg-gray-200' />
          <div className='flex basis-1/3 flex-col items-center'>
            <img
              src={'/src/assets/docs.svg'}
              alt='일반'
              width={24}
              height={24}
              className='pb-2 pt-1'
            />
            <div className='b1m text-gray-900'>일반</div>
            <div className='b1sb text-gray-500'>0</div>
          </div>
        </div>
        <div className='mb-2 bg-white pb-[5.1rem]'>
          <div className='typo-st1sb mt-2 flex items-center justify-between p-4 text-gray-900'>
            <span>
              손해사정 <span className='text-primary-400'>1건</span>
            </span>
            <div className='typo-c1m float-right text-gray-500'>전체보기</div>
          </div>
          <ProcessGraph index={1} />
        </div>
        <div className='bg-white px-4 first:border-b first:border-b-gray-100'>
          <ButtonWrapper className='flex w-full justify-between bg-transparent py-[17px] text-gray-900'>
            후기 <ChevronRight />
          </ButtonWrapper>
          <hr className='border-gray-100' />
          <ButtonWrapper className='flex w-full justify-between bg-transparent py-[17px] text-gray-900'>
            알림 설정 <ChevronRight />
          </ButtonWrapper>
          <hr className='border-gray-100' />
          <ButtonWrapper className='flex w-full justify-between bg-transparent py-[17px] text-gray-900'>
            자주 묻는 질문 <ChevronRight />
          </ButtonWrapper>
          <hr className='border-gray-100' />
          <ButtonWrapper
            className='flex w-full justify-between bg-transparent py-[17px] text-gray-900'
            onClick={() => navigate('/policy')}
          >
            약관 및 정책 <ChevronRight />
          </ButtonWrapper>
          <hr className='border-gray-100' />
          <ButtonWrapper
            className='flex w-full justify-between bg-transparent py-[17px] text-gray-900'
            onClick={() => navigate('/event')}
          >
            이벤트 <ChevronRight />
          </ButtonWrapper>
          <div className='h-[198px]'>
            {isLogin && (
              <div className='flex justify-center gap-[13.5px]'>
                <LogoutModal />
                <div className='h-4.5 w-[1px] bg-gray-200' />
                <SignoutModal />
              </div>
            )}
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
