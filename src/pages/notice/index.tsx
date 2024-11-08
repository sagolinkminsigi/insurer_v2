import { BottomSheet } from '@/components/bottom-sheet'
import { ButtonWrapper } from '@/components/button-wrapper'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { TabBar } from '@/components/tab-bar'
import { UserNav } from '@/components/user-nav'
import { cn } from '@/lib/utils'
import { format, isSameMonth, isSunday } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const date = [
  {
    date: '2024-11-2',
    title: '손해 사정 종료',
    subtitle:
      '사고링크 손해사정은 어떠셨나요?\n서비스 개선을 위해 후기를 남겨주세요!',
    button: '후기 작성하기',
    url: '/',
  },
  {
    date: '2024-11-1',

    title: '문의 검토중',
    subtitle: '김사고님의 문의 내용을 검토중이에요.',
    button: '',
    url: '/',
  },
  {
    date: '2024-10-27',

    title: '손해 사정 보정',
    subtitle:
      '보험사와 사고링크 담당자가 김사고님의 보상금을 보정하는 중이에요.',
    button: '보정 금액 확인하기',
    url: '/',
  },
  {
    date: '2024-10-26',

    title: '보험사 검토',
    subtitle: '손해 사정 내용을 보험사에서 검토중이에요.',
    button: '',
    url: '/',
  },
  {
    date: '2024-10-25',

    title: '중단',
    subtitle: '김사고님의 요청으로 손해 사정을 잠시 멈췄어요.',
    button: '이어서 진행해주세요',
    url: '/',
  },
  {
    date: '2024-10-24',

    title: '문의 검토중',
    subtitle: '김사고님의 문의 내용을 검토중이에요.',
    button: '',
    url: '/',
  },
  {
    date: '2024-10-23',

    title: '손해 사정 금액 결정 완료',
    subtitle:
      '김사고님의 손해 사정 계산이 완료되었어요!\n김사고님께 확인받고 진행할게요.',
    button: '금액 확인하기',
    url: '/',
  },
  {
    date: '2024-10-22',

    title: '손해 사정 금액 계산중',
    subtitle: '김사고님의 손해 사정 금액을 계산하는 중이에요.',
    button: '',
    url: '/',
  },
  {
    date: '2024-10-21',

    title: '담당자 확인',
    subtitle: '접수 내용을 꼼꼼하게 확인중이에요.',
    button: '',
    url: '/',
  },
  {
    date: '2024-10-20',

    title: '사고링크에 맡기기',
    subtitle:
      '사고링크에 맡기기가 성공적으로 완료되었어요.\n곧 담당자가 확인할 예정이에요.',
    button: '',
    url: '/',
  },
  {
    date: '2024-10-19',

    title: '추가 정보 입력중',
    subtitle: '접수를 위해 추가적인 정보를 입력해주세요!',
    button: '추가 정보 입력하기',
    url: '/',
  },
  {
    date: '2024-10-18',

    title: '사고 정보 입력 완료',
    subtitle: '예상 보상금을 확인한 후 사고링크에 맡겨보세요!',
    button: '예상 보상금 보기',
    url: '/',
  },
  {
    date: '2024-10-17',

    title: '사고 정보 입력중',
    subtitle:
      '아직 입력하지 않은 정보가 있어요.\n이어서 입력하고 예상 보상금을 확인해보세요!',
    button: '이어서 입력하기',
    url: '/',
  },
]

const NoticeStyle = {
  active: {
    title: 'typo-b1sb text-primary-500',
    subtitle: 'typo-c1m text-gray-400',
    button: 'bg-primary-500',
    wrapper: 'bg-white',
  },
  inactive: {
    title: 'typo-b1sb text-primary-900',
    subtitle: 'typo-c1m text-gray-500',
    button: 'bg-gray-400',
    wrapper: 'bg-white opacity-60',
  },
}

interface MessageStatus {
  date: Date
  title: string
  subtitle: string
  button: string
  url: string
  state: 'active' | 'inactive'
}

const HEADER_TITLE = '이용/알림 내역'
/**
 *
 * TODO: 비어있는 화면을 구현하기 위하여 2초뒤에 비어있는 화면에서 차있는 화면으로 전환을 넣었습니다
 * 지금 현재 active에 대한 정확한 정책이 정해지지 않아서 우선은 첫번쨰를 제외한 것은 Inactive로 상태를 넣었습니다
 */
