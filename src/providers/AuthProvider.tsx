import { AuthError, Session, SignOut, User } from '@supabase/supabase-js'
import { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '@/supabase'
import { useLocation } from 'react-router-dom'
import Loader from '@/components/loader'

interface AuthContextType {
  user: User | null // User 또는 null
  // signIn: () => Promise<{ data: any; error: any }>; // signIn 메서드의 반환 타입
  signOut: (() => Promise<{ error: AuthError | null }>) | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut: null,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

interface ProviderProps {
  children: React.ReactNode // children의 타입을 명시적으로 정의
}

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
      }
    )
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    console.log('error: ', error)
    if (!error) {
      setUser(null)
      setSession(null)
    }
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, signOut: signOut }}>
      {!loading ? (
        children
      ) : (
        <div className='flex flex-1 items-center justify-center border-0 border-red-600'>
          <Loader />
        </div>
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
