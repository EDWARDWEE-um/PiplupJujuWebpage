"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangle, CheckCircle } from "lucide-react"

export default function WixCallbackFallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing")
  const [message, setMessage] = useState<string>("")
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  useEffect(() => {
    async function handleCallback() {
      try {
        // Check if we're using the environment variable or fallback
        const envClientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID
        setIsUsingFallback(!envClientId)

        // Get the code and state from the URL
        const code = searchParams.get("code")
        const state = searchParams.get("state")

        if (!code || !state) {
          setStatus("error")
          setMessage("Invalid callback: missing code or state parameter")
          return
        }

        // Get the OAuth data from localStorage
        const oAuthDataStr = localStorage.getItem("wix_oauth_data")
        if (!oAuthDataStr) {
          setStatus("error")
          setMessage("Authentication data not found. Please try logging in again.")
          return
        }

        const oAuthData = JSON.parse(oAuthDataStr)

        // Verify the state parameter
        if (state !== oAuthData.state) {
          setStatus("error")
          setMessage("Invalid state parameter. This could be a CSRF attack.")
          return
        }

        if (isUsingFallback) {
          // Simulate successful authentication
          setStatus("success")
          setMessage("Authentication successful (simulated)")

          // Store mock tokens
          localStorage.setItem(
            "wix_tokens",
            JSON.stringify({
              accessToken: {
                value: "mock_access_token",
                expiresAt: Date.now() + 3600000, // 1 hour from now
              },
              refreshToken: {
                value: "mock_refresh_token",
              },
            }),
          )

          // Redirect after a delay
          setTimeout(() => {
            router.push(oAuthData.originalUri || "/wix-auth/fallback-test")
          }, 2000)
        } else {
          // In a real scenario, we would exchange the code for tokens
          // Import the client
          const { createWixClientWithFallback, storeWixTokens } = await import("@/lib/wix-client-fallback")
          const wixClient = createWixClientWithFallback()

          // Get member tokens
          const tokens = await wixClient.auth.getMemberTokens(code, state, oAuthData)

          // Set tokens in the client and store them
          wixClient.auth.setTokens(tokens)
          storeWixTokens(tokens)

          setStatus("success")
          setMessage("Authentication successful")

          // Redirect to the original URI or dashboard
          setTimeout(() => {
            router.push(oAuthData.originalUri || "/account")
          }, 2000)
        }
      } catch (err) {
        console.error("Error handling Wix callback:", err)
        setStatus("error")
        setMessage(err instanceof Error ? err.message : "Failed to complete authentication. Please try again.")
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            {status === "processing" && "Processing Authentication"}
            {status === "success" && "Authentication Successful"}
            {status === "error" && "Authentication Failed"}
            {isUsingFallback ? " (Fallback Mode)" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === "processing" && (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              <p className="ml-2">Processing your authentication...</p>
            </div>
          )}

          {status === "success" && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                {message}
                <p className="mt-2">Redirecting you back to the application...</p>
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {isUsingFallback && (
            <Alert className="mt-4">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Development Mode</AlertTitle>
              <AlertDescription>
                You are using a fallback client ID for testing. This is simulating the Wix authentication flow and will
                not actually authenticate with Wix.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
