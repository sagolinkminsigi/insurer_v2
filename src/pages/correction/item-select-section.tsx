import { useState } from 'react'
import { useCorrectionContext } from '.'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { UnitInput } from '@/components/ui/unit-input'
import { TextArea } from '@/components/ui/textarea'
const TITLE = '이의가 있는 항목을 알려주세요'

const NEXT_PAGE_INDEX = 1

const MAX_LENGTH = 1000
const PLACE_HODLER = '위자료에 대한 추가 의견을 입력해주세요'
export const ItemSelectSection = () => {
  const { price, setPrice, navigate } = useCorrectionContext()

  const handleNavigate = () => navigate(NEXT_PAGE_INDEX)

  const toggleCheckBox = (v: number) => {
    setPrice([
      ...price.slice(0, v),
      { ...price[v], isActive: !price[v].isActive },
      ...price.slice(v + 1),
    ])
  }
  const updatePriceHandler = (v: number) => {
    return (updatedPrice: string) => {
      setPrice([
        ...price.slice(0, v),
        { ...price[v], updatePrice: updatedPrice },
        ...price.slice(v + 1),
      ])
    }
  }
  const updateReason = (v: number) => {
    return (updatedReason: string) => {
      setPrice([
        ...price.slice(0, v),
        { ...price[v], reason: updatedReason },
        ...price.slice(v + 1),
      ])
    }
  }

  const revisedPrice = price.reduce(
    (acc, cur) =>
      acc + Number(cur.updatePrice.length === 0 ? cur.price : cur.updatePrice),
    0
  )
  return (
    <>
      <div className='flex select-none flex-col items-center'>
        <div className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</div>
        <div className='typo-b2sb flex w-full justify-between'>
          <div className='text-gray-300'>사고링크 손해사정 금액</div>
          <div className='text-gray-300'>2,800,000원</div>
        </div>
        <div className='typo-b2sb flex w-full justify-between'>
          <div className='text-gray-400'>보정 요청 금액</div>
          <div className='text-pink-400'>{revisedPrice.toLocaleString()}원</div>
        </div>
        <div className='mb-[28px] mt-5 flex w-full flex-col gap-3'>
          {price.map((item, index) => (
            <div
              key={index}
              className={cn(
                item.isActive ? 'bg-primary-100' : 'bg-white',
                'flex items-center gap-2 rounded-xl p-3'
              )}
            >
              <Checkbox
                id='agreement-personal-info'
                isChecked={item.isActive}
                onChangeCheck={() => toggleCheckBox(index)}
                title={item.name}
                className='w-full'
                iconStyle='w-6 h-6'
              >
                {item.isActive && (
                  <>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className='w-full'
                    >
                      <div className='mb-[10px] flex w-full items-center justify-between gap-[25px] pl-7'>
                        <span className='text-pink-600'>위자료 보정요청</span>
                        <UnitInput
                          type='number'
                          value={item.updatePrice}
                          autoFocus={true}
                          autoBlur={true}
                          onValueChange={updatePriceHandler(index)}
                          placeholder='금액 입력'
                          wrapperStyle='flex-1'
                          inputStyle='flex-1 placeholder:text-pink-300 placeholder:typo-b1m text-pink-500 border-b-pink-500'
                        >
                          <span className='typo-b1m text-gray-900'>원</span>
                        </UnitInput>
                      </div>
                      <TextArea
                        size={'l'}
                        value={item.reason}
                        max={MAX_LENGTH}
                        placeholder={PLACE_HODLER}
                        onChange={updateReason(index)}
                        status={item.reason.length < 10 ? 'error' : 'success'}
                        errorMsg='*10자 이상 입력해주세요'
                        textareaStyle='text-gray-900'
                        maxStyle='text-gray-400'
                      />
                    </div>
                  </>
                )}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet className={cn(BottomSheet.styles.center)}>
        <BottomSheet.Button onClick={handleNavigate}>다음</BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
