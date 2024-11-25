import { CertificationSection } from './certification-section'
import IdentificationEntrance from './identification-entrance'
import PhoneSection from './phone-section'
import { SuccessSection } from './success-section'

export const IdentificationProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <IdentificationEntrance />
    case 1:
      return <PhoneSection />
    case 2:
      return <CertificationSection />
    case 3:
      return <SuccessSection />
    default:
      return <></>
  }
}
