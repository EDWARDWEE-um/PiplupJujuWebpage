"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkBrowserEnvVars } from "@/lib/env-checker"

export default function EnvDirectTestPage() {
  const [envCheck, setEnvCheck] = useState({ hasClientId: false, clientIdValue: "Checking..." })
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    const result = checkBrowserEnvVars()
    setEnvCheck(result)
  }, [refreshCount])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Direct Environment Variable Test</h1>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Raw Environment Variable Check</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md">
            <p className="text-sm font-medium mb-1">NEXT_PUBLIC_WIX_CLIENT_ID:</p>
            <p className="font-mono bg-muted p-2 rounded text-sm break-all">{envCheck.clientIdValue}</p>
            <p className="mt-2 text-sm">
              Status:{" "}
              {envCheck.hasClientId ? (
                <span className="text-green-600 font-medium">Available</span>
              ) : (
                <span className="text-red-600 font-medium">Missing</span>
              )}
            </p>
          </div>

          <button
            onClick={() => setRefreshCount((c) => c + 1)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh Check
          </button>

          <div className="text-sm space-y-2 p-3 bg-amber-50 text-amber-800 rounded-md">
            <p className="font-medium">Troubleshooting Steps:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Verify your .env.local file exists in the project root</li>
              <li>Make sure the variable is prefixed with NEXT_PUBLIC_</li>
              <li>Restart your development server completely</li>
              <li>Try in an incognito window to avoid cache issues</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
