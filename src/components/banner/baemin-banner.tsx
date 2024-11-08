import Baemin from '@/assets/baemin.svg'

export const BaeminBanner = () => {
  return (
    <div className='relative rounded-xl bg-[#00C6BA] p-4'>
      <div className='typo-b2sb font-normal text-gray-200'>
        배민 커넥트 회원 손해사정 시
      </div>
      <div className='typo-b1m font-bold text-gray-200'>
        수임료 할인 및 주유권 증정
      </div>
      <img
        src={Baemin}
        width={111}
        height={76}
        className='absolute bottom-0 right-[14px]'
      />
    </div>
  )
}
