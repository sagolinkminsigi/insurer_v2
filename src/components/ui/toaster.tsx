import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { useAddEventListener } from '@/hooks/use-add-eventlistener'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

export function Toaster() {
  const { toasts } = useToast()
  const [toastPosition, setToastPosition] = useState(0)

  const handleResize = () => {
    const viewportHeight = visualViewport?.height || 0
    const offsetTop = visualViewport?.offsetTop || 0
    const bottomPosition = window.innerHeight - (viewportHeight + offsetTop)
    if (offsetTop === 0 && viewportHeight !== window.outerHeight) return

    setToastPosition(bottomPosition)
  }
  useAddEventListener('resize', handleResize)

  return (
    <ToastProvider duration={2000}>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            style={{ bottom: toastPosition }}
            className={
              'w-fit border-0 bg-transparent transition-all duration-0'
            }
          >
            <div className='grid gap-1'>
              {description && <ToastTitle>{description}</ToastTitle>}
            </div>
            {/* <ToastClose /> */}
          </Toast>
        )
      })}
      <ToastViewport className='bottom-0 top-auto items-center' />
    </ToastProvider>
  )
}
