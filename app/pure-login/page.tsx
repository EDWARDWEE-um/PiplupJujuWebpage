"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { generateLoginUrl, isLoggedIn } from "@/lib/pure-wix-auth"

export default function PureLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const loggedIn = isLoggedIn()
        setIsAuthenticated(loggedIn)

        if (loggedIn) {
          console.log("User is already logged in")
        }
      } catch (err: any) {
        console.error("Error checking authentication:", err)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Generate redirect URI based on current origin
      const redirectUri = `${window.location.origin}/pure-callback`

      // Generate login URL
      const loginUrl = await generateLoginUrl(redirectUri)

      console.log("Redirecting to login URL:", loginUrl)

      // Redirect to login URL
      window.location.href = loginUrl
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to initialize login. Please try again.")
      setIsLoading(false)
    }
  }

  // If user is already logged in, show a different message
  if (isAuthenticated) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Already Logged In</CardTitle>
            <CardDescription>You are already logged in to PIPLUPJUJUTCG.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => router.push("/account")}>
              Go to Account
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login to PIPLUPJUJUTCG</CardTitle>
          <CardDescription>Sign in to your account to access your orders, wishlist, and more.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Initializing Login..." : "Login with Wix"}
          </Button>
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
