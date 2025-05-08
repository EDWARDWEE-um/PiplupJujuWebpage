import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

// Hardcoded client ID - this will work regardless of environment variables
const HARDCODED_CLIENT_ID = "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"

// Create a standalone Wix client that doesn't rely on environment variables
export const createStandaloneWixClient = () => {
  try {
    console.log("Creating standalone Wix client with hardcoded ID:", HARDCODED_CLIENT_ID)

    return createClient({
      modules: { members },
      auth: {
        clientId: HARDCODED_CLIENT_ID,
      },
    })
  } catch (error) {
    console.error("Error creating standalone Wix client:", error)
    return null
  }
}

// Initialize client - this will only run on the client side
let standaloneWixClient: ReturnType<typeof createStandaloneWixClient> | null = null

// Helper to get the client with initialization check
export const getWixClient = () => {
  if (typeof window === "undefined") {
    return null // Not in browser
  }

  if (!standaloneWixClient) {
    console.log("Initializing standalone Wix client...")
    standaloneWixClient = createStandaloneWixClient()
  }

  return standaloneWixClient
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
  localStorage.removeItem("wixOAuthData")
}

// Helper to get the current member after authentication
export const getCurrentMember = async () => {
  const client = getWixClient()
  if (!client) return null

  try {
    const { members: membersApi } = client
    return await membersApi.getCurrentMember()
  } catch (error) {
    console.error("Error getting current member:", error)
    return null
  }
}
