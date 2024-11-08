import { FormattedDiv } from '@/components/formatted-div'
import { cn } from '@/lib/utils'

const processMap = [
  '접수',
  '담당자\n확인',
  '손해사정서\n작성',
  '보험사\n검토',
  '완료',
]
interface ProcessGraphProps {
  index: number
}

export const ProcessGraph = (props: ProcessGraphProps) => {
  return (
    <div className='relative mx-3 flex justify-between rounded-[20px] bg-gray-100 px-3 py-[7px]'>
      {props.index > 0 && (
        <div className={cn(`w-full`, 'absolute left-0 top-1 z-10 px-1')}>
          <div
            style={{ width: `min(100%, ${(props.index / 4) * 100}% + 10px)` }}
            className='h-4 rounded-[20px] bg-primary-400'
          ></div>
        </div>
      )}
      {processMap.map((process, index) => (
        <div key={index} className='relative'>
          <div
            className={cn(
              props.index === 0 && index === 0
                ? 'bg-primary-500'
                : 'bg-gray-300',
              'h-2.5 w-2.5 rounded-full'
            )}
          />
          <div
            className={cn(
              index === props.index
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-400',
              index === 0 || index === 4 ? 'w-10' : 'w-[60px]',
              'absolute -bottom-5 left-1/2 h-[46px] -translate-x-1/2 translate-y-full content-center rounded-lg px-[4.5px] py-1'
            )}
          >
            {index === props.index && (
              <div className='absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-1 border-b-[5px] border-l-[5px] border-r-[5px] border-transparent border-b-primary-500' />
            )}

            <FormattedDiv
              className={cn(
                props.index > index ? 'text-gray-900' : '',
                'typo-c1m text-nowrap text-center'
              )}
            >
              {process}
            </FormattedDiv>
          </div>
        </div>
      ))}
    </div>
  )
}
