import * as React from 'react'
import { cn } from '@/lib/utils'

const LayoutContext = React.createContext<{
  offset: number
  fixed: boolean
} | null>(null)

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
}

const Layout = ({ className, fixed = false, ...props }: LayoutProps) => {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const div = divRef.current

    if (!div) return
    const onScroll = () => setOffset(div.scrollTop)

    // clean up code
    div.removeEventListener('scroll', onScroll)
    div.addEventListener('scroll', onScroll, { passive: true })
    return () => div.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout='layout'
        className={cn(
          'flex h-full flex-col overflow-auto',
          fixed && 'flex flex-col',
          className
        )}
        {...props}
      />
    </LayoutContext.Provider>
  )
}
Layout.displayName = 'Layout'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean
  fixed?: boolean
  main?: boolean
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, sticky, fixed, main, ...props }, ref) => {
    // Check if Layout.Header is used within Layout
    const contextVal = React.useContext(LayoutContext)
    if (contextVal === null) {
      throw new Error(
        `Layout.Header must be used within ${Layout.displayName}.`
      )
    }

    return (
      <div
        ref={ref}
        data-layout='header'
        className={cn(
          main
            ? 'h-[var(--header-height)] content-center pl-4 '
            : 'flex h-9 px-3 py-1.5',
          `typo-t1b z-[100] text-gray-900`,
          sticky && 'sticky top-0',
          fixed && 'fixed w-full',
          className
        )}
        {...props}
      />
    )
  }
)
Header.displayName = 'Header'

const Body = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Check if Layout.Body is used within Layout
  const contextVal = React.useContext(LayoutContext)
  if (contextVal === null) {
    throw new Error(`Layout.Body must be used within ${Layout.displayName}.`)
  }

  return (
    <div
      ref={ref}
      data-layout='body'
      className={cn(
        'relative m-auto flex h-full min-h-[100svh] w-full flex-col overflow-hidden',
        contextVal && contextVal.fixed && 'flex-1',
        className
      )}
      {...props}
    />
  )
})

const styles = {
  bg: {
    gradient01: 'bg-gradient-100',
    primary900: 'bg-primary-900',
    primary50: 'bg-primary-50',
    gray100: 'bg-gray-100',
    gradient04: 'bg-gradient-400',
    gradient05: 'bg-gradient-500',
    white: 'bg-white',
  },
  body: {
    center: 'place-content-center items-center',
    start: 'my-0',
    pb: 'pb-[var(--tab-bar-height)]',
    pt: 'pt-[var(--header-height)]',
    naviPadding: 'pb-[var(--tab-bar-height)] pt-[var(--navigator-height)]',
    maxwidth: 'max-w-[var(--body-max-width)]',
    withoutPaddingMaxWidth: 'max-w-[var(--body-without-padding-width)]',
  },
}

Body.displayName = 'Body'

Layout.Header = Header
Layout.Body = Body
Layout.styles = styles
export { Layout }
