import { HTMLAttributes, ReactNode } from 'react'

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}
export const AccidentsWrapper = (props: WrapperProps) => {
  const { className = '', children, ...rest } = props
  return (
    <div
      className={`mx-4 mb-[166px] h-full flex-1 rounded-[40px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
