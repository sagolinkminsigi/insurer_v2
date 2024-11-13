import { Layout } from '@/components/custom/layout'
import {
  MenuCarousel,
  MenuCarouselContent,
  MenuCarouselItem,
} from '@/components/ui/menu-carousel'
import { cn } from '@/lib/utils'
import { createContext, Dispatch, useContext, useState } from 'react'
import { CorrectionProvider } from './correction-provider'
import X from '@/assets/x.svg?react'
import { useNavigate } from 'react-router-dom'
import { IconModal } from '@/components/ui/icon-modal'
import Exclamation from '@/assets/exclamation.svg?react'
import { Button } from '@/components/ui/button'
const PROCESS_MAP = ['항목별 의견', '추가 의견', '기타 의견']
const DEFAULT_SECTION_INDEX = 0
const priceItems = [
  { name: '위자료', price: 300000 },
  { name: '휴업손해액', price: 500000 },
  { name: '기타손해배상금', price: 300000 },
  { name: '향후치료비', price: 300000 },
  { name: '치료 비상계', price: 300000 },
]
type priceState = {
  name: string
  price: number
  isActive: boolean
  reason: string
  updatePrice: string
}[]
export default function Accidents() {
  const [sectionIndex, setSectionIndex] = useState(DEFAULT_SECTION_INDEX)
  const [extras, setExtras] = useState<string>('')
  const [files, setFiles] = useState<File[]>([])
  const navigate = (n: number) => setSectionIndex(n)
  const limit = [true, true, true, true, true, true, true].lastIndexOf(true)
  const [price, setPrice] = useState(
    priceItems.map((v) => ({
      isActive: false,
      reason: '',
      updatePrice: '',
      ...v,
    }))
  )
  return (
    <Layout className={Layout.styles.bg.gray100}>
      <Layout.Header fixed>
        <RedoModal />
      </Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.start,
          Layout.styles.body.maxwidth,
          Layout.styles.body.naviPadding,
          Layout.styles.bg.primary50,
          'pb-0'
        )}
      >
        <div className='flex-1 px-4'>
          <MenuCarousel
            limit={limit}
            startIndex={sectionIndex}
            onPageChange={setSectionIndex}
          >
            <MenuCarouselContent>
              {PROCESS_MAP.map((name, index) => (
                <MenuCarouselItem
                  key={name}
                  index={index}
                  className='border-primary-300 text-primary-300 aria-selected:border-primary-100 aria-selected:bg-primary-300 aria-selected:text-white'
                  indicatorStyle='text-primary-300'
                >
                  {name}
                </MenuCarouselItem>
              ))}
            </MenuCarouselContent>
          </MenuCarousel>

          <SubmitCertStateContext.Provider
            value={{
              extras,
              setExtras,
              navigate,
              files,
              setFiles,
              price,
              setPrice,
            }}
          >
            <CorrectionProvider index={sectionIndex} />
          </SubmitCertStateContext.Provider>
        </div>

        <div className='typo-c1m h-[249px] bg-gray-200 px-4 pt-[20px] text-gray-500'>
          보험업감독규정 제9-21조 3항 및 4항에 따라 온라인 보정 요청도 서면과
          동일한 법적 유효성을 갖게 되었어요!
          <br />
          <br />
          의견을 작성해 주시면 검토 후 상황에 따라 손해사정서를 빠르게 다시
          보내드릴 수 있어요.
        </div>
      </Layout.Body>
    </Layout>
  )
}

interface SubmitCertStateContext {
  price: priceState
  setPrice: Dispatch<React.SetStateAction<priceState>>
  extras: string
  setExtras: Dispatch<React.SetStateAction<string>>
  files: File[]
  setFiles: Dispatch<React.SetStateAction<File[]>>
  navigate: (n: number) => void
}
// Context 생성
const SubmitCertStateContext = createContext<
  SubmitCertStateContext | undefined
>(undefined)
export const useCorrectionContext = (): SubmitCertStateContext => {
  const context = useContext(SubmitCertStateContext)
  if (context === undefined) {
    throw new Error(
      'useCorrectionContext must be used within a GlobalStateProvider'
    )
  }
  return context
}

const RedoModal = () => {
  const navigate = useNavigate()
  return (
    <IconModal
      icon={<Exclamation width={56} height={56} className='m-auto' />}
      title='후기 작성을 그만두시겠어요?'
      className='absolute'
      footer={
        <IconModal.BottomWrapper>
          <IconModal.CloseButton className='typo-b2sb w-full rounded-[14px] bg-gray-300 text-gray-900'>
            계속 작성하기
          </IconModal.CloseButton>
          <Button
            className='typo-b2sb w-full rounded-[14px] bg-gray-900 text-white'
            onClick={() => navigate('/home')}
          >
            나가기
          </Button>
        </IconModal.BottomWrapper>
      }
    >
      <X width={24} height={24} />
    </IconModal>
  )
}
