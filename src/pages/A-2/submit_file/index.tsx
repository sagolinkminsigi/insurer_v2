import { Layout } from '@/components/custom/layout'
import {
  MenuCarousel,
  MenuCarouselContent,
  MenuCarouselItem,
} from '@/components/ui/menu-carousel'
import { cn } from '@/lib/utils'
import { createContext, Dispatch, useContext, useState } from 'react'
import { SubmitFileProvider } from './submit-file-provider'
import { SubmitCancelModal } from '../submit_entrance/submit_cancel_modal'
const PROCESS_MAP = ['피해 자료', '퇴원예정일']
const DEFAULT_SECTION_INDEX = 0
export default function Accidents() {
  const [sectionIndex, setSectionIndex] = useState(DEFAULT_SECTION_INDEX)
  const [damages, setDamages] = useState<File[]>([])
  const [date, setDate] = useState<Date | undefined>()
  const navigate = (n: number) => setSectionIndex(n)
  const limit = [damages.length > 0, !!date].lastIndexOf(true)
  return (
    <Layout className={Layout.styles.bg.gray100}>
      <Layout.Header fixed>
        <SubmitCancelModal />
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.start,
          Layout.styles.body.maxwidth,
          Layout.styles.body.naviPadding,
          Layout.styles.bg.primary50,
          'px-4'
        )}
      >
        <MenuCarousel
          limit={limit}
          startIndex={sectionIndex}
          onPageChange={setSectionIndex}
        >
          <MenuCarouselContent>
            {PROCESS_MAP.map((name, index) => (
              <MenuCarouselItem
                key={name}
                index={index}
                className='border-primary-300 text-primary-300 aria-selected:border-primary-100 aria-selected:bg-primary-300 aria-selected:text-white'
                indicatorStyle='text-primary-300'
              >
                {name}
              </MenuCarouselItem>
            ))}
          </MenuCarouselContent>
        </MenuCarousel>

        <SubmiteFileStateContext.Provider
          value={{
            damages: damages,
            setDamages: setDamages,
            date: date,
            setDate: setDate,
            navigate: navigate,
          }}
        >
          <SubmitFileProvider index={sectionIndex} />
        </SubmiteFileStateContext.Provider>
      </Layout.Body>
    </Layout>
  )
}

interface SubmiteFileStateContext {
  damages: File[]
  setDamages: Dispatch<React.SetStateAction<File[]>>
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  navigate: (n: number) => void
}
// Context 생성
const SubmiteFileStateContext = createContext<
  SubmiteFileStateContext | undefined
>(undefined)
export const useSubmitFileState = (): SubmiteFileStateContext => {
  const context = useContext(SubmiteFileStateContext)
  if (context === undefined) {
    throw new Error(
      'useSubmitFileState must be used within a GlobalStateProvider'
    )
  }
  return context
}
