import Sagolink from '@/assets/sago_gradient.svg'
import Kakao from '@/assets/kakao.svg'

import { Button } from '@/components/custom/button'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
// import { useAuth } from '@/providers/AuthProvider'

import { createClient } from '@supabase/supabase-js'
import { Layout } from '@/components/custom/layout'
import X from '@/assets/x.svg?react'
import { FormattedDiv } from '@/components/formatted-div'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function SignIn() {
  // const navigate = useNavigate()

  // const [loading, setLoading] = useState<boolean>(false)

  // const queryParams = new URLSearchParams(location.search)
  // const code = queryParams.get('code')

  // const getData = async () => {
  //   window?.Kakao.cleanup()
  //   const result = await fetch('https://web-v2-2m5.pages.dev/api/initkey')
  //   const data = await result.text()

  //   window?.Kakao.init(JSON.parse(data).key)
  // }

  // useEffect(() => {
  //   if (!window?.Kakao.isInitialized()) {
  //     getData()
  //   }
  // }, [])

  // async function signInWithKakao() {
  //   if (window?.Kakao?.Auth) {
  //     window?.Kakao.Auth.authorize({
  //       redirectUri: 'https://3c1a-116-124-69-151.ngrok-free.app/auth',
  //     })
  //   }
  // }

  // const fetchAccessToken = async (code: string) => {
  //   try {
  //     setLoading(true)
  //     window?.Kakao.cleanup()
  //     const result = await fetch('https://web-v2-2m5.pages.dev/api/test', {
  //       method: 'POST',
  //       body: JSON.stringify({ code: code }),
  //     })
  //     const data = await result.text()

  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.signInWithIdToken({
  //       provider: 'kakao',
  //       token: JSON.parse(data).id_token,
  //     })

  //     queryParams.delete('code')
  //     navigate('/', { replace: true })
  //     setLoading(false)
  //   } catch {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   if (code) {
  //     fetchAccessToken(code)
  //   }
  // }, [])
  const navigate = useNavigate()
  return (
    <Layout className={Layout.styles.bg.gradient05}>
      <Layout.Header fixed>
        <X
          width={24}
          height={24}
          className='text-gray-400'
          onClick={() => navigate('/home')}
        />
      </Layout.Header>
      <Layout.Body
        className={cn(
          Layout.styles.body.maxwidth,
          Layout.styles.body.pb,
          Layout.styles.body.pt,
          'px-4'
        )}
      >
        <div className='mt-10 flex w-full flex-col gap-3'>
          <img src={Sagolink} width={140} height={40} alt='Sagolink' />
          <FormattedDiv className='typo-t1sb p-1 text-white'>
            {'안녕하세요\n사고링크입니다.'}
          </FormattedDiv>
          <div className='typo-b1m p-1 text-gray-400'>
            간편 로그인 후 이용이 가능합니다.
          </div>
        </div>

        <BottomSheet className='bottom-20 left-1/2 flex -translate-x-1/2 justify-center'>
          <Button
            className={cn(
              Layout.styles.body.maxwidth,

              'mx-4 h-[52px] w-full rounded-xl bg-[#FEE500] text-black'
            )}
          >
            <img src={Kakao} width={14} height={14} alt='kakao login' />
            카카오 로그인
          </Button>
        </BottomSheet>
      </Layout.Body>
    </Layout>
  )
}
