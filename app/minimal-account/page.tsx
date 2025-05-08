"use client"

import { useState, useEffect } from "react"
import { getCurrentUser, logout } from "@/lib/minimal-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Mail, Award } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MinimalAccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()

        if (!userData) {
          // Not authenticated
          router.push("/minimal-login")
          return
        }

        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
        setError("Failed to load user data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="mt-4 text-center text-sm text-muted-foreground">Loading your account...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Account</CardTitle>
          <CardDescription>Welcome to your PIPLUPJUJUTCG account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">
                    {user.profile?.nickname || user.profile?.name?.first || "Member"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.loginEmail || "No email available"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Points</p>
                  <p className="text-sm text-muted-foreground">{user.profile?.customFields?.points || 100}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">No user data available</p>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
