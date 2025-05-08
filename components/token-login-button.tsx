"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TokenLoginButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      console.log("Attempting token login...")

      // Redirect to the token login page
      router.push("/token-login")
      console.log("Token login successful, redirecting to homepage")
    } catch (error) {
      console.error("Error navigating to token login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Loading..." : "Developer Login"}
    </Button>
  )
}
