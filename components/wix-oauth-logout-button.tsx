"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { wixOAuthClient, clearWixTokens } from "@/lib/wix-oauth-client"

interface WixOAuthLogoutButtonProps {
  className?: string
  label?: string
}

export function WixOAuthLogoutButton({ className = "", label = "Logout" }: WixOAuthLogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    if (!wixOAuthClient) {
      console.error("Wix client not initialized")
      return
    }

    try {
      setIsLoading(true)

      // Get logout URL
      const { logoutUrl } = await wixOAuthClient.auth.logout(window.location.href)

      // Clear tokens
      clearWixTokens()

      // Redirect to Wix logout
      window.location.href = logoutUrl
    } catch (err) {
      console.error("Logout error:", err)

      // Clear tokens anyway
      clearWixTokens()

      // Redirect to home page
      window.location.href = "/"
    }
  }

  return (
    <Button type="button" variant="outline" className={className} onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : label}
    </Button>
  )
}
