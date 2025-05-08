"use client"

import { useWixAuth } from "@/hooks/use-wix-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function WixAuthStatus() {
  const { isAuthenticated, isLoading, member, login, logout } = useWixAuth()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>Checking your authentication status...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not Authenticated</CardTitle>
          <CardDescription>You are not currently signed in with Wix.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sign in to access your account, view orders, and manage your profile.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={login}>Sign In with Wix</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authenticated</CardTitle>
        <CardDescription>You are signed in with Wix.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>{member?.contactDetails?.firstName?.[0] || member?.loginEmail?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {member?.contactDetails?.firstName && member?.contactDetails?.lastName
                ? `${member.contactDetails.firstName} ${member.contactDetails.lastName}`
                : member?.loginEmail || "Wix User"}
            </p>
            <p className="text-sm text-muted-foreground">{member?.loginEmail || "No email available"}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={logout}>
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  )
}
