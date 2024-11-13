import { Button } from '@/components/custom/button'

import { Layout } from '@/components/custom/layout'
import X from '@/assets/x.svg?react'
import { Fragment, useEffect, useState } from 'react'
import { HighlightDiv } from '@/components/highlight-div'
import { ButtonWrapper } from '@/components/button-wrapper'
import { cn } from '@/lib/utils'
import { format } from '@/lib/format'
import { RequestBlock } from './request-block'
import { ReviewBlock } from './review-block'
import { FailBlock } from './fail-block'
import { EndBlock } from './end-block'
import { CancelBlock } from './cancel-block'

/**
 * TDDO: 현재 어떤식으로 props가 도착하냐에 따라 다양하게 그려질 수 있기 때문에 우선은 모든 컴포넌트를 커버할 수 있도록 작성
 */
const TIME_LIMIT_UPDATE_PERIOD = 500
const TIME_LIMIT = 30 * 60 * 1000

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
        <div className='flex flex-col gap-4 px-4'>
          <CancelBlock />
          <EndBlock />
          <FailBlock />
          <ReviewBlock />
          <RequestBlock />
        </div>
      </Layout.Body>
    </Layout>
  )
}
