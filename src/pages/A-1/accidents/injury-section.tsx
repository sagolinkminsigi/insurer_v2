import { useState } from 'react'
import X from '@/assets/x.svg?react'
import { cn } from '@/lib/utils'
import { AccidentsWrapper } from './accident-wrapper'
import { BottomSheet } from '@/components/bottom-sheet'
import { InjuryModal } from './injury-modal'
import { useAccidentsState } from '.'

import AlertLogo from '@/assets/alert.svg'
import { injuriesbyBodyPart, injuriesMapping } from '@/constants/accidents'
// import { useProcessorRouter } from "@/hooks/useProcessRouter";
const TITLE = '사고로 다친 부위를 알려주세요'
const injuryInfo = injuriesMapping.map((injuryMapping) => {
  return {
    style: injuryMapping.style,
    name: injuryMapping.name,
    details: Object.values(injuriesbyBodyPart[injuryMapping.bodyPart]).map(
      (bodyPart) => bodyPart.description
    ),
  }
})
// const injuryInfo = [
//   {
//     style: 'top-[1%] left-[44%]',
//     name: '머리, 목',
//     details: [
//       '목 뒤 통증',
//       '뇌진탕',
//       '목 디스크',
//       '뇌출혈',
//       '치아',
//       '기타 손상',
//       '기타 골절',
//     ],
//   },
//   {
//     style: 'top-[20%] left-[55%]',
//     name: '어깨, 쇄골',
//     details: ['타박상', '기타 통증', '쇄골 골절', '어깨 골절', '기타 골절'],
//   },
//   {
//     style: 'top-[30%] left-[60%]',
//     name: '허리, 갈비',
//     details: ['허리 통증', '타박상', '허리 디스크', '척추 골절', '기타 골절'],
//   },
//   {
//     style: 'top-[45%] left-[10%]',
//     name: '팔, 팔꿈치',
//     details: ['타박상', '기타 통증', '팔 골절', '팔꿈치 골절', '기타 골절'],
//   },
//   {
//     style: 'top-[42%] left-[44%]',
//     name: '손, 손목',
//     details: [
//       '타박상',
//       '기타 통증',
//       '손가락 골절',
//       '손목 골절',
//       '손등 골절',
//       '기타 골절',
//     ],
//   },
//   {
//     style: 'top-[55%] left-[55%]',
//     name: '골반',
//     details: ['타박상', '기타 통증', '골반 골절', '엉덩이뼈 골절', '기타 골절'],
//   },
//   {
//     style: 'top-[70%] left-[44%]',
//     name: '다리, 무릎',
//     details: [
//       '타박상',
//       '기타 통증',
//       '십자인대 파열',
//       '무릎 골절',
//       '정강이 골절',
//       '허벅지 골절',
//       '기타 골절',
//     ],
//   },
//   {
//     style: 'top-[89%] left-[55%]',
//     name: '발, 발목',
//     details: [
//       '타박상',
//       '기타 통증',
//       '발가락 골절',
//       '발등 골절',
//       '발목 골절',
//       '기타 골절',
//     ],
//   },
// ]

const ALERT_MESSAGE = '부상 부위는 최대 5개까지만 선택할 수 있어요'
export const InjurySection = () => {
  const { injuries, setInjuries, goNext } = useAccidentsState()
  const [currentInjury, setCurrentInjury] = useState<string[]>(injuries)
  const toggleInjury = (injury: string) => {
    if (currentInjury.includes(injury))
      return setCurrentInjury((updateInjuries) =>
        updateInjuries.filter((i) => i !== injury)
      )
    if (currentInjury.length >= 5) return
    return setCurrentInjury((updateInjuries) => [...updateInjuries, injury])
  }
  const handleClick = () => {
    setInjuries(currentInjury)
    goNext()
  }
  return (
    <>
      <h2 className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</h2>
      <AccidentsWrapper className='typo-b2sb relative flex select-none flex-col overflow-x-scroll bg-primary-100 py-4'>
        <span className='absolute left-4 top-4 px-1 py-[5px] text-gray-900'>
          {currentInjury.length}
          <span className='text-gray-400'>/5</span>
        </span>
        <div className='mb-4 ml-[54px]'>
          <div
            className={cn(
              currentInjury.length === 0 ? '' : 'border-l',
              'flex h-[32px] gap-2 overflow-x-scroll overflow-y-scroll border-l-gray-300 px-2'
            )}
          >
            {currentInjury.map((injury, index) => {
              const [part, detailInjury] = injury.split(':')
              return (
                <span
                  className='flex items-center gap-1 whitespace-nowrap rounded-[50px] bg-white px-2 py-[5px]'
                  key={index}
                >
                  <span className='text-primary-400'>{part}</span>
                  <span className='text-gray-900'>{detailInjury}</span>

                  <span
                    className='h-5 w-5 text-center'
                    onClick={() => toggleInjury(injury)}
                  >
                    <X width={20} height={20} className='text-gray-400' />
                  </span>
                </span>
              )
            })}
          </div>
        </div>
        <div className='relative h-full w-full flex-1'>
          <div className="absolute inset-0 m-auto aspect-square max-h-full max-w-full bg-[url('/src/assets/body.png')] bg-contain bg-center">
            {injuryInfo.map((injury) => (
              <InjuryModal
                key={injury.name}
                className={injury.style}
                details={injury.details}
                name={injury.name}
                toggleInjuries={toggleInjury}
                selectedInjuries={currentInjury}
              />
            ))}
          </div>
        </div>
      </AccidentsWrapper>
      <BottomSheet className={cn(BottomSheet.styles.center)}>
        {currentInjury.length >= 5 && (
          <BottomSheet.Alert className='typo-c1m relative mx-5 mb-5 flex items-center gap-2 rounded-[10px] bg-negative-200 p-2.5 text-white'>
            <img width={24} height={24} alt='alert image' src={AlertLogo} />
            {ALERT_MESSAGE}
          </BottomSheet.Alert>
        )}

        <BottomSheet.Button
          disabled={currentInjury.length === 0}
          onClick={handleClick}
        >
          다음
        </BottomSheet.Button>
      </BottomSheet>
    </>
  )
}
