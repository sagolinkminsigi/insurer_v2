'use client'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { format } from '@/lib/format'
import { useAddEventListener } from '@/hooks/use-add-eventlistener'
import { BottomSheet } from '@/components/bottom-sheet'
import { AccidentsWrapper } from './accident-wrapper'
import { Alert } from './accident-alert'
import { useAccidentsState } from '.'
import { cn } from '@/lib/utils'

import AlertLogo from '@/assets/alert.svg'
import { RatioModal } from './ratio-modal'
const ALERT_MESSAGE = '본인 과실이 50% 이상인 경우, 손해사정이 어려울 수 있어요'
const NEXT_PAGE = 'injure'
const TITLE = '내 과실을 선택해주세요'
export const RatioSection = () => {
  const { negligence, setNegligence, goNext } = useAccidentsState()
  const [current, setCurrent] = useState(negligence ? negligence : 50)
  const [isTouching, setIsTouching] = useState(false)
  const formattedCurrent = format.ratio(current)
  const opposite = 100 - formattedCurrent
  const sliderRef = useRef<HTMLDivElement>(null)
  const isPossible = current < 50
  const handleTouchStart = () => setIsTouching(true)
  const handleTouching = (event: React.MouseEvent) => handleSlide(event)
  const handleTouchEnd = () => setIsTouching(false)

  const handleSlide = (event: React.MouseEvent) => {
    if (!isTouching && event.type !== 'click') return
    const clickX = event.clientX

    const container = sliderRef.current
    if (!container) return
    const containerRight = container.getBoundingClientRect().right
    const containerWidth = container.getBoundingClientRect().width

    const relativeX = clickX - containerRight

    const percentageX = -(relativeX / containerWidth) * 100

    setCurrent(Math.round(percentageX))
  }
  const handleSlideTouch = (event: React.TouchEvent) => {
    if (!isTouching && event.type !== 'touchmove') return

    const clickX = event.touches[0].clientX

    const container = sliderRef.current
    if (!container) return
    const containerRight = container.getBoundingClientRect().right
    const containerWidth = container.getBoundingClientRect().width
    const relativeX = clickX - containerRight
    const percentageX = -(relativeX / containerWidth) * 100
    setCurrent(Math.round(percentageX))
  }

  const handleClick = () => {
    setNegligence(current)
    goNext()
  }
  useAddEventListener('mouseup', handleTouchEnd)
  useAddEventListener('mousemove', handleTouching)

  return (
    <>
      <h2 className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</h2>
      <AccidentsWrapper className='relative overflow-hidden bg-primary-100'>
        <div className='pt-20'>
          <div className='flex place-content-center gap-2 text-center'>
            <div className='flex w-[95hx] flex-col text-gray-500'>
              <div className='typo-st1sb mb-5'>상대</div>
              <div className='typo-h2b'>{opposite}</div>
              <span className='typo-c1m rounded bg-gray-500 px-2 text-white'>
                가해자
              </span>
            </div>

            <div className='flex w-[95hx] flex-col text-gray-500'>
              <div className='typo-st1sb mb-5 text-transparent'>:</div>
              <div className='typo-h2b text-gray-400'>:</div>
              <span className='typo-c1m px-2 text-transparent'>:</span>
            </div>

            <div
              className={cn(
                'flex w-[95hx] flex-col',
                isPossible ? 'text-positive-300' : 'text-negative-200'
              )}
            >
              <div className='typo-st1sb mb-5'>나</div>
              <div className='typo-h2b'>{formattedCurrent}</div>
              <span
                className={cn(
                  isPossible ? 'bg-positive-300' : 'bg-negative-200',
                  'typo-c1m rounded px-2 text-white'
                )}
              >
                피해자
              </span>
            </div>
          </div>

          <div
            className='absolute bottom-0 h-[40%] max-h-[189px] w-full select-none'
            onMouseDown={handleTouchStart}
            onTouchStart={handleTouchStart}
          >
            <div className='relative mx-1 flex h-7 flex-row-reverse justify-between'></div>
            <div className='bottom-0 left-0 h-[160px] w-full bg-gray-500 px-1'>
              <div
                ref={sliderRef}
                onClick={handleTouching}
                onTouchMove={handleSlideTouch}
                className='relative flex h-[160px] flex-row-reverse border-x border-l-[rgba(255,255,255,0.3)]'
              >
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className={`relative z-10 flex-1 border-r text-gray-400 ${
                      index % 2 === 0
                        ? 'border-r-[rgba(255,255,255,0.1)]'
                        : 'border-r-[rgba(255,255,255,0.3)]'
                    }`}
                  >
                    <span className='typo-c1m absolute -translate-x-1/2 -translate-y-full'>
                      {index % 2 === 0 || (index + 1) * 5 === 100
                        ? ''
                        : (index + 1) * 5}
                    </span>
                  </div>
                ))}
                <div
                  className='absolute bottom-0 h-[180px] w-0.5 bg-pink-500'
                  style={{
                    right: `${current < 0 ? 0 : Math.min(Math.round(current / 5) * 5, 100)}%`,
                  }}
                >
                  <div className='absolute left-[1px] top-0 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-l-[4px] border-r-[4px] border-t-[12px] border-transparent border-t-pink-500'></div>

                  <div
                    className={`absolute bottom-0 left-0.5 h-[160px] w-screen ${
                      isPossible ? 'bg-positive-200' : 'bg-negative-100'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccidentsWrapper>

      <BottomSheet className={cn(BottomSheet.styles.center)}>
        {!isPossible && (
          <BottomSheet.Alert className='typo-c1m relative mx-5 mb-5 flex items-center gap-2 rounded-[10px] bg-negative-200 p-2.5 text-white'>
            <img width={24} height={24} alt='alert image' src={AlertLogo} />
            {ALERT_MESSAGE}
          </BottomSheet.Alert>
        )}
        <RatioModal onClick={handleClick} />
        {/* <BottomSheet.Button onClick={handleClick}>다음</BottomSheet.Button> */}
      </BottomSheet>
    </>
  )
}
