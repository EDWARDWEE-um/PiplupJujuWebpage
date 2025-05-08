"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { exchangeCodeForTokens } from "@/lib/minimal-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function MinimalCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get code from URL
        const code = searchParams.get("code")
        const error = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")

        // Check for errors
        if (error) {
          setError(`Authentication failed: ${errorDescription || error}`)
          setIsProcessing(false)
          return
        }

        if (!code) {
          setError("No authorization code received")
          setIsProcessing(false)
          return
        }

        // Exchange code for tokens
        await exchangeCodeForTokens(code)

        // Redirect to account page
        router.push("/account")
      } catch (error) {
        console.error("Callback error:", error)
        setError(`Authentication failed: ${error instanceof Error ? error.message : "Unknown error"}`)
        setIsProcessing(false)
      }
    }

    processCallback()
  }, [router, searchParams])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Completing Login</CardTitle>
          <CardDescription>
            {isProcessing
              ? "Please wait while we complete your login..."
              : error
                ? "We encountered an issue signing you in"
                : "Login successful!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="mt-4 text-center text-sm text-muted-foreground">Processing your authentication...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
