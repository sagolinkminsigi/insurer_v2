import { HTMLAttributes } from 'react'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}
export const Footer = ({ children, ...props }: FooterProps) => {
  return <div {...props}>{children}</div>
}
