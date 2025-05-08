"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { exchangeCodeForTokens, getOriginalUrl, verifyState } from "@/lib/enhanced-wix-auth"

export default function EnhancedCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState("Processing login...")
  const [processingComplete, setProcessingComplete] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({
    searchParams: {},
    timeStarted: new Date().toISOString(),
  })

  useEffect(() => {
    async function handleCallback() {
      try {
        // Check for error in URL
        const errorInUrl = searchParams.get("error")
        const errorDescriptionInUrl = searchParams.get("error_description")

        if (errorInUrl) {
          setError(`Authentication error: ${errorDescriptionInUrl || errorInUrl}`)
          setDebugInfo((prev) => ({
            ...prev,
            error: errorInUrl,
            errorDescription: errorDescriptionInUrl,
            stage: "url_error_check",
          }))
          return
        }

        // Get code and state from URL
        const code = searchParams.get("code")
        const state = searchParams.get("state")

        // Update debug info
        setDebugInfo((prev) => ({
          ...prev,
          code: code ? `${code.substring(0, 10)}...` : null,
          state: state ? `${state.substring(0, 10)}...` : null,
          hasCode: !!code,
          hasState: !!state,
          callbackUrl: window.location.href,
          stage: "parameter_extraction",
        }))

        // Validate required parameters
        if (!code) {
          setError("No authorization code received. Make sure the redirect URI is properly configured.")
          setDebugInfo((prev) => ({
            ...prev,
            stage: "code_validation_failed",
          }))
          return
        }

        if (!state) {
          setError("No state parameter received. This could be due to a cross-site request forgery attempt.")
          setDebugInfo((prev) => ({
            ...prev,
            stage: "state_validation_failed",
          }))
          return
        }

        // Verify state to prevent CSRF
        const isStateValid = verifyState(state)
        setDebugInfo((prev) => ({
          ...prev,
          isStateValid,
          stage: "state_verification",
        }))

        if (!isStateValid) {
          setError(
            "Invalid state parameter. This could be a CSRF attack or you may have started multiple login attempts.",
          )
          return
        }

        // Exchange code for tokens
        setStatus("Exchanging code for tokens...")
        setDebugInfo((prev) => ({
          ...prev,
          stage: "token_exchange_started",
        }))

        const tokens = await exchangeCodeForTokens(code)

        setDebugInfo((prev) => ({
          ...prev,
          tokenExchangeSuccess: true,
          accessTokenExpiry: tokens.accessToken?.expiresAt,
          hasRefreshToken: !!tokens.refreshToken,
          stage: "token_exchange_completed",
        }))

        // Success!
        setStatus("Authentication successful!")
        setProcessingComplete(true)
      } catch (err: any) {
        console.error("Callback error:", err)
        setError(err.message || "An error occurred during login")
        setDebugInfo((prev) => ({
          ...prev,
          errorMessage: err.message,
          errorStack: err.stack?.split("\n").slice(0, 3).join("\n"),
          stage: "error_caught",
        }))
      }
    }

    handleCallback()
  }, [searchParams])

  const handleContinue = () => {
    // Changed default from /account to /
    const originalUrl = getOriginalUrl() || "/"
    const fullUrl = `${window.location.origin}${originalUrl}`
    console.log("Redirecting to:", fullUrl)
    router.push(originalUrl)
  }

  const handleRetry = () => {
    router.push("/enhanced-login")
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

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  If you're seeing &quot;This content is blocked&quot;, make sure your Wix OAuth app has{" "}
                  <strong>{window.location.origin}/enhanced-callback</strong> as an allowed redirect URI.
                </AlertDescription>
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
                Continue to Homepage
              </Button>

              <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs">
                <h3 className="font-medium mb-1">Auth Information</h3>
                <pre className="overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
                <p className="mt-2">Redirect URL: {`${window.location.origin}${getOriginalUrl() || "/"}`}</p>
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
