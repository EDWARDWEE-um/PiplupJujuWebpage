"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"

interface GoogleAuthButtonDebugProps {
  onClick: () => Promise<void>
  label?: string
  className?: string
}

export function GoogleAuthButtonDebug({
  onClick,
  label = "Continue with Google",
  className = "",
}: GoogleAuthButtonDebugProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [envValue, setEnvValue] = useState<string>("Checking...")
  const [apiCheck, setApiCheck] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(true)

  // Check environment variable directly
  useEffect(() => {
    const clientIdValue = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "Not found"
    setEnvValue(clientIdValue)

    // Also check via API
    const checkApi = async () => {
      try {
        const response = await fetch("/api/env-debug")
        const data = await response.json()
        setApiCheck(data)
      } catch (err) {
        console.error("Error checking API:", err)
      } finally {
        setIsChecking(false)
      }
    }

    checkApi()
  }, [])

  const handleClick = async () => {
    // If client ID is missing, show error and don't proceed
    if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
      setError("Missing Wix client ID. Please check your environment variables.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onClick()
    } catch (err: any) {
      setError(err.message || "Failed to authenticate with Google")
      console.error("Google auth error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-2">
      <Button
        type="button"
        variant="outline"
        className={`w-full relative ${className}`}
        onClick={handleClick}
        disabled={isLoading || envValue === "Not found"}
      >
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
        {label}
        {envValue === "Not found" && <span className="absolute right-2 text-xs text-red-500">⚠️</span>}
      </Button>

      {error && (
        <Alert variant="destructive" className="text-sm py-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="border rounded-md p-3 bg-muted/30 text-xs space-y-2">
        <div className="font-medium flex items-center">
          <Info className="h-3 w-3 mr-1" />
          Environment Variable Debug Info:
        </div>

        <div>
          <span className="font-semibold">Direct check:</span>
          <span className={envValue === "Not found" ? "text-red-500" : "text-green-500"}>
            {envValue === "Not found" ? "Missing" : "Found"}
          </span>
        </div>

        {isChecking ? (
          <div>Checking server-side...</div>
        ) : apiCheck ? (
          <div>
            <span className="font-semibold">Server check:</span>
            <span className={apiCheck.hasNextPublicWixClientId ? "text-green-500" : "text-red-500"}>
              {apiCheck.hasNextPublicWixClientId ? "Found" : "Missing"}
            </span>
            <div className="mt-1">
              <span className="font-semibold">Node environment:</span> {apiCheck.nodeEnv}
            </div>
          </div>
        ) : (
          <div className="text-red-500">Failed to check server-side</div>
        )}
      </div>
    </div>
  )
}
