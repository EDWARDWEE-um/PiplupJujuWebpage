"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getWixClient } from "@/lib/standalone-wix-client"
import Link from "next/link"

export default function StandaloneLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientInitialized, setClientInitialized] = useState(false)

  // Check if client is initialized
  useEffect(() => {
    const client = getWixClient()
    setClientInitialized(!!client)

    if (!client) {
      setError("Failed to initialize Wix client. Please try again or contact support.")
    }
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const client = getWixClient()

      if (!client) {
        throw new Error("Wix client not initialized")
      }

      // Generate redirect URI - must be an allowed redirect URI in your Wix OAuth app settings
      const redirectUri = `${window.location.origin}/standalone-callback`
      const originalUri = window.location.href

      console.log("Generating OAuth data with:", { redirectUri, originalUri })

      // 1. Generate OAuth Data
      const oAuthData = client.auth.generateOAuthData(redirectUri, originalUri)
      console.log("Generated OAuth data:", oAuthData)

      // 2. Store OAuth Data in localStorage
      localStorage.setItem("wixOAuthData", JSON.stringify(oAuthData))

      // 3. Get Login URL
      console.log("Getting auth URL...")
      const { authUrl } = await client.auth.getAuthUrl(oAuthData)
      console.log("Auth URL received:", authUrl)

      // 4. Redirect to Wix login page
      window.location.href = authUrl
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to initialize login. Please try again.")
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
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" onClick={handleLogin} disabled={isLoading || !clientInitialized}>
            {isLoading ? "Initializing Login..." : "Login with Wix"}
          </Button>

          {!clientInitialized && (
            <p className="text-sm text-center text-muted-foreground">
              Wix client initialization failed. Please try refreshing the page.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            By logging in, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
