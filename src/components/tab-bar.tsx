import Plus from '@/assets/plus.svg?react'
import { ButtonWrapper } from './button-wrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const tabBarList = [
  { path: ['/home'], name: '홈', icon: Plus },
  { path: ['/notice'], name: '이용/알림', icon: Plus },
  { path: ['/mypage', '/event', '/policy'], name: '내정보', icon: Plus },
]

export const TabBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className='flex w-full rounded-t-[20px] border border-gray-100 bg-white pb-[25px] pt-3 shadow-effect01'>
      {tabBarList.map((tab) => (
        <ButtonWrapper
          className={cn(
            tab.path.includes(location.pathname)
              ? 'text-gray-900'
              : 'text-gray-400',
            'typo-c1m flex basis-1/3 flex-col items-center bg-transparent'
          )}
          onClick={() => navigate(tab.path[0])}
          key={tab.name}
        >
          <tab.icon width={24} height={24} />
          {tab.name}
        </ButtonWrapper>
      ))}
    </div>
  )
}
