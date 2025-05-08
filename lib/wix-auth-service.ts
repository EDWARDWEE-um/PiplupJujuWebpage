import { createClient } from "@wix/sdk"
import { auth, members } from "@wix/members"
import Cookies from "js-cookie"

const WIX_REFRESH_TOKEN = "wix_refresh_token"
const WIX_ACCESS_TOKEN = "wix_access_token"

// Create a client for authentication operations
export const createAuthClient = () => {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID

  if (!clientId) {
    console.error("Missing Wix client ID. Please check your environment variables.")
    throw new Error("Missing Wix client ID")
  }

  return createClient({
    modules: { auth, members },
    auth: {
      clientId,
    },
  })
}

// Initialize client
let authClient: ReturnType<typeof createAuthClient>

// Only initialize on client side
if (typeof window !== "undefined") {
  try {
    authClient = createAuthClient()

    // Try to restore tokens from cookies
    const refreshTokenStr = Cookies.get(WIX_REFRESH_TOKEN)
    const accessTokenStr = Cookies.get(WIX_ACCESS_TOKEN)

    if (refreshTokenStr && accessTokenStr) {
      try {
        const refreshToken = JSON.parse(refreshTokenStr)
        const accessToken = JSON.parse(accessTokenStr)

        authClient.auth.setTokens({
          refreshToken,
          accessToken,
        })
      } catch (e) {
        console.error("Error parsing stored tokens:", e)
        // Clear invalid tokens
        Cookies.remove(WIX_REFRESH_TOKEN)
        Cookies.remove(WIX_ACCESS_TOKEN)
      }
    }
  } catch (error) {
    console.error("Error initializing Wix auth client:", error)
  }
}

export const WixAuthService = {
  // Check if a user is logged in
  isLoggedIn: async () => {
    try {
      if (!authClient) return false
      return authClient.auth.loggedIn()
    } catch (error) {
      console.error("Error checking login status:", error)
      return false
    }
  },

  // Get current member details
  getCurrentMember: async () => {
    try {
      if (!authClient) return null
      if (!authClient.auth.loggedIn()) return null

      const { member } = await authClient.members.getCurrentMember()
      return member
    } catch (error) {
      console.error("Error getting current member:", error)
      return null
    }
  },

  // Register a new member
  register: async (email: string, password: string, profile?: any) => {
    try {
      if (!authClient) throw new Error("Auth client not initialized")

      const response = await authClient.auth.register({
        email,
        password,
        profile,
      })

      return handleAuthResponse(response)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  // Login an existing member
  login: async (email: string, password: string) => {
    try {
      if (!authClient) throw new Error("Auth client not initialized")

      const response = await authClient.auth.login({
        email,
        password,
      })

      return handleAuthResponse(response)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Process email verification
  processVerification: async (verificationCode: string) => {
    try {
      if (!authClient) throw new Error("Auth client not initialized")

      const response = await authClient.auth.processVerification({
        verificationCode,
      })

      return handleAuthResponse(response)
    } catch (error) {
      console.error("Verification error:", error)
      throw error
    }
  },

  // Send password reset email
  sendPasswordResetEmail: async (email: string) => {
    try {
      if (!authClient) throw new Error("Auth client not initialized")

      await authClient.auth.sendPasswordResetEmail(email, `${window.location.origin}/reset-password-success`)

      return true
    } catch (error) {
      console.error("Password reset error:", error)
      throw error
    }
  },

  // Logout the current member
  logout: async () => {
    try {
      if (!authClient) throw new Error("Auth client not initialized")

      const { logoutUrl } = await authClient.auth.logout(window.location.origin)

      // Clear tokens
      Cookies.remove(WIX_REFRESH_TOKEN)
      Cookies.remove(WIX_ACCESS_TOKEN)

      // Redirect to logout URL
      window.location.href = logoutUrl

      return true
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  },

  // Get the auth client instance
  getClient: () => authClient,
}

// Helper function to handle authentication responses
const handleAuthResponse = async (response: any) => {
  switch (response.loginState) {
    case "SUCCESS":
      // Get tokens for direct login
      const tokens = await authClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken)

      // Set tokens in the client
      authClient.auth.setTokens(tokens)

      // Store tokens in cookies
      Cookies.set(WIX_REFRESH_TOKEN, JSON.stringify(tokens.refreshToken), { expires: 30 })
      Cookies.set(WIX_ACCESS_TOKEN, JSON.stringify(tokens.accessToken), { expires: 1 })

      return { success: true, loginState: response.loginState }

    case "EMAIL_VERIFICATION_REQUIRED":
      return {
        success: false,
        loginState: response.loginState,
        message: "Please check your email for a verification code.",
      }

    case "OWNER_APPROVAL_REQUIRED":
      return {
        success: false,
        loginState: response.loginState,
        message: "Your registration is pending approval by the site owner.",
      }

    case "FAILURE":
      let errorMessage = "Authentication failed."

      switch (response.errorCode) {
        case "invalidEmail":
          errorMessage = "The email address provided is invalid."
          break
        case "invalidPassword":
          errorMessage = "The password provided is invalid."
          break
        case "resetPassword":
          errorMessage = "You need to reset your password."
          break
        case "emailAlreadyExists":
          errorMessage = "An account with this email already exists."
          break
      }

      return {
        success: false,
        loginState: response.loginState,
        errorCode: response.errorCode,
        message: errorMessage,
      }

    default:
      return {
        success: false,
        loginState: response.loginState,
        message: "An unknown error occurred.",
      }
  }
}

export default WixAuthService
