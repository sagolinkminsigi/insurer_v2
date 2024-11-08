import { UserAuthForm } from './components/user-auth-form'
import ViteLogo from '@/assets/vite.svg'
import Sagolink from '@/assets/sagolink.svg'
import { Button } from '@/components/custom/button'

import { useRef, useEffect, useState } from 'react'

import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

import { createClient } from '@supabase/supabase-js'
import usePreviousLocation from '@/hooks/usePreviousLocation'

const supabase = createClient(
  'https://wotpwfjydeybbmhcbpzc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdHB3Zmp5ZGV5YmJtaGNicHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMjYyMTcsImV4cCI6MjA0MjgwMjIxN30.CkzWSkwTG3h-5XH6ihEhM7B8gCW0C380FL6JFh2avuo'
)

export default function SignIn() {
  const [kakaoKey, setKakaoKey] = useState<string>()

  const { user, signOut } = useAuth()

  const getData = async () => {
    window?.Kakao.cleanup()
    const result = await fetch('https://web-v2-2m5.pages.dev/api/initkey')
    const data = await result.text()

    // setKakaoKey(JSON.parse(data).key)
    window?.Kakao.init(JSON.parse(data).key)
    console.log(window?.Kakao)
  }

  useEffect(() => {
    if (!window?.Kakao.isInitialized()) {
      getData()
    }
  }, [])

  // useEffect(() => {
  //   if (user) {
  //     console.log('로그아웃 햇음?')
  //     signOut && signOut()
  //   }
  // }, [])

  async function signInWithKakao() {
    if (window?.Kakao?.Auth) {
      window?.Kakao.Auth.authorize({
        // redirectUri: 'https://web-v2-2m5.pages.dev/auth2',
        redirectUri: 'http://localhost:5173/signin',
        // state: JSON.stringify({ prev: location.pathname }),
        state: JSON.stringify({ prev: '/' }),

        // scope: '', // 사용자에게 동의 요청할 동의항목 ID 목록, 쉼표로 구분된 문자열
        prompt: '',
        // login: 사용자 재인증, Reauthenticate user
        // none: 카카오톡에서 자동 로그인, Auto-login
        // create: 카카오계정 가입 후 로그인, Login after signing up for a Kakao Account
        // select_account: 카카오계정 간편로그인, Kakao Account easy login
        // loginHint: '',
        // nonce: '',
        throughTalk: true,

        // eg. https://miryang.dev/auth/kakao/callback
      })
    }
  }

  const location = useLocation()
  const navigate = useNavigate()

  const previousLocation = usePreviousLocation()

  // URLSearchParams를 사용하여 쿼리 파라미터 추출
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')
  const state = queryParams.get('state')

  const prevPath = state ? JSON.parse(state as string).prev : '/'

  const fetchAccessToken = async (code: string) => {
    window?.Kakao.cleanup()
    const result = await fetch('https://web-v2-2m5.pages.dev/api/test', {
      method: 'POST',
      body: JSON.stringify({ code: code }),
    })
    const data = await result.text()

    console.log('data!!', JSON.parse(data).id_token)

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithIdToken({
      provider: 'kakao',
      token: JSON.parse(data).id_token,
    })

    queryParams.delete('code')
    queryParams.delete('state')

    // URL 업데이트
    const newUrl = `${location.pathname}${prevPath}`

    // window.location.href = prevPath

    navigate(prevPath, { replace: true })

    console.log('session', session)

    console.log('error', error)
  }

  useEffect(() => {
    if (code) {
      // 인가 코드를 가지고 백엔드 서버에 토큰 요청
      fetchAccessToken(code)
    }
  }, [])

  // const logout = async () => {
  //   console.log('로그아웃 해버려 ㅋ')
  //   signOut && (await signOut())
  // }

  // if (user) logout()
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-white' />
          <img
            src={Sagolink}
            className='relative m-auto'
            width={410}
            height={100}
            alt='Sagolink'
          />
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                사고링크 로그인
              </h1>
              <p className='text-sm text-muted-foreground'>
                3초만에 사고링크와 함께하고 편하게 받아가세요
              </p>
            </div>
            <Button onClick={signInWithKakao} className='mt-2'>
              {'카카오로 로그인'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
