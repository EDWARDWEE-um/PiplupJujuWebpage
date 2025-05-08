import { createClient } from "@wix/sdk"
import { auth, members } from "@wix/members"

// Check if required environment variables are set
const isWixClientIdSet = () => {
  return !!process.env.NEXT_PUBLIC_WIX_CLIENT_ID && process.env.NEXT_PUBLIC_WIX_CLIENT_ID.length > 0
}

// Create the client for browser usage
export const createWixClient = () => {
  if (!isWixClientIdSet()) {
    console.error("Missing Wix client ID. Please check your environment variables.")
    throw new Error("Missing Wix client ID. Please check your environment variables.")
  }

  return createClient({
    modules: { auth, members },
    auth: {
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    },
  })
}

// Helper for server-side usage
export const getServerWixClient = () => {
  if (!process.env.WIX_CLIENT_ID) {
    console.error("Missing server-side Wix client ID. Please check your environment variables.")
    throw new Error("Missing server-side Wix client ID. Please check your environment variables.")
  }

  return createClient({
    modules: { members },
    auth: {
      clientId: process.env.WIX_CLIENT_ID!,
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
let wixClient: ReturnType<typeof createWixClient> | null = null

// This code only runs on the client side
if (typeof window !== "undefined") {
  try {
    if (isWixClientIdSet()) {
      wixClient = createWixClient()
      const tokens = getWixTokens()
      if (tokens) {
        try {
          wixClient.auth.setTokens(tokens)
        } catch (error) {
          console.error("Error setting Wix tokens:", error)
          clearWixTokens() // Clear invalid tokens
        }
      }
    } else {
      console.error("Wix client initialization skipped: Missing client ID")
    }
  } catch (error) {
    console.error("Error initializing Wix client:", error)
  }
}

export { wixClient }
