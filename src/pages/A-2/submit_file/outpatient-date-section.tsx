import { useState } from 'react'
import { ko } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { useSubmitFileState } from '.'
import { useNavigate } from 'react-router-dom'

const TITLE = '퇴원 예정일이 언제인가요?'

export const OutpatientDateSection = () => {
  const { date, setDate } = useSubmitFileState()
  const navigate = useNavigate()
  const handleSelect = (updatedDate: Date | undefined) => {
    setDate(updatedDate)
    navigate('/submit_file_success')
  }
  return (
    <div className='flex flex-col items-center'>
      <h2 className='typo-t1b py-5 text-center text-gray-900'>{TITLE}</h2>
      <Calendar
        mode='single'
        selected={date}
        onSelect={handleSelect}
        locale={ko}
        className='w-full rounded-[40px] bg-white shadow-effect01'
        dropdownButtonStyle='bg-primary-50 border-0'
      />
    </div>
  )
}
