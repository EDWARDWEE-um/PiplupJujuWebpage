"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function VerifyWixEnvPage() {
  const [clientIdStatus, setClientIdStatus] = useState<"loading" | "success" | "error">("loading")
  const [clientId, setClientId] = useState<string | null>(null)

  useEffect(() => {
    // Check if the NEXT_PUBLIC_WIX_CLIENT_ID is set
    const wixClientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID

    if (wixClientId && wixClientId.length > 0) {
      setClientIdStatus("success")
      // Only show first and last 4 characters for security
      if (wixClientId.length > 8) {
        setClientId(`${wixClientId.substring(0, 4)}...${wixClientId.substring(wixClientId.length - 4)}`)
      } else {
        setClientId("****")
      }
    } else {
      setClientIdStatus("error")
    }
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Wix Environment Variables</CardTitle>
          <CardDescription>Verify that your Wix environment variables are properly configured.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div>
              <h3 className="font-medium">NEXT_PUBLIC_WIX_CLIENT_ID</h3>
              {clientIdStatus === "success" && <p className="text-sm text-muted-foreground">Value: {clientId}</p>}
            </div>
            {clientIdStatus === "loading" ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : clientIdStatus === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>

          {clientIdStatus === "error" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Missing Wix Client ID</AlertTitle>
              <AlertDescription>
                The NEXT_PUBLIC_WIX_CLIENT_ID environment variable is not set. Please add it to your environment
                variables.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            <h4 className="font-medium">How to set environment variables:</h4>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>
                Create a <code>.env.local</code> file in your project root
              </li>
              <li>
                Add <code>NEXT_PUBLIC_WIX_CLIENT_ID=your_client_id</code>
              </li>
              <li>
                Add <code>WIX_CLIENT_ID=your_client_id</code> (same value)
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full">
            Refresh Page
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
