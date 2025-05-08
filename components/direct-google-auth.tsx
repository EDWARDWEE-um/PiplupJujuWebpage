"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"

// Hardcoded client ID
const HARDCODED_WIX_CLIENT_ID = "a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3"

export function DirectGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userCookie = Cookies.get("wix_user")
        if (userCookie) {
          setUser(JSON.parse(userCookie))
        }
      } catch (e) {
        console.error("Error checking auth:", e)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  // Check for auth callback
  useEffect(() => {
    const handleAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const authSuccess = urlParams.get("auth_success")
      const authError = urlParams.get("auth_error")
      const userData = urlParams.get("user_data")

      if (authSuccess === "true" && userData) {
        try {
          const user = JSON.parse(decodeURIComponent(userData))
          setUser(user)
          Cookies.set("wix_user", userData, { expires: 7 })

          // Clean URL
          const url = new URL(window.location.href)
          url.searchParams.delete("auth_success")
          url.searchParams.delete("auth_error")
          url.searchParams.delete("user_data")
          window.history.replaceState({}, document.title, url.toString())
        } catch (e) {
          console.error("Error parsing user data:", e)
          setError("Failed to parse user data")
        }
      } else if (authError) {
        setError(decodeURIComponent(authError))

        // Clean URL
        const url = new URL(window.location.href)
        url.searchParams.delete("auth_success")
        url.searchParams.delete("auth_error")
        url.searchParams.delete("user_data")
        window.history.replaceState({}, document.title, url.toString())
      }
    }

    handleAuthCallback()
  }, [])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Store current URL for redirect back
      const currentUrl = window.location.href
      localStorage.setItem("wix_auth_redirect", currentUrl)

      // Redirect to our server-side Google auth handler
      window.location.href = `/api/auth/google?client_id=${encodeURIComponent(HARDCODED_WIX_CLIENT_ID)}&redirect=${encodeURIComponent(currentUrl)}`
    } catch (error: any) {
      console.error("Google login error:", error)
      setError(error.message || "Failed to authenticate with Google")
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    Cookies.remove("wix_user")
  }

  if (isCheckingAuth) {
    return (
      <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Direct Google Auth</h2>

      {user ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-medium text-green-800">Successfully logged in!</h3>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">ID:</span> {user.id}
              </p>
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" className="w-full">
            Log Out
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm">
            <p className="font-medium text-blue-800">Using server-side authentication</p>
            <p className="mt-1 text-xs">This approach avoids client-side SDK issues</p>
          </div>

          <Button onClick={handleGoogleLogin} disabled={isLoading} className="w-full relative">
            {isLoading ? (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></span>
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google (Direct)
          </Button>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">{error}</div>}
        </div>
      )}
    </div>
  )
}
