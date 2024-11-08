import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface TextWithNewLineProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  boldClass?: string
  boldStart?: number
}
export const HighlightDiv = ({
  children,
  boldClass,
  boldStart,
  className,
  ...props
}: TextWithNewLineProps) => {
  const parsedChildren = children?.toString().split('\b')
  if (!parsedChildren) return <></>
  return (
    <div {...props}>
      {parsedChildren.map((line, index) =>
        (index + (boldStart || 0)) % 2 === 0 ? (
          <span key={index} className={cn(className, boldClass)}>
            {line}
          </span>
        ) : (
          <span key={index} className={cn(className)}>
            {line}
          </span>
        )
      )}
    </div>
  )
}
