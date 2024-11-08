import { cn } from '@/lib/utils'
import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useContext,
} from 'react'

interface ButtonWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  option: string
  pending: string
  selected: string
  excluded: string
}
interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  pending: string
  selected: string
  excluded: string
}
const statusType = {
  selected: 'selected',
  excluded: 'excluded',
  pending: 'pending',
} as const

interface OxSelectorProps extends HTMLAttributes<HTMLDivElement> {
  value: string | undefined
  onSelectChange: Dispatch<SetStateAction<string | undefined>>
}

const OxSelectorContext = React.createContext<{
  value: string | undefined
  onSelectChange: Dispatch<SetStateAction<string | undefined>>
}>({
  value: undefined,
  onSelectChange: () => {},
})

const ButtonContext = React.createContext<{ status: keyof typeof statusType }>({
  status: 'pending',
})
const OXSelector = ({
  children,
  className,
  value,
  onSelectChange,
  ...props
}: OxSelectorProps) => {
  return (
    <OxSelectorContext.Provider
      value={{ value: value, onSelectChange: onSelectChange }}
    >
      <div className={cn('flex h-[280px] w-full gap-3', className)} {...props}>
        {children}
      </div>
    </OxSelectorContext.Provider>
  )
}

const ButtonWrapper = React.forwardRef<HTMLButtonElement, ButtonWrapperProps>(
  ({ className, children, option, onClick, ...props }, ref) => {
    const { ...otherProps } = props
    const { value, onSelectChange } = useContext(OxSelectorContext)
    const statusStyle =
      value === undefined
        ? 'pending'
        : value === option
          ? 'selected'
          : 'excluded'
    return (
      <ButtonContext.Provider value={{ status: statusStyle }}>
        <button
          onClick={() => onSelectChange(option)}
          className={cn(
            props[statusStyle],
            'flex h-full basis-1/2 flex-col place-content-center items-center rounded-3xl px-[7.5px] py-10'
          )}
          {...otherProps}
        >
          {children}
        </button>
      </ButtonContext.Provider>
    )
  }
)

const Div = ({ children, ...props }: DivProps) => {
  const { status } = useContext(ButtonContext)
  return (
    <div className={cn(props[status])} {...props}>
      {children}
    </div>
  )
}

OXSelector.ButtonWrapper = ButtonWrapper
OXSelector.Div = Div

export { OXSelector }
