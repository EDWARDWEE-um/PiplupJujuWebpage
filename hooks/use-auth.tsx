"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Dummy user data
const DUMMY_USER = {
  id: "dummy-user-id-123",
  name: "Pokémon Trainer",
  email: "trainer@pokemon.com",
  points: 750,
  profileImage: "/placeholder.svg?key=ekxh6",
}

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
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<void>
  loginWithGitHub: () => Promise<void>
  refreshAuthState: () => Promise<void>
  getWixClient: () => any
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  loginWithGoogle: async () => {},
  loginWithGitHub: async () => {},
  refreshAuthState: async () => {},
  getWixClient: () => null,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Always set the user as authenticated with dummy data
  const [user, setUser] = useState<User | null>(DUMMY_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Mock login function
  const login = async (email: string, password: string) => {
    console.log("Mock login with:", email, password)
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(DUMMY_USER)
    setIsAuthenticated(true)
    setIsLoading(false)

    router.push("/")
    return true
  }

  // Mock logout function
  const logout = () => {
    console.log("Mock logout")

    // We're using dummy data, so we'll just redirect
    // In a real implementation, we would clear auth state
    router.push("/")
  }

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    console.log("Mock register with:", name, email, password)
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Create a custom user with the provided name
    const customUser = {
      ...DUMMY_USER,
      name,
      email,
    }

    setUser(customUser)
    setIsAuthenticated(true)
    setIsLoading(false)

    router.push("/")
    return true
  }

  // Mock Google login
  const loginWithGoogle = async () => {
    console.log("Mock Google login")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser(DUMMY_USER)
    setIsAuthenticated(true)
    setIsLoading(false)

    router.push("/")
  }

  // Mock GitHub login
  const loginWithGitHub = async () => {
    console.log("Mock GitHub login")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser(DUMMY_USER)
    setIsAuthenticated(true)
    setIsLoading(false)

    router.push("/")
  }

  // Mock refresh auth state
  const refreshAuthState = async () => {
    console.log("Mock refresh auth state")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    setUser(DUMMY_USER)
    setIsAuthenticated(true)
    setIsLoading(false)
  }

  // Mock Wix client getter
  const getWixClient = () => {
    return {
      // Return a mock Wix client if needed
      mock: true,
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
        loginWithGoogle,
        loginWithGitHub,
        refreshAuthState,
        getWixClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
