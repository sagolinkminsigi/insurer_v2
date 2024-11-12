import { Button } from '@/components/custom/button'

import { Layout } from '@/components/custom/layout'
import X from '@/assets/x.svg?react'
import { useEffect, useState } from 'react'
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
export default function DocsPage() {
  const navigator = useNavigate()
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
        <span className='typo-t2b'>손해 사정서</span>
        <span className='typo-c1m content-center underline'>PDF 저장</span>
      </Layout.Header>
      <Layout.Body className={cn('mt-[60px]', Layout.styles.body.maxwidth)}>
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
        <FormattedDiv className='typo-t2b px-4 py-6 text-gray-900'>
          {'손해사정서를 확인한 후\n아래 버튼을 눌러주세요'}
        </FormattedDiv>

        <div className='mx-4 flex flex-col gap-4'>
          <div className='mx-4 flex flex-col gap-2'>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>사고 당사자 (위임자)</div>
              <div className='text-gray-500'>김사고</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>보험 접수번호</div>
              <div className='text-gray-500'>13828492</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>손해사정서 접수일</div>
              <div className='text-end text-gray-500'>
                <div>2024년 10월 28일</div>
                <HighlightDiv boldClass='text-primary-400' boldStart={1}>
                  {'접수일로부터 \b0일째\b'}
                </HighlightDiv>
              </div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-900'>총 손해사정 금액</div>
              <div className='text-gray-900'>1,800,000원</div>
            </div>
          </div>
          <hr className='border-t-1 border-gray-200' />
          <div className='mx-4 flex flex-col gap-2'>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-primary-800'>발신</div>
              <div className='text-primary-800'>사고링크 손해사정 (주)</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>발신일자</div>
              <div className='text-gray-500'>2024년 10월 30일</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>주소</div>
              <FormattedDiv className='text-end text-gray-500'>
                {
                  '(우편번호 08514)\n서울시 금천구 디지털로 10길 9,\n5층 KICXUP 사고링크'
                }
              </FormattedDiv>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>수신</div>
              <div className='text-gray-500'>이동훈</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>연락처</div>
              <div className='text-gray-500'>010-3846-9472</div>
            </div>
          </div>
          <hr className='border-t-1 border-gray-200' />
          <div className='mx-4 flex flex-col gap-2'>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-primary-800'>발신</div>
              <div className='text-primary-800'>삼성화재</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>참조</div>
              <div className='text-gray-500'>김준수 (010-3847-5678)</div>
            </div>
            <div className='typo-b2sb flex justify-between'>
              <div className='text-gray-400'>제목</div>
              <div className='text-end text-gray-500'>손해사정서 제출</div>
            </div>
          </div>

          <div className='rounded-xl bg-primary-100 p-4'>
            <div className='typo-b1sb text-gray-900'>
              김사고님 손해사정 금액
            </div>
            <div className='typo-c1m text-gray-500'>2024년 10월 16일 작성</div>

            <div className='typo-b1sb flex justify-between py-4'>
              <div className='text-primary-500'>총 손해사정 금액</div>
              <div className='text-primary-500'>2,800,000원</div>
            </div>

            <div className='w-full  gap-1 gap-1 border-t-[1px] border-dashed border-gray-600 pt-4'>
              <div className='typo-b2sb flex justify-between'>
                <div className='typo-b1m text-gray-500'>위자료</div>
                <div className='typo-b1sb text-gray-600'>12,000,000원</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='typo-b1m text-gray-500'>휴업손해액</div>
                <div className='typo-b1sb text-gray-600'>6,000,000원</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='typo-b1m text-gray-500'>기타손해배상금</div>
                <div className='typo-b1sb text-gray-600'>300,000원</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='typo-b1m text-gray-500'>향후치료비</div>
                <div className='typo-b1sb text-gray-600'>400,000원</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='typo-b1m text-gray-500'>치료비상계</div>
                <div className='typo-b1sb text-gray-600'>-0원</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='typo-b1m text-gray-500'>직불치료비</div>
                <div className='typo-b1sb text-gray-600'>300,000원</div>
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-white px-4 pb-4'>
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

            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              사고 내용
            </div>
            <div className='flex flex-col gap-1'>
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
          </div>

          <div className='rounded-xl bg-white px-4 pb-4'>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              손해사정 근거
            </div>
            <div className='typo-b2sb flex flex-col gap-1 text-gray-500'>
              <div>
                <span className='mr-1'>①</span>
                자동차보험약관 대인배상 I, II
              </div>
              <div>
                <span className='mr-1'>②</span>
                민법 및 판례
              </div>
            </div>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              손해사정 금액 산정에 대한 의견
            </div>
            <div className='typo-b2sb text-gray-400'>
              위 사정 금액은 자동차보험약관 지급 기준 피해자의 소득, 향후치료
              예상 비용 등을 종합 산출하여 적용하였으며, 이에 따른 사고 당사자
              “사고 당사자명"의 손해액을 판단하였습니다. 향후치료비는 2021년도
              건강보험 심사평가원 통계자료의 의료기관 종별 심사실적 중 한방병원
              외래 건당 진료비 74,374원과 주치의 소견에 의거하여 산정하였습니다.
              다만, 위 금액은 소송 제기 시 재판 결과에 따라 달라질 수 있습니다.
            </div>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              기타 의견
            </div>
            <div className='typo-b2sb text-gray-400'>
              지정 매니저가 작성한 의견이 들어갑니다. 지정 매니저가 작성한
              의견이 들어갑니다. 지정 매니저가 작성한 의견이 들어갑니다.
            </div>
          </div>

          <div className='rounded-xl bg-white px-4 pb-4'>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              근거 자료
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-4'>
              {file.map((f, index) => (
                <img
                  src={f}
                  key={index}
                  width={90}
                  height={90}
                  className='rounded-2xl border border-gray-300'
                />
              ))}
            </div>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              사고 당사자 의견 (손해사정 금액 관련){' '}
            </div>
            <div className='typo-b2sb text-gray-400'>
              피해자가 금액 관련하여 작성한 내용이 들어갑니다. 피해자가 금액
              관련하여 작성한 내용이 들어갑니다. 피해자가 금액 관련하여 작성한
              내용이 들어갑니다. 피해자가 금액 관련하여 작성한 내용이
              들어갑니다. 피해자가 금액 관련하여 작성한 내용이 들어갑니다.
              피해자가 금액 관련하여 작성한 내용이 들어갑니다. 피해자가 금액
              관련하여 작성한 내용이 들어갑니다. 피해자가 금액 관련하여 작성한
              내용이 들어갑니다. 피해자가 금액 관련하여 작성한 내용이
              들어갑니다.
            </div>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              사고 당사자 의견 (기타)
            </div>
            <div className='typo-b2sb text-gray-400'>
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
              피해자가 보험사에 가진 불만 관련하여 작성한 내용이 들어갑니다.
            </div>
          </div>
          {/*  */}

          <div className='rounded-xl bg-white px-4 pb-4'>
            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              손해사정 위임
            </div>
            <div className='flex flex-col gap-1'>
              <div className='typo-b2sb flex justify-between'>
                <div className='text-gray-400'>일자</div>
                <div className='text-gray-500'> 2024년 8월 15일</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='text-gray-400'>내용</div>
                <div className='text-gray-500'>
                  보험업법 제 188조의 사정업무
                </div>
              </div>
            </div>

            <div className='typo-b2sb pb-2 pt-4 text-primary-800'>
              사고당사자 (위임자)
            </div>
            <div className='flex flex-col gap-1'>
              <div className='typo-b2sb flex justify-between'>
                <div className='text-gray-400'>성명</div>
                <div className='text-gray-500'>김사고</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='text-gray-400'>생년월일</div>
                <div className='text-gray-500'>1980년 5월 15일</div>
              </div>
              <div className='typo-b2sb flex justify-between'>
                <div className='text-gray-400'>연락처</div>
                <div className='text-gray-500'>010-3763-8468</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-7'>
            <div className='relative flex h-[68px] w-[182px] flex-col justify-center gap-1'>
              <div className='typo-b2sb text-gray-900'>
                사고링크손해사정 (인)
              </div>
              <div className='typo-c1m text-gray-500'>
                손해사정업등록번호 제 B0000755호
              </div>
              <img
                src={Sign}
                width={68}
                height={68}
                className='absolute bottom-0 right-0 top-0'
              />
            </div>
            <div className='relative flex h-[68px] w-[182px] flex-col justify-center gap-1'>
              <div className='typo-b2sb text-gray-900'>
                손해사정사 홍성진 (인)
              </div>
              <div className='typo-c1m text-gray-500'>
                손해사정사 등록번호 제 B0000755호
              </div>
              <img
                src={Sign}
                width={68}
                height={68}
                className='absolute bottom-0 right-0 top-0'
              />
            </div>
            <div className='relative flex h-[68px] w-[182px] flex-col justify-center gap-1'>
              <div className='typo-b2sb text-gray-900'>
                손해사정 보조인 송필재
              </div>
              <div className='typo-c1m text-gray-500'>
                보조인 등록번호 제 B0000755호
              </div>
              <img
                src={Sign}
                width={68}
                height={68}
                className='absolute bottom-0 right-0 top-0'
              />
            </div>
          </div>
        </div>
        <div className='bg-gray-200 px-4 pb-[202px] pt-[20px] text-gray-500'>
          <div>
            보험업감독규정 제9-18제1항의 규정에 의하여 손해사정서를 작성, 별첨과
            같이 손해사정서 등을 제출하오니 보험업감독규정 제9-21조의 규정에
            따라 지체 없이 처리하여 주시기 바랍니다. 본 손해사정서가
            보험업감독규정 제9-21조 제2항의 제1호 또는 제2호에 해당되어
            정정/보완이 필요한 경우에는 같은 규정 제9-21조 제3항 및 4항에 따라
            손해사정서 접수일로부터 10일 이내에 구체적인 사유와 근거를 명시하여
            본 손해사정사 또는 (손해보상금, 보험금)수령권자에게 요청하여 주시기
            바랍니다.
          </div>
          <br />
          <div>
            사고링크손해사정(주)는 관계 법령이 정하는 바에 따라 손해사정을
            위임한 사고 당사자(이하 '사고 당사자')의 개인정보를 보호하기 위해
            노력합니다. 사고 당사자의 개인 정보가 타인에게 노출되지 않도록
            유의해 주세요. 사고링크손해사정(주)는 보험사 회원(이하 '보험
            담당자')의 귀책사유로 인해 노출된 정보에 대해 책임을 지지 않습니다.
          </div>
        </div>
        <BottomSheet className='mb-8 flex justify-center px-4'>
          <div
            className={cn(
              BottomSheet.styles.center,
              Layout.styles.body.maxwidth,
              'typo-b1sb flex w-full flex-row gap-4 px-4'
            )}
          >
            <ButtonWrapper
              className='h-[53px] w-[35%] text-nowrap rounded-[50px] bg-gray-900 px-2.5 py-2.5 text-white'
              onClick={() => navigator('/correction')}
            >
              이의 있어요
            </ButtonWrapper>
            <ButtonWrapper
              className='h-[53px] w-[64%] rounded-[50px] py-2.5 text-white'
              onClick={() => navigator('/agreement')}
            >
              금액 확인했어요
            </ButtonWrapper>
          </div>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
