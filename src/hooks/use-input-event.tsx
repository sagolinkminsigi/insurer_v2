import { useEffect, useRef } from 'react'

interface useInputEvnetProps {
  autoFocus?: boolean
  autoBlur?: boolean
}
export default function useInputEvent({
  autoFocus,
  autoBlur,
}: useInputEvnetProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClickOutside = (event: TouchEvent) => {
    if (!autoBlur) return
    if (!(event.target instanceof Node)) return
    if (inputRef.current === null) return
    if (inputRef.current.contains(event.target)) return
    inputRef.current.blur()
  }

  useEffect(() => {
    if (!autoFocus) return
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])
  addEventListener('touchmove', handleClickOutside)
  return inputRef
}
