'use client'

import { useAccidentsState } from '.'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'
import { BottomSheet } from '@/components/bottom-sheet'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer'
const accidentType = [
  '상대가 뒤에서 추돌',
  '상대가 옆에서 끼어듦',
  '상대가 교차로에서 차선 변경',
  '상대가 정차 중 갑자기 출발',
  '상대가 신호 위반',
  '신호없는 교차로 (내 차가 왼쪽)',
  '신호없는 교차로 (내 차가 오른쪽)',
  '기타',
]
// import { useRouter } from "next/navigation";
// import { useGlobalState } from "@/store/GlobalStateProvider";
const SelectorStyle = {
  selected: 'border-primary-500 bg-primary-50 text-primary-500',
  default: 'border-gray-200 text-gray-400',
}

interface DetailAccidentModalProps {
  onClick: (v: string) => void
  disabled?: boolean
  buttonText: string
}
export const TypeModal = (props: DetailAccidentModalProps) => {
  const { accident } = useAccidentsState()
  const [opposite, me, detailAccident] = accident
    ? accident?.split('vs')
    : ['차', '차', '']
  const detailIndex = accidentType.findIndex((v) => v === detailAccident)
  return (
    <Drawer>
      <DrawerTrigger className='w-full'>
        <BottomSheet.ModalButton disabled={props.disabled}>
          사고 원인 선택하기
        </BottomSheet.ModalButton>
      </DrawerTrigger>
      <DrawerContent className={cn('bg-white')}>
        <DrawerHeader className='gap-6 py-6 pb-0'>
          <div className='typo-st1sb text-center text-gray-900'>
            더욱 정확한 보상금 계산을 위해 <br />
            <span className='text-primary-600'>구체적인 상황</span>을
            선택해주세요!
          </div>
          <DrawerTitle className='typo-b1sb mx-auto mb-7 w-fit border-b-2 border-b-gray-400 text-center text-gray-400'>
            {props.buttonText}
          </DrawerTitle>
        </DrawerHeader>
        <ul className='flex flex-col gap-2 px-4 pb-6'>
          {accidentType.map((accidentItem, index) => (
            <li
              key={index}
              className={cn(
                SelectorStyle[detailIndex === index ? 'selected' : 'default'],
                'gray-400 typo-b2sb rounded-xl border px-2 py-[9px]'
              )}
              onClick={() => props.onClick(accidentType[index])}
            >
              {accidentItem}
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}
