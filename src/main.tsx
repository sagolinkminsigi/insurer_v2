// default
import React from 'react'
import ReactDOM from 'react-dom/client'

// routing
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

// css
import '@/index.css'
import '@/design-system/index.css'

// ui
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

// auth
import AuthProvider from './providers/AuthProvider'

// data
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: (a, b) => {
      console.log(a, b)
    },
  }),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
