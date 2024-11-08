import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider' // AuthProvider에서 만든 useAuth 훅을 불러옵니다.

interface ProtectedRouteProps {
  children: React.ReactNode // 보호된 컴포넌트 자식 요소
}

// ProtectedRoute 컴포넌트: 인증되지 않은 사용자는 리다이렉트합니다.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth() // 현재 로그인된 사용자 정보 확인
  const location = useLocation()

  // console.log('pathname', location.pathname)

  if (!user) {
    // 사용자가 로그인되어 있지 않다면, 로그인 페이지로 리다이렉트
    return <Navigate to='/signin' state={{ from: location }} replace />
  }

  // if (user && location.pathname === '/signin') {
  //   console.log('ㅋㅋㅋ')
  //   return <Navigate to='/' state={{ from: location }} replace />
  // }

  // 사용자가 로그인되어 있다면, 자식 컴포넌트 렌더링
  else return <>{children}</>
}

export default ProtectedRoute
