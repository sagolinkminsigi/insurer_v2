import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import Purse from '@/assets/purse.svg'
import X from '@/assets/x.svg?react'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { Button } from '@/components/custom/button'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const TITLE = '사고링크 AI 분석 결과\n평균 보상금보다 200만원 더 높아요'

const info = [
  '2024년 10월 16일',
  '차 vs 차',
  '상대가 뒤에서 추돌',
  '90 : 10',
  ' 뇌손상 외 4건',
  '입원 5일, 통원 3일',
]
const PERCENT = '80%'
export default function ExpectedAmount() {
  const navigate = useNavigate()
  const handleClick = () => navigate('/contract')
  return (
    <Layout className='relative'>
      <div
        className={`absolute h-full w-full bg-[url('src/assets/purse.svg'),linear-gradient(to_bottom,var(--tw-gradient-stops))] from-[#76744F] to-[#282715] bg-right-bottom bg-no-repeat blur-[50px]`}
      />
      <Layout.Header fixed>
        <X
          width={24}
          height={24}
          className='absolute left-4 text-gray-400'
          onClick={() => navigate('/home')}
        />
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.pb,
          Layout.styles.body.pt,
          Layout.styles.body.maxwidth,
          'px-4'
        )}
      >
        <FormattedDiv className='typo-t2b py-6 text-center text-white'>
          {TITLE}
        </FormattedDiv>
        <div className='relative flex w-full flex-col items-center rounded-t-[40px] bg-yellow-100 py-4'>
          <div className='typo-b2sb w-fit bg-yellow-200 p-2 text-yellow-600'>
            김사고님 예상 보상금
          </div>
          <div className='typo-h2b text-yellow-700'>220 ~ 280 만원</div>
          <img width={154} height={170} src={Purse} className='pt-4' />
          <div className='absolute bottom-7 left-5 rounded-full border border-gray-900 px-1 py-0.5 text-gray-900'>
            {PERCENT} 확률
          </div>
        </div>
        <div className='relative flex w-full flex-wrap gap-2 rounded-b-[40px] bg-white p-5 pb-[58px]'>
          {info.map((i) => (
            <span
              className='typo-b2sb rounded bg-gray-100 px-2 py-0.5 text-gray-400'
              key={i}
            >
              {i}
            </span>
          ))}
          <X
            width={72}
            height={22}
            className='absolute bottom-4 left-1/2 -translate-x-1/2'
          />
        </div>

        <BottomSheet className={cn(BottomSheet.styles.center)}>
          <BottomSheet.Button onClick={handleClick}>
            사고링크에 맡기기
          </BottomSheet.Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
