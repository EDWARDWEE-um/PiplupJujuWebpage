"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function GitHubLoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true)

      // GitHub OAuth client ID
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

      if (!clientId) {
        throw new Error("GitHub client ID not configured")
      }

      // Redirect URL for callback
      const redirectUri = `${window.location.origin}/api/auth/github/callback`

      // Random state for security
      const state = Math.random().toString(36).substring(2, 15)

      // Store state in session storage for verification
      sessionStorage.setItem("githubOAuthState", state)

      // Scope for permissions
      const scope = "user:email"

      // Construct GitHub OAuth URL
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${scope}`

      // Redirect to GitHub
      window.location.href = githubUrl
    } catch (error) {
      console.error("GitHub login error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleGitHubLogin}
      disabled={isLoading}
      className="w-full flex items-center gap-2"
    >
      <Github className="h-4 w-4" />
      {isLoading ? "Connecting..." : "Continue with GitHub"}
    </Button>
  )
}
