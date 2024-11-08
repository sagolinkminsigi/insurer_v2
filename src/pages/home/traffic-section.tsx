import { FormattedDiv } from '@/components/formatted-div'

import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import MemoDocs from '@/assets/memo_docs.svg'
import DoNotCall from '@/assets/do_not_call.svg'
import Best from '@/assets/best.svg'
import { useNavigate } from 'react-router-dom'
import { TrafficSecitonCarousel } from './traffic-carousel'
import { GiftBanner } from '@/components/banner/gift-banner'
import { TabBar } from '@/components/tab-bar'

import Recommend from '/src/assets/recommend.svg'
import Board from '/src/assets/board.svg'
import Man from '/src/assets/man.svg'
import Notes from '/src/assets/notes.svg'
import Bubble from '/src/assets/bubble.svg'

const PROCESS = [
  {
    src: Recommend,
    text: '접수',
  },
  {
    src: Board,
    text: '손해사정사\n확인',
  },
  {
    src: Man,
    text: '손해사정서\n작성',
  },
  {
    src: Notes,
    text: '보험사\n검토',
  },
  {
    src: Bubble,
    text: '완료',
  },
]
export const TrafficSeciton = () => {
  const navigate = useNavigate()
  const handleClick = () => navigate('/accidents_entrance')
  return (
    <>
      <div className='-mx-4 overflow-scroll'>
        <div className='mt-10 flex w-fit items-center gap-2 rounded-[20px] pb-10'>
          <div className='ml-4 flex h-[120px] w-[120px] flex-col justify-between rounded-[20px] bg-gradient-300 p-4'>
            <FormattedDiv className='typo-c1m font-bold text-white'>
              {'알아서 착착!\n똑똑하게 진행해요'}
            </FormattedDiv>
            <div className='flex h-10 items-center justify-center'>
              <img width={40} height={30} src={MemoDocs} />
            </div>
          </div>
          <div className='flex h-[120px] w-[120px] flex-col justify-between rounded-[20px] bg-pink-100 p-4'>
            <FormattedDiv className='typo-c1m font-bold text-gray-900'>
              {'전문가가 직접\n해결해드려요'}
            </FormattedDiv>
            <div className='flex h-10 items-center justify-center'>
              <img width={28} height={24} src={DoNotCall} />
            </div>
          </div>
          <div className='flex h-[120px] w-[120px] flex-col justify-between rounded-[20px] bg-positive-100 p-4'>
            <FormattedDiv className='typo-c1m font-bold text-gray-900'>
              {'치료에만\n전념할 수 있어요'}
            </FormattedDiv>
            <div className='flex h-10 items-center justify-center'>
              <img width={36} height={31} src={Best} />
            </div>
          </div>
        </div>
      </div>
      <div className='text-gray-900'>
        <h2 className='typo-b1sb pb-4 text-gray-900'>
          사고링크에 맡기면 어떻게 진행되나요?
        </h2>

        <div className='typo-c1m mb-10 flex items-center pb-[42px] text-center'>
          {PROCESS.map((process, index) => (
            // <div key={index} className='relative flex'>
            <Fragment key={index}>
              {index !== 0 && (
                <ChevronRight className={`h-5 w-5 text-gray-400`} />
              )}
              <div className='relative'>
                <img
                  src={process.src}
                  alt='recommend'
                  width={52}
                  height={52}
                  className='p-2.5'
                />
                <FormattedDiv className='absolute left-1/2 top-full -translate-x-1/2 break-keep text-center'>
                  {process.text}
                </FormattedDiv>
              </div>
            </Fragment>
          ))}
        </div>
        <h2 className='typo-b1sb pb-4 text-gray-900'>
          사고링크를 이용한 고객분들의 이야기
        </h2>
        <TrafficSecitonCarousel />
        <GiftBanner className='mb-[146px] mt-10' />
      </div>
      <BottomSheet>
        <Button
          size={'lg'}
          className='typo-b1sb absolute -top-4 left-1/2 h-fit -translate-x-1/2 -translate-y-full rounded-[50px] bg-primary-500 p-[13.5px] px-[47px]'
          onClick={handleClick}
        >
          내 예상 보상금 확인하기
        </Button>
        <TabBar />
      </BottomSheet>
    </>
  )
}
