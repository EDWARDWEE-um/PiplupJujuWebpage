"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, InfoIcon } from "lucide-react"
import Link from "next/link"

export default function WixLoginFallbackPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  useEffect(() => {
    async function startLogin() {
      try {
        // Check if we're using the environment variable or fallback
        const envClientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID
        setIsUsingFallback(!envClientId)

        // Import the appropriate client
        const { createWixClientWithFallback } = await import("@/lib/wix-client-fallback")
        const wixClient = createWixClientWithFallback()

        // Get the current origin for the redirect URI
        const redirectUri = `${window.location.origin}/wix-auth/callback-fallback`
        const originalUri = window.location.href

        // Generate OAuth data
        const oAuthData = wixClient.auth.generateOAuthData(redirectUri, originalUri)

        // Store OAuth data for the callback
        localStorage.setItem("wix_oauth_data", JSON.stringify(oAuthData))

        // Get the authorization URL
        const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData)

        // In a real scenario, we would redirect to Wix login
        // For testing with fallback, we'll simulate the flow
        if (isUsingFallback) {
          // Simulate the flow by redirecting to a mock callback
          setTimeout(() => {
            window.location.href = `/wix-auth/callback-fallback?code=mock_code&state=${oAuthData.state}`
          }, 2000)
        } else {
          // Redirect to Wix login
          window.location.href = authUrl
        }
      } catch (err) {
        console.error("Error starting Wix login:", err)
        setError(err instanceof Error ? err.message : "Failed to start Wix login. Please try again.")
        setIsLoading(false)
      }
    }

    startLogin()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Wix Login {isUsingFallback ? "(Fallback Mode)" : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && !error ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              <p className="ml-2">
                {isUsingFallback ? "Simulating redirect to Wix login..." : "Redirecting to Wix login..."}
              </p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

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
        {error && (
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/env-debug">Check Environment Variables</Link>
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              Try Again
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
