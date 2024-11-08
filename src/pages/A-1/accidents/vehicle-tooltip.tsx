import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'
const VEHICLE_TYPE = [
  {
    name: '차',
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  },
  {
    name: '오토바이',
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  },
  {
    name: '사람',
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  },
  {
    name: '기타',
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  },
]

interface VehicleToolTipProps {
  dir: 'left' | 'right'
  wrapperStyle: string
  onChange: Dispatch<SetStateAction<string>>
  handleSelectorIndex: (n: number) => void
}

export const VehicleToolTip = ({
  dir = 'left',
  wrapperStyle = '',
  onChange,
  handleSelectorIndex,
}: VehicleToolTipProps) => {
  return (
    <>
      <div
        className={cn(
          dir === 'left'
            ? 'left-1/2 -translate-x-1/2 border-b-pink-800 '
            : 'right-1/2 translate-x-1/2 border-b-primary-800 ',
          'absolute bottom-0 h-0 w-0 translate-y-full border-b-[18px] border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent'
        )}
      ></div>
      <div
        className={cn(
          wrapperStyle,
          dir === 'left' ? '-left-[60px]' : 'right-[-60px]',
          `absolute -bottom-2.5 -bottom-4 flex w-max translate-y-full items-center justify-center gap-3 rounded-xl px-5 py-3 text-white`
        )}
      >
        {VEHICLE_TYPE.slice(0, dir === 'left' ? 2 : 4).map((vehicle, index) => (
          <div
            key={index}
            className='flex flex-col items-center'
            onClick={() => {
              handleSelectorIndex(dir === 'left' ? 1 : 2)
              onChange(vehicle.name)
            }}
          >
            <img
              width={40}
              height={40}
              src={vehicle.src}
              alt={vehicle.name}
              className='rounded-full'
            />
            <div className='typo-b2sb'>{vehicle.name}</div>
          </div>
        ))}
      </div>
    </>
  )
}
