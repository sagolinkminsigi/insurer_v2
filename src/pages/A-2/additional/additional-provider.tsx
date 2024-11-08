import { ClaimSection } from './claim-section'
import { ComfortableSection } from './confortable-section'
import { ExtraSection } from './extra-section'
import { PoliceSection } from './police-section'
import { TaticsSection } from './tactics-section'

export const AdditionalProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 1:
      return <PoliceSection />
    case 2:
      return <TaticsSection />
    case 3:
      return <ComfortableSection />
    case 4:
      return <ExtraSection />
    case 5:
      return <ClaimSection />
    default:
      return <></>
  }
}
