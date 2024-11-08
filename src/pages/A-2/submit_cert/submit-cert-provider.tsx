import { CertSection } from './cert-section'
import { ExtraSection } from './extra-section'
import { InsuranceSection } from './insurance-section'
import { ManagerSection } from './manager-section'
import { PhoneSection } from './phone-section'
import { ReceptSection } from './recept-section'
export const SubmitCertProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <CertSection />
    case 1:
      return <ExtraSection />
    case 2:
      return <InsuranceSection />
    case 3:
      return <ReceptSection />
    case 4:
      return <ManagerSection />
    case 5:
      return <PhoneSection />
    default:
      return <></>
  }
}
