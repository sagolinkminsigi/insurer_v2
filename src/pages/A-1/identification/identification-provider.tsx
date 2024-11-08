import { CertificationSection } from './certification-section'
import IdentificationEntrance from './identification-entrance'
import { MobileCarrierSection } from './mobile-carrier-section'
import { MyInfoSection } from './my-info-section'
import { SuccessSection } from './success-section'

export const IdentificationProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <IdentificationEntrance />
    case 1:
      return <MobileCarrierSection />
    case 2:
      return <MyInfoSection />
    case 3:
      return <CertificationSection />
    case 4:
      return <SuccessSection />
    default:
      return <></>
  }
}
