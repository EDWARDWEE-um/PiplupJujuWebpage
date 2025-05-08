"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

interface EnvVariable {
  name: string
  value: string | undefined
  isPublic: boolean
  isRequired: boolean
  description: string
}

export function EnvChecker() {
  const [envVars, setEnvVars] = useState<EnvVariable[]>([
    {
      name: "NEXT_PUBLIC_WIX_CLIENT_ID",
      value: undefined,
      isPublic: true,
      isRequired: true,
      description: "Client ID for Wix authentication (browser)",
    },
    {
      name: "WIX_CLIENT_ID",
      value: undefined,
      isPublic: false,
      isRequired: true,
      description: "Client ID for Wix authentication (server)",
    },
    {
      name: "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
      value: undefined,
      isPublic: true,
      isRequired: false,
      description: "Google OAuth client ID",
    },
  ])

  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    // Check public environment variables
    const updatedVars = envVars.map((variable) => {
      if (variable.isPublic) {
        return {
          ...variable,
          value: process.env[variable.name],
        }
      }
      return variable
    })

    setEnvVars(updatedVars)
  }, [])

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  const getMissingRequiredCount = () => {
    return envVars.filter((v) => v.isRequired && v.isPublic && !v.value).length
  }

  const getEnvFileContent = () => {
    return envVars
      .filter((v) => v.isRequired)
      .map((v) => `${v.name}=your_${v.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_here`)
      .join("\n")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Environment Variables Status
          {getMissingRequiredCount() > 0 ? (
            <span className="text-sm font-normal px-2 py-1 bg-red-100 text-red-800 rounded-md">
              {getMissingRequiredCount()} required variables missing
            </span>
          ) : (
            <span className="text-sm font-normal px-2 py-1 bg-green-100 text-green-800 rounded-md">
              All required variables set
            </span>
          )}
        </CardTitle>
        <CardDescription>Check the status of required environment variables for authentication</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {envVars
            .filter((v) => v.isPublic)
            .map((variable) => (
              <div key={variable.name} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="flex items-center">
                    <span className="font-mono text-sm">{variable.name}</span>
                    {variable.isRequired && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{variable.description}</p>
                </div>

                {variable.value ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
            ))}
        </div>

        {getMissingRequiredCount() > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Missing Required Environment Variables</AlertTitle>
            <AlertDescription className="mt-2">
              Your application is missing required environment variables. Authentication features will not work
              properly.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 p-4 border rounded-md bg-muted/50">
          <h3 className="font-medium mb-2 flex items-center">
            How to fix missing environment variables:
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-6 w-6 p-0"
              onClick={() => copyToClipboard(getEnvFileContent(), "env")}
            >
              {copied === "env" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span className="sr-only">Copy</span>
            </Button>
          </h3>

          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Create a <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file in your project root
            </li>
            <li>
              Add the following variables:
              <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-x-auto">{getEnvFileContent()}</pre>
            </li>
            <li>Restart your development server</li>
            <li>For production, add these variables to your hosting platform</li>
          </ol>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Status
        </Button>
        <Link
          href="https://dev.wix.com/docs/build-apps/build-your-app/authentication/oauth/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="link" className="flex items-center gap-1 text-sm">
            Wix OAuth Documentation
            <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
