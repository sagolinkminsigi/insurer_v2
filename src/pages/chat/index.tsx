import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

import { Send, Paperclip } from 'lucide-react'
import { Button } from '@/components/custom/button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

type Message = {
  id: number
  created_at: string
  content: string
  owner: string
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]) // 모든 메시지 상태 관리
  const [newMessage, setNewMessage] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const scrollViewRef = useRef<HTMLDivElement | null>(null)
  const isInitialLoad = useRef<boolean>(true)
  const [count, setCount] = useState<number>(0)

  const fetchMessages = async (initialLoad: boolean) => {
    if (isLoading || !hasMore) return
    setIsLoading(true)

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * 20, page * 20 - 1)

    if (error) {
      console.error('Error fetching messages:', error)
      setIsLoading(false)
      return
    }

    if (data.length === 0) setHasMore(false)
    if (!initialLoad && data.length !== 0)
      scrollViewRef.current?.scroll({
        top:
          scrollViewRef.current.scrollTop +
          scrollViewRef.current.scrollHeight / 10,
      })
    setMessages((prevMessages) => {
      return [...prevMessages, ...data]
    })
    setPage(page + 1)
    setIsLoading(false)

    if (initialLoad) {
      isInitialLoad.current = false
    }
  }

  useEffect(() => {
    fetchMessages(isInitialLoad.current)

    const channel = supabase
      .channel('minsigi')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages): Message[] => {
            return [payload.new, ...prevMessages] as Message[]
          })
          setCount((prev) => prev + 1)
        }
      )
      .subscribe((status, err) => console.log('status', status))

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // 새로운 메시지 전송
  const sendMessage = async () => {
    if (newMessage.trim() === '') return
    const { error } = await supabase
      .from('messages')
      .insert([{ content: newMessage, owner: '김환욱 손해사정사' }])
    setNewMessage('')
  }

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [count])

  useEffect(() => {
    if (messages.length === 20) {
      scrollToBottom()
    }
  }, [messages])

  const checkScrollBottom = (element: HTMLDivElement | null) => {
    if (!element) return false

    const { scrollTop, scrollHeight, clientHeight } = element
    return Math.floor(scrollHeight + scrollTop) <= Math.floor(clientHeight) // scrollTop + 표시된 높이가 전체 높이와 같거나 클 때
  }

  const onScroll = () => {
    // console.log(scrollViewRef.current.scrollTop)
    // if (checkScrollBottom(scrollViewRef.current)) {
    //   console.log('닿음?')
    //   fetchMessages(isInitialLoad.current)
    // }

    if (scrollViewRef.current?.scrollTop === 0) {
      console.log('닿음?')
      fetchMessages(isInitialLoad.current)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const onNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value)
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [newMessage])

  useEffect(() => {
    // textareaRef를 통해 textarea 요소에 접근
    if (textareaRef.current) {
      textareaRef.current.focus() // 컴포넌트가 로드될 때 포커스를 설정
    }
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const [contractFiles, setContractFiles] = useState<File[]>([])

  const handleContractFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList)
    setContractFiles([...contractFiles, ...files])
    e.target.value = ''
  }

  const handleContractFileDelete = (index: number) => {
    const updatedFiles = [...contractFiles]
    updatedFiles.splice(index, 1)
    setContractFiles(updatedFiles)
  }

  return (
    <div className='relative flex h-full flex-col items-center border-0 border-red-700 bg-[#212121] pt-24'>
      <div className='absolute top-0 h-24 w-full border-0 border-red-700 pb-0 md:w-1/2'>
        {/* <div className='font-medium'>{`${'정민식'} 고객님`}</div> */}
        <Accordion
          type='single'
          collapsible
          className='absolute top-9 w-full border-b-[1px] border-b-[#27272A] bg-[#212121]'
        >
          <AccordionItem
            value='item-1'
            className='border- h-full border-b-0 border-blue-700'
          >
            <AccordionTrigger className='flex flex-row border-0 border-blue-700 pl-8 pr-8 text-xl'>{`${'정민식'}`}</AccordionTrigger>
            {[1, 2, 3, 4].map((_, i) => (
              <AccordionContent
                key={i}
                className='px-4'
              >{`고객 정보 ${i}`}</AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      </div>

      <div
        ref={scrollViewRef}
        className={`flex h-full w-full flex-col items-center overflow-y-scroll rounded border-0 border-gray-300 px-2 pb-4 pt-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600`}
        onScroll={onScroll}
      >
        <div className='flex w-full flex-col-reverse border-0 border-gray-300 md:w-1/2'>
          {messages.slice().map((msg, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={index}
                  className={`mx-2 my-2 flex flex-row items-end whitespace-pre-wrap p-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div className='mr-2 flex flex-col items-end'>
                    <span className='text-xs text-gray-600'>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    <span className='text-xs text-gray-600'>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className='whitespace-pre-wrap rounded-[2rem] bg-[#2F2F2F] px-6 py-3'>
                    <span className='text-md text-[#ECECEC]'>
                      {msg.content}
                    </span>
                  </div>
                </div>
              )
            } else if (index % 2 === 1) {
              return (
                <div
                  key={index}
                  className={`mx-2 my-2 flex flex-row items-end whitespace-pre-wrap p-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div className='whitespace-pre-wrap rounded-[2rem] bg-[#2F2F2F] px-6 py-3'>
                    <span className='text-md text-[#ECECEC]'>
                      {msg.content}
                    </span>
                  </div>
                  <div className='ml-2 flex flex-col items-end'>
                    <span className='text-xs text-gray-600'>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    <span className='text-xs text-gray-600'>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        onKeyDown={onKeyDown}
        className='relative flex w-full border-0 border-blue-500 bg-transparent px-4 pb-0 pt-0 md:w-1/2 md:px-0'
      >
        {/* <Textarea
          rows={1}
          ref={textareaRef}
          autoComplete='off'
          placeholder='상담 입력'
          value={newMessage}
          onChange={onNewMessageChange}
          className='text-md resize-none items-center overflow-hidden rounded-[30px] border-0 border-red-500 bg-[#2F2F2F] py-4 pl-14 pr-4 font-normal text-white placeholder-white caret-[#ECECEC] shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        /> */}
        <input
          ref={fileInputRef}
          id='contractFile'
          name='contractFile'
          type='file'
          accept='image/*'
          multiple
          onChange={handleContractFileChange}
          style={{ display: 'none' }}
        />
        <Button
          onClick={handleButtonClick}
          variant='ghost'
          size='icon'
          className='absolute left-8 top-[11px] rounded-full hover:bg-gray-500 md:left-4'
        >
          <Paperclip className='size-4' />
          <span className='sr-only'>Attach File</span>
        </Button>
        <Button
          disabled={newMessage.length === 0}
          type='submit'
          variant='ghost'
          size='icon'
          className='absolute right-8 top-[11px] rounded-full hover:bg-gray-500 md:right-4'
        >
          <Send className='size-4' />
          <span className='sr-only'>Send Message</span>
        </Button>
      </form>
      <div className='flex w-full flex-row overflow-x-scroll border-0 border-red-500 px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600 md:w-1/2'>
        {contractFiles.map((file: File, index) => (
          <li
            key={index}
            className='border-red relative mr-2 flex items-center justify-between border-0'
          >
            <div className='flex flex-row justify-center'>
              <div className='border-red relative flex h-20 w-20 flex-row justify-center overflow-hidden rounded-lg border-0'>
                <img
                  src={`${URL.createObjectURL(file)}`}
                  alt={`${URL.createObjectURL(file)}_uploadimage_${index}`}
                  style={{
                    width: 'auto',
                    height: 'auto',
                  }}
                  className='rounded-md'
                />

                <div
                  // type="button"
                  onClick={() => handleContractFileDelete(index)}
                  className='absolute right-1 top-1 flex h-4 w-4 cursor-pointer flex-col items-center justify-center rounded-full bg-[#006AFF] text-white shadow-none focus:outline-none focus:ring focus:ring-transparent'
                >
                  {/* <img
                    src={'./i_close.svg'}
                    width={12}
                    height={12}
                    alt='accordion_icon'
                  /> */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}

type timestamptz = string
type text = string

type int2 = number
type int4 = number
type int8 = number
type float4 = number
type float8 = number

type provider = 'kakao' | 'apple' | 'google' | 'facebook'

type injury_area = '목, 어깨' | '다리'
type injury_grade =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
type injury_name = '목, 어깨' | '다리'
type injury_severity = 0 | 1 | 2

interface Injury {
  injury_area: injury_area
  injury_grade: injury_grade
  injury_name: injury_name
  injury_severity: injury_severity
}

interface User {
  id: text
  created_at: timestamptz
  provider: provider
  name: text
  birthday: text
  gender: text
  email: text
  phone: text

  invitation_code: text
  referrer_code: text
  partner: text

  verified: boolean
  verified_at: timestamptz
  verification_id: text

  marketing_agreed: boolean
  marketing_agreed_at: timestamptz
}
