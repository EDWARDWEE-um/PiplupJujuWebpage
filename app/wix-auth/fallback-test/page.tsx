"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function WixFallbackTestPage() {
  const [clientId, setClientId] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkWixClient() {
      try {
        setIsLoading(true)

        // Check if the environment variable is set
        const envClientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID

        if (envClientId) {
          setClientId(envClientId)
          setIsUsingFallback(false)
        } else {
          // Using fallback
          setIsUsingFallback(true)
          setClientId("test-client-id-for-development-only")
        }
      } catch (err) {
        console.error("Error checking Wix client:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    checkWixClient()
  }, [])

  const handleStartLogin = () => {
    // Redirect to the login page
    window.location.href = "/wix-auth/login-fallback"
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Wix Authentication Test (Fallback Mode)</CardTitle>
          <CardDescription>Test Wix authentication with fallback client ID for development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium">Client ID Status</h3>
                <p className="text-sm mt-1">
                  {isUsingFallback ? (
                    <span className="text-yellow-600">Using fallback client ID (for testing only)</span>
                  ) : (
                    <span className="text-green-600">Using environment variable client ID</span>
                  )}
                </p>
              </div>

              {isUsingFallback && (
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Development Mode</AlertTitle>
                  <AlertDescription>
                    You are using a fallback client ID for testing. This will not work with actual Wix authentication.
                    Please set the NEXT_PUBLIC_WIX_CLIENT_ID environment variable for production use.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button onClick={handleStartLogin} disabled={isLoading || !!error} className="w-full">
            Test Login Flow
          </Button>
          <div className="flex justify-between w-full">
            <Button asChild variant="outline" size="sm">
              <Link href="/env-debug">Check Environment Variables</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/wix-auth/setup-guide">Setup Guide</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
