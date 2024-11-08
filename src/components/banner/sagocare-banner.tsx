import Sagocare from '@/assets/sagocare.svg'

export const SagocareBanner = () => {
  return (
    <div className='relative rounded-xl bg-[#FFFA83] p-4'>
      <div className='typo-b2sb font-normal text-[#676A71]'>
        수리・렌트 업체, 믿어도 괜찮을까?
      </div>
      <div className='typo-b1m font-bold text-[#4B4D52]'>
        사고케어에 믿고 맡기세요
      </div>
      <img
        src={Sagocare}
        width={108}
        height={76}
        className='absolute bottom-0 right-[14px]'
      />
    </div>
  )
}
