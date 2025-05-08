"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@wix/sdk"
import { members } from "@wix/members"

export default function PopupCallbackPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code and state from the URL
        const code = searchParams.get("code")
        const state = searchParams.get("state")

        if (!code || !state) {
          throw new Error("Missing code or state parameter")
        }

        // Try to get client ID from localStorage (set by parent window)
        let clientId
        try {
          const authData = localStorage.getItem("wixAuthData")
          if (authData) {
            const parsedData = JSON.parse(authData)
            clientId = parsedData.clientId
          }
        } catch (e) {
          console.error("Error parsing auth data:", e)
        }

        // Fallback to hardcoded client ID if not found
        clientId = clientId || "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"

        console.log("Using client ID for callback:", clientId)

        // Create Wix client
        const wixClient = createClient({
          modules: { members },
          auth: {
            clientId,
          },
        })

        // Exchange code for tokens
        const tokens = await wixClient.auth.getMemberTokens(code, state)

        // Send success message to parent window
        if (window.opener && window.opener !== window) {
          window.opener.postMessage(
            {
              type: "WIX_AUTH_COMPLETE",
              success: true,
              tokens,
            },
            window.location.origin,
          )
        }
      } catch (error: any) {
        console.error("Error in popup callback:", error)

        // Send error to parent window
        if (window.opener && window.opener !== window) {
          window.opener.postMessage(
            {
              type: "WIX_AUTH_COMPLETE",
              success: false,
              error: error.message || "Authentication failed",
            },
            window.location.origin,
          )
        }
      } finally {
        // Close popup after a short delay
        setTimeout(() => {
          if (window.opener) {
            window.close()
          }
        }, 1000)
      }
    }

    handleCallback()
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing Authentication...</h1>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-sm text-gray-500">This window will close automatically.</p>
      </div>
    </div>
  )
}
