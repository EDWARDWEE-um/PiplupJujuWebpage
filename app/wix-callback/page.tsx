"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { wixRedirectClient, storeWixTokens, getCurrentMember } from "@/lib/wix-redirect-client"

export default function WixCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState("Processing login...")

  useEffect(() => {
    async function handleCallback() {
      if (!wixRedirectClient) {
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
        const returnedOAuthData = wixRedirectClient.auth.parseFromUrl()
        console.log("Returned OAuth data:", returnedOAuthData)

        if (returnedOAuthData.error) {
          setError(`Login error: ${returnedOAuthData.errorDescription || returnedOAuthData.error}`)
          return
        }

        setStatus("Getting member tokens...")

        // 3. Get Member Tokens
        const memberTokens = await wixRedirectClient.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          oAuthData,
        )

        console.log("Member tokens received")

        setStatus("Setting tokens...")

        // 4. Set Tokens
        wixRedirectClient.auth.setTokens(memberTokens)

        // Store tokens for later use
        storeWixTokens(memberTokens)

        setStatus("Getting member information...")

        // 5. Get current member information
        const member = await getCurrentMember()
        console.log("Current member:", member)

        setStatus("Login successful! Redirecting...")

        // 6. Redirect to original URI (optional)
        setTimeout(() => {
          router.push(oAuthData.originalUri || "/account")
        }, 1000)
      } catch (err: any) {
        console.error("Callback error:", err)
        setError(err.message || "An error occurred during login")
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{error ? "Login Error" : "Completing Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500">
              <p>{error}</p>
              <button onClick={() => router.push("/login")} className="mt-4 px-4 py-2 bg-primary text-white rounded">
                Return to Login
              </button>
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
