import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PADDING_SUMS = 16 * 4
const CANVAS_WIDTH_WIDTH = 568 - PADDING_SUMS - 4
const NEXT_PAGE = '/submit_entrance'

export const ContractCanvas = () => {
  const canvasWidth = Math.min(
    window.innerWidth - PADDING_SUMS,
    CANVAS_WIDTH_WIDTH
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [position, setPosition] = useState([0, 0])
  const [hasSigned, setHasSigned] = useState(false) // New state for signature status
  const navigate = useNavigate()

  useEffect(() => {
    clearCanvas()
  }, [])

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const isMobile = 'touches' in e

    const x = (isMobile ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (isMobile ? e.touches[0].clientY : e.clientY) - rect.top
    setPosition([x, y])
    setIsDrawing(true)
  }

  const drawHandler = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const isMobile = 'touches' in e

    const x = (isMobile ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (isMobile ? e.touches[0].clientY : e.clientY) - rect.top
    if (!context) return
    setHasSigned(true)
    context.beginPath()
    context.moveTo(position[0], position[1])
    context.lineTo(x, y)
    context.strokeStyle = 'black'
    context.lineWidth = 2
    context.stroke()

    setPosition([x, y])
  }

  const stopDrawing = () => setIsDrawing(false)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
    setHasSigned(false) // Reset on clear
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'signature.png'
    link.click()
    navigate(NEXT_PAGE)
  }

  return (
    <div className='mt-6 flex flex-col items-center'>
      <div className='relative overflow-hidden rounded-3xl bg-primary-100'>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={drawHandler}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchMove={drawHandler}
          onTouchEnd={stopDrawing}
          onTouchStart={startDrawing}
          width={canvasWidth}
        />
        <div
          style={{ borderTopLeftRadius: '100%' }}
          className='absolute left-2 top-2 h-[15px] w-[15px] border-l-2 border-t-2 border-primary-200'
        />
        <div
          style={{ borderTopRightRadius: '100%' }}
          className='absolute right-2 top-2 h-[15px] w-[15px] border-r-2 border-t-2 border-primary-200'
        />
        <div
          style={{ borderBottomRightRadius: '100%' }}
          className='absolute bottom-2 right-2 h-[15px] w-[15px] border-b-2 border-r-2 border-primary-200'
        />

        <div
          style={{ borderBottomLeftRadius: '100%' }}
          className='absolute bottom-2 left-2 h-[15px] w-[15px] border-b-2 border-l-2 border-primary-200'
        />
      </div>

      <div className='mt-4 flex w-full gap-3'>
        <button
          className='w-1/4 rounded-[14px] bg-gray-400 px-2.5 py-2.5 text-white'
          onClick={clearCanvas}
        >
          초기화
        </button>
        <button
          className={`w-3/4 rounded-[14px] bg-primary-500 py-2.5 text-white ${
            !hasSigned ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={downloadCanvas}
          disabled={!hasSigned}
        >
          서명 완료
        </button>
      </div>
    </div>
  )
}
