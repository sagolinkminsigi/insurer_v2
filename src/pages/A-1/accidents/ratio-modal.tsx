'use client'

import { useAccidentsState } from '.'
import { cn } from '@/lib/utils'
import { Layout } from '@/components/custom/layout'
import { BottomSheet } from '@/components/bottom-sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { OXSelector } from '@/components/ui/ox-selector'
import { RadioCheckbox } from '@/components/ui/radio-checkbox'
import { ButtonWrapper } from '@/components/button-wrapper'

// import { useRouter } from "next/navigation";
// import { useGlobalState } from "@/store/GlobalStateProvider";
const SelectorStyle = {
  selected: 'border-primary-500 bg-primary-50 text-primary-500',
  default: 'border-gray-200 text-gray-400',
}

interface DetailAccidentModalProps {
  onClick: () => void
  disabled?: boolean
}

export const RatioModal = (props: DetailAccidentModalProps) => {
  const { accident } = useAccidentsState()
  const [selectedIndex, setSelectedIndex] = useState<string | undefined>(
    undefined
  )
  const [isAdjustingDispute, setIsAdjustingDispute] = useState(false)
  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <BottomSheet.ModalButton disabled={props.disabled}>
          다음
        </BottomSheet.ModalButton>
      </DialogTrigger>
      <DialogContent type='bottom'>
        <DialogHeader className='gap-6 py-6 pb-0'>
          <div className='typo-st1sb py-6 text-center text-gray-900'>
            지금 과실은 어떤 상태인가요?
          </div>
        </DialogHeader>
        <OXSelector
          className='px-4'
          value={selectedIndex}
          onSelectChange={setSelectedIndex}
        >
          <OXSelector.ButtonWrapper
            option='no'
            pending='bg-primary-50 typo-b2sb text-gray-500'
            selected='bg-primary-100 border-2 border-primary-800 typo-b2sb text-gray-500'
            excluded='bg-primary-100 typo-b2sb text-gray-500'
          >
            <OXSelector.Div
              pending='typo-t1b text-primary-600'
              excluded='typo-t1b text-primary-400'
              selected='typo-t1b text-primary-600'
            >
              확정
            </OXSelector.Div>
            과실이에요
          </OXSelector.ButtonWrapper>
          <OXSelector.ButtonWrapper
            option='yes'
            pending='bg-primary-50 typo-b2sb text-gray-500'
            selected='bg-primary-100 border-2 border-primary-800 typo-b2sb text-gray-500'
            excluded='bg-primary-100 typo-b2sb text-gray-500'
          >
            <OXSelector.Div
              pending='typo-t1b text-primary-600'
              excluded='typo-t1b text-primary-400'
              selected='typo-t1b text-primary-600'
            >
              예상
            </OXSelector.Div>
            과실이에요
          </OXSelector.ButtonWrapper>
        </OXSelector>
        <div className='flex h-[93px] items-center justify-center'>
          {selectedIndex === 'yes' && (
            <RadioCheckbox
              className={cn(
                isAdjustingDispute ? 'text-primary-500' : 'text-gray-300'
              )}
              onClick={() => setIsAdjustingDispute(!isAdjustingDispute)}
            >
              <div className={isAdjustingDispute ? '' : 'text-gray-500'}>
                분심위 조정중
              </div>
            </RadioCheckbox>
          )}
        </div>
        <div className='px-4'>
          <ButtonWrapper
            disabled={selectedIndex === undefined}
            className='mb-4 h-[42px] w-full rounded-[14px]'
            onClick={() => props.onClick()}
          >
            완료
          </ButtonWrapper>
        </div>
      </DialogContent>
    </Dialog>
  )
}
