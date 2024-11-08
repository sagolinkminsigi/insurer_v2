import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'

import { cn } from '@/lib/utils'
import { resolve } from 'path'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

type CarouselProps = {
  setApi?: (api: CarouselApi) => void
  onPageChange?: (v: number) => void
  startIndex?: number
  limit: number
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  current: number
} & CarouselProps

const MenuCarouselContext = React.createContext<CarouselContextProps | null>(
  null
)

function useCarousel() {
  const context = React.useContext(MenuCarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const MenuCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      setApi,
      className,
      children,
      onPageChange,
      startIndex = 0,
      limit,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel({ axis: 'x' })

    const [current, setCurrent] = React.useState(0)
    const onSelect = React.useCallback(
      (api: CarouselApi) => {
        if (!api) return

        const updatedIndex = api.selectedScrollSnap()
        const resolvedIndex =
          updatedIndex > limit + 1 ? limit + 1 : updatedIndex
        api.scrollTo(resolvedIndex)
        setCurrent(resolvedIndex)
        onPageChange && onPageChange(resolvedIndex)
      },
      [limit]
    )
    React.useEffect(() => {
      api && api.scrollTo(startIndex)
    }, [startIndex])

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
      <MenuCarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          current,
          limit,
        }}
      >
        <div
          ref={ref}
          className={cn(
            'relative w-full [mask-image:linear-gradient(to_left,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_40px,rgba(0,0,0,1)_calc(100%_-_80px),rgba(0,0,0,0))]',
            className
          )}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </MenuCarouselContext.Provider>
    )
  }
)
MenuCarousel.displayName = 'Carousel'

const MenuCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel()
  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn('typo-c1m -ml-4 flex h-10', className)}
        {...props}
      />
    </div>
  )
})
MenuCarouselContent.displayName = 'CarouselContent'

interface MenuCarouselItemProps {
  index: number
  indicatorStyle?: string
}

const MenuCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & MenuCarouselItemProps
>(({ className, index, children, indicatorStyle, ...props }, ref) => {
  const { api, current } = useCarousel()

  const handleClick = () => {
    api?.scrollTo(index)
  }
  return (
    <div
      onClick={handleClick}
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn('shrink-0 basis-1/3 pl-4 first:ml-[33.3%] last:mr-[33.3%]')}
      {...props}
    >
      <div
        className={cn(
          'relative h-[35px] rounded-xl border py-2 text-center',
          'border-primary-100 text-primary-100',
          'aria-selected:border-primary-100 aria-selected:bg-primary-100 aria-selected:text-primary-400',
          className
        )}
        aria-selected={index === current}
      >
        {children}
        {index === current && (
          <div
            className={cn(
              'absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 translate-y-1 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-current text-primary-100',
              indicatorStyle
            )}
          />
        )}
      </div>
    </div>
  )
})

MenuCarouselItem.displayName = 'CarouselItem'

export { type CarouselApi, MenuCarousel, MenuCarouselContent, MenuCarouselItem }
