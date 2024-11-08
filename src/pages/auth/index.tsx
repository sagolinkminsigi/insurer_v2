import { Layout } from '@/components/custom/layout'
import Loader from '@/components/loader'

import { useLocation, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://wotpwfjydeybbmhcbpzc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdHB3Zmp5ZGV5YmJtaGNicHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMjYyMTcsImV4cCI6MjA0MjgwMjIxN30.CkzWSkwTG3h-5XH6ihEhM7B8gCW0C380FL6JFh2avuo'
)

export default function Auth() {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')
  const state = queryParams.get('state')

  const fetchAccessToken = async (code: string) => {
    window?.Kakao.cleanup()
    const result = await fetch('https://web-v2-2m5.pages.dev/api/kakao', {
      method: 'POST',
      body: JSON.stringify({ code: code }),
    })
    const data = await result.text()

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithIdToken({
      provider: 'kakao',
      token: JSON.parse(data).id_token,
    })

    queryParams.delete('code')
    queryParams.delete('state')

    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (code) {
      fetchAccessToken(code)
    }
  }, [])

  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout.Body>
        <div className='flex flex-1 items-center justify-center border-0 border-red-600'>
          <Loader />
        </div>
      </Layout.Body>
    </Layout>
  )
}
