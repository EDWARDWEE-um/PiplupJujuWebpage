"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createWixClient, storeWixTokens } from "@/lib/wix-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WixCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    async function handleCallback() {
      try {
        const wixClient = createWixClient()

        // Get the OAuth data from localStorage
        const oAuthDataStr = localStorage.getItem("wix_oauth_data")
        if (!oAuthDataStr) {
          setError("Authentication data not found. Please try logging in again.")
          setProcessing(false)
          return
        }

        const oAuthData = JSON.parse(oAuthDataStr)

        // Parse the returned OAuth data from the URL
        const returnedOAuthData = wixClient.auth.parseFromUrl()

        if (returnedOAuthData.error) {
          setError(`Login error: ${returnedOAuthData.errorDescription || returnedOAuthData.error}`)
          setProcessing(false)
          return
        }

        if (!returnedOAuthData.code || !returnedOAuthData.state) {
          setError("Invalid authentication response. Missing required parameters.")
          setProcessing(false)
          return
        }

        // Get member tokens
        const tokens = await wixClient.auth.getMemberTokens(returnedOAuthData.code, returnedOAuthData.state, oAuthData)

        // Set tokens in the client and store them
        wixClient.auth.setTokens(tokens)
        storeWixTokens(tokens)

        // Redirect to the original URI or dashboard
        const redirectTo = oAuthData.originalUri || "/account"
        router.push(redirectTo)
      } catch (err) {
        console.error("Error handling Wix callback:", err)
        setError("Failed to complete authentication. Please try again.")
        setProcessing(false)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{error ? "Authentication Failed" : "Completing Authentication"}</CardTitle>
        </CardHeader>
        <CardContent>
          {processing ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              <p className="ml-2">Processing your authentication...</p>
            </div>
          ) : error ? (
            <div className="py-6">
              <p className="text-destructive">{error}</p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Return to Login
              </button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
