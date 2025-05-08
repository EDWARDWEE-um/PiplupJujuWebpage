import { createClient } from "@wix/sdk"
import { members } from "@wix/members"
import { OAuthStrategy } from "@wix/sdk"

// Function to create a Wix client with proper error handling
export const createWixClientSafely = () => {
  try {
    // Get client ID from environment variables or use hardcoded fallback
    const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"

    console.log("Creating Wix client with client ID:", clientId)

    // Create client with specific options to avoid initialization errors
    return createClient({
      modules: { members },
      auth: {
        clientId,
        // Use OAuth strategy explicitly to avoid automatic detection issues
        authStrategy: OAuthStrategy({ clientId, redirects: { afterLogin: "/auth-success" } }),
      },
    })
  } catch (error) {
    console.error("Error creating Wix client:", error)

    // Return an error object instead of null to provide more context
    return {
      error: true,
      errorMessage: error instanceof Error ? error.message : "Unknown error initializing Wix client",
      // Create dummy methods to prevent "undefined" errors
      auth: {
        // Dummy methods that return meaningful errors
        login: () => Promise.reject(new Error("Wix client failed to initialize")),
        logout: () => Promise.reject(new Error("Wix client failed to initialize")),
        generateOAuthData: () => ({ error: "Wix client failed to initialize" }),
        getAuthUrl: () => Promise.reject(new Error("Wix client failed to initialize")),
      },
    }
  }
}

// Initialize client only on the client side
let wixClient: ReturnType<typeof createWixClientSafely> | null = null

// Export a function to get the client safely
export const getWixClient = () => {
  if (typeof window === "undefined") {
    // Server-side - return a placeholder
    return {
      isServer: true,
      auth: {
        // Server-side placeholders
        login: () => Promise.reject(new Error("Wix client cannot be used on the server")),
        logout: () => Promise.reject(new Error("Wix client cannot be used on the server")),
      },
    }
  }

  // Client-side - initialize if needed
  if (!wixClient) {
    wixClient = createWixClientSafely()
  }

  return wixClient
}
