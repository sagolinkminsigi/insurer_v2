import { cn } from '@/lib/utils'
import { ChangeEvent, HTMLAttributes } from 'react'
// import { Check } from '../svg/Check'

type TextAreaStatus = 'error' | 'success'
interface TextAreaProps {
  max: number
  value?: string
  placeholder?: string
  status?: TextAreaStatus
  errorMsg?: string
  size: 'l' | 's'
  onChange?: Function
  textareaStyle?: string
  maxStyle?: string
}

export const TextArea = ({
  value = '',
  max,
  textareaStyle,
  maxStyle = '',
  ...props
}: TextAreaProps) => {
  const isActive = value.length > 0 ? 'active' : 'inactive'
  const status = props.status || isActive
  const textAreaHeightStyle = props.size === 's' ? 'h-[156px]' : 'h-[266px]'
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > max) return
    props.onChange && props.onChange(e.target.value)
  }
  return (
    <div className='clear-both flex w-full flex-col'>
      <textarea
        className={cn(
          textAreaHeightStyle,
          `typo-b2sb h-[156px] resize-none rounded-[14px] border border-gray-300 py-3 pl-3 pr-3.5 placeholder-gray-400 focus:border-gray-300 focus:outline-none`,
          textareaStyle
        )}
        value={value}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
      <div
        className={
          props.status === 'error' ? 'flex justify-between' : 'flex self-end'
        }
      >
        {props.status === 'error' && (
          <div className='typo-c1m float-left flex content-center items-center gap-1 text-negative-200'>
            {props.errorMsg}
          </div>
        )}
        <div
          className={cn('typo-c1m float-right mt-1 text-gray-400', maxStyle)}
        >
          {value.length} / {max.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
