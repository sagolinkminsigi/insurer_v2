import { ItemSelectSection } from './item-select-section'
import { ExtraSection } from './extra-section'
import { FileSection } from './file-section'
export const CorrectionProvider = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <ItemSelectSection />
    case 1:
      return <ExtraSection />
    case 2:
      return <FileSection />
    default:
      return <></>
  }
}
