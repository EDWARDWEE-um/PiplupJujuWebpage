"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getWixClient } from "@/lib/wix-client-fix"
import Link from "next/link"

export default function FixedLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientStatus, setClientStatus] = useState<{ initialized: boolean; details: any }>({
    initialized: false,
    details: {},
  })

  // Check if client is initialized
  useEffect(() => {
    try {
      const client = getWixClient()

      // Check if client has an error property
      if ("error" in client && client.error) {
        setClientStatus({
          initialized: false,
          details: { error: true, message: client.errorMessage },
        })
        setError(`Client initialization failed: ${client.errorMessage}`)
        return
      }

      setClientStatus({
        initialized: true,
        details: { clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "Using fallback ID" },
      })
    } catch (err: any) {
      console.error("Error checking client:", err)
      setClientStatus({
        initialized: false,
        details: { error: err.message },
      })
      setError(`Error checking client: ${err.message}`)
    }
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Use direct login URL instead of SDK
      const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"
      const redirectUri = `${window.location.origin}/fixed-callback`
      const state = Math.random().toString(36).substring(2, 15)

      // Store state for verification
      localStorage.setItem("wix_auth_state", state)

      // Construct auth URL directly
      const authUrl = `https://www.wix.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`

      console.log("Redirecting to auth URL:", authUrl)

      // Redirect to auth URL
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

          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Initializing Login..." : "Login with Wix"}
          </Button>

          <div className="p-3 bg-gray-50 rounded-md text-xs">
            <h3 className="font-medium mb-1">Client Status</h3>
            <p>Initialized: {clientStatus.initialized ? "Yes" : "No"}</p>
            <pre className="mt-2 overflow-auto">{JSON.stringify(clientStatus.details, null, 2)}</pre>
          </div>
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
