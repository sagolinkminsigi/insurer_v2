import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { tasks } from './data/tasks'
import { Button } from '@/components/custom/button'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react'

const client = createClient(
  'https://aivftdddizdnwfiiuwyv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdmZ0ZGRkaXpkbndmaWl1d3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzI4ODIsImV4cCI6MjAzNzI0ODg4Mn0.784jcEgBeePWLlc-4Zeg8XN_J5VBsK_DKGpccIhdCvg'
)

export default function Tasks() {
  // const { data, count } = useQuery(
  //   client.from('rentcar_cars').select('id', { count: 'exact' }),
  //   {
  //     enabled: true,
  //   }
  // )

  const getData = async () => {
    window?.Kakao.cleanup()
    const result = await fetch('https://web-v2-2m5.pages.dev/api/initkey')
    const data = await result.text()

    // setKakaoKey(JSON.parse(data).key)
    window?.Kakao.init(JSON.parse(data).key)
    console.log(window?.Kakao)
  }

  useEffect(() => {
    getData()
  }, [])

  async function signInWithKakao() {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'kakao',
    //   options: {
    //     scopes: 'profile_image profile_nickname',
    //     skipBrowserRedirect: true,
    //   },
    // })
    console.log('ㅋㅋㅋㅋ')
    if (window?.Kakao?.Auth) {
      window?.Kakao.Auth.authorize({
        // redirectUri: 'https://web-v2-2m5.pages.dev/auth2',
        redirectUri: 'http://localhost:5173/auth2',
        state: JSON.stringify({ prev: location.pathname }),
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

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {'손해사정 대상 고객'}
            </h2>
            <Button onClick={signInWithKakao}>Download</Button>
            {/* <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
