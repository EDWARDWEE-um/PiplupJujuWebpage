import { createClient } from "@wix/sdk"
import { auth, members } from "@wix/members"

// Fallback client ID for testing purposes only
const FALLBACK_CLIENT_ID = "test-client-id-for-development-only"

// Create the client with fallback for testing
export const createWixClientWithFallback = () => {
  // Use environment variable if available, otherwise use fallback
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || FALLBACK_CLIENT_ID

  console.log(`Using Wix client ID: ${clientId === FALLBACK_CLIENT_ID ? "FALLBACK (test only)" : "from environment"}`)

  return createClient({
    modules: { auth, members },
    auth: {
      clientId: clientId,
    },
  })
}

// Token management helpers
export const storeWixTokens = (tokens: any) => {
  if (typeof window === "undefined") return
  localStorage.setItem("wix_tokens", JSON.stringify(tokens))
}

export const getWixTokens = () => {
  if (typeof window === "undefined") return null
  const tokens = localStorage.getItem("wix_tokens")
  return tokens ? JSON.parse(tokens) : null
}

export const clearWixTokens = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("wix_tokens")
  localStorage.removeItem("wix_oauth_data")
}

// Initialize client with stored tokens if available
let wixClientFallback: ReturnType<typeof createWixClientWithFallback> | null = null

// This code only runs on the client side
if (typeof window !== "undefined") {
  try {
    wixClientFallback = createWixClientWithFallback()
    const tokens = getWixTokens()
    if (tokens) {
      try {
        wixClientFallback.auth.setTokens(tokens)
      } catch (error) {
        console.error("Error setting Wix tokens:", error)
        clearWixTokens() // Clear invalid tokens
      }
    }
  } catch (error) {
    console.error("Error initializing Wix client with fallback:", error)
  }
}

export { wixClientFallback }
