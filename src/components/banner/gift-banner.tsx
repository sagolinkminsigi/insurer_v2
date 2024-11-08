import Gift from '@/assets/gift_30000.svg'
import { cn } from '@/lib/utils'
interface GiftBannerProps {
  className?: string
}
export const GiftBanner = ({ className = '' }: GiftBannerProps) => {
  return (
    <div className={cn(className, 'relative rounded-xl bg-[#44340A] p-4')}>
      <div className='typo-b2sb font-normal text-gray-200'>
        친구에게 사고링크 알려줄 때마다
      </div>
      <div className='typo-b1m font-bold text-gray-200'>
        상품권 3만원씩, 무제한으로!
      </div>
      <img
        src={Gift}
        width={92}
        height={90}
        className='absolute bottom-0 right-[14px]'
      />
    </div>
  )
}
