import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Get stored values from cookies
    const storedState = request.cookies.get("wix_auth_state")?.value
    const redirectUrl = request.cookies.get("wix_auth_redirect")?.value
    const clientId = request.cookies.get("wix_auth_client_id")?.value

    // Validate redirect URL
    if (!redirectUrl) {
      throw new Error("Missing redirect URL")
    }

    const redirectUri = new URL(redirectUrl)

    // Check for OAuth errors
    if (error) {
      redirectUri.searchParams.set("auth_success", "false")
      redirectUri.searchParams.set("auth_error", `OAuth error: ${error}`)
      return NextResponse.redirect(redirectUri)
    }

    // Validate required parameters
    if (!code || !state) {
      throw new Error("Missing code or state parameter")
    }

    // Validate state parameter
    if (state !== storedState) {
      throw new Error("Invalid state parameter")
    }

    // Validate client ID
    if (!clientId) {
      throw new Error("Missing client ID")
    }

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
      // Exchange code for tokens
      const tokens = await wixClient.auth.getMemberTokens(code, state, {
        redirectUrl: callbackUrl,
      })

      // Set tokens in client
      wixClient.auth.setTokens(tokens)

      // Get member information
      const currentMember = await wixClient.members.getCurrentMember()

      if (!currentMember) {
        throw new Error("Failed to get member information")
      }

      // Create user object
      const userData = {
        id: currentMember._id,
        name: currentMember.profile?.nickname || currentMember.profile?.name?.first || "Member",
        email: currentMember.loginEmail || "",
        points: currentMember.profile?.customFields?.points || 100,
        profileImage: currentMember.profile?.image?.url,
      }

      // Redirect back with success and user data
      redirectUri.searchParams.set("auth_success", "true")
      redirectUri.searchParams.set("user_data", encodeURIComponent(JSON.stringify(userData)))

      const response = NextResponse.redirect(redirectUri)

      // Clear auth cookies
      response.cookies.set("wix_auth_state", "", { maxAge: 0, path: "/" })
      response.cookies.set("wix_auth_redirect", "", { maxAge: 0, path: "/" })
      response.cookies.set("wix_auth_client_id", "", { maxAge: 0, path: "/" })

      return response
    } catch (error: any) {
      console.error("Error exchanging code for tokens:", error)

      // Redirect back with error
      redirectUri.searchParams.set("auth_success", "false")
      redirectUri.searchParams.set("auth_error", encodeURIComponent(error.message || "Authentication failed"))

      const response = NextResponse.redirect(redirectUri)

      // Clear auth cookies
      response.cookies.set("wix_auth_state", "", { maxAge: 0, path: "/" })
      response.cookies.set("wix_auth_redirect", "", { maxAge: 0, path: "/" })
      response.cookies.set("wix_auth_client_id", "", { maxAge: 0, path: "/" })

      return response
    }
  } catch (error: any) {
    console.error("Error in Google auth callback:", error)

    // Redirect to home with error
    const errorUrl = new URL("/", request.nextUrl.origin)
    errorUrl.searchParams.set("auth_error", encodeURIComponent(error.message || "Authentication failed"))

    return NextResponse.redirect(errorUrl)
  }
}
