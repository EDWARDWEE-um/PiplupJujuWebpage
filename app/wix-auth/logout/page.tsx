"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createWixClient, clearWixTokens } from "@/lib/wix-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WixLogoutPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function logout() {
      try {
        const wixClient = createWixClient()

        // Get logout URL
        const redirectUri = `${window.location.origin}/login`
        const { logoutUrl } = await wixClient.auth.logout(redirectUri)

        // Clear tokens
        clearWixTokens()

        // Redirect to Wix logout
        window.location.href = logoutUrl
      } catch (err) {
        console.error("Error logging out:", err)
        setError("Failed to log out. Please try again.")

        // Clear tokens anyway
        clearWixTokens()

        // Redirect to login after a delay
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    }

    logout()
  }, [router])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Logging Out</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">{error}</p>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
              <p className="ml-2">Logging you out...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
