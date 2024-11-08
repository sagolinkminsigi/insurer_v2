import { cn } from '@/lib/utils'
import React, { KeyboardEvent, useState } from 'react'

interface SwitchProps {
  children?: string | JSX.Element
  bar?: string | number
  className?: string
  options: string[]
  onChange?: Function
}

export function Switch(props: SwitchProps) {
  const [isOn, setIsOn] = useState(true)
  const handleClick = () => {
    setIsOn(!isOn)
    props.onChange && props.onChange(props.options[Number(isOn)])
  }
  return (
    <div
      className={props.className || ''}
      onClick={handleClick}
      tabIndex={0}
      role='switch'
    >
      <div className='typo-b1sb bg-primary-50 relative flex h-full rounded-[50px] px-1 text-center'>
        <span className='z-10 h-10 flex-1 content-center self-center'>
          {props.options[0]}
        </span>
        <span className='z-10 h-10 flex-1 content-center self-center'>
          {props.options[1]}
        </span>
        <div
          className={cn(
            isOn ? 'left-0 pl-1' : 'left-1/2 pr-1',
            'absolute h-full w-1/2 py-1 transition-all'
          )}
        >
          <div
            className={'shadow-effect01 h-full w-full rounded-[40px] bg-white'}
          />
        </div>
      </div>
    </div>
  )
}
