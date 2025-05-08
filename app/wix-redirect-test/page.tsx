"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { WixRedirectLoginButton } from "@/components/wix-redirect-login-button"
import { WixRedirectLogoutButton } from "@/components/wix-redirect-logout-button"
import { wixRedirectClient, getCurrentMember } from "@/lib/wix-redirect-client"

export default function WixRedirectTestPage() {
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [clientId, setClientId] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        // Display the client ID being used
        setClientId(process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "Not set")

        if (!wixRedirectClient) {
          console.error("Wix client not initialized")
          setLoading(false)
          return
        }

        const currentMember = await getCurrentMember()
        setMember(currentMember)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Wix Redirect Authentication Test</CardTitle>
          <CardDescription>Testing the redirect-based OAuth flow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium">Environment Variables:</h3>
            <p className="text-sm">NEXT_PUBLIC_WIX_CLIENT_ID: {clientId || "Not set"}</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="ml-2">Checking authentication status...</p>
            </div>
          ) : member ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 text-green-800 rounded-md">
                <h3 className="font-medium">Logged In</h3>
                <p className="text-sm">Email: {member.loginEmail}</p>
                <p className="text-sm">Name: {member.profile?.nickname || member.profile?.name?.first || "N/A"}</p>
              </div>
              <WixRedirectLogoutButton className="w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 text-amber-800 rounded-md">
                <h3 className="font-medium">Not Logged In</h3>
                <p className="text-sm">Click the button below to log in with Wix</p>
              </div>
              <WixRedirectLoginButton className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
