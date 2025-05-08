"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { wixOAuthClient } from "@/lib/wix-oauth-client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function WixOAuthLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    // Check if client is initialized
    setClientReady(!!wixOAuthClient)
  }, [])

  async function handleLogin() {
    if (!wixOAuthClient) {
      setError("Wix client not initialized")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // 1. Generate OAuth Data
      // Use the current URL as the callback URL, but replace the path with /wix-oauth-callback
      const currentUrl = new URL(window.location.href)
      const redirectUri = `${currentUrl.origin}/wix-oauth-callback`
      const originalUri = window.location.href

      console.log("Generating OAuth data...")
      console.log("Redirect URI:", redirectUri)
      console.log("Original URI:", originalUri)

      const oAuthData = wixOAuthClient.auth.generateOAuthData(redirectUri, originalUri)
      console.log("OAuth data generated:", oAuthData)

      // 2. Store OAuth Data in localStorage
      localStorage.setItem("wixOAuthData", JSON.stringify(oAuthData))
      console.log("OAuth data stored in localStorage")

      // 3. Get Login URL
      console.log("Getting auth URL...")
      const { authUrl } = await wixOAuthClient.auth.getAuthUrl(oAuthData)
      console.log("Auth URL received:", authUrl)

      // 4. Redirect to Wix login page
      console.log("Redirecting to Wix login page...")
      window.location.href = authUrl
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to initialize login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login to PIPLUPJUJUTCG</CardTitle>
          <CardDescription>Sign in to your account to access your orders, wishlist, and more.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!clientReady && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Wix client not initialized. Check your environment variables.</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" onClick={handleLogin} disabled={isLoading || !clientReady}>
            {isLoading ? "Loading..." : "Login with Wix"}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            By logging in, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
