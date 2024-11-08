import { HTMLAttributes, ReactNode } from 'react'
import AlertLogo from '@/assets/alert.svg'
interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  button?: ReactNode
}
export const Alert = (props: AlertProps) => {
  const { className = '', children, button, ...rest } = props
  return (
    <div
      className={`absolute bottom-[var(--bottom-sheet-height)] w-full ${className}`}
      {...rest}
    >
      <div className='typo-c1m bg-negative-200 relative mx-5 flex items-center gap-2 rounded-[10px] p-2.5 text-white'>
        <img width={24} height={24} alt='alert image' src={AlertLogo} />
        {children}
        {button && <div className='absolute right-2'>{button}</div>}
      </div>
    </div>
  )
}
