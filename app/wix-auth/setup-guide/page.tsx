import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function WixSetupGuidePage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Wix Authentication Setup Guide</CardTitle>
          <CardDescription>
            Follow these steps to set up Wix authentication for your Pokemon TCG ecommerce website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              This guide will help you set up Wix authentication for your website. Make sure to follow each step
              carefully.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 1: Create a Wix OAuth App</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Log in to your Wix Developer Center account</li>
              <li>Create a new OAuth app or use an existing one</li>
              <li>Note down your Client ID - you'll need this for the next step</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 2: Configure Redirect URIs</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                In your Wix OAuth app settings, add the following redirect URI:
                <code className="block bg-muted p-2 rounded-md mt-2">https://your-domain.com/wix-auth/callback</code>
              </li>
              <li>
                For local development, also add:
                <code className="block bg-muted p-2 rounded-md mt-2">http://localhost:3000/wix-auth/callback</code>
              </li>
              <li>Save your changes</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 3: Set Environment Variables</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                Create a <code>.env.local</code> file in your project root (if it doesn't exist)
              </li>
              <li>
                Add the following environment variables:
                <code className="block bg-muted p-2 rounded-md mt-2">
                  NEXT_PUBLIC_WIX_CLIENT_ID=your_client_id
                  <br />
                  WIX_CLIENT_ID=your_client_id
                </code>
              </li>
              <li>
                Replace <code>your_client_id</code> with the Client ID from Step 1
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 4: Verify Your Setup</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                Visit{" "}
                <a href="/wix-auth/verify-env" className="text-blue-600 hover:underline">
                  /wix-auth/verify-env
                </a>{" "}
                to check if your environment variables are set correctly
              </li>
              <li>If everything is set up correctly, you should see a green checkmark next to your Client ID</li>
              <li>If there's an error, follow the instructions on the page to fix it</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 5: Test Authentication</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                Visit{" "}
                <a href="/wix-auth/test" className="text-blue-600 hover:underline">
                  /wix-auth/test
                </a>{" "}
                to test the authentication flow
              </li>
              <li>Click the "Sign In with Wix" button</li>
              <li>You should be redirected to Wix's login page</li>
              <li>After logging in, you should be redirected back to your website</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 6: Production Deployment</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>When deploying to production, make sure to add the environment variables to your hosting platform</li>
              <li>For Vercel, add the environment variables in the project settings</li>
              <li>
                Make sure your production domain is added to the allowed redirect URIs in your Wix OAuth app settings
              </li>
            </ol>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-semibold">Troubleshooting</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                If you're getting "Missing Wix client ID" errors, make sure your environment variables are set correctly
              </li>
              <li>
                If you're getting redirect errors, check that your redirect URI is correctly configured in your Wix
                OAuth app
              </li>
              <li>
                If you're having issues with authentication, try clearing your browser's local storage and cookies
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
