import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { ReactNode, useEffect, useState } from 'react'
import CloseX from '@/assets/x.svg?react'
import O from '@/assets/o.svg?react'
import X from '@/assets/thick_x.svg?react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BottomSheet } from '@/components/bottom-sheet'
import { OXSelector } from '@/components/ui/ox-selector'
const ENTRANCE_TITLE = '사고링크에 맡기기를 시작할게요!'
const MAIN_TITLE = '진단서를 발급받으셨나요?'
const TRANSITION_START_DELAY = 1000

export default function CompensationEntrance() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState<string | undefined>()
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), TRANSITION_START_DELAY)
    return () => clearTimeout(timeout)
  }, [])

  if (!isLoading) {
    return (
      <Layout className={Layout.styles.bg.gradient01}>
        <Layout.Header fixed />
        <Layout.Body className={Layout.styles.body.center}>
          <FormattedDiv className='typo-t2b py-6 text-center text-primary-900'>
            {ENTRANCE_TITLE}
          </FormattedDiv>
        </Layout.Body>
      </Layout>
    )
  }

  return (
    <Layout className={Layout.styles.bg.primary900}>
      <Layout.Header fixed></Layout.Header>

      <Layout.Body
        className={cn(
          Layout.styles.body.center,
          'items-center px-4',
          Layout.styles.body.maxwidth
        )}
      >
        <FormattedDiv className='typo-t1b py-6 text-center text-white'>
          {MAIN_TITLE}
        </FormattedDiv>
        <OXSelector value={selectedOption} onSelectChange={setSelectedOption}>
          <OXSelector.ButtonWrapper
            option='no'
            pending='bg-negative-100 text-negative-300'
            selected='bg-negative-200 text-negative-300'
            excluded='bg-gray-200 text-gray-300'
          >
            <OXSelector.Div
              pending='text-negative-200 mb-10'
              selected='text-negative-300 mb-10'
              excluded='text-gray-300 mb-10'
            >
              <X width={70} height={70} />
            </OXSelector.Div>
            <div className='typo-t1b'>아니오</div>
          </OXSelector.ButtonWrapper>
          <OXSelector.ButtonWrapper
            option='yes'
            pending='bg-positive-100 text-positive-300 '
            selected='bg-positive-200 text-positive-300'
            excluded='bg-gray-200 text-gray-300'
          >
            <OXSelector.Div
              pending='text-positive-200 mb-10'
              selected='text-positive-300 mb-10'
              excluded='text-gray-300 mb-10'
            >
              <O width={70} height={70} />
            </OXSelector.Div>
            <div className='typo-t1b'>네</div>
          </OXSelector.ButtonWrapper>
        </OXSelector>
        <BottomSheet className={BottomSheet.styles.center}>
          <BottomSheet.Button
            disabled={selectedOption === undefined}
            onClick={() => {
              navigate(
                selectedOption === 'yes' ? '/submit_cert' : '/submit_file'
              )
            }}
          >
            선택 완료
          </BottomSheet.Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
