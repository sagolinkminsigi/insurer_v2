import { Button } from '@/components/custom/button'

import { Layout } from '@/components/custom/layout'
import X from '@/assets/x.svg?react'
import { Fragment, useEffect, useState } from 'react'
import { HighlightDiv } from '@/components/highlight-div'
import { FormattedDiv } from '@/components/formatted-div'
import { UploadPreview } from '@/components/ui/upload-preview'
import Sign from '@/assets/sign-1.svg'
import { BottomSheet } from '@/components/bottom-sheet'
import { ButtonWrapper } from '@/components/button-wrapper'
import { cn } from '@/lib/utils'
import { format } from '@/lib/format'
import { useNavigate } from 'react-router-dom'
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

export default function ConfirmPage() {
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

        <div className='mx-4 flex flex-col gap-4'>
          <div className='rounded-xl bg-primary-100 p-4'>
            <div className='typo-b1sb pb-4 text-gray-900'>
              김사고님 손해사정
            </div>

            <div className='typo-b1sb flex justify-between'>
              <div className='text-primary-500'>총 손해사정 금액</div>
              <div className='text-primary-500'>2,800,000원</div>
            </div>
            <div className='typo-c1m text-gray-500'>
              2024년 10월 20일 보정 요청
            </div>
          </div>

          <div className='flex flex-col gap-4 rounded-xl bg-white p-4'>
            <div className='typo-b2sb text-primary-800'>
              손해사정 항목별 의견
            </div>
            {TEMPLATE.map((v, index) => (
              <Fragment key={index}>
                {index !== 0 && <hr className='border-t-1 border-gray-200' />}
                <div className='flex flex-col gap-1'>
                  <div className='typo-b2sb flex justify-between'>
                    <div className='text-primary-900'>{v.name}</div>
                    <div className='text-primary-900'>
                      {v.price.toLocaleString()}원
                    </div>
                  </div>
                  <div className='typo-b2sb flex justify-between'>
                    <div
                      className={
                        v.updatePrice.length > 0
                          ? 'text-pink-500'
                          : 'text-gray-400'
                      }
                    >
                      보정요청
                    </div>
                    <div
                      className={
                        v.updatePrice.length > 0
                          ? 'text-pink-500'
                          : 'text-gray-400'
                      }
                    >
                      200,000원
                    </div>
                  </div>
                  {v.reason.length > 0 && (
                    <div className='typo-c1m min-h-[156px] rounded-[14px] bg-gray-100 p-3 text-gray-700'>
                      {v.reason}
                    </div>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
          <div className='flex flex-col gap-4 rounded-xl bg-white p-4'>
            <div className='typo-b2sb text-primary-800'>
              손해사정 항목별 의견
            </div>
            <div className='typo-c1m min-h-[156px] rounded-[14px] bg-gray-100 p-3 text-gray-700'>
              보정 요청 시 작성했던 내용이 들어갑니다.
            </div>
          </div>
          <div className='rounded-xl bg-white px-4 pb-4'>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              기타 자료 업로드
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-4'>
              {file.map((f, index) => (
                <img
                  src={f}
                  key={index}
                  width={90}
                  height={90}
                  className='roundd-2xl border border-gray-300'
                />
              ))}
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
