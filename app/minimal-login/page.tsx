"use client"

import { useState } from "react"
import { getLoginUrl } from "@/lib/minimal-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function MinimalLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get the login URL
      const loginUrl = await getLoginUrl()

      // Redirect to Wix
      window.location.href = loginUrl
    } catch (error) {
      console.error("Login error:", error)
      setError("Failed to generate login URL. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login to PIPLUPJUJUTCG</CardTitle>
          <CardDescription>Sign in to your account using our simplified login.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Loading..." : "Login with Wix"}
            </Button>

            <div className="text-sm text-center text-muted-foreground">
              This is a minimal login implementation that should work in all environments.
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>
            By logging in, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
