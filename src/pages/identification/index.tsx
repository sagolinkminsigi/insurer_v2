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
  const [phone, setPhone] = useState('')
  const [otpId, setOtpId] = useState<number>(0)
  return (
    <IdentificationStateContext.Provider
      value={{
        navigate,
        indentificatedTime,
        resetIndentificatedTime,
        phone,
        setPhone,
        otpId,
        setOtpId,
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
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
  otpId: number
  setOtpId: React.Dispatch<React.SetStateAction<number>>
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
