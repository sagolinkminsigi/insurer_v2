import { cn } from '@/lib/utils'

interface RadioCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {}
export const RadioCheckbox = ({ className, ...props }: RadioCheckboxProps) => (
  <div className={cn(className, 'flex items-center gap-1')} {...props}>
    <div className='flex h-5 w-5 items-center justify-center rounded-full border-2 border-current'>
      <div className='h-3 w-3 rounded-full bg-current'></div>
    </div>

    {props.children}
  </div>
)
