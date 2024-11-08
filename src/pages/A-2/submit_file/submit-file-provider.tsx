import { DamageSection } from './damage-section'
import { OutpatientDateSection } from './outpatient-date-section'

export const SubmitFileProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <DamageSection />
    case 1:
      return <OutpatientDateSection />
    default:
      return <></>
  }
}
