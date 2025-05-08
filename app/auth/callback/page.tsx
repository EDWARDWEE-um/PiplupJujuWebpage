"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { handleOAuthCallback } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get the authorization code from the URL
        const code = searchParams.get("code")
        const state = searchParams.get("state")
        const error = searchParams.get("error")

        // Check if there was an error
        if (error) {
          setError(`Authentication failed: ${error}`)
          setProcessing(false)
          return
        }

        // Verify state parameter to prevent CSRF attacks
        const savedState = sessionStorage.getItem("oauth_state")
        if (state && savedState && state !== savedState) {
          setError("Invalid state parameter. Authentication failed.")
          setProcessing(false)
          return
        }

        // Clear the state from session storage
        sessionStorage.removeItem("oauth_state")

        if (!code) {
          setError("No authorization code received")
          setProcessing(false)
          return
        }

        // Handle the OAuth callback
        const success = await handleOAuthCallback(code)

        if (success) {
          // Redirect to home page on success (changed from /account to /)
          router.push("/")
        } else {
          setError("Failed to authenticate with Google")
          setProcessing(false)
        }
      } catch (err) {
        console.error("Auth callback error:", err)
        setError("An unexpected error occurred during authentication")
        setProcessing(false)
      }
    }

    processCallback()
  }, [router, searchParams, handleOAuthCallback])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {error ? "Authentication Failed" : "Completing Authentication"}
            </CardTitle>
            <CardDescription className="text-center">
              {error ? "We encountered an issue signing you in" : "Please wait while we complete your sign-in"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
                <p className="mt-4 text-center text-sm text-muted-foreground">Processing your authentication...</p>
              </div>
            ) : error ? (
              <div className="py-6 text-center">
                <p className="text-destructive">{error}</p>
                <button
                  onClick={() => router.push("/login")}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Return to Login
                </button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
