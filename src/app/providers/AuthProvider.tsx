import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { UserProfile } from '../../shared/types'

interface AuthCtx {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (user: UserProfile) => void
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => void
}

const defaultUser: UserProfile = {
  id: 'u1', name: 'John Doe', phone: '+251-91-123-4567', email: 'john@example.com',
  photo: '', birthday: '', language: 'en', favorites: ['r1', 'r3'],
  notificationPreferences: { orderUpdates: true, promotions: true, newRestaurants: false, appUpdates: true },
}

const AuthContext = createContext<AuthCtx>({
  user: defaultUser, isAuthenticated: true,
  login: () => {}, logout: () => {}, updateProfile: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(defaultUser)

  const login = useCallback((u: UserProfile) => setUser(u), [])
  const logout = useCallback(() => setUser(null), [])
  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...data } : prev)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
