"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { wixRedirectClient } from "@/lib/wix-redirect-client"

interface WixRedirectLoginButtonProps {
  className?: string
  label?: string
}

export function WixRedirectLoginButton({ className = "", label = "Login with Wix" }: WixRedirectLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    // Check if client is initialized
    setClientReady(!!wixRedirectClient)
  }, [])

  async function handleLogin() {
    if (!wixRedirectClient) {
      setError("Wix client not initialized")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Use the current URL as the callback URL, but replace the path with /wix-callback
      const currentUrl = new URL(window.location.href)
      const redirectUri = `${currentUrl.origin}/wix-callback`
      const originalUri = window.location.href

      console.log("Redirect URI:", redirectUri)
      console.log("Original URI:", originalUri)

      // 1. Generate OAuth Data
      const oAuthData = wixRedirectClient.auth.generateOAuthData(redirectUri, originalUri)

      // 2. Store OAuth Data in localStorage
      localStorage.setItem("wixOAuthData", JSON.stringify(oAuthData))

      // 3. Get Login URL
      const { authUrl } = await wixRedirectClient.auth.getAuthUrl(oAuthData)

      console.log("Auth URL:", authUrl)

      // 4. Redirect to Wix login page
      window.location.href = authUrl
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to initialize login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="default"
        className={`w-full ${className}`}
        onClick={handleLogin}
        disabled={isLoading || !clientReady}
      >
        {isLoading ? "Loading..." : label}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {!clientReady && <p className="text-amber-500 text-sm mt-2">Wix client not initialized</p>}
    </div>
  )
}
