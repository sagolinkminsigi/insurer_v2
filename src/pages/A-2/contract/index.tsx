import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { FormattedDiv } from '@/components/formatted-div'
import { UserNav } from '@/components/user-nav'
import { Fragment, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContractModal } from './contract-modal'
import { ContractDropdown } from './contract-dropdown'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'

const TITLE = '사고링크에 맡기기 전에\n김사고님의 동의가 필요해요'

const ContractType = {
  assignmentAgree: '[필수] 손해사정 위임 동의',
  personalInfo: '[필수] 개인정보 및 제3자 제공 동의',
  assignmenter: '[필수] 손해사정 위임 동의',
} as const

export default function Contract() {
  const [assignmentAgree, setAssignmentAgree] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(false)
  const [assignmenter, setAssignmenter] = useState(false)
  const isAllAgreed = assignmentAgree && personalInfo && assignmenter
  const navigate = useNavigate()
  const [openState, setOpenState] = useState({
    assignmentAgree: false,
    personalInfo: false,
    assignmenter: false,
  })

  const handleOpen = (type: keyof typeof ContractType) => {
    setOpenState((prev) => {
      const newState = {
        assignmentAgree: false,
        personalInfo: false,
        assignmenter: false,
      }
      newState[type] = !prev[type]

      return newState
    })
  }

  useEffect(() => {})

  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header fixed>
        <ChevronLeft onClick={() => navigate('/expected_amount')} />
      </Layout.Header>
      <Layout.Body
        className={cn(
          Layout.styles.body.naviPadding,
          Layout.styles.body.start,
          Layout.styles.body.maxwidth,
          'px-4'
        )}
      >
        <FormattedDiv className='typo-t1b py-6 text-left text-gray-900'>
          {TITLE}
        </FormattedDiv>
        <div className='mb-[91px] flex w-full flex-col gap-3'>
          <ContractDropdown
            title={ContractType.assignmentAgree}
            isOpen={openState.assignmentAgree}
            onClick={() => handleOpen('assignmentAgree')}
            isChecked={assignmentAgree}
            onCheckChange={() => setAssignmentAgree(!assignmentAgree)}
          >
            <AssigmentAgreeContent />
          </ContractDropdown>
          <ContractDropdown
            title={ContractType.personalInfo}
            isOpen={openState.personalInfo}
            onClick={() => handleOpen('personalInfo')}
            isChecked={personalInfo}
            onCheckChange={() => setPersonalInfo(!personalInfo)}
          >
            <AssigmenterContent />
          </ContractDropdown>
          <ContractDropdown
            title={ContractType.assignmenter}
            isOpen={openState.assignmenter}
            onClick={() => handleOpen('assignmenter')}
            isChecked={assignmenter}
            onCheckChange={() => setAssignmenter(!assignmenter)}
          >
            <AssigmenterContent />
          </ContractDropdown>
        </div>
        <BottomSheet className={cn(BottomSheet.styles.center)}>
          <ContractModal disabled={!isAllAgreed} />
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}

const Title = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(className, 'text-primary-400')} {...props}>
      {children}
    </div>
  )
}

