import { HTMLAttributes, ReactNode } from 'react'

interface TextWithNewLineProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  childrenStyle?: string
}
export const FormattedDiv = ({
  childrenStyle = '',
  children,
  ...props
}: TextWithNewLineProps) => {
  const parsedChildren = children?.toString().split('\n')
  if (!parsedChildren) return <></>
  return (
    <div {...props}>
      {parsedChildren.map((line, index) => (
        <span key={index} className={childrenStyle}>
          {line}
          {index !== parsedChildren.length - 1 && <br />}
        </span>
      ))}
    </div>
  )
}
