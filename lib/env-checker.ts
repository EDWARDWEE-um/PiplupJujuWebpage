/**
 * Simple utility to check environment variables
 */

export const checkEnvironmentVariables = () => {
  const variables = {
    NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    WIX_CLIENT_ID: process.env.WIX_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  }

  const missing = Object.entries(variables)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  return {
    allPresent: missing.length === 0,
    missing,
    values: {
      // Only include public variables or presence checks for private ones
      NEXT_PUBLIC_WIX_CLIENT_ID: variables.NEXT_PUBLIC_WIX_CLIENT_ID,
      hasWixClientId: !!variables.WIX_CLIENT_ID,
      hasGoogleClientId: !!variables.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
  }
}

// Function to check if we're in a browser environment
export const isBrowser = () => typeof window !== "undefined"

// Function to check environment variables in the browser
export const checkBrowserEnvVars = () => {
  if (!isBrowser()) return { hasClientId: false }

  return {
    hasClientId: !!process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    clientIdValue: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "Not found",
  }
}
