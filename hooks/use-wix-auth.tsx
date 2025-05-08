"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { wixClient, getWixTokens, clearWixTokens } from "@/lib/wix-client"

export interface WixMember {
  id: string
  loginEmail?: string
  contactDetails?: {
    firstName?: string
    lastName?: string
    email?: string
  }
}

export function useWixAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [member, setMember] = useState<WixMember | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const tokens = getWixTokens()
        if (!tokens) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // Try to get member info
        const memberInfo = await wixClient.members.getCurrentMember()
        setMember(memberInfo)
        setIsAuthenticated(true)
      } catch (err) {
        console.error("Error checking Wix authentication:", err)
        clearWixTokens() // Clear invalid tokens
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = () => {
    router.push("/wix-auth/login")
  }

  const logout = () => {
    router.push("/wix-auth/logout")
  }

  return {
    isAuthenticated,
    isLoading,
    member,
    login,
    logout,
  }
}
