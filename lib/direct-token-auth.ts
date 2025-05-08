import { createClient, OAuthStrategy } from "@wix/sdk"
import { members } from "@wix/members"
import Cookies from "js-cookie"

// The hardcoded member token for direct authentication
// In a production environment, this would be securely stored and retrieved
const MEMBER_TOKEN = {
  accessToken: {
    value: "YOUR_ACCESS_TOKEN_VALUE", // Replace with actual token
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days from now
  },
  refreshToken: {
    value: "YOUR_REFRESH_TOKEN_VALUE", // Replace with actual token
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
  },
}

export async function signInWithToken() {
  try {
    // Create a Wix client with the hardcoded token
    const wixClient = createClient({
      modules: { members },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: MEMBER_TOKEN,
      }),
    })

    // Verify the token works by fetching the current member
    const currentMember = await wixClient.members.getCurrentMember()

    if (!currentMember) {
      throw new Error("Invalid member token")
    }

    // Save the token to cookies
    Cookies.set("session", JSON.stringify(MEMBER_TOKEN), { expires: 7 })

    return {
      success: true,
      member: currentMember,
    }
  } catch (error) {
    console.error("Token authentication error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Authentication failed",
    }
  }
}
