import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { IdentificationProvider } from './identification-provider'
import {
  Gender,
  IdentityVerificationMethod,
  IdentityVerificationOperator,
} from '@/types/identification'
import { format } from '@/lib/format'
import { apiIdentification } from '@/apis/identification'

export const OperatorMap = {
  KT: IdentityVerificationOperator.KT,
  SKT: IdentityVerificationOperator.SKT,
  'LG U+': IdentityVerificationOperator.LGU,
  'KT 알뜰폰': IdentityVerificationOperator.KT_MVNO,
  'SKT 알뜰폰': IdentityVerificationOperator.SKT_MVNO,
  'LG U+ 알뜰폰': IdentityVerificationOperator.LGU_MVNO,
}
const NAME = '백남헌'
const TEMPPHONE = '01031371153'
const TEMPBIRTH = '19910306'
const ALERT_MESSAGE = '본인 정보를 올바르게 수정해주세요'
export default function Identification() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mobileCarrier, setMobileCarrier] =
    useState<keyof typeof OperatorMap>('KT')
  const navigate = (n: number) => setSelectedIndex(n)
  const [indentificatedTime, setIndentificatedTime] = useState<number>(
    new Date().getTime()
  )
  const resetIndentificatedTime = () =>
    setIndentificatedTime(new Date().getTime())
  const [phoneNumber, setPhoneNumber] = useState(format.phoneNumber(TEMPPHONE))
  const [name, setName] = useState(NAME)
  const [birth, setBirth] = useState(format.residentNumber(TEMPBIRTH))
  const [isDomestic, setIsDomestic] = useState('')
  const [gender, setGender] = useState<Gender>(Gender.MALE)
  const handleSendOtp = async () => {
    await apiIdentification.sendOtp({
      name: name,
      phoneNumber: format.onlyGetNumber(phoneNumber),
      identityNumber: format.residentRegisterNumber(birth, gender),
      operator: OperatorMap[mobileCarrier],
      method: IdentityVerificationMethod.SMS,
    })
    resetIndentificatedTime()
  }

  return (
    <IdentificationStateContext.Provider
      value={{
        mobileCarrier,
        setMobileCarrier,
        navigate,
        indentificatedTime,
        resetIndentificatedTime,
        phoneNumber,
        setPhoneNumber,
        name,
        setName,
        birth,
        setBirth,
        gender,
        setGender,
        isDomestic,
        setIsDomestic,
        handleSendOtp,
      }}
    >
      <IdentificationProvider index={selectedIndex} />
    </IdentificationStateContext.Provider>
  )
}

interface IdentificationStateContext {
  mobileCarrier: keyof typeof OperatorMap
  setMobileCarrier: Dispatch<SetStateAction<keyof typeof OperatorMap>>
  indentificatedTime: number
  resetIndentificatedTime: () => void
  phoneNumber: string
  setPhoneNumber: Dispatch<SetStateAction<string>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  birth: string
  setBirth: Dispatch<SetStateAction<string>>
  isDomestic: string
  setIsDomestic: Dispatch<SetStateAction<string>>
  gender: Gender
  setGender: Dispatch<SetStateAction<Gender>>
  navigate: (n: number) => void
  handleSendOtp: () => Promise<void>
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
