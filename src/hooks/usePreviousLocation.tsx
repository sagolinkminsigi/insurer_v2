import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// 이전 경로를 추적하는 커스텀 훅
const usePreviousLocation = () => {
  const location = useLocation()
  const previousLocation = useRef(location)

  useEffect(() => {
    previousLocation.current = location
  }, [location])

  return previousLocation.current
}

export default usePreviousLocation
