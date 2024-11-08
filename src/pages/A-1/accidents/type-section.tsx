import { useState } from 'react'
import { TypeSelector } from './type-selector.tsx'
import { BottomSheet } from '@/components/bottom-sheet.tsx'

import { AccidentsWrapper } from './accident-wrapper.tsx'
import { TypeModal } from './type-modal.tsx'
import { useAccidentsState } from './index.tsx'
const TITLE = '김사고님은 무엇을 타고 있었나요?'
const NAVIGATION_DELAY = 500
export const TypeSection = () => {
  const { accident, setAccident, goNext } = useAccidentsState()
  const [opposite, me] = accident
    ? accident?.split('vs')
    : ['유형 선택', '유형 선택']
  const [selectedSelectorIndex, setSelectedSelectorIndex] = useState(0)
  const [currentOpposite, setCurrnetOpposite] = useState(opposite)
  const [currentMe, setCurrentMe] = useState(me)

  const handleClick = (v: string) => {
    setAccident(`${currentOpposite}vs${currentMe}vs${v}`)
    setTimeout(goNext, NAVIGATION_DELAY)
  }

  return (
    <>
      <h2 className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</h2>
      <AccidentsWrapper className='flex bg-primary-100'>
        <TypeSelector
          isFocus={selectedSelectorIndex === 0}
          user='상대'
          totalValue={[currentOpposite, currentMe]}
          setVehicle={setCurrnetOpposite}
          setSelectedSelectorIndex={setSelectedSelectorIndex}
        />
        <div className='typo-t1b absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] transform transform text-gray-900'>
          VS
        </div>
        <TypeSelector
          isFocus={selectedSelectorIndex === 1}
          user='나'
          totalValue={[currentOpposite, currentMe]}
          setVehicle={setCurrentMe}
          setSelectedSelectorIndex={setSelectedSelectorIndex}
        />
      </AccidentsWrapper>
      <BottomSheet className={BottomSheet.styles.center}>
        <TypeModal
          onClick={handleClick}
          disabled={currentMe === '유형 선택'}
          buttonText={`${currentOpposite} (상대) vs ${currentMe} (나)`}
        />
      </BottomSheet>
    </>
  )
}