export default function Notice() {
  const [notices, setNotices] = useState<typeof date>([])

  useEffect(() => {
    const timeStamp = setTimeout(() => setNotices(date), 1000)
    return () => clearTimeout(timeStamp)
  }, [])
  if (notices.length === 0)
    return (
      <Layout className={Layout.styles.bg.gray100}>
        <Layout.Header fixed className='bg-white' main>
          <div>{HEADER_TITLE}</div>
        </Layout.Header>

        <Layout.Body
          className={cn(
            Layout.styles.body.center,
            Layout.styles.bg.white,
            'relative overflow-auto px-4'
          )}
        >
          <div className='flex flex-col items-center gap-5'>
            <img
              src={'/src/assets/bubble_dots.svg'}
              alt='kt'
              width={60}
              height={60}
            />
            <FormattedDiv className='typo-b1sb text-center text-gray-900'>
              {'아직 이용 내역이 없어요.\n예상 보상금을 확인해보세요!'}
            </FormattedDiv>

            <ButtonWrapper className='w-full rounded-[14px] bg-primary-500 px-[26px] py-2.5 text-white'>
              내 예상 보상금 확인하기
            </ButtonWrapper>
          </div>
        </Layout.Body>
        <BottomSheet>
          <TabBar />
        </BottomSheet>
      </Layout>
    )
  return (
    <Layout className={Layout.styles.bg.gray100}>
      <Layout.Header fixed className='bg-white' main>
        <div className='typo-t1b text-gray-900'>{HEADER_TITLE}</div>
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.bg.primary900,
          Layout.styles.body.start,
          Layout.styles.body.pb,
          Layout.styles.body.pt,
          Layout.styles.body.maxwidth,
          `relative h-full overflow-auto px-4`
        )}
      >
        {/* <div className='absolute ml-[47px] h-full w-[1px] bg-gray-600' /> */}
        <div className='ml-[31px] border-l border-l-gray-600 pb-[122px] pl-3.5 pt-4'>
          {notices.map((props, index) => {
            const currentDate = new Date(props.date)
            const isMonthSplitter =
              index === 0 ||
              !isSameMonth(date[Math.max(index - 1, 0)].date, currentDate)

            return (
              <Fragment key={index}>
                {isMonthSplitter && (
                  <div className='typo-b2sb mb-5 py-[9px] text-center text-gray-400'>
                    {format(date[index].date, 'yyyy년 M월', { locale: ko })}
                  </div>
                )}
                <Message
                  {...props}
                  date={currentDate}
                  state={index !== 0 ? 'inactive' : 'active'}
                />
              </Fragment>
            )
          })}
        </div>
        <BottomSheet>
          <TabBar />
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}

const Message = ({
  date,
  title,
  subtitle,
  button,
  url,
  state,
}: MessageStatus) => {
  const updatedDate = new Date(date)
  const navigate = useNavigate()
  const isSundayDate = isSunday(updatedDate)

  return (
    <div className='relative'>
      <div
        className={cn(
          NoticeStyle[state].wrapper,
          'relative mb-5 rounded-2xl p-4'
        )}
      >
        <div className={cn(NoticeStyle[state].title, 'pb-1')}>{title}</div>
        <FormattedDiv className={cn(NoticeStyle[state].subtitle, 'pb-2')}>
          {subtitle}
        </FormattedDiv>
        {button.length > 0 && (
          <Button
            onClick={() => navigate(url)}
            className={cn(NoticeStyle[state].button, 'w-full rounded-[10px]')}
          >
            {button}
          </Button>
        )}
      </div>
      <div className='absolute -left-11 top-1/2 flex -translate-y-1/2 items-center gap-3'>
        <div className='flex w-4 flex-col items-center'>
          <div className='typo-c1m text-gray-200'>{updatedDate.getDate()}</div>
          <div
            className={cn(
              isSundayDate ? 'text-pink-300' : 'text-gray-400',
              'typo-c1m'
            )}
          >
            {format(date, 'E', { locale: ko })}
          </div>
        </div>
        <div className='top-1/2 h-1 w-1 rounded-full bg-white' />
      </div>
    </div>
  )
}
