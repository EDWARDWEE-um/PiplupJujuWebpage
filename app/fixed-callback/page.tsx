"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function FixedCallbackPage() {
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
        const storedState = localStorage.getItem("wix_auth_state")

        setDebugInfo({
          code: code ? `${code.substring(0, 10)}...` : null,
          state,
          storedState,
          params: Object.fromEntries(searchParams.entries()),
        })

        // Validate state to prevent CSRF
        if (!state || state !== storedState) {
          setError("Invalid state parameter. Please try again.")
          return
        }

        if (!code) {
          setError("No authorization code received from Wix. Please try again.")
          return
        }

        // Store the code for display purposes
        localStorage.setItem("wix_auth_code", code)

        // In a real implementation, we would exchange the code for tokens
        // For now, we'll just simulate success
        setStatus("Authentication successful!")
        setProcessingComplete(true)
      } catch (err: any) {
        console.error("Callback error:", err)
        setError(err.message || "An error occurred during login")
        setDebugInfo((prev: any) => ({ ...prev, error: err.message, stack: err.stack }))
      }
    }

    handleCallback()
  }, [searchParams, router])

  const handleContinue = () => {
    router.push("/account")
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
              <Button onClick={() => router.push("/fixed-login")} className="w-full">
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
