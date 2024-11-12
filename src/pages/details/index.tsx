import { Button } from '@/components/custom/button'

import { Layout } from '@/components/custom/layout'
import X from '@/assets/x.svg?react'
import { Fragment, useEffect, useState } from 'react'
import { HighlightDiv } from '@/components/highlight-div'
import { ButtonWrapper } from '@/components/button-wrapper'
import { cn } from '@/lib/utils'
import { format } from '@/lib/format'
const file = [
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
  'https://www.ekr.or.kr/Kkrpub/webzine/2022/11/img/content204/content204_1.jpg',
]
const TIME_LIMIT_UPDATE_PERIOD = 500
const TIME_LIMIT = 30 * 60 * 1000

const TEMPLATE = [
  {
    name: '위자료',
    price: 300000,
    reason: '보정 요청 시 작성했던 내용이 들어갑니다.',
    updatePrice: '200000',
  },
  {
    name: '휴업손해액',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
  {
    name: '기타손해배상금',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
  {
    name: '향후치료비',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
  {
    name: '치료 비상계',
    price: 300000,
    reason: '',
    updatePrice: '',
  },
]

export default function DetailsPage() {
  const [indentificatedTime, setIndentificatedTime] = useState<number>(
    new Date().getTime()
  )
  const [remainingTime, setRemainingTime] = useState(TIME_LIMIT)

  const resetIndentificatedTime = () =>
    setIndentificatedTime(new Date().getTime())
  const handleIntervalTime = () => {
    const currentRemainingTime = Math.max(
      indentificatedTime + TIME_LIMIT - new Date().getTime(),
      0
    )

    setRemainingTime(currentRemainingTime)
  }
  useEffect(() => {
    const time = setInterval(handleIntervalTime, TIME_LIMIT_UPDATE_PERIOD)

    return () => clearInterval(time)
  }, [indentificatedTime, status])
  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header
        fixed
        className='flex h-[60px] justify-between px-3 py-[14px]'
      >
        <X width={24} height={24} className='text-gray-700' />
        <span className='typo-t2b'>보정요청서</span>
        <span className='typo-c1m content-center underline'>PDF 저장</span>
      </Layout.Header>
      <Layout.Body
        className={cn('mb-[72px] mt-[60px]', Layout.styles.body.maxwidth)}
      >
        <div className='typo-c1m flex h-[48px] items-center justify-between bg-gray-200 px-4 text-gray-900'>
          <HighlightDiv
            className='typo-c1m text-gray-900'
            boldClass='text-primary-500'
            boldStart={1}
          >
            {`보안을 위해 \b${format.timeMSSKor(remainingTime)}\b 후 로그아웃돼요`}
          </HighlightDiv>
          <div className='flex gap-2'>
            <ButtonWrapper className='typo-c1m h-8 w-[53px] rounded-[10px] border border-gray-500 bg-white text-gray-500'>
              로그아웃
            </ButtonWrapper>
            <ButtonWrapper
              onClick={resetIndentificatedTime}
              className='typo-c1m h-8 w-[53px] rounded-[10px] border border-gray-600 bg-gray-600 text-white'
            >
              연장하기
            </ButtonWrapper>
          </div>
        </div>
        <div className='typo-t2b px-4 pb-6 pt-[20px] text-gray-900'>
          <div className='flex items-center gap-2'>
            김사고
            <span className='typo-b2sb text-gray-400'>
              사고 당사자 (위임자)
            </span>
          </div>
          <div className='flex items-center gap-2'>
            1638394
            <span className='typo-b2sb text-gray-400'>접수번호</span>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
