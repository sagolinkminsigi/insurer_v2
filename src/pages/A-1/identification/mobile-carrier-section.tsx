import { FormattedDiv } from '@/components/formatted-div'
import { OperatorMap, useIdentificationState } from '.'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
const TITLE = '사용중이신 휴대폰의\n통신사를 선택해주세요'
const NEXT_PAGE_INDEX = 2

export const MobileCarrierSection = () => {
  const { setMobileCarrier, navigate } = useIdentificationState()
  const handleClick = (value: keyof typeof OperatorMap) => {
    setMobileCarrier(value)
    navigate(NEXT_PAGE_INDEX)
  }

  return (
    <Layout className={Layout.styles.bg.primary50}>
      <Layout.Header fixed></Layout.Header>
      <Layout.Body className={Layout.styles.body.start}>
        <FormattedDiv className='typo-t1b mt-[76px] py-6 text-center text-primary-900'>
          {TITLE}
        </FormattedDiv>
        <div className='flex justify-center gap-[14px] pb-9 text-gray-900'>
          <div
            onClick={() => handleClick('KT')}
            className='flex flex-col items-center justify-center gap-1'
          >
            <div className='flex h-[100px] w-[100px] items-center justify-center rounded-[20px] bg-white'>
              <img src={'/src/assets/kt.svg'} alt='kt' width={37} height={30} />
            </div>
            <span>KT</span>
          </div>
          <div
            onClick={() => handleClick('SKT')}
            className='flex flex-col items-center justify-center gap-1'
          >
            <div className='flex h-[100px] w-[100px] items-center justify-center rounded-[20px] bg-white'>
              <img
                src={'/src/assets/skt.svg'}
                alt='kt'
                width={37}
                height={70}
              />
            </div>
            <span>SKT</span>
          </div>
          <div
            onClick={() => handleClick('LG U+')}
            className='flex flex-col items-center justify-center gap-1'
          >
            <div className='flex h-[100px] w-[100px] items-center justify-center rounded-[20px] bg-white'>
              <img
                src={'/src/assets/lgu.svg'}
                alt='kt'
                width={37}
                height={37}
              />
            </div>
            <span>LG U+</span>
          </div>
        </div>
        <div className='flex justify-center gap-[14px]'>
          <div
            onClick={() => handleClick('KT 알뜰폰')}
            className='typo-b1m w-[100px] items-center justify-center rounded-[20px] bg-white py-[14px]'
          >
            <div className='text-center text-primary-400'>알뜰폰</div>
            <div className='text-center text-gray-700'>KT</div>
          </div>
          <div
            onClick={() => handleClick('SKT 알뜰폰')}
            className='typo-b1m w-[100px] items-center justify-center rounded-[20px] bg-white py-[14px]'
          >
            <div className='text-center text-primary-400'>알뜰폰</div>
            <div className='text-center text-gray-700'>SKT</div>
          </div>
          <div
            onClick={() => handleClick('LG U+ 알뜰폰')}
            className='typo-b1m w-[100px] items-center justify-center rounded-[20px] bg-white py-[14px]'
          >
            <div className='text-center text-primary-400'>알뜰폰</div>
            <div className='text-center text-gray-700'>LG U+</div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
