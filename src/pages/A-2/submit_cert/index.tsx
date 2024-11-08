import { Layout } from '@/components/custom/layout'
import {
  MenuCarousel,
  MenuCarouselContent,
  MenuCarouselItem,
} from '@/components/ui/menu-carousel'
import { cn } from '@/lib/utils'
import { createContext, Dispatch, useContext, useState } from 'react'
import { SubmitCertProvider } from './submit-cert-provider'
import { SubmitCancelModal } from '../submit_entrance/submit_cancel_modal'
const PROCESS_MAP = [
  '진단서',
  '추가 피해 자료',
  '상대 보험사',
  '보험 접수 번호',
  '담당자 이름',
  '담당자 번호',
]
const DEFAULT_SECTION_INDEX = 0
export default function Accidents() {
  const [sectionIndex, setSectionIndex] = useState(DEFAULT_SECTION_INDEX)
  const [certs, setCerts] = useState<File[]>([])
  const [extras, setExtras] = useState<File[]>([])
  const [insurance, setInsurance] = useState('')
  const [recept, setRecept] = useState('')
  const [manager, setManager] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = (n: number) => setSectionIndex(n)
  const limit = [
    certs.length > 0,
    certs.length > 0,
    insurance.length > 0,
    recept.length > 0,
    manager.length > 0,
    phone.length > 0,
  ].lastIndexOf(true)
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

        <SubmitCertStateContext.Provider
          value={{
            certs: certs,
            setCerts: setCerts,
            extras: extras,
            setExtras: setExtras,
            navigate: navigate,
            insurance: insurance,
            setInsurance: setInsurance,
            recept: recept,
            setRecept: setRecept,
            manager: manager,
            setManager: setManager,
            phone: phone,
            setPhone: setPhone,
          }}
        >
          <SubmitCertProvider index={sectionIndex} />
        </SubmitCertStateContext.Provider>
      </Layout.Body>
    </Layout>
  )
}

interface SubmitCertStateContext {
  certs: File[]
  setCerts: Dispatch<React.SetStateAction<File[]>>
  extras: File[]
  setExtras: Dispatch<React.SetStateAction<File[]>>
  navigate: (n: number) => void
  insurance: string
  setInsurance: Dispatch<React.SetStateAction<string>>
  recept: string
  setRecept: Dispatch<React.SetStateAction<string>>
  manager: string
  setManager: Dispatch<React.SetStateAction<string>>
  phone: string
  setPhone: Dispatch<React.SetStateAction<string>>
}
// Context 생성
const SubmitCertStateContext = createContext<
  SubmitCertStateContext | undefined
>(undefined)
export const useSubmitCertState = (): SubmitCertStateContext => {
  const context = useContext(SubmitCertStateContext)
  if (context === undefined) {
    throw new Error(
      'useSubmitCertState must be used within a GlobalStateProvider'
    )
  }
  return context
}
