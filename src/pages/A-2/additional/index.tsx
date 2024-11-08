import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { AdditionalProvider } from './additional-provider'
import { createContext, Dispatch, useContext, useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const DEFAULT_SECTION_INDEX = 1
export default function Additional() {
  const [SectionIndex, setSectionIndex] = useState(DEFAULT_SECTION_INDEX)
  const [police, setPolice] = useState<string | undefined>()
  const [comfortable, setComfortable] = useState<string | undefined>()
  const [tactics, setTactics] = useState<string | undefined>()
  const [extra, setExtra] = useState('')
  const [claim, setClaim] = useState('')
  const navigate = (n: number) => setSectionIndex(n)
  const pageNavigate = useNavigate()
  return (
    <Layout
      className={
        SectionIndex < 4
          ? Layout.styles.bg.primary900
          : Layout.styles.bg.primary50
      }
    >
      {<Layout.Header fixed></Layout.Header>}

      <Layout.Body
        className={cn(
          SectionIndex < 4
            ? Layout.styles.body.center
            : Layout.styles.body.start,
          Layout.styles.body.maxwidth,
          'items-center px-4'
        )}
      >
        <AdditionalStateContext.Provider
          value={{
            police: police,
            setPolice: setPolice,
            navigate: navigate,
            comfortable: comfortable,
            setComfortable: setComfortable,
            tactics: tactics,
            setTactics: setTactics,
            extra: extra,
            setExtra: setExtra,
            claim: claim,
            setClaim: setClaim,
          }}
        >
          <AdditionalProvider index={SectionIndex} />
        </AdditionalStateContext.Provider>
      </Layout.Body>
    </Layout>
  )
}

interface AdditionalStateContext {
  navigate: (n: number) => void
  police: string | undefined
  setPolice: Dispatch<React.SetStateAction<string | undefined>>
  comfortable: string | undefined
  setComfortable: Dispatch<React.SetStateAction<string | undefined>>
  tactics: string | undefined
  setTactics: Dispatch<React.SetStateAction<string | undefined>>
  extra: string
  setExtra: Dispatch<React.SetStateAction<string>>
  claim: string
  setClaim: Dispatch<React.SetStateAction<string>>
}
// Context 생성
const AdditionalStateContext = createContext<
  AdditionalStateContext | undefined
>(undefined)
export const useAdditionalState = (): AdditionalStateContext => {
  const context = useContext(AdditionalStateContext)
  if (context === undefined) {
    throw new Error(
      'useAdditionalState must be used within a GlobalStateProvider'
    )
  }
  return context
}