const assignmentAgreeText = [
  {
    act: '제 1조ㅣ업무의 위임내용',
    details:
      "'갑'은 보험업법 제188조 등의 규정에 의한 손해사정업무에 대하여 다음 각 호의 사항을 '을'에게 위임한다.\n① 손해발생 사실의 확인\n② 보험약관 및 관계법규적용의 적정여부 판단\n③ 손해액 또는 보험금 사정\n④ 제1호 내지 제3호의 업무와 관련한 서류의 작성ㆍ제출의 대행\n⑤ 제1호 내지 제3호의 업무의 수행과 관련한 보험회사 등에 대한 의견 진술",
  },
  {
    act: '제 2조ㅣ업무의 수행',
    details:
      "① '을'은 '갑'으로부터 위임받은 업무를 신속, 공정하게 조사ㆍ확인ㆍ판단하여 처리한다.\n② '갑'은 손해사정 진행과정 및 결과 등을 언제든지 설명을 요구할 수 있으며, 손해사정업무 완료 시 손해사정서의 교부를 청구할 수 있다.",
  },
  {
    act: '제 3조ㅣ손해사정 보수',
    details:
      "① 손해사정서에 기재된 금액(이하 '사정금액'이라 함)에 보수율을 적용하여 산출된 금액을 손해사정보수로 한다. 단, 부가가치세는 별도로 한다.\n② 보험사의 이의제기 등을 통해 사정금액에 변동이 있는 경우에는 최종 사정금액에 보수율을 적용하여 손해사정보수로 한다.\n③ 손해사정업무와 관련된 의료기관의 의료비 및 장해진단비, 각종검사비, 서류발급비용, 전문의소견비 및 법률자문비 등은 '갑'이 별도로 부담한다.\n④ 손해사정보수는 위 제1조 3항(손해액 또는 보험금사정) 종료 시 지급하기로 한다.\n다만 지급시기를 당사자가 달리 정할 수 있다. '갑'은 보수지급기일 위반 시 '을'에게 지연이자를 지급하여야 하며, 지연이자는 법정이율에 따른다.",
  },
  {
    act: '제 4조ㅣ자료의 제공 및 협조',
    details:
      "① '을'이 손해사정업무를 처리하는데 필요하다고 인정하여 요구하는 서류 및 자료에 대하여 '갑'은 이에 응하여 성실히 협조하여야 한다.\n② '갑'은 제1항에 의하여 '을'에게 협조 시 허위자료를 제공 또는 제출하여 손해사정업무의 수행에 영향을 미치게 하여서는 아니된다.",
  },
  {
    act: '제 5조ㅣ수임인의 지위',
    details:
      "'을'은 손해사정사로 법령에 정한 권리와 의무에 입각하여 위임의 본지에 따라 선량한 관리자의 주의로서 위임사무를 처리할 권리와 의무가 있다.",
  },
  {
    act: '제 6조ㅣ계약의 효력',
    details:
      '이 계약에 규정되지 아니한 사항에 대하여는 대한민국 법령 및 사회통념에 따르며 본 계약은 쌍방이 서명 날인한 때로부터 효력이 발생한다.',
  },
  // TODO: 최종 수정 필요할 수 있다. 7장 이후로는 검토 필요
]

