"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { getWixClient, storeWixTokens, getCurrentMember } from "@/lib/standalone-wix-client"

export default function StandaloneCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState("Processing login...")
  const [processingComplete, setProcessingComplete] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    async function handleCallback() {
      const client = getWixClient()

      if (!client) {
        setError("Wix client not initialized")
        setDebugInfo({ error: "Client initialization failed" })
        return
      }

      try {
        setStatus("Retrieving OAuth data...")

        // 1. Retrieve stored OAuth data
        const storedData = localStorage.getItem("wixOAuthData")
        if (!storedData) {
          setError("Missing OAuth data. Please try logging in again.")
          setDebugInfo({ error: "Missing OAuth data" })
          return
        }

        const oAuthData = JSON.parse(storedData)
        console.log("Retrieved OAuth data:", oAuthData)
        setDebugInfo((prev) => ({ ...prev, oAuthData }))

        setStatus("Parsing response from Wix...")

        // 2. Parse URL fragment from Wix
        const returnedOAuthData = client.auth.parseFromUrl()
        console.log("Returned OAuth data:", returnedOAuthData)
        setDebugInfo((prev) => ({ ...prev, returnedOAuthData }))

        if (returnedOAuthData.error) {
          setError(`Login error: ${returnedOAuthData.errorDescription || returnedOAuthData.error}`)
          return
        }

        setStatus("Getting member tokens...")

        // 3. Get Member Tokens
        const memberTokens = await client.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          oAuthData,
        )

        console.log("Member tokens received")
        setDebugInfo((prev) => ({
          ...prev,
          tokenReceived: true,
          accessTokenLength: memberTokens?.accessToken?.value?.length || 0,
          refreshTokenLength: memberTokens?.refreshToken?.value?.length || 0,
        }))

        setStatus("Setting tokens...")

        // 4. Set Tokens
        client.auth.setTokens(memberTokens)

        // Store tokens for later use
        storeWixTokens(memberTokens)

        setStatus("Getting member information...")

        // 5. Get current member information
        const member = await getCurrentMember()
        console.log("Current member:", member)
        setDebugInfo((prev) => ({
          ...prev,
          memberReceived: !!member,
          memberId: member?._id,
          memberEmail: member?.loginEmail,
        }))

        setStatus("Login successful!")
        setProcessingComplete(true)
      } catch (err: any) {
        console.error("Callback error:", err)
        setError(err.message || "An error occurred during login")
        setDebugInfo((prev) => ({ ...prev, error: err.message, stack: err.stack }))
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
              <Button onClick={() => router.push("/standalone-login")} className="w-full">
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
                <AlertDescription>You have successfully logged in!</AlertDescription>
              </Alert>
              <Button onClick={handleContinue} className="w-full">
                Continue
              </Button>
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
