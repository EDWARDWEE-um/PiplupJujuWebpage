// Enhanced Wix authentication with focus on proper redirect URI handling

// Types for better TypeScript support
export interface WixAuthTokens {
  accessToken?: {
    value: string
    expiresAt: number
  }
  refreshToken?: {
    value: string
  }
}

export interface WixAuthState {
  isLoggedIn: boolean
  tokens: WixAuthTokens | null
  error: string | null
}

// Constants
const WIX_CLIENT_ID = "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3" // Hardcoded client ID
const TOKEN_STORAGE_KEY = "wix_auth_tokens"
const STATE_STORAGE_KEY = "wix_auth_state"
const CODE_VERIFIER_KEY = "wix_code_verifier"
const ORIGINAL_URL_KEY = "wix_original_url"

// Helper to generate random string for state and code verifier
const generateRandomString = (length = 32): string => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let text = ""
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// Helper to generate code challenge from code verifier (for PKCE)
const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  // Use the Web Crypto API which is available in modern browsers
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await crypto.subtle.digest("SHA-256", data)

  // Convert to base64url encoding
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

// Get stored tokens
export const getStoredTokens = (): WixAuthTokens | null => {
  if (typeof window === "undefined") return null

  const tokensJson = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!tokensJson) return null

  try {
    return JSON.parse(tokensJson)
  } catch (e) {
    console.error("Failed to parse stored tokens:", e)
    return null
  }
}

// Store tokens
export const storeTokens = (tokens: WixAuthTokens): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
}

// Clear tokens
export const clearTokens = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem(STATE_STORAGE_KEY)
  localStorage.removeItem(CODE_VERIFIER_KEY)
  localStorage.removeItem(ORIGINAL_URL_KEY)
}

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  const tokens = getStoredTokens()
  if (!tokens || !tokens.accessToken) return false

  // Check if token is expired
  const now = Date.now() / 1000
  return tokens.accessToken.expiresAt > now
}

// Store the original URL the user was trying to access
export const storeOriginalUrl = (url: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(ORIGINAL_URL_KEY, url)
}

// Get the original URL
export const getOriginalUrl = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(ORIGINAL_URL_KEY)
}

// Generate login URL with proper redirect URI handling
export const generateLoginUrl = async (redirectPath = "/enhanced-callback"): Promise<string> => {
  // Construct the full redirect URI using the window origin
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}${redirectPath}`
      : `https://your-default-domain.com${redirectPath}`

  // Log for debugging
  console.log("Generated redirect URI:", redirectUri)

  // Generate and store state and code verifier
  const state = generateRandomString()
  const codeVerifier = generateRandomString(64)
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  // Store state and code verifier for later verification
  localStorage.setItem(STATE_STORAGE_KEY, state)
  localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier)

  // Store the current URL if not already stored
  if (!localStorage.getItem(ORIGINAL_URL_KEY)) {
    localStorage.setItem(ORIGINAL_URL_KEY, window.location.href)
  }

  // Construct auth URL
  const params = new URLSearchParams({
    client_id: WIX_CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri,
    state: state,
    scope: "offline_access", // Required for refresh token
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  })

  // Use the authorized Wix OAuth endpoint
  return `https://www.wix.com/oauth/authorize?${params.toString()}`
}

// Exchange code for tokens with proper error handling
export const exchangeCodeForTokens = async (
  code: string,
  redirectPath = "/enhanced-callback",
): Promise<WixAuthTokens> => {
  // Construct the full redirect URI using the window origin
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}${redirectPath}`
      : `https://your-default-domain.com${redirectPath}`

  // Log for debugging
  console.log("Exchange tokens redirect URI:", redirectUri)

  // Get stored code verifier
  const codeVerifier = localStorage.getItem(CODE_VERIFIER_KEY)
  if (!codeVerifier) {
    throw new Error("Code verifier not found. Please try logging in again.")
  }

  // Prepare request body
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: WIX_CLIENT_ID,
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  })

  try {
    // Make token request
    console.log("Making token exchange request with body:", body.toString())

    const response = await fetch("https://www.wix.com/oauth/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })

    console.log("Token exchange response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Token exchange failed:", errorText)
      throw new Error(`Failed to exchange code for tokens: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Token exchange successful, got data:", Object.keys(data))

    // Format tokens
    const tokens: WixAuthTokens = {
      accessToken: {
        value: data.access_token,
        expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
      },
    }

    if (data.refresh_token) {
      tokens.refreshToken = {
        value: data.refresh_token,
      }
    }

    // Store tokens
    storeTokens(tokens)

    return tokens
  } catch (error) {
    console.error("Token exchange error:", error)
    throw error
  }
}

// Verify state parameter
export const verifyState = (receivedState: string): boolean => {
  const storedState = localStorage.getItem(STATE_STORAGE_KEY)
  return storedState === receivedState
}

// Generate logout URL
export const generateLogoutUrl = (redirectPath = "/"): string => {
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}${redirectPath}`
      : `https://your-default-domain.com${redirectPath}`

  return `https://www.wix.com/oauth/signout?redirect_uri=${encodeURIComponent(redirectUri)}`
}

// Refresh access token
export const refreshAccessToken = async (): Promise<WixAuthTokens> => {
  const tokens = getStoredTokens()
  if (!tokens || !tokens.refreshToken) {
    throw new Error("No refresh token available")
  }

  // Prepare request body
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: WIX_CLIENT_ID,
    refresh_token: tokens.refreshToken.value,
  })

  // Make refresh token request
  const response = await fetch("https://www.wix.com/oauth/access", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Token refresh failed:", errorText)
    throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  // Format tokens
  const newTokens: WixAuthTokens = {
    accessToken: {
      value: data.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
    },
    refreshToken: tokens.refreshToken, // Keep the existing refresh token if not provided
  }

  if (data.refresh_token) {
    newTokens.refreshToken = {
      value: data.refresh_token,
    }
  }

  // Store tokens
  storeTokens(newTokens)

  return newTokens
}
