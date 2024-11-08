import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { HTMLAttributes } from 'react'
import { Layout } from './custom/layout'

interface ButtonPropsBase
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false
        loading?: boolean
        leftSection?: JSX.Element
        rightSection?: JSX.Element
      }
  )
interface AlertProps extends HTMLAttributes<HTMLDivElement> {}
const Alert = (props: AlertProps) => {
  const { className = '', children, ...rest } = props
  return (
    <div
      className={cn(
        Layout.styles.body.maxwidth,
        'absolute bottom-[var(--bottom-sheet-height)] w-full'
      )}
    >
      <div className={cn('mx-4 p-2', className)} {...rest}>
        {children}
      </div>
    </div>
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    if (props.asChild) {
      return (
        <Slot className={className} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    const {
      loading = false,
      leftSection,
      rightSection,
      disabled,
      ...otherProps
    } = props

    return (
      <button
        className={cn(
          Layout.styles.body.maxwidth,
          'w-full px-4 pb-8',
          className
        )}
        disabled={loading || disabled}
        ref={ref}
        {...otherProps}
      >
        <div
          className={cn(
            disabled ? 'bg-gray-400' : 'bg-primary-500',
            'typo-b1sb h-[53px] w-full content-center rounded-[50px] text-white'
          )}
        >
          {children}
        </div>
      </button>
    )
  }
)

const SquareButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    if (props.asChild) {
      return (
        <Slot className={className} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    const {
      loading = false,
      leftSection,
      rightSection,
      disabled,
      ...otherProps
    } = props

    return (
      <button
        className={cn(Layout.styles.body.maxwidth, '-mx-4 w-full', className)}
        disabled={loading || disabled}
        ref={ref}
        {...otherProps}
      >
        <div
          className={cn(
            disabled ? 'bg-gray-400' : 'bg-primary-500',
            'typo-b1sb h-[53px] w-full content-center text-white'
          )}
        >
          {children}
        </div>
      </button>
    )
  }
)

interface ModalButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

const ModalButton = React.forwardRef<HTMLDivElement, ModalButtonProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { disabled, ...otherProps } = props
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (props.disabled) return e.preventDefault()
      onClick && onClick(e)
    }
    return (
      <div
        className={cn(
          Layout.styles.body.maxwidth,
          'inline-flex w-full px-4 pb-8',
          props.disabled ? 'cursor-not-allowed' : '',
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...otherProps}
      >
        <div
          className={cn(
            disabled ? 'bg-gray-400' : 'bg-primary-500',
            'typo-b1sb h-[53px] w-full content-center rounded-[50px] text-white'
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)

const BottomSheet = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`fixed bottom-0 left-0 w-full ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
const styles = {
  center: 'flex flex-col items-center',
}
BottomSheet.styles = styles
BottomSheet.Button = Button
BottomSheet.ModalButton = ModalButton
BottomSheet.SquareButton = SquareButton
BottomSheet.Alert = Alert

export { BottomSheet }
