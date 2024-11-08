'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ComponentProps, useState } from 'react'
import { Dropdown } from './dropdown'

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  dropdownButtonStyle?: string
}

const CALENDAR_MIN = 1900
const MONTH_NUMBERS = 12

const formatCalendar = (y: string, m: string) =>
  new Date(parseInt(y), parseInt(m) - 1)

const formatMonth = (n: number) => n.toString().padStart(2, '0') + '월'
const getYM = (date: Date) => [date.getFullYear(), date.getMonth() + 1]

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dropdownButtonStyle = '',
  ...props
}: CalendarProps) {
  const today = new Date()
  const [thisYear, thisMonth] = getYM(today)
  const [currentMonth, setCurrentMonth] = useState(formatMonth(thisMonth))
  const [currentYear, setCurrentYear] = useState(`${thisYear}년`)

  const handleCalculateMonth = (v: number) => {
    const calculatedDate = new Date(
      formatCalendar(currentYear, `${parseInt(currentMonth) + v}`)
    )
    const [calculatedYear, calculatedMonth] = getYM(calculatedDate)
    setCurrentYear(`${calculatedYear}년`)
    setCurrentMonth(formatMonth(calculatedMonth))
  }

  return (
    <DayPicker
      month={formatCalendar(currentYear, currentMonth)}
      disabled={[{ after: new Date() }]}
      showOutsideDays={false}
      className={cn('px-4 py-11 text-gray-900', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 w-full',
        caption:
          'flex justify-center relative items-center pb-5 border-b border-b-primary-200',
        caption_label:
          'bg-white py-[7.5px] px-3 typo-st1sb font-medium rounded-xl',
        nav: 'flex items-center',
        nav_button_previous: 'absolute left-0 m-0',
        nav_button_next: 'absolute right-0 m-0',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'flex-1 text-muted-foreground rounded-md w-10 font-normal text-[0.8rem] first:text-pink-400 text-gray-500',
        row: 'flex w-full mt-2',
        cell: 'group typo-b1m mw:typo-st1sb h-10 flex-1 text-center p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 first:text-pink-400',
        day: cn(
          'disabled:pointer-events-none disabled:text-gray-400 group-first:disabled:text-pink-300',
          'h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary-800 hover:text-white hover:scale-110'
        ),
        day_range_end: 'day-range-end',
        day_selected: 'bg-primary-800 text-white',
        day_today: '',
        day_outside: 'opacity-1',
        day_disabled: 'opacity-1',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft
            className='h-4 w-4 text-primary-900'
            onClick={() => handleCalculateMonth(-1)}
            {...props}
          />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight
            className='h-4 w-4 text-primary-900'
            onClick={() => handleCalculateMonth(1)}
            {...props}
          />
        ),
        CaptionLabel: () => (
          <div className='flex gap-2'>
            <Dropdown
              options={Array.from(
                { length: thisYear - CALENDAR_MIN },
                (_, i) => `${thisYear - i}년`
              )}
              defaultValue={`${thisYear}`}
              onChange={setCurrentYear}
              value={currentYear}
              buttonStyle={dropdownButtonStyle}
            />
            <Dropdown
              options={Array.from({ length: MONTH_NUMBERS }, (_, i) =>
                formatMonth(i + 1)
              )}
              defaultValue={`${thisMonth}`}
              onChange={setCurrentMonth}
              value={currentMonth}
              buttonStyle={dropdownButtonStyle}
            />
          </div>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
