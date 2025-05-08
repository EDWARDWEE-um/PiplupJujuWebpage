"use client"

import { useAuth } from "@/hooks/use-auth"
import { AlertCircle } from "lucide-react"

export function AuthModeIndicator() {
  const { useFallback } = useAuth()

  if (!useFallback) return null

  return (
    <div className="fixed bottom-4 right-4 bg-amber-100 text-amber-800 px-3 py-2 rounded-md text-xs flex items-center shadow-md">
      <AlertCircle className="h-3 w-3 mr-1" />
      <span>Using Development Auth Mode</span>
    </div>
  )
}
