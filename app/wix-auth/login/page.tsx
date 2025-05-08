"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WixLoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function startLogin() {
      try {
        // Check if the NEXT_PUBLIC_WIX_CLIENT_ID is set
        if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
          setError("Missing Wix client ID. Please check your environment variables.")
          setIsLoading(false)
          return
        }

        // Dynamically import to avoid errors if environment variables are missing
        const { createWixClient } = await import("@/lib/wix-client")
        const wixClient = createWixClient()

        // Get the current origin for the redirect URI
        const redirectUri = `${window.location.origin}/wix-auth/callback`
        const originalUri = window.location.href

        // Generate OAuth data
        const oAuthData = wixClient.auth.generateOAuthData(redirectUri, originalUri)

        // Store OAuth data for the callback
        localStorage.setItem("wix_oauth_data", JSON.stringify(oAuthData))

        // Get the authorization URL
        const { authUrl } = await wixClient.auth.getAuthUrl(oAuthData)

        // Redirect to Wix login
        window.location.href = authUrl
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
          <CardTitle>Wix Login</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && !error ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              <p className="ml-2">Redirecting to Wix login...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
        {error && (
          <CardFooter className="flex flex-col space-y-4">
            <Button onClick={() => router.push("/wix-auth/verify-env")} className="w-full">
              Verify Environment Variables
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
