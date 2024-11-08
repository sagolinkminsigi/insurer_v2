import { Layout } from '@/components/custom/layout'
import {
  MenuCarousel,
  MenuCarouselContent,
  MenuCarouselItem,
} from '@/components/ui/menu-carousel'
import { cn } from '@/lib/utils'
import { createContext, useContext, useState } from 'react'
import { AccidentsProvider } from './accidents-provider'
import { format } from '@/lib/format'
import { RedoModal } from './redo-modal'
const PROCESS_MAP = [
  '사고 날짜',
  '사고 유형',
  '과실 비율',
  '부상 부위',
  '치료 기간',
]
const DEFAULT_SECTION_INDEX = 0
export default function Accidents() {
  const [sectionIndex, setSectionIndex] = useState(DEFAULT_SECTION_INDEX)
  const [date, setDate] = useState<Date | undefined>()
  const [accident, setAccident] = useState<string | undefined>()
  const [negligence, setNegligence] = useState<number | undefined>()
  const [injuries, setInjuries] = useState<string[]>([])
  const [period, setPeriod] = useState<[number, number] | undefined>()

  const goNext = () => setSectionIndex(sectionIndex + 1)
  const getTitle = (value: string) => {
    switch (value) {
      case '사고 날짜':
        return date ? format.date(date) : '사고 날짜'
      case '사고 유형':
        return accident
          ? accident.split('vs').slice(0, 2).join('vs')
          : '사고 유형'
      case '과실 비율': {
        const formattedNeglience = format.ratio(negligence || 0)
        return negligence
          ? `${100 - formattedNeglience}:${formattedNeglience}`
          : '과실 비율'
      }
      case '부상 부위': {
        if (injuries.length === 0) return '부상 부위'
        if (injuries.length === 1) return injuries[0]
        return `${injuries[0]} ${injuries.length - 1} 건`
      }
      case '치료 기간':
        return period ? `입원 ${period[0]}일, 통원 ${period[1]}일` : '치료 기간'
      default:
        return ''
    }
  }
  const limit = [
    !!date,
    !!accident,
    !!negligence,
    injuries.length > 0,
    !!period,
  ].lastIndexOf(true)

  return (
    <Layout className='bg-gradient-200'>
      <div className="absolute h-0 w-0 bg-[url('/src/assets/body.png')] [z-index:-1]"></div>
      <Layout.Header fixed>
        <RedoModal />
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.start,
          Layout.styles.body.maxwidth,
          'pt-9'
        )}
      >
        <MenuCarousel
          limit={limit}
          startIndex={sectionIndex}
          onPageChange={setSectionIndex}
        >
          <MenuCarouselContent>
            {PROCESS_MAP.map((process, index) => (
              <MenuCarouselItem key={process} index={index}>
                {getTitle(process)}
              </MenuCarouselItem>
            ))}
          </MenuCarouselContent>
        </MenuCarousel>
        <AccidentsStateContext.Provider
          value={{
            date,
            setDate,
            accident,
            setAccident,
            negligence,
            setNegligence,
            injuries,
            setInjuries,
            period,
            setPeriod,
            goNext,
          }}
        >
          <AccidentsProvider index={sectionIndex} />
        </AccidentsStateContext.Provider>
      </Layout.Body>
    </Layout>
  )
}

interface AccidentsStateContext {
  date: Date | undefined
  accident: string | undefined
  negligence: number | undefined
  injuries: string[]
  period: [number, number] | undefined
  setDate: (date: Date | undefined) => void
  setAccident: (value: string | undefined) => void
  setNegligence: (value: number | undefined) => void
  setInjuries: (value: string[]) => void
  setPeriod: (value: [number, number] | undefined) => void
  goNext: () => void
}
// Context 생성
const AccidentsStateContext = createContext<AccidentsStateContext | undefined>(
  undefined
)
export const useAccidentsState = (): AccidentsStateContext => {
  const context = useContext(AccidentsStateContext)
  if (context === undefined) {
    throw new Error(
      'useAccidentsState must be used within a GlobalStateProvider'
    )
  }
  return context
}
