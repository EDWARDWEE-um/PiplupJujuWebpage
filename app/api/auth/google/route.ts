import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const clientId = searchParams.get("client_id")
    const redirectUrl = searchParams.get("redirect")

    if (!clientId) {
      throw new Error("Missing client_id parameter")
    }

    if (!redirectUrl) {
      throw new Error("Missing redirect parameter")
    }

    // Create a state parameter for security
    const state = Math.random().toString(36).substring(2, 15)

    // Create Wix client
    const wixClient = createClient({
      modules: { members },
      auth: {
        clientId,
      },
    })

    // Get the callback URL for our handler
    const callbackUrl = new URL("/api/auth/google/callback", request.nextUrl.origin).toString()

    try {
      // Get the Google auth URL
      const { authUrl } = await wixClient.auth.getAuthUrl({
        provider: "google",
        redirectUrl: callbackUrl,
        state,
      })

      // Store state and redirect URL in cookies for verification
      const response = NextResponse.redirect(authUrl)
      response.cookies.set("wix_auth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      })
      response.cookies.set("wix_auth_redirect", redirectUrl, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      })
      response.cookies.set("wix_auth_client_id", clientId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      })

      return response
    } catch (error) {
      console.error("Error getting auth URL:", error)

      // Redirect back with error
      const errorUrl = new URL(redirectUrl)
      errorUrl.searchParams.set("auth_success", "false")
      errorUrl.searchParams.set("auth_error", "Failed to get authentication URL")

      return NextResponse.redirect(errorUrl)
    }
  } catch (error: any) {
    console.error("Error in Google auth handler:", error)

    // Redirect to home with error
    const errorUrl = new URL("/", request.nextUrl.origin)
    errorUrl.searchParams.set("auth_error", error.message || "Authentication failed")

    return NextResponse.redirect(errorUrl)
  }
}
