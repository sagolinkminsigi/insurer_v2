import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import XOuter from '@/assets/x_outer.svg?react'
import useInputEvent from '@/hooks/use-input-event'
interface LabelInputProps {
  label: string
  value: string
  onChange?: Function
  className?: string
  inputStyle?: string
  deletable?: boolean
  autoFocus?: boolean
  autoBlur?: boolean
  onKeydown?: (e: React.KeyboardEvent) => void
}
export const LabelInput = ({
  inputStyle = '',
  autoFocus,
  autoBlur,
  ...props
}: LabelInputProps) => {
  const inputRef = useInputEvent({ autoFocus: autoFocus, autoBlur: autoBlur })
  const [value, setValue] = useState(props.value || '')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    props.onChange && props.onChange(e.target.value)
  }

  return (
    <div className={cn(props.className || '', 'relative')}>
      <div className='typo-c1m text-gray-300'>{props.label}</div>
      <input
        className={cn(
          inputStyle,
          'typo-st1sb border-b border-b-primary-400 bg-transparent text-gray-800 outline-none'
        )}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={props.onKeydown}
      />
      {props.deletable && value.length > 0 && (
        <XOuter
          width={24}
          height={24}
          onClick={() => setValue('')}
          className='absolute bottom-0.5 right-0.5 text-gray-900'
        />
      )}
    </div>
  )
}