const assignmenterText = [
  {
    act: '1. 보험업법 제188조의 법정 손해사정업무',
    details:
      '① 손해 발생 사실의 확인\n② 보험약관 및 관계 법규 적용의 적정성 판단\n③ 손해액 및 보험금의 사정\n④ 제1호부터 제3호까지의 업무와 관련된 서류의 작성, 제출의 대행\n⑤ 제1호부터 제3호까지의 업무 수행과 관련된 보험회사에 대한 의견의 진술',
  },
  {
    act: '2. 보험업감독규정 제9-21조\n(손해사정서 접수 및 처리절차 등)',
    details:
      '① 보험회사는 손해사정사가 제출하는 손해사정서의 접수를 거절하지 못하며, 제9-18조제1항단서의 사유에 해당하는 경우를 제외하고는 손해사정서가 제출되지 아니한 상태에서 보험금을 지급하여서는 아니된다.\n② 보험회사는 손해사정사가 제출한 손해사정서를 접수한 때에는 지체없이 보험금을 심사ㆍ지급하여야 한다. 다만, 다음 각호의 1에 해당되어 보험금지급이 지연될 경우에는 손해사정서 접수일부터 10일이내에 그 사유를 보험금청구권자에게 통보하여야 한다.\n1. 손해사정서의 내용이 사실과 다르거나 자체적으로 조사ㆍ확인한 내용과 다른 것으로 판명된 때\n2. 손해사정서의 내용이 관련법규, 약관에 위반된 경우\n3. 보험금청구권자가 손해사정서의 내용에 이의를 제기한 경우\n4. 민원 또는 소송이 제기되거나 수사기관에 의하여 수사가 진행 중인 경우\n③ 보험회사는 손해사정사가 제출한 손해사정서가 제2항제1호 또는 제2호에 해당되어 정정ㆍ보완("이하 보정"이라 한다)이 필요한 경우에는 손해사정서 접수일부 터 10일 이내에 구체적인 사유와 근거를 명시하여 손해사정사 또는 보험금청구권자에게 서면으로 요청하여야 한다.\n④ 손해사정사 또는 보험금청구권자는 보험회사로부터 제3항의 규정에 의한 보정을 요청받은 경우에는 지체없이 손해사정서를 보정하거나 기 제출한 손해사정서 의 정당성에 대한 의견과 근거를 작성하여 보험회사에 서면으로 제출하여야 한다.\n⑤ 보험회사는 제4항의 규정에 의한 보정서 또는 의견서를 접수한 때에는 지체없이 보험금을 심사ㆍ지급하여야 하며, 다음 각호의 1에 해당하는 경우를 제외하고는 다시 보정을 요청할 수 없다.\n1. 보정서 또는 의견서의 내용이 부당하다는 객관적이고 명백한 반증이 있는 경우\n2. 제2항제1호 또는 제2호에 해당하는 경우(기존의 보정 요청에 대하여 보정이 완료된 경우는 제외)\n⑥ 보험회사는 제9-18조제1항단서의 규정에 해당하는 경우를 제외하고는 제2항 내지 제5항의 절차에 따라 확정된 손해사정서에 의한 보험금을 지급하여야 한다. 다만, 다음 각호의 1에 해당하는 경우에는 손해사정서에 따른 보험금을 정정하여 지급할 수 있다.\n1. 민원 또는 소송이 제기되어 보험회사가 지급하여야 하는 보험금이 손해사정서와 다르게 결정된 경우\n2. 보험금청구권자가 손해사정서 내용의 부당함에 대한 근거 및 자료를 서면으로 제출하고 보험회사가 이를 수용하여 보험회사가 지급하여야 하는 보험금이 손해사정서와 다르게 된 경우\n3. 보험회사가 결정한 보험금을 보험금청구권자가 수용한 경우',
  },
  {
    act: '3. 보험업감독업무시행세칙 제6-20조\n(전문인의 활용)',
    details:
      '① 손해사정사는 보험사고에 대한 전문적인 지식이 요구되는 사항에 대하여 당해분야에 대한 전문지식을 갖춘 자에게 조사를 의뢰하거나 자문을 요청할 수 있다.\n② 손해사정사가 제1항의 규정에 의한 전문인의 조사 또는 자문의견을 수용한 경우에는 당해 전문인 외의 자에 대하여 그 결과에 대한 책임을 진다.',
  },
  // TODO: 최종 수정 필요할 수 있다. 7장 이후로는 검토 필요
]
const AssigmentAgreeContent = () => {
  return (
    <div className='typo-c1m'>
      <div>
        김사고(이하 '갑'이라 함), 사고링크 손해사정(이하 '을'이라 함)은 보험업법
        제185조 단서규정에 따라 다음과 같이 위임 계약을 체결한다.
      </div>
      <br />
      {assignmentAgreeText.map((assignment, key) => (
        <Fragment key={key}>
          <Title>{assignment.act}</Title>
          <FormattedDiv>{assignment.details}</FormattedDiv>
        </Fragment>
      ))}
    </div>
  )
}
const AssigmenterContent = () => {
  return (
    <div className='typo-c1m'>
      <div>
        위임인은 보험업법 제185조에 따라 아래와 같은 보험업법 및 보험업감독규정,
        보험업감독업무시행세칙에서 손해사정업무로써 정한 사항 및 사고, 소득조사
        등 위임인 의 정당한 권한 일체를 귀사에 위임합니다.
      </div>
      <br />
      {assignmenterText.map((assignment, key) => (
        <Fragment key={key}>
          <Title>{assignment.act}</Title>
          <FormattedDiv>{assignment.details}</FormattedDiv>
        </Fragment>
      ))}
    </div>
  )
}
