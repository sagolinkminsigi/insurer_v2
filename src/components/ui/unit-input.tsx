import useInputEvent from '@/hooks/use-input-event'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
interface UnitInputProps<T> {
  value: T
  onValueChange: (
    v: string
  ) => void | React.Dispatch<React.SetStateAction<string>>
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  children: ReactNode
  type?: React.HTMLInputTypeAttribute
  autoFocus?: boolean
  autoBlur?: boolean
  wrapperStyle?: string
  inputStyle?: string
  placeholder?: string
}
export const UnitInput = <T extends string | number>({
  value,
  onValueChange,
  onKeyDown,
  children,
  type,
  autoFocus,
  autoBlur,
  wrapperStyle,
  inputStyle,
  placeholder = '',
}: UnitInputProps<T>) => {
  const inputRef = useInputEvent({ autoFocus: autoFocus, autoBlur: autoBlur })

  return (
    <div className={cn('flex gap-2', wrapperStyle)}>
      <input
        ref={inputRef}
        onKeyDown={onKeyDown}
        type={type}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          'typo-st1sb w-16 border-b border-b-gray-300 bg-transparent text-end text-white outline-none',
          inputStyle
        )}
        placeholder={placeholder}
      />
      <span className='typo-st1sb'>{children}</span>
    </div>
  )
}
