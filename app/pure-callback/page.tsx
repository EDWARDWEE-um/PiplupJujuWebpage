"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { exchangeCodeForTokens, verifyState } from "@/lib/pure-wix-auth"

export default function PureCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState("Processing login...")
  const [processingComplete, setProcessingComplete] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get code and state from URL
        const code = searchParams.get("code")
        const state = searchParams.get("state")

        // For debugging
        setDebugInfo({
          code: code ? `${code.substring(0, 10)}...` : null,
          state: state ? `${state.substring(0, 10)}...` : null,
          hasCode: !!code,
          hasState: !!state,
        })

        // Check for errors in the URL
        const errorParam = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")

        if (errorParam) {
          setError(`Authentication error: ${errorDescription || errorParam}`)
          return
        }

        // Validate required parameters
        if (!code) {
          setError("No authorization code received. Please try again.")
          return
        }

        if (!state) {
          setError("No state parameter received. Please try again.")
          return
        }

        // Verify state to prevent CSRF
        if (!verifyState(state)) {
          setError(
            "Invalid state parameter. This could be a CSRF attack or you may have started multiple login attempts.",
          )
          return
        }

        // Exchange code for tokens
        const redirectUri = `${window.location.origin}/pure-callback`
        const tokens = await exchangeCodeForTokens(code, redirectUri)

        setDebugInfo((prev) => ({
          ...prev,
          tokenExchangeSuccess: true,
          accessTokenExpiry: tokens.accessToken?.expiresAt,
          hasRefreshToken: !!tokens.refreshToken,
        }))

        // Success!
        setStatus("Authentication successful!")
        setProcessingComplete(true)
      } catch (err: any) {
        console.error("Callback error:", err)
        setError(err.message || "An error occurred during login")
        setDebugInfo((prev: any) => ({
          ...prev,
          error: err.message,
          stack: err.stack?.split("\n").slice(0, 3).join("\n"),
        }))
      }
    }

    handleCallback()
  }, [searchParams])

  const handleContinue = () => {
    router.push("/account")
  }

  const handleRetry = () => {
    router.push("/pure-login")
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{error ? "Login Error" : "Completing Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={handleRetry} className="w-full">
                Return to Login
              </Button>

              <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
                <h3 className="font-medium mb-1">Debug Information</h3>
                <pre className="overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            </div>
          ) : processingComplete ? (
            <div className="space-y-4">
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>You have successfully authenticated with Wix!</AlertDescription>
              </Alert>
              <Button onClick={handleContinue} className="w-full">
                Continue to Account
              </Button>

              <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
                <h3 className="font-medium mb-1">Auth Information</h3>
                <pre className="overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
                <p>{status}</p>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
                <h3 className="font-medium mb-1">Debug Information</h3>
                <pre className="overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
