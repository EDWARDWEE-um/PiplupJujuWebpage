"use client"

import { EnvVariableTester } from "@/components/env-variable-tester"
import { GoogleAuthButtonDebug } from "@/components/google-auth-button-debug"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AuthDebugPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 text-center">Authentication Debug</h1>
      <p className="text-center text-muted-foreground mb-8">Comprehensive tools to diagnose authentication issues</p>

      <div className="grid gap-8 md:grid-cols-2">
        <EnvVariableTester />

        <Card>
          <CardHeader>
            <CardTitle>Manual Environment Variable Setup</CardTitle>
            <CardDescription>Follow these steps to properly set up your environment variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p className="font-medium">Create a .env.local file in your project root</p>
                <pre className="bg-muted p-2 rounded text-xs mt-1">
                  NEXT_PUBLIC_WIX_CLIENT_ID=a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3{"\n"}
                  WIX_CLIENT_ID=a951df2b-9c88-4aad-83bd-fc8d7f1f8ce3
                </pre>
              </li>
              <li>
                <p className="font-medium">Stop your development server completely</p>
                <p className="text-xs text-muted-foreground">Press Ctrl+C in your terminal to stop the server</p>
              </li>
              <li>
                <p className="font-medium">Start your development server again</p>
                <pre className="bg-muted p-2 rounded text-xs mt-1">npm run dev</pre>
              </li>
              <li>
                <p className="font-medium">Clear your browser cache or use incognito mode</p>
                <p className="text-xs text-muted-foreground">This ensures you're not using cached environment values</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Test Google Authentication</CardTitle>
          <CardDescription>This enhanced button provides detailed debugging information</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleAuthButtonDebug
            onClick={async () => {
              alert("This is just a test button. In a real implementation, this would trigger the Google login flow.")
            }}
          />
        </CardContent>
      </Card>

      <div className="mt-8 p-4 border rounded-md bg-blue-50 text-blue-800">
        <h2 className="font-semibold mb-2">Common Issues & Solutions:</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong>Environment variables not loading:</strong> Make sure your .env.local file is in the root directory
            and has the correct format (no spaces around equals sign).
          </li>
          <li>
            <strong>Server not picking up changes:</strong> Next.js only loads environment variables at startup. You
            must restart the server completely after changing .env files.
          </li>
          <li>
            <strong>Browser caching:</strong> Your browser might be caching the old version of your site. Try opening in
            an incognito window or clearing your cache.
          </li>
          <li>
            <strong>Deployment vs Development:</strong> Environment variables set locally won't be available in deployed
            environments. Make sure to set them in your hosting platform too.
          </li>
        </ul>
      </div>
    </div>
  )
}
