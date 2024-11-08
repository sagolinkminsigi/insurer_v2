import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'react-router-dom'

const client = createClient(
  'https://aivftdddizdnwfiiuwyv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdmZ0ZGRkaXpkbndmaWl1d3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2NzI4ODIsImV4cCI6MjAzNzI0ODg4Mn0.784jcEgBeePWLlc-4Zeg8XN_J5VBsK_DKGpccIhdCvg'
)

export default function Detail() {
  const { id } = useParams()
  const { data, count } = useQuery(
    client
      .from('rentcar_cars')
      .select('id, name', { count: 'exact' })
      .eq('id', id),
    {
      enabled: true,
    }
  )

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
              {data && data[0].name}
            </h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {/* <DataTable data={tasks} columns={columns} /> */}
        </div>
      </Layout.Body>
    </Layout>
  )
}
