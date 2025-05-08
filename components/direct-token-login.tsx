"use client"

import { useWixClient } from "@/hooks/use-wix-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

// This is the hardcoded token for direct login
// In a production environment, this would be securely stored
const MEMBER_TOKEN = {
  refreshToken: {
    value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc", // Replace with your actual token
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  },
}

export default function DirectTokenLogin() {
  const wixClient = useWixClient()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTokenLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Store the token in cookies
      Cookies.set("refreshToken", JSON.stringify(MEMBER_TOKEN.refreshToken), {
        expires: 30, // 30 days
      })

      // Set the token in the Wix client
      wixClient.auth.setTokens({
        refreshToken: MEMBER_TOKEN.refreshToken,
        accessToken: { value: "", expiresAt: 0 }, // This will be refreshed automatically
      })

      // Try to get the current member to verify the token works
      try {
        const currentMember = await wixClient.members.getCurrentMember()

        if (currentMember) {
          console.log("Successfully logged in as:", currentMember.loginEmail)
          // Redirect to account page on success
          router.push("/account")
        } else {
          throw new Error("Failed to get current member")
        }
      } catch (memberError) {
        console.error("Error fetching member:", memberError)
        setError("Invalid token or token expired. Please try again.")

        // Clean up on failure
        Cookies.remove("refreshToken")
      }
    } catch (error) {
      console.error("Token login error:", error)
      setError(error instanceof Error ? error.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleTokenLogin} disabled={isLoading} className="w-full" variant="outline">
        {isLoading ? "Signing in..." : "Sign in with Hardcoded Token"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">This option is for development purposes only.</p>
    </div>
  )
}
