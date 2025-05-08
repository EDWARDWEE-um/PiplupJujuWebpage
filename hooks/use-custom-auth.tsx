"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import WixAuthService from "@/lib/wix-auth-service"

interface User {
  id: string
  name: string
  email: string
  points: number
  profileImage?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<any>
  register: (name: string, email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  processVerification: (code: string) => Promise<any>
  sendPasswordResetEmail: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
  processVerification: async () => ({}),
  sendPasswordResetEmail: async () => false,
})

export const CustomAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLoggedIn = await WixAuthService.isLoggedIn()

        if (isLoggedIn) {
          const member = await WixAuthService.getCurrentMember()

          if (member) {
            setUser({
              id: member._id,
              name: member.profile?.nickname || member.profile?.name?.first || "Member",
              email: member.loginEmail || "",
              points: member.profile?.customFields?.points || 100,
              profileImage: member.profile?.image?.url,
            })
            setIsAuthenticated(true)
          } else {
            setUser(null)
            setIsAuthenticated(false)
          }
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await WixAuthService.login(email, password)

      if (result.success) {
        const member = await WixAuthService.getCurrentMember()

        if (member) {
          setUser({
            id: member._id,
            name: member.profile?.nickname || member.profile?.name?.first || "Member",
            email: member.loginEmail || "",
            points: member.profile?.customFields?.points || 100,
            profileImage: member.profile?.image?.url,
          })
          setIsAuthenticated(true)
        }
      }

      return result
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await WixAuthService.register(email, password, {
        nickname: name,
        customFields: {
          points: 100, // New users get 100 points
        },
      })

      if (result.success) {
        const member = await WixAuthService.getCurrentMember()

        if (member) {
          setUser({
            id: member._id,
            name: member.profile?.nickname || member.profile?.name?.first || "Member",
            email: member.loginEmail || "",
            points: member.profile?.customFields?.points || 100,
            profileImage: member.profile?.image?.url,
          })
          setIsAuthenticated(true)
        }
      }

      return result
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await WixAuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const processVerification = async (code: string) => {
    setIsLoading(true)
    try {
      const result = await WixAuthService.processVerification(code)

      if (result.success) {
        const member = await WixAuthService.getCurrentMember()

        if (member) {
          setUser({
            id: member._id,
            name: member.profile?.nickname || member.profile?.name?.first || "Member",
            email: member.loginEmail || "",
            points: member.profile?.customFields?.points || 100,
            profileImage: member.profile?.image?.url,
          })
          setIsAuthenticated(true)
        }
      }

      return result
    } finally {
      setIsLoading(false)
    }
  }

  const sendPasswordResetEmail = async (email: string) => {
    return WixAuthService.sendPasswordResetEmail(email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        processVerification,
        sendPasswordResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useCustomAuth = () => useContext(AuthContext)
