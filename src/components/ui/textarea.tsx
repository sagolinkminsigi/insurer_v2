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
}

const TextAreaStyles = {
  active: 'border-primary-200',
  inactive: 'border-gray-300',
  error: 'border-negative-100',
  success: 'border-primary-400',
}

export const TextArea = ({ value = '', max, ...props }: TextAreaProps) => {
  const isActive = value.length > 0 ? 'active' : 'inactive'
  const status = props.status || isActive
  const textAreaHeightStyle = props.size === 's' ? 'h-[156px]' : 'h-[266px]'
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > max) return
    props.onChange && props.onChange(e.target.value)
  }
  return (
    <div className='clear-both w-full'>
      <textarea
        className={`${TextAreaStyles[status]} ${textAreaHeightStyle} typo-b2sb h-[156px] w-full resize-none rounded-[14px] border py-3 pl-3 pr-3.5 placeholder-gray-400 focus:border-gray-300 focus:outline-none`}
        value={value}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
      <div className='typo-c1m float-right mt-1 text-gray-400'>
        {value.length} / {max.toLocaleString()}
      </div>
      {props.status === 'error' && (
        <div className='typo-c1m float-left flex content-center items-center gap-1 text-negative-200'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='9.99935' cy='9.99984' r='8.33333' fill='#E85156' />
            <circle cx='10' cy='14.75' r='1' fill='white' />
            <rect
              x='9.08398'
              y='4.1665'
              width='1.83333'
              height='8.33333'
              rx='0.916667'
              fill='white'
            />
          </svg>

          {props.errorMsg}
        </div>
      )}
    </div>
  )
}
