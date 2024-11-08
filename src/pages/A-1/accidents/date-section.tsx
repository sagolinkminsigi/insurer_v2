import { useState } from 'react'
import { ko } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { useAccidentsState } from '.'

const TITLE = '언제 사고가 일어났나요?'

export const DateSection = () => {
  const { date, setDate, goNext } = useAccidentsState()
  const handleSelect = (updatedDate: Date | undefined) => {
    setDate(updatedDate || date)
    goNext()
  }
  return (
    <div className='mx-4 flex flex-col items-center'>
      <h2 className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</h2>
      <Calendar
        mode='single'
        selected={date}
        onSelect={handleSelect}
        locale={ko}
        className='w-full rounded-[40px] bg-primary-100 shadow-effect01'
      />
    </div>
  )
}
