"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

export default function GoogleLoginPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const initGoogleLogin = async () => {
      try {
        // Get parameters from URL
        const state = searchParams.get("state")
        const redirectUrl = searchParams.get("redirectUrl")

        // Get client ID - either from URL parameter or environment variable
        const clientId = searchParams.get("clientId") || process.env.NEXT_PUBLIC_WIX_CLIENT_ID

        if (!clientId) {
          throw new Error("Missing Wix client ID")
        }

        if (!state || !redirectUrl) {
          throw new Error("Missing required parameters")
        }

        // Create Wix client with the provided client ID
        const wixClient = createClient({
          modules: { members },
          auth: {
            clientId,
          },
        })

        // Start OAuth flow with Google
        const { authUrl } = await wixClient.auth.getAuthUrl({
          provider: "google",
          state,
          redirectUrl,
        })

        // Redirect to Google auth
        window.location.href = authUrl
      } catch (error: any) {
        console.error("Error starting Google login:", error)

        // If we're in a popup, send error back to parent
        if (window.opener && window.opener !== window) {
          window.opener.postMessage(
            {
              type: "WIX_AUTH_COMPLETE",
              success: false,
              error: error.message || "Failed to start Google login",
            },
            window.location.origin,
          )
          window.close()
        }
      }
    }

    initGoogleLogin()
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Google...</h1>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}
