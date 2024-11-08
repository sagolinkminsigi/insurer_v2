import { Drawer } from 'vaul'

import { useRef, useState } from 'react'

export default function MyDrawer() {
  const [open, setOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(open) => setOpen(open)}
      direction='right'
    >
      <Drawer.Trigger asChild>
        <div>{'open'}</div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={() => setOpen(false)}
          className='absolute inset-0 z-10 bg-black/40'
        />
        <Drawer.Content className='absolute bottom-0 right-0 z-10 flex h-full w-9/12 flex-col bg-white sm:w-[380px]'>
          <div className='overflow-hidden border-0 border-red-600'>
            <Drawer.Close className='m-4 cursor-pointer'>
              <div>{'close'}</div>
            </Drawer.Close>

            <div className='flex flex-col bg-white'>
              <div className='flex cursor-pointer flex-row items-center border-t-[1px] border-t-[#E1E5E9] px-8 py-6'>
                <div className='text-2xl font-bold text-black'>
                  {'고객센터'}
                </div>
              </div>
              <div className='flex cursor-pointer flex-row items-center border-b-[1px] border-t-[1px] border-b-[#E1E5E9] border-t-[#E1E5E9] px-8 py-6'>
                <div className='text-2xl font-bold text-black'>
                  {'이용약관'}
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
