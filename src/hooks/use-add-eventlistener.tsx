import { useEffect } from 'react'

// React의 이벤트 타입을 제네릭으로 받는 함수
export const useAddEventListener = <T extends React.SyntheticEvent>(
  event: keyof HTMLElementEventMap,
  handler: (e: T) => void
) => {
  useEffect(() => {
    const eventHandler = (e: Event) => handler(e as unknown as T)
    window.addEventListener(event, eventHandler)

    return () => window.removeEventListener(event, eventHandler)
  }, [event, handler])
}
