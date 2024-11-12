import { Button } from '@/components/custom/button'
import { FormattedDiv } from '@/components/formatted-div'
import CheckBoard from '@/assets/insurer_svg/check_board.svg'
import CheckBoardBubble from '@/assets/insurer_svg/check_board_bubble.svg'
import Alert from '@/assets/insurer_svg/alert.svg'
import Congrat from '@/assets/insurer_svg/congrat.svg'
import Suits from '@/assets/insurer_svg/suits.svg'
import App from '@/assets/insurer_svg/app_intro.svg'
import { FAQDropdown } from './faq'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
  const navigator = useNavigate()
  return (
    <div className='h-svh text-center'>
      <div className='bg-[#0368FE]'>
        <img
          src={Suits}
          width={418}
          height={236}
          className={cn(
            'w-[100vw] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0))]'
          )}
        />
        <FormattedDiv className='typo-t2b pb-9'>
          {'피해자와의 끝없는 논쟁, 힘드시죠?\n이제 사고링크에서 돕겠습니다.'}
        </FormattedDiv>
      </div>
      <div className='typo-b1sb flex flex-col items-center justify-center bg-[#212121] pb-14 pt-[50px]'>
        <FormattedDiv>
          {
            '사고링크는 자동차 대인보상실무를 수행하던\n사람들이 모여 만든 스타트업입니다.'
          }
        </FormattedDiv>
        <div className='mb-5 mt-4 h-[30px] w-[1px] bg-white' />
        <FormattedDiv>
          {
            '무리한 금액을 요구하는 손해사정이 아닌\n데이터를 바탕으로 타당한 손해사정을\n진행하고 있습니다.'
          }
        </FormattedDiv>
      </div>
      <div className='typo-st1sb flex flex-col items-center bg-white pb-[52px] pt-[50px] text-primary-900'>
        <img src={CheckBoard} width={72.61} height={81} />
        <FormattedDiv className='mb-[30px] mt-3'>
          {'피해자가 정확한 정보를 얻고\n합리적인 보상을 받을 수 있도록'}
        </FormattedDiv>
        <img src={CheckBoardBubble} width={126} height={69} />
        <FormattedDiv className='mt-3'>
          {
            '보험사도 피해자들과\n꼭 필요한 이야기만 할 수 있도록\n최선을 다하겠습니다.'
          }
        </FormattedDiv>
      </div>
      <div className='flex flex-col items-center bg-[#212121] py-[50px]'>
        <img src={Alert} width={50} height={44.5} />

        <div className='typo-st1sb mb-7 mt-3'>
          피해자가 무리한 보상금을 요구할 때
        </div>
        <div className='mx-5 rounded-[14px] bg-[#F7F8FD] px-5 py-9 text-left text-[#212121]'>
          <div className='typo-st1sb mb-5 text-center'>사고링크는</div>
          <div className='typo-b2sb flex gap-2'>
            <div className='mt-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-[#599CFF] text-[10px] text-white'>
              1
            </div>
            <div className='underline decoration-[#599CFF]'>
              빅데이터로 적정 손해사정 금액 범위 산출
            </div>
          </div>
          <div className='ml-2 h-5 w-[1px] bg-[#DFE1E9]' />
          <div className='typo-b2sb flex gap-2'>
            <div className='mt-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-[#599CFF] text-[10px] text-white'>
              2
            </div>
            <div className='underline decoration-[#599CFF]'>
              희망 보상액이 무리하다는 것을 안내
            </div>
          </div>
          <div className='ml-2 h-5 w-[1px] bg-[#DFE1E9]' />
          <div className='typo-b2sb flex gap-2'>
            <div className='mt-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-[#599CFF] text-[10px] text-white'>
              3
            </div>
            <div className='underline decoration-[#599CFF]'>
              적정 손해사정 금액 안내
            </div>
          </div>
          <div className='ml-2 h-5 w-[1px] bg-[#DFE1E9]' />

          <div className='typo-b2sb flex gap-2'>
            <div className='mt-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-[#599CFF] text-[10px] text-white'>
              4
            </div>

            <FormattedDiv className='underline decoration-[#599CFF]'>
              {
                '보상 가능한 수준으로 고객 판단을 유도하여\n원활한 손해사정 진행'
              }
            </FormattedDiv>
          </div>
        </div>
      </div>
      <FormattedDiv className='typo-st1sb bg-white py-[50px] text-primary-900'>
        {'피해자와의 불필요한 합의로\n시간 낭비하실 필요 없어요.'}
      </FormattedDiv>
      <div className='flex flex-col items-center justify-center gap-[36px] bg-gradient-to-b from-[#004FFF] to-[#003ABC] pb-[69px] pt-[48px]'>
        <div className='flex items-center gap-1'>
          <img src={Congrat} width={20} height={61} />
          <FormattedDiv>
            {'이제 사고링크 서비스를 통해\n쉽고 빠르게 마무리하세요!'}
          </FormattedDiv>
          <img src={Congrat} width={20} height={61} className='rotate-180' />
        </div>
        <img
          src={App}
          width={374}
          height={351}
          className='border-b-2 border-b-white'
        />
      </div>
      <div className='h-2 bg-[#ECEEF4]' />
      <div className='bg-white p-5 pb-[92px] text-left text-[#212121]'>
        <div className='px-4 pb-5'>자주 묻는 질문</div>
        <FAQDropdown title={'사고링크는 어떤 사람들이 만든 서비스인가요?'}>
          {
            '사고링크는 보험사 대인 실무와 자동차 업무 경력을 가진 구성원들이 모여 만들었습니다.\n교통사고로 피해를 입은 사람들에게 올바른 정보와 온라인 손해사정 서비스를 제공하여 제대로 보상을 받을 수 있도록 최선을 다하겠습니다.'
          }
        </FAQDropdown>
        <FAQDropdown
          title={'온라인으로 받은 손해사정서도 법적으로 유효한가요?'}
        >
          보험업법 시행령 제99조에 따라 손해사정서 온라인 전송이 가능합니다.
          또한 금융감독원과 3차례 이상의 논의를 거쳐 온라인 손해사정서의
          유효성을 검증받았습니다.
        </FAQDropdown>
        <FAQDropdown
          title={'손해사정서에 대한 회신도 온라인으로 보낼 수 있나요?'}
        >
          {
            '보험업 감독규정 제9-21조에 따라 보정 요청은 서면으로만 진행되어야 합니다.\n금융감독원에 문의 결과, 손해사정서와 달리 보정 정정에 대한 회신은 법령에 따라 서면으로 받아야 한다고 답변받았습니다. \n사고링크는 규제 샌드박스 등 다양한 방법으로 상황을 개선하기 위해 노력하고 있으며, 보험 관계자분들과 온라인으로 더 편리하게 커뮤니케이션할 수 있도록 최선을 다하겠습니다.'
          }
        </FAQDropdown>
        <FAQDropdown title={'민원을 유발하는 행위를 하고 있지 않나요?'}>
          {
            '사고링크는 보험업 감독규정에 따라 민원 유발을 하지 않습니다.\n고객(교통사고 피해자)이 보험사에 민원을 제기한 경우, 내용은 확인하더라도 고객으로부터 금액을 받지는 않습니다.'
          }
        </FAQDropdown>
        {/* */}
      </div>
      <BottomSheet>
        <button
          className='typo-b1m mb-5 h-[53px] w-[320px] rounded-full bg-[#004FFF]'
          onClick={() => navigator('/report')}
        >
          손해사정서 확인하기
        </button>
      </BottomSheet>
    </div>
  )
}
