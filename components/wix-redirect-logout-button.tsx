"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { wixRedirectClient, clearWixTokens } from "@/lib/wix-redirect-client"

interface WixRedirectLogoutButtonProps {
  className?: string
  label?: string
}

export function WixRedirectLogoutButton({ className = "", label = "Logout" }: WixRedirectLogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    if (!wixRedirectClient) {
      console.error("Wix client not initialized")
      return
    }

    try {
      setIsLoading(true)

      // Get logout URL
      const { logoutUrl } = await wixRedirectClient.auth.logout(window.location.href)

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
