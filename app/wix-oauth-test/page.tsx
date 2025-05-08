"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { wixOAuthClient, getCurrentMember, getWixTokens } from "@/lib/wix-oauth-client"
import { WixOAuthLogoutButton } from "@/components/wix-oauth-logout-button"
import Link from "next/link"

export default function WixOAuthTestPage() {
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tokens, setTokens] = useState<any>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true)

        // Check for tokens
        const storedTokens = getWixTokens()
        setTokens(storedTokens)

        if (storedTokens && wixOAuthClient) {
          // Set tokens in client
          wixOAuthClient.auth.setTokens(storedTokens)

          // Get member info
          const memberInfo = await getCurrentMember()
          setMember(memberInfo)
        }
      } catch (err: any) {
        console.error("Auth check error:", err)
        setError(err.message || "Failed to check authentication status")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Wix OAuth Test</CardTitle>
          <CardDescription>This page demonstrates the complete Wix OAuth authentication flow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Environment Variables Status */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Environment Variables</h3>
            <Alert
              variant={process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? "default" : "destructive"}
              className={process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? "bg-green-50 border-green-200" : ""}
            >
              {process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>NEXT_PUBLIC_WIX_CLIENT_ID</AlertTitle>
              <AlertDescription>
                {process.env.NEXT_PUBLIC_WIX_CLIENT_ID
                  ? `Set to: ${process.env.NEXT_PUBLIC_WIX_CLIENT_ID.substring(0, 8)}...`
                  : "Not set. Using fallback value."}
              </AlertDescription>
            </Alert>
          </div>

          {/* Authentication Status */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Authentication Status</h3>
            {loading ? (
              <div className="flex items-center">
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
                <p>Checking authentication status...</p>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : member ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Authenticated</AlertTitle>
                  <AlertDescription>
                    You are logged in as {member.contactDetails?.firstName || "a member"}.
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Member Information</h4>
                  <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">{JSON.stringify(member, null, 2)}</pre>
                </div>

                <WixOAuthLogoutButton className="w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Authenticated</AlertTitle>
                  <AlertDescription>You are not currently logged in.</AlertDescription>
                </Alert>

                <Link href="/wix-oauth-login" passHref>
                  <Button className="w-full">Go to Login Page</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Tokens (if available) */}
          {tokens && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Tokens</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
                  {JSON.stringify(
                    {
                      accessToken: {
                        value: tokens.accessToken?.value ? `${tokens.accessToken.value.substring(0, 20)}...` : null,
                        expiresAt: tokens.accessToken?.expiresAt,
                      },
                      refreshToken: {
                        value: tokens.refreshToken?.value ? `${tokens.refreshToken.value.substring(0, 20)}...` : null,
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
