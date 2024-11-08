import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Star from '@/assets/star.svg'
import { HTMLAttributes, useEffect, useState } from 'react'
import { HighlightDiv } from '@/components/highlight-div'
import { cn } from '@/lib/utils'
import { format } from '@/lib/format'

const REVIEWS = [
  {
    compensation: '좋았어요',
    manager: '좋았어요',
    rate: 5,
    desc: '일단 보험사가 어이없는 합의금 제시하면 바로 사고링크 접수하세요. \b담당자랑 다툴 일 없이 최소 평균적인 보상은 받을 수 있어요!',
    author: '변변변',
    date: '24.10.26',
  },
  {
    compensation: '좋았어요',
    manager: '좋았어요',
    rate: 5,
    desc: '솔직히 반신반의했는데 일처리도 빠르고 합의금액도 기대 이상이였어요. 다른 분들에게 추천하고 싶네요.',
    author: '강강강',
    date: '24.10.08',
  },
  {
    compensation: '좋았어요',
    manager: '좋았어요',
    rate: 5,
    desc: '일처리도 빠르시고 까다롭기로 소문난 공제조합 상대로 적지 않은 금액을 받아주셨어요!',
    author: '최최최',
    date: '24.09.17',
  },
]

export const TrafficSecitonCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <Carousel setApi={setApi} className='-mr-4'>
      <CarouselContent className='mb-4 w-[300px]'>
        {REVIEWS.map((review) => (
          <CarouselItem key={review.desc}>
            <div className='typo-c1m flex h-[145px] flex-col justify-between rounded-[20px] bg-white px-3 py-3'>
              <div>
                <StarRate rate={review.rate} className='pb-2' />
                <div className='pb-1'>
                  <span className='pr-1 text-gray-500'>보상금</span>
                  <span className='pr-2 text-gray-900'>
                    {review.compensation}
                  </span>
                  <span className='pr-1 text-gray-500'>담당 매니저</span>
                  <span className='text-gray-900'>{review.manager}</span>
                </div>
                <HighlightDiv
                  className='text-gray-500'
                  boldClass='text-gray-900'
                >
                  {review.desc}
                </HighlightDiv>
              </div>
              <div className='text-gray-400'>{`${format.maskingString(review.author)} ${review.date}`}</div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <DotNavigator length={count} selectedIndex={current} />
    </Carousel>
  )
}
interface StarRateProps extends HTMLAttributes<HTMLDivElement> {
  rate: number
}
const StarRate = ({ rate, className = '', ...props }: StarRateProps) => {
  return (
    <div className={`flex gap-[1.6px] ${className}`} {...props}>
      {Array.from({ length: rate }).map((_, index) => (
        <img width={10} height={10} src={Star} key={index} />
      ))}
    </div>
  )
}
interface DotNavigatorProps {
  length: number
  selectedIndex: number
}
const DotNavigator = ({ length, selectedIndex }: DotNavigatorProps) => {
  return (
    <div className='flex place-content-center gap-1'>
      {Array.from({ length: length }).map((_, index) => (
        <div
          className={cn(
            selectedIndex - 1 === index
              ? 'w-5 bg-gray-500'
              : 'w-1.5 bg-gray-300',
            'h-1.5 rounded-full transition-all'
          )}
          key={index}
        ></div>
      ))}
    </div>
  )
}
