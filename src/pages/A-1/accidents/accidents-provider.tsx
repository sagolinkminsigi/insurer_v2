import { RatioSection } from './ratio-section'

import { DateSection } from './date-section'
import { TypeSection } from './type-section'
import { InjurySection } from './injury-section'
import PeriodSection from './period-section'

export const AccidentsProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <DateSection />
    case 1:
      return <TypeSection />
    case 2:
      return <RatioSection />
    case 3:
      return <InjurySection />
    case 4:
      return <PeriodSection />
    default:
      return <></>
  }
}
