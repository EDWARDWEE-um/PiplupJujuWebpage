"use client"

import { useCustomAuth } from "@/hooks/use-custom-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CustomAuthTestPage() {
  const { user, isAuthenticated, isLoading, logout } = useCustomAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push("/custom-login")
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Loading authentication status...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Custom Authentication Test</CardTitle>
          <CardDescription>This page demonstrates the custom Wix authentication implementation</CardDescription>
        </CardHeader>
        <CardContent>
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-medium text-green-800">Authenticated</h3>
                <p className="text-sm text-green-700">You are logged in as a Wix member.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">User Information</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Points:</strong> {user.points}
                  </p>
                  {user.profileImage && (
                    <div className="mt-2">
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button onClick={handleLogout} variant="destructive" disabled={isLoggingOut} className="w-full">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="font-medium text-yellow-800">Not Authenticated</h3>
                <p className="text-sm text-yellow-700">You are not logged in.</p>
              </div>

              <Button asChild className="w-full">
                <Link href="/custom-login">Go to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">This implementation uses direct login with the Wix SDK.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
