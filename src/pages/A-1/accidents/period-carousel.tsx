import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { cn } from '@/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type PeriodCarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  onPageChange?: (v: number) => void
  startIndex?: number
}

type PeriodCarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  current: number
} & PeriodCarouselProps

const PeriodCarouselContext =
  React.createContext<PeriodCarouselContextProps | null>(null)

function usePeriodCarousel() {
  const context = React.useContext(PeriodCarouselContext)

  if (!context) {
    throw new Error(
      'usePeriodCarousel must be used within a <PeriodCarousel />'
    )
  }

  return context
}

const PeriodCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & PeriodCarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      startIndex,
      children,
      onPageChange,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
        startIndex: startIndex || 0,
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [current, setCurrent] = React.useState(0)
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }
      setCurrent(api.selectedScrollSnap())
      onPageChange && onPageChange(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) return

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return

      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)

      return () => {
        api?.off('select', onSelect)
      }
    }, [api, onSelect])

    return (
      <PeriodCarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          current,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </PeriodCarouselContext.Provider>
    )
  }
)
PeriodCarousel.displayName = 'PeriodCarousel'

const PeriodCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = usePeriodCarousel()

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  )
})
PeriodCarouselContent.displayName = 'PeriodCarouselContent'

const PeriodCarouselItem = React.forwardRef<
  HTMLDivElement,
  {
    index: number
    base: React.ReactNode
    selected?: React.ReactNode
  } & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, base, selected, ...props }, ref) => {
  const { orientation } = usePeriodCarousel()
  const { api, current } = usePeriodCarousel()

  const handleClick = () => api?.scrollTo(index)
  return (
    <div
      onClick={handleClick}
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        index === current ? 'basis-[100px]' : 'basis-[57px]',
        className
      )}
      {...props}
    >
      {index === current ? selected || base : base}
    </div>
  )
})
PeriodCarouselItem.displayName = 'PeriodCarouselItem'

export {
  type CarouselApi,
  PeriodCarousel,
  PeriodCarouselContent,
  PeriodCarouselItem,
}
