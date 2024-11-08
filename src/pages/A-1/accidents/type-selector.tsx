'use client'

import { Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils'
import { VehicleToolTip } from './vehicle-tooltip'

const TypeStyle = {
  상대: {
    userButton: 'border-pink-300 text-pink-400',
    focusUserButton: 'bg-pink-400 text-white border-transparent',
    wrapper: 'rounded-l-[40px] bg-white',
    focusWrapper: 'rounded-l-[40px] bg-pink-200',
    typeWrapper: 'bg-pink-100',
    vehicleText: 'text-pink-700',
    tooltipDir: 'left' as 'left' | 'right',
    tooltipWrapper: 'bg-pink-800',
  },
  나: {
    userButton: 'border-primary-300 text-primary-600',
    focusUserButton: 'bg-primary-600 text-white border-transparent',
    wrapper: 'rounded-r-[40px] bg-gray-100',
    focusWrapper: 'rounded-r-[40px] bg-primary-200',
    typeWrapper: 'bg-white',
    vehicleText: 'text-primary-700',
    tooltipDir: 'right' as 'left' | 'right',
    tooltipWrapper: 'bg-primary-800',
  },
}

interface TypeSelectorProps {
  isFocus: boolean
  user: '상대' | '나'
  setVehicle: Dispatch<SetStateAction<string>>
  setSelectedSelectorIndex: Dispatch<SetStateAction<number>>
  totalValue: string[]
}
export const TypeSelector = ({
  isFocus,
  user,
  setVehicle,
  setSelectedSelectorIndex,
  totalValue,
}: TypeSelectorProps) => {
  const {
    userButton,
    focusUserButton,
    wrapper,
    typeWrapper,
    focusWrapper,
    vehicleText,
    tooltipDir,
    tooltipWrapper,
  } = TypeStyle[user]

  const handleClick = () => {
    if (user === '나' && totalValue[0] === '유형 선택') return
    if (user === '나') return setSelectedSelectorIndex(1)
    if (user === '상대') return setSelectedSelectorIndex(0)
  }
  const handleSelectorIndex = (n: number) => {
    if (n === 1 && totalValue[1] !== '유형 선택')
      return setSelectedSelectorIndex(2)
    return setSelectedSelectorIndex(n)
  }
  return (
    <div
      onClick={handleClick}
      className={cn(
        isFocus ? focusWrapper : wrapper,
        'flex w-1/2 flex-col items-center justify-center'
      )}
    >
      <div
        className={cn(
          `typo-b2sb mb-6 box-content w-14 rounded-[40px] border py-[5px] text-center`,
          isFocus ? focusUserButton : userButton
        )}
      >
        {user}
      </div>
      <div className={cn(typeWrapper, 'h-[110px] w-[110px] rounded-[30px]')} />
      <div className={cn(vehicleText, 'typo-b1sb relative mt-3 text-center')}>
        {totalValue[user === '상대' ? 0 : 1]}
        {isFocus && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={
              tooltipDir === 'left'
                ? 'absolute left-1/2 translate-x-1/2'
                : 'absolute right-1/2 translate-x-1/2'
            }
          >
            <VehicleToolTip
              wrapperStyle={tooltipWrapper}
              dir={tooltipDir}
              onChange={setVehicle}
              handleSelectorIndex={handleSelectorIndex}
            />
          </div>
        )}
      </div>
    </div>
  )
}
