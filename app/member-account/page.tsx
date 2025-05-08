"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentMember, logout, isLoggedIn } from "@/lib/wix-member-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Mail, Calendar } from "lucide-react"

export default function MemberAccountPage() {
  const router = useRouter()
  const [member, setMember] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn()) {
        router.push("/member-login")
        return
      }

      try {
        const memberData = await getCurrentMember()

        if (!memberData) {
          // Not authenticated
          router.push("/member-login")
          return
        }

        setMember(memberData)
      } catch (error) {
        console.error("Error fetching member:", error)
        setError("Failed to load member data")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
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
          ) : member ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">
                    {member.profile?.nickname || member.profile?.name?.first || "Member"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{member.loginEmail || "No email available"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {member.createdDate ? new Date(member.createdDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">No member data available</p>
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
