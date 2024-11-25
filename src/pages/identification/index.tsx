import { createContext, useContext, useState } from 'react'
import { IdentificationProvider } from './identification-provider'
const NEXT_PAGE_INDEX = 3
export default function Identification() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const navigate = (n: number) => setSelectedIndex(n)
  const [indentificatedTime, setIndentificatedTime] = useState<number>(
    new Date().getTime()
  )
  const resetIndentificatedTime = () =>
    setIndentificatedTime(new Date().getTime())

  return (
    <IdentificationStateContext.Provider
      value={{
        navigate,
        indentificatedTime,
        resetIndentificatedTime,
      }}
    >
      <IdentificationProvider index={selectedIndex} />
    </IdentificationStateContext.Provider>
  )
}

interface IdentificationStateContext {
  indentificatedTime: number
  resetIndentificatedTime: () => void

  navigate: (n: number) => void
}
const IdentificationStateContext = createContext<
  IdentificationStateContext | undefined
>(undefined)
export const useIdentificationState = (): IdentificationStateContext => {
  const context = useContext(IdentificationStateContext)
  if (context === undefined) {
    throw new Error(
      'useIdentificationState must be used within a GlobalStateProvider'
    )
  }
  return context
}
