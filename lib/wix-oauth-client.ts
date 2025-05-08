import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

// Create a type-safe client
export const createWixOAuthClient = () => {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"

  if (!clientId) {
    console.error("Missing Wix client ID. Using hardcoded fallback for development.")
  }

  return createClient({
    modules: { members },
    auth: {
      clientId,
    },
  })
}

// Initialize client - this will only run on the client side
let wixOAuthClient: ReturnType<typeof createWixOAuthClient> | null = null

if (typeof window !== "undefined") {
  try {
    wixOAuthClient = createWixOAuthClient()
    console.log("Wix OAuth client initialized")
  } catch (error) {
    console.error("Error initializing Wix OAuth client:", error)
  }
}

export { wixOAuthClient }

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
  localStorage.removeItem("wixOAuthData")
}

// Helper to get the current member after authentication
export const getCurrentMember = async () => {
  if (!wixOAuthClient) return null

  try {
    const { members: membersApi } = wixOAuthClient
    return await membersApi.getCurrentMember()
  } catch (error) {
    console.error("Error getting current member:", error)
    return null
  }
}
