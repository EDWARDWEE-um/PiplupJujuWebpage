// This is a development-only fallback authentication mechanism
// It simulates authentication without requiring actual Wix credentials

interface FallbackUser {
  id: string
  name: string
  email: string
  points: number
  profileImage?: string
}

interface FallbackAuthState {
  isAuthenticated: boolean
  user: FallbackUser | null
}

// Store auth state in localStorage (development only)
const STORAGE_KEY = "pokemon-tcg-dev-auth"

export const fallbackAuth = {
  // Check if we should use fallback auth (no Wix client ID)
  shouldUseFallback: () => {
    return !process.env.NEXT_PUBLIC_WIX_CLIENT_ID && process.env.NODE_ENV !== "production"
  },

  // Get current auth state
  getAuthState: (): FallbackAuthState => {
    if (typeof window === "undefined") {
      return { isAuthenticated: false, user: null }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error("Error reading auth state from localStorage:", error)
    }

    return { isAuthenticated: false, user: null }
  },

  // Save auth state
  saveAuthState: (state: FallbackAuthState) => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error("Error saving auth state to localStorage:", error)
    }
  },

  // Login with email/password (simulated)
  login: async (email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!email || !password) return false
    if (password.length < 6) return false

    // Create a user based on the email
    const user: FallbackUser = {
      id: `dev-${Date.now()}`,
      name: email.split("@")[0],
      email,
      points: 100,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }

    fallbackAuth.saveAuthState({
      isAuthenticated: true,
      user,
    })

    return true
  },

  // Register (simulated)
  register: async (name: string, email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!name || !email || !password) return false
    if (password.length < 6) return false

    // Create a user
    const user: FallbackUser = {
      id: `dev-${Date.now()}`,
      name,
      email,
      points: 100,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }

    fallbackAuth.saveAuthState({
      isAuthenticated: true,
      user,
    })

    return true
  },

  // Google login (simulated)
  loginWithGoogle: async (): Promise<boolean> => {
    // Generate random email for demo
    const randomId = Math.random().toString(36).substring(2, 10)
    const email = `user${randomId}@example.com`
    const name = `Demo User ${randomId.substring(0, 4)}`

    const user: FallbackUser = {
      id: `dev-google-${Date.now()}`,
      name,
      email,
      points: 100,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }

    fallbackAuth.saveAuthState({
      isAuthenticated: true,
      user,
    })

    return true
  },

  // Logout
  logout: () => {
    fallbackAuth.saveAuthState({
      isAuthenticated: false,
      user: null,
    })
  },
}
