import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
  // 1. kakao login
  {
    path: '/home',
    lazy: async () => ({
      Component: (await import('./pages/home')).default,
    }),
  },
  {
    path: '/report',
    lazy: async () => ({
      Component: (await import('./pages/report/index.tsx')).default,
    }),
  },
  {
    path: '/agreement',
    lazy: async () => ({
      Component: (await import('./pages/agreement/index.tsx')).default,
    }),
  },
  {
    path: '/congrat',
    lazy: async () => ({
      Component: (await import('./pages/congrat/index.tsx')).default,
    }),
  },
  {
    path: '/correction',
    lazy: async () => ({
      Component: (await import('./pages/correction/index.tsx')).default,
    }),
  },
  {
    path: '/confirm',
    lazy: async () => ({
      Component: (await import('./pages/confirm/index.tsx')).default,
    }),
  },
  {
    path: '/details',
    lazy: async () => ({
      Component: (await import('./pages/details/index.tsx')).default,
    }),
  },
  {
    path: '/identification',
    lazy: async () => ({
      Component: (await import('./pages/identification/index.tsx')).default,
    }),
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
