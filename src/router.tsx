import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
// import ProtectedRoute from './pages/protected/index.tsx'

const router = createBrowserRouter([
  // 1. kakao login
  {
    path: '/signin',
    lazy: async () => ({
      Component: (await import('./pages/signin')).default,
    }),
  },
  // {
  //   path: '/auth',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth')).default,
  //   }),
  // },
  // {
  //   path: '/auth',
  //   lazy: async () => {
  //     const Dashboard = await import('./pages/auth')
  //     return {
  //       Component: () => <ProtectedRoute>{Dashboard.default()}</ProtectedRoute>,
  //     }
  //   },
  // },

  // 2. 사고 입력(A-1)

  // A-1-a 시작 화면
  {
    path: '/accidents_entrance',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/accidents_entrance/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },

  // A-1-b 사고 날짜 입력
  // A-1-c 사고 유형 입력
  // A-1-d 사고 과실 입력
  // A-1-e 부상 부위 입력
  // A-1-f 치료 기간 입력
  {
    path: 'accidents',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/accidents/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },

  // A-1-g 보상금액 입력
  {
    path: 'compensation_entrance',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/compensation_entrance/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },
  {
    path: 'compensation_insurer',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/compensation_insurer/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },
  {
    path: 'compensation_desired',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/compensation_desired/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },

  // A-1-h 로딩 화면
  {
    path: 'calculating',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/calculating/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },

  // A-1-i 본인 인증
  {
    path: 'identification',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/identification/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },

  // A-1-j 예상 금액 조회 결과
  {
    path: 'expected_amount',
    lazy: async () => {
      const Tasks = await import('./pages/A-1/expected_amount/index.tsx')
      return {
        Component: () => {
          return Tasks.default()
        },
      }
    },
  },

  // Protected routes
  // {
  //   path: '/',
  //   lazy: async () => {
  //     const AppShell = await import('./components/app-shell')
  //     return { Component: AppShell.default }
  //   },
  //   errorElement: <GeneralError />,
  //   children: [
  //     {
  //       index: true,
  //       lazy: async () => {
  //         const Dashboard = await import('./pages/dashboard')
  //         return {
  //           Component: () => (
  //             <ProtectedRoute>{Dashboard.default()}</ProtectedRoute>
  //           ),
  //         }
  //       },
  //     },
  //     {
  //       path: 'tasks',
  //       index: true,
  //       lazy: async () => {
  //         const Tasks = await import('./pages/tasks')
  //         return {
  //           Component: () => <ProtectedRoute>{Tasks.default()}</ProtectedRoute>,
  //         }
  //       },
  //     },
  //     {
  //       path: 'detail/:id',
  //       lazy: async () => ({
  //         Component: (await import('@/pages/detail')).default,
  //       }),
  //     },
  //     {
  //       path: 'chats',
  //       lazy: async () => ({
  //         Component: (await import('@/pages/chats')).default,
  //       }),
  //     },
  //     {
  //       path: 'apps',
  //       lazy: async () => ({
  //         Component: (await import('@/pages/apps')).default,
  //       }),
  //     },
  //     {
  //       path: 'users',
  //       lazy: async () => ({
  //         Component: (await import('@/components/coming-soon')).default,
  //       }),
  //     },
  //     {
  //       path: 'analysis',
  //       lazy: async () => ({
  //         Component: (await import('@/components/coming-soon')).default,
  //       }),
  //     },
  //     {
  //       path: 'extra-components',
  //       lazy: async () => ({
  //         Component: (await import('@/pages/extra-components')).default,
  //       }),
  //     },
  //     {
  //       path: 'settings',
  //       lazy: async () => ({
  //         Component: (await import('./pages/settings')).default,
  //       }),
  //       errorElement: <GeneralError />,
  //       children: [
  //         {
  //           index: true,
  //           lazy: async () => ({
  //             Component: (await import('./pages/settings/profile')).default,
  //           }),
  //         },
  //         {
  //           path: 'account',
  //           lazy: async () => ({
  //             Component: (await import('./pages/settings/account')).default,
  //           }),
  //         },
  //         {
  //           path: 'appearance',
  //           lazy: async () => ({
  //             Component: (await import('./pages/settings/appearance')).default,
  //           }),
  //         },
  //         {
  //           path: 'notifications',
  //           lazy: async () => ({
  //             Component: (await import('./pages/settings/notifications'))
  //               .default,
  //           }),
  //         },
  //         {
  //           path: 'display',
  //           lazy: async () => ({
  //             Component: (await import('./pages/settings/display')).default,
  //           }),
  //         },
  //         {
  //           path: 'error-example',
  //           lazy: async () => ({
  //             Component: (await import('./pages/settings/error-example'))
  //               .default,
  //           }),
  //           errorElement: <GeneralError className='h-[50svh]' minimal />,
  //         },
  //       ],
  //     },
  //   ],
  // },

  // A-2-a 손해사정 계약
  {
    path: 'contract',
    lazy: async () => {
      const Contract = await import('./pages/A-2/contract/index.tsx')
      return {
        Component: () => {
          return Contract.default()
        },
      }
    },
  },
  // A-2-b 자료 제출
  {
    path: 'submit_entrance',
    lazy: async () => {
      const SubmitEntrance = await import(
        './pages/A-2/submit_entrance/index.tsx'
      )
      return {
        Component: () => {
          return SubmitEntrance.default()
        },
      }
    },
  },
  {
    path: 'submit_cert',
    lazy: async () => {
      const SubmitCert = await import('./pages/A-2/submit_cert/index.tsx')
      return {
        Component: () => {
          return SubmitCert.default()
        },
      }
    },
  },
  {
    path: 'submit_file',
    lazy: async () => {
      const SubmitFile = await import('./pages/A-2/submit_file/index.tsx')
      return {
        Component: () => {
          return SubmitFile.default()
        },
      }
    },
  },
  {
    path: 'submit_file_success',
    lazy: async () => {
      const SubmitFileSuccess = await import(
        './pages/A-2/submit_file_success/index.tsx'
      )
      return {
        Component: () => {
          return SubmitFileSuccess.default()
        },
      }
    },
  },
  {
    path: 'additional',
    lazy: async () => {
      const Additional = await import('./pages/A-2/additional/index.tsx')
      return {
        Component: () => {
          return Additional.default()
        },
      }
    },
  },
  {
    path: 'additional_success',
    lazy: async () => {
      const AdditionalSuccess = await import(
        './pages/A-2/additional_success/index.tsx'
      )
      return {
        Component: () => {
          return AdditionalSuccess.default()
        },
      }
    },
  },

  // Home 화면. path는 변할 수 있습니다.
  {
    path: 'home',
    lazy: async () => {
      const Contract = await import('./pages/home/index.tsx')
      return {
        Component: () => {
          return Contract.default()
        },
      }
    },
  },
  {
    path: 'notice',
    lazy: async () => {
      const Notice = await import('./pages/notice/index.tsx')
      return {
        Component: () => {
          return Notice.default()
        },
      }
    },
  },
  {
    path: 'mypage',
    lazy: async () => {
      const MyPage = await import('./pages/mypage/index.tsx')
      return {
        Component: () => {
          return MyPage.default()
        },
      }
    },
  },
  {
    path: 'policy',
    lazy: async () => {
      const Policy = await import('./pages/policy/index.tsx')
      return {
        Component: () => {
          return Policy.default()
        },
      }
    },
  },
  {
    path: 'event',
    lazy: async () => {
      const Event = await import('./pages/event/index.tsx')
      return {
        Component: () => {
          return Event.default()
        },
      }
    },
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
