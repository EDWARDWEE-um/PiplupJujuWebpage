"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
import { generateLoginUrl, storeOriginalUrl } from "@/lib/enhanced-wix-auth"

export default function EnhancedLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({})

  useEffect(() => {
    // Store current URL to redirect back after login
    storeOriginalUrl(window.location.href)

    // Collect some debug info to help troubleshoot
    setDebugInfo({
      origin: window.location.origin,
      host: window.location.host,
      pathname: window.location.pathname,
      protocol: window.location.protocol,
      clientId: "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3", // The one we're using
      timestamp: new Date().toISOString(),
    })
  }, [])

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Generate login URL
      const authUrl = await generateLoginUrl()

      // Log for debugging
      console.log("Redirecting to auth URL:", authUrl)

      // Redirect to Wix login page
      window.location.href = authUrl
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to generate login URL")
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

          <Button onClick={handleLogin} disabled={isLoading} className="w-full">
            {isLoading ? "Preparing login..." : "Login with Wix"}
          </Button>

          <div className="mt-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Make sure your Wix OAuth app has{" "}
                <code className="bg-gray-100 px-1 rounded">{window.location.origin}/enhanced-callback</code> as an
                allowed redirect URI.
              </AlertDescription>
            </Alert>
          </div>

          <details className="mt-4 text-xs text-gray-500">
            <summary className="cursor-pointer">Debug Information</summary>
            <pre className="mt-2 p-3 bg-gray-50 rounded-md overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
          </details>
        </CardContent>
      </Card>
    </div>
  )
}
