"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EnvDebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})

  useEffect(() => {
    // Collect all NEXT_PUBLIC environment variables
    const publicEnvVars: Record<string, string | undefined> = {}

    // Check for specific environment variables we need
    publicEnvVars["NEXT_PUBLIC_WIX_CLIENT_ID"] = process.env.NEXT_PUBLIC_WIX_CLIENT_ID

    // Add any other public env vars you want to check
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith("NEXT_PUBLIC_")) {
        publicEnvVars[key] = process.env[key]
      }
    })

    setEnvVars(publicEnvVars)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Environment Variables Debug</CardTitle>
          <CardDescription>
            This page shows all available NEXT_PUBLIC environment variables in your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Available Environment Variables:</h3>
              {Object.keys(envVars).length === 0 ? (
                <p className="text-red-500">No public environment variables found!</p>
              ) : (
                <ul className="space-y-2">
                  {Object.entries(envVars).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="font-mono">{key}</span>
                      <span className="font-mono">
                        {value ? (
                          value.length > 10 ? (
                            `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
                          ) : (
                            "****"
                          )
                        ) : (
                          <span className="text-red-500">Not set</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
              <h3 className="font-medium mb-2 text-yellow-800">Important Notes:</h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-800">
                <li>Only environment variables prefixed with NEXT_PUBLIC_ are accessible in the browser</li>
                <li>Environment variables must be defined at build time</li>
                <li>Changes to environment variables require a server restart</li>
                <li>In production, environment variables must be set on your hosting platform</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <div className="w-full p-4 border rounded-md">
            <h3 className="font-medium mb-2">How to set environment variables:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Development:</h4>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                  {`# In .env.local file
NEXT_PUBLIC_WIX_CLIENT_ID=your_client_id
WIX_CLIENT_ID=your_client_id`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium text-sm">Vercel:</h4>
                <ol className="list-decimal list-inside text-sm">
                  <li>Go to your project in Vercel</li>
                  <li>Click on "Settings" → "Environment Variables"</li>
                  <li>Add the variables and values</li>
                  <li>Redeploy your application</li>
                </ol>
              </div>
            </div>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full">
            Refresh Page
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
