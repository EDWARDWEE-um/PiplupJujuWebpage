"use client"

import { Button } from "@/components/ui/button"
import { useWixAuth } from "@/hooks/use-wix-auth"

interface WixLoginButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function WixLoginButton({ className, variant = "outline", size = "default" }: WixLoginButtonProps) {
  const { isAuthenticated, isLoading, login, logout } = useWixAuth()

  if (isLoading) {
    return (
      <Button className={className} variant={variant} size={size} disabled>
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
        Loading...
      </Button>
    )
  }

  if (isAuthenticated) {
    return (
      <Button onClick={logout} className={className} variant={variant} size={size}>
        Sign Out
      </Button>
    )
  }

  return (
    <Button onClick={login} className={className} variant={variant} size={size}>
      Sign In with Wix
    </Button>
  )
}
