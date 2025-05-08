"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EnvVariableTester() {
  const [clientSideValue, setClientSideValue] = useState<string>("Checking...")
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    // Access the environment variable directly
    const envValue = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "Not found"
    setClientSideValue(envValue)
  }, [refreshCount])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Environment Variable Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md">
          <p className="text-sm font-medium mb-1">NEXT_PUBLIC_WIX_CLIENT_ID:</p>
          <p className="font-mono bg-muted p-2 rounded text-sm break-all">{clientSideValue}</p>
        </div>

        <Button onClick={() => setRefreshCount((c) => c + 1)} className="w-full">
          Refresh Value
        </Button>

        <div className="text-sm text-muted-foreground mt-4 space-y-2">
          <p>If the value shows "Not found", your environment variable is not being loaded correctly.</p>
          <p>Troubleshooting steps:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Verify your .env.local file is in the root directory of your project</li>
            <li>Make sure there are no spaces around the equals sign in your .env.local file</li>
            <li>Restart your development server completely</li>
            <li>Clear your browser cache or try in an incognito window</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
