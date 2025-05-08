"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { wixOAuthClient, storeWixTokens, getCurrentMember } from "@/lib/wix-oauth-client"

export default function WixOAuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState("Processing login...")
  const [processingComplete, setProcessingComplete] = useState(false)

  useEffect(() => {
    async function handleCallback() {
      if (!wixOAuthClient) {
        setError("Wix client not initialized")
        return
      }

      try {
        setStatus("Retrieving OAuth data...")

        // 1. Retrieve stored OAuth data
        const storedData = localStorage.getItem("wixOAuthData")
        if (!storedData) {
          setError("Missing OAuth data. Please try logging in again.")
          return
        }

        const oAuthData = JSON.parse(storedData)
        console.log("Retrieved OAuth data:", oAuthData)

        setStatus("Parsing response from Wix...")

        // 2. Parse URL fragment from Wix
        const returnedOAuthData = wixOAuthClient.auth.parseFromUrl()
        console.log("Returned OAuth data:", returnedOAuthData)

        if (returnedOAuthData.error) {
          setError(`Login error: ${returnedOAuthData.errorDescription || returnedOAuthData.error}`)
          return
        }

        setStatus("Getting member tokens...")

        // 3. Get Member Tokens
        const memberTokens = await wixOAuthClient.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          oAuthData,
        )

        console.log("Member tokens received")

        setStatus("Setting tokens...")

        // 4. Set Tokens
        wixOAuthClient.auth.setTokens(memberTokens)

        // Store tokens for later use
        storeWixTokens(memberTokens)

        setStatus("Getting member information...")

        // 5. Get current member information
        const member = await getCurrentMember()
        console.log("Current member:", member)

        setStatus("Login successful!")
        setProcessingComplete(true)
      } catch (err: any) {
        console.error("Callback error:", err)
        setError(err.message || "An error occurred during login")
      }
    }

    handleCallback()
  }, [router])

  const handleContinue = () => {
    // Get the original URI from the OAuth data or default to the account page
    const storedData = localStorage.getItem("wixOAuthData")
    const originalUri = storedData ? JSON.parse(storedData).originalUri : null

    router.push(originalUri || "/account")
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
              <Button onClick={() => router.push("/wix-oauth-login")} className="w-full">
                Return to Login
              </Button>
            </div>
          ) : processingComplete ? (
            <div className="space-y-4">
              <Alert variant="default" className="bg-green-50 border-green-200">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>You have successfully logged in!</AlertDescription>
              </Alert>
              <Button onClick={handleContinue} className="w-full">
                Continue
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
              <p>{status}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
