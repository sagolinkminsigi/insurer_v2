import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import X from '@/assets/x.svg?react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import Info1 from '@/assets/insurer_svg/web_info1.svg'
import Info2 from '@/assets/insurer_svg/web_info2.svg'
import Info3 from '@/assets/insurer_svg/web_info3.svg'

export const SuccessSection = () => {
  const navigate = useNavigate()

  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header fixed className='flex justify-between px-3'>
        <X width={24} height={24} />
      </Layout.Header>
      <Layout.Body
        className={cn(
          'px-4',
          Layout.styles.body.maxwidth,
          Layout.styles.body.naviPadding
        )}
      >
        <div className='typo-t2b py-6 text-gray-900'>
          <div className=''>
            이제 온라인으로 <span className='text-primary-500'>1분 만에</span>
            <br /> 보정 요청할 수 있어요!
          </div>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className='flex flex-col items-center justify-center rounded-xl  bg-primary-100'
        >
          <CarouselContent>
            <CarouselItem>
              <div className='flex flex-col items-center gap-3'>
                <div className='typo-b2sb mt-[23px] flex h-[44px] items-center text-gray-800'>
                  손해사정서를 확인하고
                </div>
                <img src={Info1} className='aspect-square h-full' />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='flex flex-col items-center gap-3'>
                <FormattedDiv className='typo-b2sb mt-[23px] h-[44px] text-center text-gray-800'>
                  {'[금액 확인했어요]를 누르면\n바로 손해사정이 종결돼요'}
                </FormattedDiv>
                <img src={Info2} className='aspect-square h-full' />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className='flex flex-col items-center gap-3'>
                <div className='typo-b2sb mt-[23px] h-[44px] text-center text-gray-800'>
                  보정 요청이 필요한 경우, 보정 요청 금액을 입력해
                  <br />
                  온라인으로 <span className='text-primary-500'>1분 만에</span>
                  보정 요청할 수 있어요
                </div>
                <img src={Info3} className='aspect-square h-full' />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className='mb-[23px] flex gap-3'>
            <CarouselPrevious className='relative' />
            <CarouselNext className='relative' />
          </div>
        </Carousel>

        <div className='typo-b2sb mb-[133px] mt-[11px] text-gray-500'>
          사고링크손해사정(주)가 보험사의 손해사정 업무 효율을 높일 수 있도록
          관련 법 개선을 추진했어요.
          <br />
          <br />그 결과 보험업감독규정 제9-21조 3항 및 4항에 따라 온라인 보정
          요청도 서면과 동일한 법적 유효성을 갖고 있어요!
        </div>
        <BottomSheet className={BottomSheet.styles.center}>
          <BottomSheet.Button onClick={() => navigate('/details')}>
            손해사정서 확인하기
          </BottomSheet.Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
