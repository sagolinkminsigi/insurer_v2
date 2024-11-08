import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { DiseaseSection } from './disease-section'
import { TrafficSeciton } from './traffic-section'
import { NomrmalSection } from './normal-section'
import Logo from '@/assets/logo.svg'
const DEAFULT_TAB_INDEX = 1
const TAB_TITLES = ['질병사고', '교통사고', '일반사고']
export default function Home() {
  const [tabIndex, setTabIndex] = useState(DEAFULT_TAB_INDEX)
  return (
    <Layout className='bg-primary-300'>
      <Layout.Header sticky main>
        <img
          src={Logo}
          className='mr-auto'
          width={92}
          height={31}
          alt='금융치료'
        />
      </Layout.Header>
      <Tab className={cn('pb-2')} tabIndex={tabIndex} handleTab={setTabIndex} />
      <Layout.Body
        className={cn(
          Layout.styles.body.start,
          Layout.styles.bg.primary50,
          Layout.styles.body.maxwidth,
          Layout.styles.body.pb,
          'overflow-scroll rounded-t-3xl px-4'
        )}
      >
        <TabContent tabIndex={tabIndex} />
      </Layout.Body>
    </Layout>
  )
}

interface TabProps extends TabContentsProps {
  className?: string
  handleTab: (n: number) => void
}
interface TabContentsProps {
  tabIndex: number
}

const TabContent = ({ tabIndex }: TabContentsProps) => {
  switch (tabIndex) {
    case 0:
      return <DiseaseSection />
    case 1:
      return <TrafficSeciton />
    case 2:
      return <NomrmalSection />
    default:
      return <></>
  }
}
const Tab = ({ tabIndex, handleTab, className }: TabProps) => {
  return (
    <div
      className={cn(
        Layout.styles.body.maxwidth,
        'typo-b2sb relative mx-auto flex w-full ',
        className
      )}
    >
      {TAB_TITLES.map((tab, index) => (
        <div
          key={tab}
          className={cn(
            index === tabIndex ? 'text-primary-700' : 'text-gray-700',
            'z-20 h-[42px] basis-1/3 place-content-center py-2 text-center'
          )}
          onClick={() => handleTab(index)}
        >
          {tab}
        </div>
      ))}
      <div
        style={{ left: `${Math.floor((tabIndex / 3) * 100)}%` }}
        className={'absolute h-[42px] w-1/3 transition-all'}
      >
        <div className='h-[42px] w-full rounded-[20px] bg-white py-2 shadow-effect01' />
      </div>
    </div>
  )
}
